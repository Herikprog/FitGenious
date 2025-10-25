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
            text: 'API key não configurada no Vercel. Configure GEMINI_API_KEY nas variáveis de ambiente.'
        });
    }

    try {
        console.log('Processando mensagem com Gemini...');
        
        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY 
        });

        const systemPrompt = `Você é o FitGenious Assistant, consultor especialista em marketing digital e crescimento para coaches de fitness online. A FitGenious é um serviço premium que ajuda coaches a escalar seus negócios, atraindo de 3 a 5 clientes de alto valor por semana por meio de conteúdo estratégico. Oferecemos estratégias de conteúdo, edição profissional de vídeos e gestão de redes sociais, com resultados comprovados e garantia de satisfação. Com base na pergunta do cliente: "${message}", forneça uma resposta profissional que não passe de 150 caracteres, prática e focada em estratégias de marketing digital comprovadas para ajudar o coach a crescer seu negócio.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: systemPrompt
        });

        const responseText = response?.text || 'Desculpe, não consegui gerar uma resposta.';
        
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


