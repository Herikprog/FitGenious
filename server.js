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
    console.log('Recebendo requisição para /api/genius');
    
    // Log headers para debug
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    const { message } = req.body;
    
    if (!message) {
        console.log('Erro: Mensagem não fornecida');
        return res.status(400).json({ 
            error: 'Mensagem obrigatória',
            text: 'Por favor, envie uma mensagem.'
        });
    }

    // Verificar se a API key está configurada
    if (!process.env.GEMINI_API_KEY) {
        console.error('Erro: GEMINI_API_KEY não configurada');
        return res.status(500).json({ 
            error: 'Configuração do servidor incompleta',
            text: 'API key não configurada no servidor. Por favor, verifique as configurações.'
        });
    }

    try {
        console.log('Processando mensagem com Gemini:', message.substring(0, 50) + '...');
        
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: message
        });

        const responseText = response?.text || 'Desculpe, não consegui gerar uma resposta.';
        console.log('Resposta do Gemini gerada com sucesso');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Erro ao acessar a API Gemini:', err);
        
        // Mensagens de erro mais específicas
        let errorMessage = 'Erro ao processar sua solicitação.';
        
        if (err.message.includes('API key') || err.message.includes('authentication')) {
            errorMessage = 'Erro de autenticação com a API. Verifique a configuração da API key.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
            errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        } else if (err.message.includes('quota') || err.message.includes('limit')) {
            errorMessage = 'Limite de uso da API atingido. Tente novamente mais tarde.';
        }

        res.status(500).json({ 
            error: err.message,
            text: errorMessage
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

