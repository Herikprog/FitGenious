import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Debug da environment variable
console.log('=== SERVER STARTED ===');
console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
console.log('GEMINI_API_KEY length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 'undefined');
console.log('NODE_ENV:', process.env.NODE_ENV);

app.post('/api/genius', async (req, res) => {
    console.log('=== /api/genius REQUEST ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    const { message } = req.body;
    
    if (!message) {
        console.log('ERROR: No message provided');
        return res.status(400).json({ error: 'Mensagem obrigatória' });
    }

    // Verificar API key
    if (!process.env.GEMINI_API_KEY) {
        console.log('ERROR: GEMINI_API_KEY not configured');
        return res.status(500).json({ 
            error: 'API key não configurada',
            details: 'Configure GEMINI_API_KEY no Vercel'
        });
    }

    try {
        console.log('Initializing GoogleGenAI...');
        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY 
        });

        console.log('Sending request to Gemini...');
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: message
        });

        console.log('Gemini response received');
        res.json({ 
            text: response?.text || 'Desculpe, não consegui gerar resposta.' 
        });

    } catch (err) {
        console.error('ERROR in /api/genius:', err);
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        
        res.status(500).json({ 
            error: err.message,
            text: 'Erro interno do servidor. Verifique os logs.'
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

export default app;
