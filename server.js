import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));

// Verificar se a API key está configurada
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Rota principal da API Gemini
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

// Rota para servir o arquivo principal
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

// Rota fallback para qualquer outra requisição API
app.all('/api/*', (req, res) => {
    res.status(404).json({ 
        error: 'Rota não encontrada',
        message: `A rota ${req.path} não existe.`
    });
});

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error('Erro global:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        text: 'Ocorreu um erro inesperado. Tente novamente.'
    });
});

// Configuração da porta para Vercel
const PORT = process.env.PORT || 3000;

// Iniciar servidor apenas se não estiver no Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📧 API Gemini disponível em: http://localhost:${PORT}/api/genius`);
        console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
        
        // Verificar se a API key está configurada
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️  GEMINI_API_KEY não encontrada nas variáveis de ambiente');
            console.warn('💡 Configure no Vercel: Settings -> Environment Variables');
        } else {
            console.log('✅ GEMINI_API_KEY configurada');
        }
    });
}

// Export para Vercel (OBRIGATÓRIO)
export default app;