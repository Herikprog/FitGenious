import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

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
    console.log('📨 Recebendo requisição para /api/genius');

    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ 
                error: 'Mensagem obrigatória',
                text: 'Por favor, envie uma mensagem.'
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY não configurada');
            return res.status(500).json({ 
                error: 'Configuração incompleta',
                text: 'Serviço em configuração. Tente novamente em alguns minutos.'
            });
        }

        console.log('💬 Processando mensagem:', message.substring(0, 50));
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500,
            }
        });

        const prompt = `Você é o FitGenious Assistant, consultor especializado em marketing digital e crescimento para coaches de fitness online.

SOBRE A FITGENIOUS:
- Serviço premium para coaches de fitness
- Foco em atrair 3-5 clientes de alto valor por semana
- Estratégia de conteúdo, edição de vídeos, gestão de redes sociais
- Resultados comprovados com garantia

SUA IDENTIDADE:
- Especialista em marketing digital para fitness
- Consultor profissional e direto
- Linguagem corporativa
- Focado exclusivamente em fitness online

PERGUNTA: "${message}"

Responda de forma profissional, prática e acionável em 150 caracteres`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        console.log('✅ Resposta gerada com sucesso');
        
        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro no Gemini:', error);
        
        let userMessage = 'Erro ao processar sua mensagem. Tente novamente.';
        
        if (error.message?.includes('API_KEY') || error.message?.includes('401')) {
            userMessage = 'Erro de autenticação. Verifique a configuração da API.';
        } else if (error.message?.includes('QUOTA') || error.message?.includes('429')) {
            userMessage = 'Limite de uso atingido. Tente novamente mais tarde.';
        } else if (error.message?.includes('NETWORK')) {
            userMessage = 'Erro de conexão. Tente novamente.';
        }

        res.status(500).json({ 
            error: error.message,
            text: userMessage
        });
    }
});

// Rota fallback para SPA
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local na porta ${PORT}`);
    });
}

export default app;
