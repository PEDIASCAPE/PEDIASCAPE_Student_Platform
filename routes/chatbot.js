const express = require('express');
const axios = require('axios');

const router = express.Router();

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
let HF_MODEL = process.env.HUGGINGFACE_MODEL || 'mistral-7b-instruct';
const HF_CHAT_API_URL = 'https://router.huggingface.co/v1/chat/completions';
function normalizeModelName(model) {
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

router.post('/chat', async (req, res) => {
  try {
    if (!HF_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'HUGGINGFACE_API_KEY is not set on the server.',
      });
    }

    const { message, conversationHistory } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }

    const systemPrompt = `You are PSAI, an intelligent AI assistant for PEDIASCAPE education platform.
You help students with:
- Academic doubts and explanations
- Career guidance and roadmap suggestions
- Study material recommendations
- Project ideas and implementations
- Interview preparation
Be helpful, clear, and educational. Keep responses concise but informative.`;

    const messages = [{ role: 'system', content: systemPrompt }];

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      conversationHistory.slice(-8).forEach((msg) => {
        const role = msg.role === 'user' ? 'user' : msg.role === 'assistant' ? 'assistant' : null;
        const content = typeof msg.content === 'string' ? msg.content : '';
        if (role && content.trim()) messages.push({ role, content });
      });
    }

    messages.push({ role: 'user', content: message });

    const chosenModel = normalizeModelName(HF_MODEL);
    const chatResponse = await axios.post(
      HF_CHAT_API_URL,
      {
        model: chosenModel,
        messages,
        max_tokens: 256,
        temperature: 0.7,
        top_p: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
        validateStatus: () => true,
      }
    );

    if (!(chatResponse.status >= 200 && chatResponse.status < 300)) {
      const data = chatResponse.data;
      const upstreamMessage =
        (typeof data === 'object' && data?.error && typeof data.error.message === 'string' && data.error.message.trim()) ||
        (typeof data === 'object' && typeof data?.message === 'string' && data.message.trim()) ||
        (typeof data === 'string' && data.trim()) ||
        'Chat completion request failed';

      if (chatResponse.status === 401 || chatResponse.status === 403) {
        return res.status(502).json({
          success: false,
          error: 'Hugging Face request was unauthorized. Verify the API key permissions.',
        });
      }

      if (chatResponse.status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Hugging Face rate limit exceeded. Please try again later.',
        });
      }

      if (chatResponse.status === 503) {
        return res.status(503).json({
          success: false,
          error: 'AI model is temporarily unavailable. Please try again soon.',
        });
      }

      return res.status(502).json({
        success: false,
        error: upstreamMessage,
      });
    }

    const data = chatResponse.data;
    const aiResponse = typeof data === 'object' ? data?.choices?.[0]?.message?.content : null;
    if (!aiResponse || String(aiResponse).trim() === '') {
      return res.status(502).json({
        success: false,
        error: 'AI response was empty. Please try again.',
      });
    }

    res.json({
      success: true,
      message: String(aiResponse || '').trim(),
      model: chosenModel,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot error:', error.message);
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        success: false,
        error: 'AI model is loading. Please try again in a few seconds.',
      });
    }
    if (error.response?.status === 503) {
      return res.status(503).json({
        success: false,
        error: 'AI model is temporarily unavailable. Please try again soon.',
      });
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process message',
    });
  }
});

router.get('/models', (req, res) => {
  res.json({
    current: normalizeModelName(HF_MODEL),
    available: [
      'Qwen/Qwen2.5-Coder-7B-Instruct',
      'deepseek-ai/DeepSeek-R1:fastest',
      'openai/gpt-oss-120b',
    ],
    note: 'These are OpenAI-compatible chat models via Hugging Face router',
  });
});

router.get('/ping', (req, res) => {
  res.json({ ok: true, model: normalizeModelName(HF_MODEL) });
});

module.exports = router;
