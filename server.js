// server.js - COMMONJS VERSION
const express = require('express');
const cors = require('cors');

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
            text: 'API key não configurada no servidor.'
        });
    }

    try {
        console.log('Processando mensagem com Gemini:', message.substring(0, 50) + '...');
        
        // Import dinâmico do Google GenAI
        const { GoogleGenAI } = await import('@google/genai');
        
        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY 
        });

        const systemPrompt = `Você é o FitGenious Assistant, consultor especializado em marketing digital e crescimento para coaches de fitness online.

SOBRE A FITGENIOUS:
Serviço premium para coaches de fitness que desejam escalar seus negócios
Foco em atrair 3-5 clientes de alto valor por semana através de conteúdo estratégico
Oferecemos: estratégia de conteúdo, edição profissional de vídeos, gestão de redes sociais
Resultados comprovados com garantia de satisfação

SUA IDENTIDADE:
Especialista em marketing digital para fitness
Consultor profissional e direto ao ponto
Linguagem corporativa e motivacional
Focado exclusivamente em negócios de fitness online

PERGUNTA DO CLIENTE: "${message}"

Forneça uma resposta profissional focada em ajudar o coach a crescer seu negócio através de estratégias de marketing digital comprovadas.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: systemPrompt
        });

        const responseText = response?.text || 'Desculpe, não consegui gerar uma resposta.';
        console.log('Resposta do Gemini gerada com sucesso');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Erro ao acessar a API Gemini:', err);
        res.status(500).json({ 
            error: err.message,
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

module.exports = app;
