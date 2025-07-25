console.log('API Key:', process.env.GEMINI_API_KEY);
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to generate responses using Gemini
async function generateResponse(prompt) {
  try {
    console.log('Sending prompt to Gemini:', prompt);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    const result = await model.generateContent(prompt);
    
    console.log('Raw Gemini Result:', JSON.stringify(result, null, 2)); // Log full result

    const response = result.response;
    const text = response.text();

    if (!text || text.trim() === '') {
      throw new Error('Empty or invalid response from Gemini API');
    }

    console.log('Final AI Response:', text);
    return text;
  } catch (error) {
    console.error('Error generating response:', error.message);
    return 'Sorry, I encountered an error processing your request. Please try again.';
  }
}

// API endpoint for answering user questions
app.post('/api/answer', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    
    const prompt = `As a helpful AI assistant for a website, answer the following user question thoroughly and accurately: ${question}`;
    const answer = await generateResponse(prompt);
    
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    
    const roadmap = await generateResponse(prompt);
    
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a diagnostic endpoint to list available models
app.get('/api/models', async (req, res) => {
  try {
    // This endpoint is useful for troubleshooting which models are available
    const models = await genAI.listModels();
    res.json({ models });
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});