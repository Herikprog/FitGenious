import express from 'express';
import cors from 'cors';
import FitGeniousAssistant from './fitgenious-assistant.js';

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));

// Inicializar o assistente
const assistant = new FitGeniousAssistant();

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        assistant: assistant.getAssistantInfo(),
        timestamp: new Date().toISOString()
    });
});

// Rota principal da API FitGenious Assistant
app.post('/api/genius', async (req, res) => {
    console.log('Recebendo requisição para /api/genius');

    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ 
            error: 'Mensagem obrigatória',
            text: 'Por favor, envie uma mensagem.'
        });
    }

    try {
        console.log('Processando mensagem com FitGenious Assistant...');
        
        const response = await assistant.generateResponse(message);
        console.log('Resposta do FitGenious Assistant gerada com sucesso');
        
        res.json({ 
            text: response,
            timestamp: new Date().toISOString(),
            analysis: assistant.testAnalysis(message) // Opcional: para debugging
        });

    } catch (err) {
        console.error('Erro ao processar a mensagem:', err);
        
        res.status(500).json({ 
            error: err.message,
            text: assistant.getFallbackResponse()
        });
    }
});

// Rota para diagnóstico do assistente
app.get('/api/assistant-info', (req, res) => {
    res.json(assistant.getAssistantInfo());
});

// Rota para testar análise de mensagem
app.post('/api/analyze', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Mensagem obrigatória' });
    }
    
    const analysis = assistant.testAnalysis(message);
    res.json({ analysis });
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
        console.log(`🚀 Servidor FitGenious rodando na porta ${PORT}`);
        console.log(`🤖 Assistente IA carregado:`, assistant.getAssistantInfo());
        console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
        console.log(`🎯 Assistant info: http://localhost:${PORT}/api/assistant-info`);
    });
}

// Export para Vercel (OBRIGATÓRIO)
export default app;
