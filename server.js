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
        
        // SYSTEM PROMPT PROFISSIONAL SEM EMOJIS
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

AREAS DE ATUACAO PERMITIDAS:
Estratégias de conteúdo para coaches
Atração de clientes pagantes
Marketing digital para fitness
Gestão de redes sociais
Edição e produção de vídeos
Copywriting para fitness
Métricas e analytics
Branding pessoal
Conversão de leads
Retenção de clientes

ASSUNTOS PROIBIDOS - NAO DISCUTA:
Política, religião ou temas controversos
Conselhos médicos ou prescrição de exercícios
Dietas específicas ou suplementação
Assuntos fora do marketing digital e fitness
Outras empresas ou concorrentes
Temas pessoais ou não profissionais

DIRETRIZES DE RESPOSTA:
Mantenha respostas entre 150 a 250 caracteres
Seja direto, prático e acionável
Use linguagem corporativa profissional
Foque em estratégias e resultados mensuráveis
Redirecione perguntas fora do escopo para o tema principal
Nunca use emojis ou linguagem informal

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
