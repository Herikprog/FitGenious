// =============================================
// FITGENIOUS AI ASSISTANT - Expert System
// =============================================

class FitGeniousAssistant {
    constructor() {
        this.name = "FitGenious AI Assistant";
        this.version = "2.0";
        this.expertise = "Marketing Digital para Coaches de Fitness";
        this.init();
    }

    init() {
        console.log(`🧠 ${this.name} v${this.version} inicializado`);
        this.loadKnowledgeBase();
        this.loadResponseTemplates();
        this.loadPersonalityMatrix();
    }

    // ========================
    // BASE DE CONHECIMENTO COMPLETA
    // ========================
    loadKnowledgeBase() {
        this.knowledge = {
            // INFORMACOES DA EMPRESA
            company: {
                name: "FitGenious",
                founder: "Guilherme Ferreira",
                founded: "2024",
                mission: "Transformar coaches de fitness em criadores de conteúdo de alto desempenho",
                vision: "Ser a principal referência em marketing digital para o mercado fitness global",
                values: ["Excelência", "Resultados", "Inovação", "Parceria", "Transparência"]
            },

            // SERVICOS DETALHADOS
            services: {
                premium: {
                    name: "Serviço Premium Completo",
                    description: "Gestão 360° do marketing digital do coach",
                    includes: [
                        "Estratégia de conteúdo personalizada",
                        "Produção de 30-40 vídeos mensais",
                        "Edição profissional com motion graphics",
                        "Gestão de todas as redes sociais",
                        "Copywriting persuasivo",
                        "Otimização para algoritmos",
                        "Relatórios de performance semanais",
                        "Consultoria estratégica semanal",
                        "Suporte prioritário",
                        "Acesso à comunidade exclusiva"
                    ],
                    platforms: ["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter"],
                    results: "3-5 clientes premium por semana"
                },

                editing: {
                    name: "Pacote Edição Avançada",
                    description: "Foco em edição de vídeos de alta conversão",
                    includes: [
                        "Edição estilo 'Alpha Male'",
                        "Motion graphics personalizadas",
                        "Sound design profissional",
                        "Color grading cinematográfico",
                        "Legendas dinâmicas",
                        "Thumbnails clickáveis",
                        "Formatação multi-plataforma"
                    ],
                    turnaround: "12-24 horas"
                },

                strategy: {
                    name: "Consultoria Estratégica",
                    description: "Mentoria 1:1 para coaches experientes",
                    includes: [
                        "Análise de mercado completa",
                        "Posicionamento de marca",
                        "Estratégia de precificação",
                        "Funnel de vendas otimizado",
                        "Scripts de vendas",
                        "Gestão de objeções",
                        "Upselling estratégico"
                    ]
                }
            },

            // METODOLOGIA PROPRIETARIA
            methodology: {
                framework: "M.E.D.S. Framework™",
                phases: {
                    phase1: {
                        name: "Mapeamento",
                        duration: "3-5 dias",
                        activities: [
                            "Análise de perfil completo",
                            "Identificação de buyer personas",
                            "Pesquisa de concorrência",
                            "Definição de posicionamento único",
                            "Análise de mercado"
                        ]
                    },
                    phase2: {
                        name: "Estratégia",
                        duration: "2-3 dias",
                        activities: [
                            "Plano de conteúdo mensal",
                            "Cronograma de publicações",
                            "Estratégia de plataformas",
                            "Definição de tom e voz",
                            "Plano de engajamento"
                        ]
                    },
                    phase3: {
                        name: "Desenvolvimento",
                        duration: "Contínuo",
                        activities: [
                            "Produção de conteúdo",
                            "Edição profissional",
                            "Otimização técnica",
                            "Publicação estratégica",
                            "Gestão de comunidade"
                        ]
                    },
                    phase4: {
                        name: "Scalability",
                        duration: "Contínuo",
                        activities: [
                            "Análise de performance",
                            "Otimização de resultados",
                            "Escalabilidade de processos",
                            "Expansão de alcance",
                            "Automação inteligente"
                        ]
                    }
                }
            },

            // RESULTADOS COMPROVADOS
            results: {
                metrics: {
                    clientAcquisition: "3-5 clientes premium/semana",
                    engagement: "300-500% de aumento",
                    growth: "1.000-5.000 seguidores/mês",
                    roi: "5-10x em 3 meses",
                    satisfaction: "98% de taxa de satisfação"
                },
                caseStudies: [
                    {
                        coach: "Carlos Silva - Personal Trainer",
                        before: "2 clientes/mês, R$ 3.000/mês",
                        after: "15 clientes/mês, R$ 22.000/mês",
                        timeline: "45 dias"
                    },
                    {
                        coach: "Ana Santos - Coach Online",
                        before: "Instagram 2k, 0 clientes online",
                        after: "Instagram 18k, 12 clientes premium",
                        timeline: "60 dias"
                    },
                    {
                        coach: "Miguel Costa - Especialista em Emagrecimento",
                        before: "Dependência de indicações",
                        after: "Funnel automatizado, 8 vendas/semana",
                        timeline: "30 dias"
                    }
                ],
                guarantee: {
                    type: "Garantia 100% Money-Back",
                    terms: "Se não adquirir pelo menos 3 clientes premium no primeiro mês",
                    process: "Devolução integral sem burocracia"
                }
            },

            // INVESTIMENTO E CONDIÇÕES
            pricing: {
                models: {
                    premium: {
                        name: "Plano Premium Completo",
                        investment: "Personalizado por resultados",
                        payment: "Flexível (mensal/trimestral)",
                        commitment: "Mínimo 3 meses recomendado",
                        includes: "Todos os serviços premium"
                    },
                    editing: {
                        name: "Pacote Edição",
                        investment: "Valor fixo mensal",
                        includes: "Apenas serviços de edição"
                    }
                },
                vacancies: {
                    current: 3,
                    monthly: 5,
                    waitlist: 12,
                    selection: "Processo seletivo rigoroso"
                }
            },

            // DIFERENCIAIS EXCLUSIVOS
            differentials: {
                technology: [
                    "Sistema proprietário de análise de conteúdo",
                    "IA para otimização de algoritmos",
                    "Dashboard personalizado de resultados",
                    "Ferramentas exclusivas de edição"
                ],
                expertise: [
                    "Especialização exclusiva em fitness",
                    "Equipe com background em educação física",
                    "Conhecimento profundo do buyer persona",
                    "Cases internacionais comprovados"
                ],
                approach: [
                    "Metodologia M.E.D.S. Framework™",
                    "Abordagem científica de engajamento",
                    "Otimização baseada em dados reais",
                    "Estratégias testadas A/B"
                ]
            },

            // PERGUNTAS TÉCNICAS DETALHADAS
            technical: {
                content: {
                    types: ["Educativo", "Entretenimento", "Inspiracional", "Vendas", "Testemunho"],
                    formats: ["Reels/TikToks", "Posts carrossel", "Stories", "Vídeos longos", "Lives"],
                    frequency: "1-2 posts principais + 5-7 stories diários"
                },
                platforms: {
                    instagram: "Foco em Reels e Stories",
                    tiktok: "Conteúdo viral e entretenimento",
                    youtube: "Conteúdo educativo aprofundado",
                    linkedin: "Posicionamento profissional"
                },
                equipment: {
                    basic: "Smartphone + iluminação natural",
                    recommended: "Microfone lavalier + ring light",
                    professional: "Câmera DSLR + estúdio caseiro"
                },
                time: {
                    client: "2-3 horas/semana (gravações + calls)",
                    team: "15-20 horas/semana por cliente"
                }
            }
        };
    }

    // ========================
    // SISTEMA DE PERSONALIDADE
    // ========================
    loadPersonalityMatrix() {
        this.personality = {
            tone: "Profissional, Confiante e Motivacional",
            traits: [
                "Especialista em fitness marketing",
                "Direto ao ponto mas acolhedor",
                "Focado em resultados mensuráveis",
                "Paixão por transformar vidas",
                "Comunicador claro e persuasivo"
            ],
            communication: {
                greeting: "Entusiástico mas profissional",
                explanation: "Detalhado mas não técnico demais",
                persuasion: "Baseado em dados e cases",
                urgency: "Genuíno e não agressivo",
                closing: "Sempre com call-to-action claro"
            }
        };
    }

    // ========================
    // TEMPLATES DE RESPOSTA AVANÇADOS
    // ========================
    loadResponseTemplates() {
        this.templates = {
            greeting: () => {
                const greetings = [
                    `👋 Olá! Sou o ${this.name}, especialista em marketing digital para coaches de fitness. Com ${this.knowledge.results.caseStudies.length} cases comprovados, estou aqui para transformar seu negócio! Como posso ajudá-lo hoje?`,
                    `💪 Boas-vindas! ${this.name} à sua disposição. Especialista em escalar negócios de fitness através de conteúdo estratégico. Em que posso ser útil?`,
                    `🚀 Prazer! ${this.name} aqui. Já ajudei ${this.knowledge.results.caseStudies.length} coaches a multiplicarem seus resultados. Qual sua dúvida sobre marketing digital para fitness?`
                ];
                return this.randomChoice(greetings);
            },

            services: (context) => {
                const service = this.knowledge.services.premium;
                return `🎯 ${service.name}

${service.description} focado em ${service.results}.

📦 INCLUI:
${service.includes.slice(0, 5).map(item => `• ${item}`).join('\n')}

🎬 PLATAFORMAS: ${service.platforms.join(', ')}

${context ? `💡 Para ${context}, adaptamos especialmente: ${this.getCustomApproach(context)}` : ''}

📞 Pronto para detalhes específicos?`;
            },

            methodology: () => {
                const method = this.knowledge.methodology;
                return `🔬 ${method.framework} - Nossa Metodologia Comprovada:

${Object.values(method.phases).map(phase => 
    `📋 ${phase.name} (${phase.duration}):
${phase.activities.map(act => `   ◦ ${act}`).join('\n')}`
).join('\n\n')}

⚡ Resultado: ${this.knowledge.results.metrics.clientAcquisition}`;
            },

            results: (specific) => {
                const cases = this.knowledge.results.caseStudies;
                const randomCase = this.randomChoice(cases);
                
                return `📊 RESULTADOS COMPROVADOS:

✅ ${this.knowledge.results.metrics.clientAcquisition}
✅ ${this.knowledge.results.metrics.engagement}
✅ ${this.knowledge.results.metrics.roi}

🏆 CASE REAL:
"${randomCase.coach}"
ANTES: ${randomCase.before}
DEPOIS: ${randomCase.after}
TEMPO: ${randomCase.timeline}

${this.knowledge.results.guarantee.type}: ${this.knowledge.results.guarantee.terms}`;
            },

            pricing: (budgetContext) => {
                const pricing = this.knowledge.pricing;
                return `💎 INVESTIMENTO:

${pricing.models.premium.name}
💵 ${pricing.models.premium.investment}
📅 ${pricing.models.premium.payment}
⏱️ ${pricing.models.premium.commitment}

🎯 VAGAS DISPONÍVEIS: ${pricing.vacancies.current} de ${pricing.vacancies.monthly}

${budgetContext ? `💡 ${this.getBudgetResponse(budgetContext)}` : '📞 Valores personalizados baseados em seu potencial de resultados!'}`;
            },

            differentials: () => {
                const diff = this.knowledge.differentials;
                return `⭐ DIFERENCIAIS FITGENIOUS:

🤖 TECNOLOGIA:
${diff.technology.slice(0, 2).map(item => `• ${item}`).join('\n')}

🎯 EXPERTISE:
${diff.expertise.slice(0, 2).map(item => `• ${item}`).join('\n')}

🚀 ABORDAGEM:
${diff.approach.slice(0, 2).map(item => `• ${item}`).join('\n')}

💡 Resultado: Estratégia 100% personalizada para coaches de fitness!`;
            }
        };
    }

    // ========================
    // SISTEMA DE ANÁLISE INTELIGENTE
    // ========================
    analyzeMessage(message) {
        const analysis = {
            intent: this.detectIntent(message),
            context: this.detectContext(message),
            sentiment: this.detectSentiment(message),
            urgency: this.detectUrgency(message),
            userType: this.detectUserType(message),
            objections: this.detectObjections(message),
            name: this.extractName(message),
            budgetMention: this.detectBudgetMention(message)
        };

        return analysis;
    }

    detectIntent(message) {
        const msg = message.toLowerCase();
        
        const intents = {
            greeting: ['oi', 'olá', 'ola', 'hey', 'hi', 'hello', 'bom dia', 'boa tarde', 'boa noite'],
            services: ['serviço', 'oferta', 'fazem', 'proposta', 'trabalham', 'entrega', 'o que vocês fazem'],
            methodology: ['como funciona', 'metodologia', 'processo', 'abordagem', 'método', 'sistema'],
            results: ['resultado', 'garantia', 'funciona', 'prova', 'caso', 'compensador', 'retorno'],
            pricing: ['preço', 'valor', 'investimento', 'custo', 'quanto custa', 'pagamento'],
            differentials: ['diferente', 'diferencial', 'único', 'vantagem', 'por que vocês'],
            technical: ['como gravar', 'equipamento', 'tempo', 'horas', 'plataforma', 'instagram', 'tiktok'],
            urgency: ['vagas', 'disponibilidade', 'espera', 'lista', 'quando', 'urgente'],
            cta: ['agendar', 'call', 'reunião', 'conversa', 'contato', 'whatsapp', 'falar', 'quero']
        };

        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => msg.includes(keyword))) {
                return intent;
            }
        }

        return 'general';
    }

    detectContext(message) {
        const msg = message.toLowerCase();
        const contexts = {
            'personal trainer': ['personal trainer', 'personal', 'academia', 'presencial'],
            'coach online': ['online', 'digital', 'remoto', 'ecommerce'],
            'iniciante': ['iniciante', 'começando', 'novo', 'primeira vez'],
            'experiente': ['experiente', 'já tenho', 'atualmente', 'há anos'],
            'especialista': ['especialista', 'expert', 'avançado', 'já estabelecido']
        };

        for (const [context, keywords] of Object.entries(contexts)) {
            if (keywords.some(keyword => msg.includes(keyword))) {
                return context;
            }
        }

        return null;
    }

    detectSentiment(message) {
        const positive = ['quero', 'interessado', 'legal', 'bom', 'ótimo', 'excelente', 'perfeito'];
        const negative = ['caro', 'difícil', 'complexo', 'não sei', 'talvez', 'depois'];
        const curious = ['como', 'porque', 'por que', 'pode explicar', 'entender'];

        const msg = message.toLowerCase();
        
        if (positive.some(word => msg.includes(word))) return 'positive';
        if (negative.some(word => msg.includes(word))) return 'negative';
        if (curious.some(word => msg.includes(word))) return 'curious';
        
        return 'neutral';
    }

    detectUrgency(message) {
        const urgentWords = ['urgente', 'rápido', 'logo', 'imediatamente', 'agora', 'hoje', 'já'];
        return urgentWords.some(word => message.toLowerCase().includes(word));
    }

    detectUserType(message) {
        const msg = message.toLowerCase();
        if (msg.includes('personal trainer')) return 'personal_trainer';
        if (msg.includes('online')) return 'online_coach';
        if (msg.includes('iniciante')) return 'beginner';
        if (msg.includes('experiente')) return 'experienced';
        return 'unknown';
    }

    detectObjections(message) {
        const msg = message.toLowerCase();
        const objections = [];
        
        if (msg.includes('caro') || msg.includes('cust')) objections.push('price');
        if (msg.includes('tempo') || msg.includes('ocupado')) objections.push('time');
        if (msg.includes('não funciona') || msg.includes('já tentei')) objections.push('efficacy');
        if (msg.includes('complexo') || msg.includes('difícil')) objections.push('complexity');
        
        return objections;
    }

    detectBudgetMention(message) {
        const budgetWords = ['caro', 'barato', 'econômico', 'investir', 'dinheiro', 'orçamento', 'valor'];
        return budgetWords.some(word => message.toLowerCase().includes(word));
    }

    extractName(message) {
        const patterns = [
            /me chamo (\w+)/i,
            /sou (\w+)/i,
            /aqui é (\w+)/i,
            /nome é (\w+)/i,
            /pode me chamar de (\w+)/i
        ];
        
        for (const pattern of patterns) {
            const match = message.match(pattern);
            if (match) return match[1];
        }
        
        return null;
    }

    // ========================
    // GERADOR DE RESPOSTAS PRINCIPAIS
    // ========================
    async generateResponse(userMessage) {
        try {
            const analysis = this.analyzeMessage(userMessage);
            console.log('🔍 Análise da mensagem:', analysis);

            let response;

            // Respostas baseadas na intenção principal
            switch (analysis.intent) {
                case 'greeting':
                    response = this.templates.greeting();
                    break;

                case 'services':
                    response = this.templates.services(analysis.context);
                    break;

                case 'methodology':
                    response = this.templates.methodology();
                    break;

                case 'results':
                    response = this.templates.results();
                    break;

                case 'pricing':
                    response = this.templates.pricing(analysis.budgetMention);
                    break;

                case 'differentials':
                    response = this.templates.differentials();
                    break;

                case 'technical':
                    response = this.generateTechnicalResponse(userMessage, analysis);
                    break;

                case 'urgency':
                    response = this.generateUrgencyResponse(analysis);
                    break;

                case 'cta':
                    response = this.generateCTAResponse(userMessage, analysis);
                    break;

                default:
                    response = this.generateSmartResponse(userMessage, analysis);
            }

            // Aplica camadas de personalização
            response = this.applyPersonalization(response, analysis);
            response = this.applySentimentAdjustment(response, analysis);
            response = this.applyUrgencyLayer(response, analysis);
            response = this.applyObjectionHandling(response, analysis);

            return response;

        } catch (error) {
            console.error('Erro ao gerar resposta:', error);
            return this.getFallbackResponse();
        }
    }

    // ========================
    // RESPOSTAS ESPECIALIZADAS
    // ========================
    generateTechnicalResponse(message, analysis) {
        const msg = message.toLowerCase();
        
        if (msg.includes('equipamento') || msg.includes('câmera') || msg.includes('celular')) {
            return `🎥 EQUIPAMENTO IDEAL:

📱 BÁSICO (Excelente para começar):
• Smartphone com câmera 12MP+
• Iluminação natural (janela)
• Áudio do celular em ambiente quieto

💎 RECOMENDADO (Qualidade profissional):
• Microfone lavalier (R$ 100-200)
• Ring light ou luz LED
• Tripé simples
• App de gravação (FilmoraGo)

🎬 PROFISSIONAL (Estúdio caseiro):
• Câmera DSLR ou espelho
• Microfone shotgun
• Iluminação 3-point
• Green screen opcional

💡 Dica: Comece com o básico! O conteúdo é mais importante que o equipamento.`;
        }

        if (msg.includes('tempo') || msg.includes('horas')) {
            return `⏱️ INVESTIMENTO DE TEMPO:

🕒 SEU TEMPO SEMANAL: 2-3 horas
• 1-2 horas: Gravação de conteúdos
• 30-45min: Call estratégica conosco
• 15-30min: Revisão de resultados

🕒 NOSSO TEMPO POR VOCÊ: 15-20 horas/semana
• 5-7h: Estratégia e planejamento
• 8-10h: Edição e produção
• 2-3h: Gestão e otimização

⚡ Resultado: Você foca no coaching, nós fazemos o marketing!`;
        }

        if (msg.includes('instagram') || msg.includes('tiktok') || msg.includes('plataforma')) {
            return `📱 ESTRATÉGIA POR PLATAFORMA:

🎭 INSTAGRAM:
• Reels diários (0-30 segundos)
• Stories 5-7x/dia
• Posts carrossel 3x/semana
• Foco: Autoridade e relacionamento

🎵 TIKTOK:
• Vídeos curtos e virais
• Tendências e challenges
• Foco: Alcance massivo e viralidade

🎥 YOUTUBE:
• Conteúdo educativo aprofundado
• Vídeos longos (5-15 minutos)
• Foco: SEO e audiência fiel

💼 LINKEDIN:
• Posicionamento profissional
• Conteúdo corporativo
• Foco: B2B e parcerias

🎯 Estratégia integrada em todas as plataformas!`;
        }

        return this.generateSmartResponse(message, analysis);
    }

    generateUrgencyResponse(analysis) {
        const pricing = this.knowledge.pricing;
        
        return `🚨 DISPONIBILIDADE ATUAL:

🎯 VAGAS DISPONÍVEIS: ${pricing.vacancies.current} de ${pricing.vacancies.monthly}
📋 LISTA DE ESPERA: ${pricing.vacancies.waitlist} coaches

⚡ PROCESO SELETIVO:
1. Call de compatibilidade (30min)
2. Análise de perfil
3. Proposta personalizada
4. Início imediato

💎 Por que as vagas são limitadas?
Para garantir excelência e resultados extraordinários para cada coach!

${this.generateCTAResponse('', analysis)}`;
    }

    generateCTAResponse(message, analysis) {
        const preference = message.toLowerCase().includes('whatsapp') ? 'whatsapp' : 
                          message.toLowerCase().includes('call') ? 'call' : 'both';

        const ctas = {
            call: `📅 AGENDE SUA CALL ESTRATÉGICA:
            
Calendly: https://calendly.com/fitgeniouscontent/30min

⏰ 30 minutos gratuitos
🎯 Análise do seu negócio
💡 Plano personalizado sugerido`,

            whatsapp: `📱 FALE DIRETO CONOSCO:
            
WhatsApp: +351963828378

💬 Resposta em 5-15 minutos
📊 Podemos analisar seu perfil
🎯 Tire todas suas dúvidas`,

            both: `🎯 VAMOS CONVERSAR!

📅 Calendly: https://calendly.com/fitgeniouscontent/30min
📱 WhatsApp: +351963828378

⏰ 30min gratuitos para analisarmos seu negócio
💡 Sem compromisso - apenas valor!`
        };

        return ctas[preference];
    }

    generateSmartResponse(message, analysis) {
        const smartResponses = [
            `💡 Interessante sua pergunta sobre "${message.substring(0, 40)}..."! 

Baseado em nossos ${this.knowledge.results.caseStudies.length} cases com coaches, posso explicar como isso se aplica ao marketing digital para fitness.

🎯 Gostaria de saber mais sobre:
• Nossos serviços e metodologia?
• Resultados comprovados?
• Investimento e condições?`,

            `🔍 Excelente questionamento! "${message.substring(0, 35)}" é crucial para o sucesso online.

Nossa experiência com coaches mostra que a abordagem correta aqui gera ${this.knowledge.results.metrics.clientAcquisition}.

💪 Posso detalhar como trabalhamos isso no M.E.D.S. Framework™?`,

            `🚀 Boa pergunta! "${message.substring(0, 30)}" foi um divisor de águas para coaches como ${
                this.randomChoice(this.knowledge.results.caseStudies).coach.split(' - ')[0]
            }.

📊 Nossos dados mostram que isso impacta diretamente no ${this.knowledge.results.metrics.roi}.

Quer que eu aprofunde em algum aspecto específico?`
        ];

        let response = this.randomChoice(smartResponses);

        // Adiciona camada de urgência se detectada
        if (analysis.urgency) {
            response += `\n\n${this.generateUrgencyResponse(analysis)}`;
        }

        return response;
    }

    // ========================
    // SISTEMA DE PERSONALIZAÇÃO
    // ========================
    applyPersonalization(response, analysis) {
        if (analysis.name) {
            response = response.replace(/Olá!/, `Olá, ${analysis.name}!`);
        }

        if (analysis.context) {
            const contextMap = {
                'personal trainer': 'personal trainers',
                'coach online': 'coaches online', 
                'iniciante': 'coaches que estão começando',
                'experiente': 'coaches experientes'
            };
            
            const contextText = contextMap[analysis.context];
            if (contextText && !response.includes(contextText)) {
                response += `\n\n💡 Especialmente para ${contextText}, temos abordagens específicas!`;
            }
        }

        return response;
    }

    applySentimentAdjustment(response, analysis) {
        switch (analysis.sentiment) {
            case 'positive':
                if (!response.includes('🎉')) {
                    response = response.replace(/💡/, '🎉');
                }
                break;
            case 'negative':
                response = response.replace(/💡/, '🤔');
                // Adiciona garantia extra para objeções
                if (!response.includes(this.knowledge.results.guarantee.type)) {
                    response += `\n\n🛡️ Lembre-se: ${this.knowledge.results.guarantee.type} - ${this.knowledge.results.guarantee.terms}`;
                }
                break;
            case 'curious':
                response = response.replace(/💡/, '🔍');
                break;
        }
        return response;
    }

    applyUrgencyLayer(response, analysis) {
        if (analysis.urgency && !response.includes('🚨')) {
            const urgencyPhrase = `\n\n⚡ VAGAS LIMITADAS: ${this.knowledge.pricing.vacancies.current} disponíveis este mês!`;
            if (!response.includes('VAGAS LIMITADAS')) {
                response += urgencyPhrase;
            }
        }
        return response;
    }

    applyObjectionHandling(response, analysis) {
        if (analysis.objections.length > 0) {
            analysis.objections.forEach(objection => {
                if (!response.includes(this.getObjectionResponse(objection))) {
                    response += `\n\n${this.getObjectionResponse(objection)}`;
                }
            });
        }
        return response;
    }

    getObjectionResponse(objection) {
        const responses = {
            price: `💎 INVESTIMENTO VS RETORNO: Nosso ROI é ${this.knowledge.results.metrics.roi}. Muitos coaches recuperam o investimento no primeiro mês!`,
            time: `⏱️ TEMPO OTIMIZADO: Apenas 2-3 horas/semana para você. Nós fazemos o trabalho pesado de marketing!`,
            efficacy: `🛡️ GARANTIA: ${this.knowledge.results.guarantee.type} - ${this.knowledge.results.guarantee.terms}`,
            complexity: `🎯 SIMPLES NA PRÁTICA: Nós simplificamos tudo. Você grava, nós fazemos o resto!`
        };
        return responses[objection] || '';
    }

    // ========================
    // FUNÇÕES UTILITÁRIAS
    // ========================
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getCustomApproach(context) {
        const approaches = {
            'personal trainer': 'conteúdo presencial e transformação física visível',
            'coach online': 'autoridade digital e vendas remotas',
            'iniciante': 'construção de marca do zero com fundamentos sólidos',
            'experiente': 'otimização e escalabilidade para resultados maiores'
        };
        return approaches[context] || 'resultados comprovados para seu nicho';
    }

    getBudgetResponse(context) {
        const responses = {
            'orçamento limitado': 'temos opções flexíveis e garantia de retorno',
            'investimento': 'focado em ROI rápido e comprovado',
            'valor': 'baseado no potencial de multiplicação da sua receita'
        };
        return responses[context] || 'focado em maximizar seu retorno';
    }

    getFallbackResponse() {
        return `🔧 Estou com dificuldade técnica momentânea. 

Por favor, entre em contato diretamente:
📱 WhatsApp: +351963828378
📧 Email: contato@fitgenious.com

Ou tente reformular sua pergunta! 💪`;
    }

    // ========================
    // MÉTODOS DE DIAGNÓSTICO
    // ========================
    getAssistantInfo() {
        return {
            name: this.name,
            version: this.version,
            expertise: this.expertise,
            knowledgeBase: `${
                Object.keys(this.knowledge).length
            } categorias de conhecimento`,
            cases: this.knowledge.results.caseStudies.length
        };
    }

    testAnalysis(message) {
        return this.analyzeMessage(message);
    }
}

// Exportação para uso no servidor
export default FitGeniousAssistant;