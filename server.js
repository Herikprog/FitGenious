import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Health check melhorado
app.get('/api/health', (req, res) => {
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        geminiConfigured: hasApiKey,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rota da API Gemini simplificada e robusta
app.post('/api/genius', async (req, res) => {
    console.log('📨 Recebendo requisição para /api/genius');
    
    try {
        const { message } = req.body;
        
        // Validação básica
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ 
                error: 'Mensagem inválida',
                text: 'Por favor, envie uma mensagem válida.'
            });
        }

        console.log('💬 Mensagem recebida:', message.substring(0, 100));

        // Verificar API Key
        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY não configurada');
            return res.status(500).json({ 
                error: 'API não configurada',
                text: 'Serviço temporariamente indisponível. Tente novamente mais tarde.'
            });
        }

        // Inicializar Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        const prompt = `Você é o FitGenious Assistant, especialista em marketing digital para coaches de fitness.

Responda de forma profissional e direta sobre:
- Estratégias de conteúdo para fitness
- Atração de clientes
- Marketing digital
- Gestão de redes sociais

Mantenha a resposta em 150 caracteres.

Pergunta: "${message}"

Resposta:`;

        console.log('🔄 Processando com Gemini...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        console.log('✅ Resposta gerada com sucesso');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro no /api/genius:', error);
        
        // Tratamento de erros específicos
        let userMessage = 'Erro ao processar sua mensagem. Tente novamente.';
        
        if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('401')) {
            userMessage = 'Erro de autenticação com o serviço de IA.';
        } else if (error.message?.includes('QUOTA') || error.message?.includes('429')) {
            userMessage = 'Limite de uso atingido. Tente novamente mais tarde.';
        } else if (error.message?.includes('NETWORK') || error.message?.includes('fetch')) {
            userMessage = 'Erro de conexão. Verifique sua internet.';
        }

        res.status(500).json({ 
            error: error.message,
            text: userMessage
        });
    }
});

// Rota de fallback para SPA
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

// Porta
const PORT = process.env.PORT || 3000;

// Iniciar apenas em desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`🔧 Health: http://localhost:${PORT}/api/health`);
        
        if (!process.env.GEMINI_API_KEY) {
            console.warn('⚠️  GEMINI_API_KEY não configurada');
        } else {
            console.log('✅ GEMINI_API_KEY configurada');
        }
    });
}

export default app;
