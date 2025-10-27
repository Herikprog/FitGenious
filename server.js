import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

app.use(cors());
app.use(express.json());
// A linha 'app.use(express.static('.'))' foi REMOVIDA para otimizar o deploy na Vercel

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// API Gemini
app.post('/api/genius', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ text: 'Por favor, envie uma mensagem.' });
        }

        // Se não tiver API key, retorna resposta simulada
        if (!process.env.GEMINI_API_KEY) {
            return res.json({ 
                text: "Olá! Sou o assistente do FitGenious. Para respostas completas, configure a API key do Gemini.",
                simulated: true
            });
        }

        // Gemini real
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            // CORREÇÃO: Usando '-latest' para evitar erro 404 do modelo
            model: "gemini-1.5-flash-latest",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        const prompt = `Você é o FitGenious Assistant, especialista em marketing digital para coaches de fitness.

Responda de forma profissional sobre:
- Estratégias de conteúdo
- Atração de clientes  
- Marketing digital
- Gestão de redes sociais

Pergunta: "${message}"

Resposta (2-3 parágrafos):`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ 
            text: response.text(),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro Gemini:', error);
        res.json({ 
            text: "Serviço temporariamente indisponível. Entre em contato conosco diretamente.",
            error: true
        });
    }
});

// Iniciar o servidor (apenas para desenvolvimento local)
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local rodando em http://localhost:${PORT}`);
    });
}

export default app;
