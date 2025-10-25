import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Middlewares
app.use(cors({
    origin: ['https://fitgenious.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));

// Verificar se a API key está configurada
if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY não encontrada nas variáveis de ambiente');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Rota principal da API Gemini
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
            text: 'API key do Gemini não configurada no servidor. Por favor, configure a variável de ambiente GEMINI_API_KEY no Vercel.'
        });
    }

    try {
        console.log('Processando mensagem com Gemini:', message.substring(0, 50) + '...');
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash-exp",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        });

        const prompt = `Você é o FitGenious Assistant, consultor especializado em marketing digital e crescimento para coaches de fitness online.

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

DIRETRIZES DE RESPOSTA:
Mantenha respostas entre 2-3 parágrafos
Seja direto, prático e acionável
Use linguagem corporativa profissional
Foque em estratégias e resultados mensuráveis

PERGUNTA DO CLIENTE: "${message}"

Forneça uma resposta profissional com no máximo 150 caracteres focada em ajudar o coach a crescer seu negócio através de estratégias de marketing digital comprovadas.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        console.log('Resposta do Gemini gerada com sucesso');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Erro ao acessar a API Gemini:', err);
        
        let errorMessage = 'Erro ao processar sua solicitação. Tente novamente.';
        
        if (err.message.includes('API key') || err.message.includes('authentication')) {
            errorMessage = 'Erro de autenticação com a API Gemini. Verifique a configuração da API key.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
            errorMessage = 'Erro de conexão com o serviço Gemini. Verifique sua internet e tente novamente.';
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
        
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️ GEMINI_API_KEY não encontrada nas variáveis de ambiente');
            console.warn('💡 Configure no Vercel: Settings -> Environment Variables');
        } else {
            console.log('✅ GEMINI_API_KEY configurada');
        }
    });
}

// Export para Vercel
export default app;
