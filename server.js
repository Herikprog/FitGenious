// server.js - ES MODULES VERSION
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/genius', async (req, res) => {
    console.log('Recebendo requisição para /api/genius');

    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ 
            error: 'Mensagem obrigatória',
            text: 'Por favor, envie uma mensagem.'
        });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
            error: 'Configuração do servidor incompleta',
            text: 'API key não configurada no Vercel.'
        });
    }

    try {
        console.log('Processando mensagem com Gemini...');
        
        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY 
        });

        const systemPrompt = `Você é o FitGenious Assistant, consultor especializado em marketing digital para coaches de fitness.

SOBRE A FITGENIOUS:
Serviço premium para coaches de fitness
Foco em atrair 3-5 clientes por semana através de conteúdo estratégico
Estratégia de conteúdo, edição de vídeos, gestão de redes sociais

DIRETRIZES DE RESPOSTA:
- Seja direto e prático
- Linguagem profissional
- Foco em marketing digital para fitness
- RESPOSTA NÃO PODE PASSAR DE 150 CARACTERES
- Seja conciso e objetivo

PERGUNTA: "${message}"

Responda de forma extremamente concisa dentro do limite de 150 caracteres.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: systemPrompt
        });

        let responseText = response?.text || 'Desculpe, não consegui gerar uma resposta.';
        
        // Garantir que não passe de 150 caracteres
        if (responseText.length > 150) {
            responseText = responseText.substring(0, 147) + '...';
        }
        
        console.log('Resposta gerada:', responseText.length, 'caracteres');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Erro ao acessar a API Gemini:', err);
        res.status(500).json({ 
            text: 'Erro interno do servidor. Tente novamente.'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        gemini_configured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Rota de teste
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API está funcionando!',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default app;
