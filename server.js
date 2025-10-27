import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('.'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
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
        console.log('Processando mensagem com FitGenious Assistant:', message.substring(0, 50) + '...');
        
        const response = await generateDynamicResponse(message);
        console.log('Resposta do FitGenious Assistant gerada com sucesso');
        
        res.json({ 
            text: response,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Erro ao processar a mensagem:', err);
        
        res.status(500).json({ 
            error: err.message,
            text: 'Desculpe, ocorreu um erro interno. Tente novamente.'
        });
    }
});

// ========================
// SISTEMA DE GERAÇÃO DINÂMICA
// ========================

// Base de conhecimento modular
const knowledgeBase = {
    services: {
        core: ["gestão completa de conteúdo", "estratégia personalizada", "edição profissional de vídeos"],
        details: ["30+ vídeos editados mensalmente", "gestão de redes sociais", "consultoria semanal"],
        outcomes: ["atrair 3-5 clientes premium por semana", "aumentar engajamento", "crescer autoridade digital"]
    },
    
    methodology: {
        steps: ["diagnóstico do seu nicho", "criação de conteúdo estratégico", "distribuição multiplataforma", "otimização contínua"],
        frequency: ["trabalhamos semanalmente", "ajustes em tempo real", "acompanhamento próximo"]
    },
    
    results: {
        metrics: ["3-5 clientes premium por semana", "300% mais engajamento", "ROI de 5-10x"],
        guarantee: "garantia de 3 clientes no primeiro mês ou devolvemos seu investimento"
    },
    
    pricing: {
        model: ["vagas limitadas", "investimento personalizado", "baseado em resultados"],
        value: ["ROI comprovado", "retorno em 3 meses", "acessível para coaches"]
    },
    
    differentials: {
        unique: ["especialização em fitness", "tecnologia proprietária", "parceria estratégica"],
        expertise: ["entendemos coaches", "linguagem específica", "cases comprovados"]
    }
};

// Templates de resposta dinâmicos
const responseTemplates = {
    greeting: (name) => `Olá${name ? ' ' + name : ''}! Sou o Assistente FitGenious, especialista em marketing digital para coaches de fitness. Em que posso ajudá-lo hoje?`,

    services: (focus) => {
        const service = knowledgeBase.services;
        return `Oferecemos ${randomChoice(service.core)} para coaches de fitness. Incluímos ${randomChoice(service.details)} com foco em ${randomChoice(service.outcomes)}.${focus ? ` Vi que mencionou ${focus} - podemos adaptar especialmente para isso!` : ''}`;
    },

    methodology: () => {
        const method = knowledgeBase.methodology;
        return `Nossa abordagem: ${randomChoice(method.steps)} + ${randomChoice(method.steps)}. ${randomChoice(method.frequency)} para garantir resultados consistentes.`;
    },

    results: (context) => {
        const result = knowledgeBase.results;
        return `Nossos coaches typically conseguem ${randomChoice(result.metrics)}. ${result.guarantee}.${context ? ` Para ${context}, os resultados são ainda mais expressivos.` : ''}`;
    },

    pricing: (budgetHint) => {
        const price = knowledgeBase.pricing;
        const base = `Trabalhamos com ${randomChoice(price.model)} e ${randomChoice(price.model)}. ${randomChoice(price.value)}.`;
        
        if (budgetHint) {
            return base + ` Mesmo com ${budgetHint}, o retorno é garantido pela nossa metodologia.`;
        }
        return base + ' Agende uma call para valores específicos.';
    },

    differentials: (comparison) => {
        const diff = knowledgeBase.differentials;
        return `Nosso diferencial: ${randomChoice(diff.unique)} + ${randomChoice(diff.unique)}. ${randomChoice(diff.expertise)}.${comparison ? ` Ao contrário de ${comparison}, nós focamos exclusivamente em fitness.` : ''}`;
    },

    urgency: () => {
        const urgencyPhrases = [
            "Temos apenas 5 vagas mensais para garantir qualidade",
            "As vagas deste mês estão se esgotando",
            "Últimas oportunidades para ingressar este ciclo"
        ];
        return randomChoice(urgencyPhrases) + ". Recomendo agendar uma call para verificar disponibilidade.";
    },

    cta: (preference) => {
        const ctas = {
            call: "📅 Calendly: https://calendly.com/fitgeniouscontent/30min",
            whatsapp: "📱 WhatsApp: +351963828378",
            both: "📅 Calendly: https://calendly.com/fitgeniouscontent/30min\n📱 WhatsApp: +351963828378"
        };
        
        return `Perfeito! Para ${preference || 'uma call estratégica gratuita'}:\n\n${ctas[preference] || ctas.both}\n\nAnalisaremos seu negócio sem compromisso!`;
    }
};

// Sistema inteligente de análise de mensagem
function analyzeMessage(message) {
    const analysis = {
        intent: 'general',
        context: '',
        urgency: false,
        budgetMention: false,
        comparison: '',
        name: extractName(message)
    };

    const msg = message.toLowerCase();

    // Detecção de intenção
    if (contains(msg, ['oi', 'olá', 'ola', 'hey', 'hi', 'hello'])) analysis.intent = 'greeting';
    if (contains(msg, ['serviço', 'oferta', 'fazem', 'proposta', 'trabalham'])) analysis.intent = 'services';
    if (contains(msg, ['como funciona', 'metodologia', 'processo', 'abordagem'])) analysis.intent = 'methodology';
    if (contains(msg, ['resultado', 'garantia', 'funciona', 'prova'])) analysis.intent = 'results';
    if (contains(msg, ['preço', 'valor', 'investimento', 'custo', 'quanto'])) analysis.intent = 'pricing';
    if (contains(msg, ['diferente', 'diferencial', 'único', 'vantagem'])) analysis.intent = 'differentials';
    if (contains(msg, ['agendar', 'call', 'reunião', 'conversa', 'whatsapp'])) analysis.intent = 'cta';
    if (contains(msg, ['vagas', 'disponibilidade', 'espera', 'lista'])) analysis.intent = 'urgency';

    // Detecção de contexto
    if (contains(msg, ['personal trainer', 'personal'])) analysis.context = 'personal trainers';
    if (contains(msg, ['online', 'digital', 'remoto'])) analysis.context = 'coaches online';
    if (contains(msg, ['iniciante', 'começando', 'novo'])) analysis.context = 'iniciantes';
    if (contains(msg, ['experiente', 'já tenho', 'atualmente'])) analysis.context = 'coaches experientes';

    // Detecção de urgência
    if (contains(msg, ['urgente', 'rápido', 'logo', 'imediatamente', 'agora'])) analysis.urgency = true;

    // Detecção de orçamento
    if (contains(msg, ['caro', 'barato', 'econômico', 'investir', 'dinheiro'])) analysis.budgetMention = true;

    // Detecção de comparação
    if (contains(msg, ['outro', 'concorrente', 'concorrência', 'outra empresa'])) analysis.comparison = 'outras soluções';

    return analysis;
}

// Geração dinâmica de resposta
async function generateDynamicResponse(userMessage) {
    const analysis = analyzeMessage(userMessage);
    const msg = userMessage.toLowerCase();

    console.log('Análise da mensagem:', analysis);

    // Respostas baseadas na intenção detectada
    switch (analysis.intent) {
        case 'greeting':
            return responseTemplates.greeting(analysis.name);

        case 'services':
            return responseTemplates.services(analysis.context);

        case 'methodology':
            return responseTemplates.methodology();

        case 'results':
            return responseTemplates.results(analysis.context);

        case 'pricing':
            return responseTemplates.pricing(analysis.budgetMention ? 'orçamento limitado' : '');

        case 'differentials':
            return responseTemplates.differentials(analysis.comparison);

        case 'urgency':
            return responseTemplates.urgency();

        case 'cta':
            const preference = contains(msg, ['whatsapp', 'zap']) ? 'whatsapp' : 
                             contains(msg, ['call', 'chamada', 'vídeo']) ? 'call' : null;
            return responseTemplates.cta(preference);

        default:
            // Resposta inteligente para mensagens não categorizadas
            return generateSmartResponse(userMessage, analysis);
    }
}

// Resposta inteligente para mensagens diversas
function generateSmartResponse(message, analysis) {
    const phrases = [
        `Interessante sua pergunta sobre "${message.substring(0, 30)}..."! Como especialista FitGenious, posso ajudar com nossos serviços, metodologia ou resultados. O que mais gostaria de saber?`,
        
        `Entendo sua curiosidade sobre "${message.substring(0, 25)}". Posso esclarecer como nossa abordagem específica para fitness pode ajudar seu negócio. Tem alguma dúvida em particular?`,
        
        `Boa pergunta! Baseado em nossos cases com coaches, posso explicar como aplicamos isso na prática. Quer saber mais sobre nossos serviços ou resultados?`,
        
        `Excelente ponto! Nossa experiência com coaches mostra que isso é crucial. Posso detalhar como trabalhamos isso em nossa metodologia.`
    ];

    let response = randomChoice(phrases);

    // Adiciona urgência se detectada
    if (analysis.urgency) {
        response += "\n\n" + responseTemplates.urgency();
    }

    // Adiciona CTA se relevante
    if (message.length > 15 && !contains(message.toLowerCase(), ['não', 'talvez', 'depois'])) {
        response += "\n\n" + responseTemplates.cta();
    }

    return response;
}

// ========================
// FUNÇÕES UTILITÁRIAS
// ========================
function contains(text, keywords) {
    return keywords.some(keyword => text.includes(keyword.toLowerCase()));
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function extractName(message) {
    // Simples extração de nome (poderia ser mais sofisticado)
    const namePatterns = [
        /me chamo (\w+)/i,
        /sou (\w+)/i,
        /aqui é (\w+)/i,
        /nome é (\w+)/i
    ];
    
    for (const pattern of namePatterns) {
        const match = message.match(pattern);
        if (match) return match[1];
    }
    
    return null;
}

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
        console.log(`🤖 Assistente IA dinâmico disponível em: http://localhost:${PORT}/api/genius`);
        console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
        console.log(`✅ Sistema de geração dinâmica ativo!`);
    });
}

// Export para Vercel (OBRIGATÓRIO)
export default app;
