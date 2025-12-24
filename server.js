require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/PEDIASCAPE_Student_Platform-main/api', (req, res, next) => {
  const originalUrl = req.url;
  req.url = `/api${req.url}`;
  app.handle(req, res, (err) => {
    req.url = originalUrl;
    if (res.headersSent) return;
    next(err);
  });
});
app.use(express.json({ limit: '50mb' }));

app.use('/materials', (req, res) => {
  res.redirect(301, '/material.html');
});

app.get(['/materials.html', '/pages/materials', '/pages/materials/', '/pages/materials/index.html'], (req, res) => {
  res.redirect(301, '/material.html');
});

const chatbotRouter = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRouter);
app.use('/chatbot', chatbotRouter);
app.use('/PEDIASCAPE_Student_Platform-main/api/chatbot', chatbotRouter);
app.use('/PEDIASCAPE_Student_Platform-main/pages', express.static('pages'));
app.use('/PEDIASCAPE_Student_Platform-main/public', express.static('public'));
app.use(express.static('public'));
app.use(express.static('pages'));

// Initialize Gemini API
const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModelName = process.env.GEMINI_MODEL;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'study-materials';
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function getMaterialsCategories() {
  return [
    { key: 'engineering', path: 'Engineering', label: 'Engineering' },
    { key: 'bba', path: 'BBA', label: 'BBA' },
    { key: 'bcom', path: 'BCOM', label: 'BCOM' },
    { key: 'class-11-12', path: 'Class 11 &12', label: 'Class 11 & 12' },
    { key: 'cbse', path: 'Boards/CBSE', label: 'Central Board of Secondary Education (CBSE)' },
    { key: 'cisce', path: 'Boards/CISCE', label: 'Council for the Indian School Certificate Examinations (CISCE)' },
    { key: 'nios', path: 'Boards/NIOS', label: 'National Institute of Open Schooling (NIOS)' },
    { key: 'bosse', path: 'Boards/BOSSE', label: 'Board of Open Schooling and Skill Education (BOSSE)' },
    { key: 'ib', path: 'Boards/IB', label: 'International Baccalaureate (IB)' },
    { key: 'caie-igcse', path: 'Boards/CAIE_IGCSE', label: 'Cambridge International (CAIE / IGCSE)' },
    { key: 'ai-ml', path: 'Courses/AI_ML', label: 'Artificial Intelligence & Machine Learning' },
    { key: 'data-science-analytics', path: 'Courses/Data_Science_Analytics', label: 'Data Science & Analytics' },
    { key: 'cybersecurity', path: 'Courses/Cybersecurity', label: 'Cybersecurity' },
    { key: 'cloud-computing', path: 'Courses/Cloud_Computing', label: 'Cloud Computing' },
    { key: 'software-development', path: 'Courses/Software_Development', label: 'Software Development' },
    { key: 'mba', path: 'Courses/MBA', label: 'MBA' },
    { key: 'bsc-cs-it', path: 'Courses/BSc_CS_IT', label: 'BSc Computer Science / IT' },
    { key: 'bsc-zoology', path: 'Courses/BSc_Zoology', label: 'BSc Zoology' },
    { key: 'biotech-genetics-biomedical', path: 'Courses/Biotech_Genetics_Biomedical', label: 'Biotechnology / Genetics / Biomedical Sciences' },
    { key: 'ui-ux-design', path: 'Courses/UI_UX_Design', label: 'UI/UX Design' },
    { key: 'animation-game-design', path: 'Courses/Animation_Game_Design', label: 'Animation & Game Design' },
    { key: 'environmental-sustainability', path: 'Courses/Environmental_Sustainability', label: 'Environmental & Sustainability Studies' },
  ];
}

app.use((req, res, next) => {
  if (typeof req?.path === 'string' && req.path.includes('/api/materials')) {
    res.set('X-Pediascape-Materials-Api', '1');
  }
  next();
});

let didEnsureMaterialsFolders = false;
async function ensureMaterialsFolders() {
  if (didEnsureMaterialsFolders) return;
  didEnsureMaterialsFolders = true;
  if (!supabase) return;

  const categories = getMaterialsCategories();
  const objectName = '.keep';
  const payload = Buffer.from('keep', 'utf8');

  for (const cat of categories) {
    const folder = String(cat.path || '').replace(/\/+$/g, '');
    if (!folder) continue;

    try {
      const { data: files, error: listError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list(folder, { limit: 1000, sortBy: { column: 'name', order: 'asc' } });
      if (listError) continue;

      const already = Array.isArray(files) && files.some((f) => f && f.name === objectName);
      if (already) continue;

      await supabase.storage.from(SUPABASE_BUCKET).upload(`${folder}/${objectName}`, payload, {
        contentType: 'text/plain',
        cacheControl: '3600',
        upsert: true,
      });
    } catch {
    }
  }
}

function toPublicErrorMessage(error) {
  const message = typeof error?.message === 'string' ? error.message : '';

  if (message.includes('[429 Too Many Requests]') || message.toLowerCase().includes('quota')) {
    return 'Gemini API quota exceeded for this key/project. Check your Gemini API plan/billing and rate limits.';
  }

  if (message.includes('[401 Unauthorized]') || message.toLowerCase().includes('api key')) {
    return 'Gemini API request was unauthorized. Verify your `GEMINI_API_KEY` is valid and enabled.';
  }

  if (message.includes('[403 Forbidden]')) {
    return 'Gemini API request was forbidden. Check API access, project settings, and billing.';
  }

  if (message.includes('[404 Not Found]') && message.includes('models/')) {
    return 'Configured Gemini model is not available for this API key/project.';
  }

  return error?.message || 'Unexpected AI service error';
}

// Helper function to generate responses using Gemini
async function generateResponse(prompt) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not set. Add it to your .env file.');
  }
  const fallbackModels = [
    'gemini-2.0-flash-001',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-pro'
  ];
  const modelsToTry = Array.from(new Set([geminiModelName, ...fallbackModels].filter(Boolean)));

  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);

      const response = result.response;
      const text = response.text();

      if (!text || text.trim() === '') {
        throw new Error('Empty or invalid response from Gemini API');
      }

      return text;
    } catch (error) {
      lastError = error;
      const message = typeof error?.message === 'string' ? error.message : '';
      const isModelNotFound =
        message.includes('[404 Not Found]') ||
        message.includes('is not found for API version') ||
        message.includes('not supported for generateContent');

      if (isModelNotFound) {
        continue;
      }

      console.error('Error generating response:', error);
      throw error;
    }
  }

  console.error('Error generating response:', lastError);
  throw lastError || new Error('No compatible Gemini model found');
}

function normalizeChatModel(model) {
  const raw = String(model || '').trim();
  if (!raw) return 'Qwen/Qwen2.5-Coder-7B-Instruct';

  const lower = raw.toLowerCase();
  const aliases = {
    'mistral-7b-instruct': 'Qwen/Qwen2.5-Coder-7B-Instruct',
    'mistralai/mistral-7b-instruct-v0.3': 'Qwen/Qwen2.5-Coder-7B-Instruct',
    'deepseek-r1-fastest': 'deepseek-ai/DeepSeek-R1:fastest',
  };

  return aliases[lower] || raw;
}

function tailText(text, maxChars) {
  const s = String(text || '');
  if (s.length <= maxChars) return s;
  return s.slice(s.length - maxChars);
}

async function hfChatCompletion(messages, { max_tokens = 700, temperature = 0.7, top_p = 0.9, timeout = 30000 } = {}) {
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  if (!hfApiKey) {
    const err = new Error('HUGGINGFACE_API_KEY is not set. Add it to your .env file.');
    err.status = 500;
    throw err;
  }

  const model = normalizeChatModel(process.env.HUGGINGFACE_MODEL);
  const response = await axios.post(
    'https://router.huggingface.co/v1/chat/completions',
    {
      model,
      messages,
      max_tokens,
      temperature,
      top_p,
    },
    {
      headers: {
        Authorization: `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      timeout,
      validateStatus: () => true,
    }
  );

  if (!(response.status >= 200 && response.status < 300)) {
    const data = response.data;
    const upstreamMessage =
      (typeof data === 'object' && data?.error && typeof data.error.message === 'string' && data.error.message.trim()) ||
      (typeof data === 'object' && typeof data?.message === 'string' && data.message.trim()) ||
      (typeof data === 'string' && data.trim()) ||
      'Hugging Face request failed';

    const err = new Error(upstreamMessage);
    err.status = response.status === 429 ? 429 : 502;
    throw err;
  }

  const data = response.data;
  const content = typeof data === 'object' ? data?.choices?.[0]?.message?.content : null;
  const text = typeof content === 'string' ? content.trim() : '';
  const finishReason = typeof data === 'object' ? (data?.choices?.[0]?.finish_reason || data?.choices?.[0]?.finishReason || null) : null;
  if (!text) {
    const err = new Error('Empty response from Hugging Face.');
    err.status = 502;
    throw err;
  }

  return { text, finishReason };
}

async function generateResponseWithHuggingFace(prompt, opts = {}) {
  const { text } = await hfChatCompletion(
    [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: String(prompt || '') },
    ],
    opts
  );
  return text;
}

async function generateRoadmapWithHuggingFace(prompt) {
  const endMarker = '<END_ROADMAP>';
  const baseUserPrompt = `${String(prompt || '').trim()}\n\nEnd the roadmap with ${endMarker} on its own line. Do not omit any section.`;
  const baseMessages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: baseUserPrompt },
  ];

  let combined = '';
  for (let i = 0; i < 4; i++) {
    const messages =
      i === 0
        ? baseMessages
        : [
            ...baseMessages,
            { role: 'assistant', content: tailText(combined, 6000) },
            { role: 'user', content: `Continue exactly where you stopped. Do not repeat. End with ${endMarker} on its own line.` },
          ];

    const { text, finishReason } = await hfChatCompletion(messages, {
      max_tokens: 1400,
      temperature: 0.4,
      top_p: 0.9,
      timeout: 60000,
    });

    combined = (combined ? `${combined}\n${text}` : text).trim();

    const markerIndex = combined.indexOf(endMarker);
    if (markerIndex !== -1) {
      return combined.slice(0, markerIndex).trim();
    }

    if (finishReason && String(finishReason).toLowerCase() !== 'length') {
      return combined.trim();
    }

    if (combined.length > 20000) {
      return combined.trim();
    }
  }

  return combined.trim();
}

// List Supabase Storage materials grouped by category
app.get('/api/materials', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase is not configured on the server' });
    }

    const categories = getMaterialsCategories();

    const result = {};
    for (const cat of categories) {
      const { data: files, error } = await supabase.storage.from(SUPABASE_BUCKET).list(cat.path, {
        limit: 1000,
        sortBy: { column: 'name', order: 'asc' },
      });
      if (error) {
        result[cat.key] = { error: error.message, items: [] };
        continue;
      }
      const items = (files || [])
        .filter((f) => f.name && f.name.toLowerCase().endsWith('.pdf'))
        .map((f) => {
          const objectPath = `${cat.path}/${f.name}`;
          const { data: pub } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
          return {
            title: f.name.replace(/\.pdf$/i, ''),
            fileName: f.name,
            path: objectPath,
            url: pub?.publicUrl || null,
            size: f.metadata?.size || null,
            created_at: f.created_at || null,
            updated_at: f.updated_at || null,
            category: cat.key,
          };
        });
      result[cat.key] = { items };
    }

    res.json({ bucket: SUPABASE_BUCKET, categories: result });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to list materials' });
  }
});

// Upload material (PDF) via server using service role
app.post('/api/materials/upload', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase is not configured on the server' });
    }

    const { fileName, category, base64 } = req.body || {};
    const categoryKey = String(category || '').trim().toLowerCase();
    if (!fileName || !base64 || !categoryKey) {
      return res.status(400).json({ error: 'fileName, category and base64 are required' });
    }

    const categories = getMaterialsCategories();
    const matched = categories.find((c) => c.key === categoryKey);
    if (!matched) {
      return res.status(400).json({
        error: `Invalid category "${categoryKey}"`,
        validCategories: categories.map((c) => c.key),
      });
    }
    const folder = matched.path;

    const safeName = String(fileName)
      .replace(/[^a-zA-Z0-9._\-\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const objectPath = `${folder}/${safeName}`;

    // Convert base64 to Buffer
    const commaIdx = base64.indexOf(',');
    const rawBase64 = commaIdx >= 0 ? base64.slice(commaIdx + 1) : base64;
    const buffer = Buffer.from(rawBase64, 'base64');

    const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(objectPath, buffer, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: true,
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { data: pub } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
    return res.json({ path: objectPath, url: pub?.publicUrl || null, category: categoryKey });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Upload failed' });
  }
});

// ===== Todo APIs (use service role to bypass RLS) =====
app.get('/api/todos', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
    const user_id = req.query.user_id;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    const { data, error } = await supabase.from('todos').select('*').eq('user_id', user_id).order('created_at', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ todos: data || [] });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to load todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
    const { user_id, text, date } = req.body || {};
    if (!user_id || !text || !date) return res.status(400).json({ error: 'user_id, text and date are required' });
    const { data, error } = await supabase
      .from('todos')
      .insert([{ user_id, text, date, completed: false }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ todo: (data && data[0]) || null });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to add todo' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
    const id = req.params.id;
    const { completed, text, date } = req.body || {};
    const update = {};
    if (typeof completed === 'boolean') update.completed = completed;
    if (typeof text === 'string') update.text = text;
    if (typeof date === 'string') update.date = date;
    const { error } = await supabase.from('todos').update(update).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });
    const id = req.params.id;
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to delete todo' });
  }
});

// API endpoint for answering user questions
app.post('/api/answer', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
    const prompt = `As a helpful AI assistant for a website, answer the following user question thoroughly and accurately: ${question}`;
    const answer = genAI ? await generateResponse(prompt) : await generateResponseWithHuggingFace(prompt);
    
    res.json({ answer });
  } catch (error) {
    const status = typeof error?.status === 'number' ? error.status : 500;
    const message = status === 500 && genAI ? toPublicErrorMessage(error) : (error?.message || 'Failed to answer question');
    res.status(status).json({ error: message });
  }
});

// API endpoint for generating roadmaps
app.post('/api/roadmap', async (req, res) => {
  try {
    const { topic, level, timeframe } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    
    const userLevel = level || 'beginner';
    const userTimeframe = timeframe || '3 months';
    
    const prompt = `Generate a detailed learning roadmap for ${topic} for a ${userLevel} level learner with a timeframe of ${userTimeframe}. 
    The roadmap should include:
    1. Clear milestones and goals
    2. Recommended resources for each stage (books, courses, tutorials, etc.)
    3. Practical projects to work on
    4. Estimated time for each milestone
    5. Tips for effective learning
    
    Format the response as a structured roadmap with headers, bullet points, and clear progression.`;
    
    const roadmap = genAI ? await generateResponse(prompt) : await generateRoadmapWithHuggingFace(prompt);
    
    res.json({ roadmap });
  } catch (error) {
    const status = typeof error?.status === 'number' ? error.status : 500;
    const message = status === 500 && genAI ? toPublicErrorMessage(error) : (error?.message || 'Failed to generate roadmap');
    res.status(status).json({ error: message });
  }
});

function logStartup(portToUse) {
  console.log(`Server running on port ${portToUse}`);
  console.log('✅ PSAI Chatbot running on Hugging Face Inference API');
  console.log(`Model: ${normalizeChatModel(process.env.HUGGINGFACE_MODEL)}`);
  if (!geminiApiKey) {
    console.error('Missing GEMINI_API_KEY in .env; /api/answer and /api/roadmap will use Hugging Face fallback.');
  }
  if (!process.env.HUGGINGFACE_API_KEY) {
    console.error('Missing HUGGINGFACE_API_KEY in .env; /api/chatbot will fail.');
  }
  if (!supabase) {
    console.error('Missing Supabase env; /api/materials will fail. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.');
  }
}

function startServer(portToUse) {
  const server = app.listen(portToUse, () => logStartup(portToUse));
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && Number(portToUse) === 3000) {
      startServer(3001);
      return;
    }
    throw err;
  });
}

ensureMaterialsFolders();
startServer(port);
