import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import serverless from 'serverless-http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // opcional, se tiver site estático

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// ===== GEMINI API =====
app.post('/api/genius', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ text: 'Por favor, envie uma mensagem.' });
    }

    // Resposta simulada se não houver chave
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        text: 'Olá! Sou o assistente do FitGenious. Para respostas completas, configure a API key do Gemini.',
        simulated: true,
      });
    }

    // Gemini real
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    });

    const prompt = `Você é o FitGenious Assistant, especialista em marketing digital para coaches de fitness.

Responda de forma profissional sobre:
- Estratégias de conteúdo
- Atração de clientes
- Marketing digital
- Gestão de redes sociais

Pergunta: "${message}"

Resposta (150-200 caracteres):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      text: response.text(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro Gemini:', error);
    res.status(500).json({
      text: 'Serviço temporariamente indisponível. Entre em contato conosco diretamente.',
      error: true,
    });
  }
});

// ===== EXPORT PARA VERCEL =====
export const handler = serverless(app);
export default app;
