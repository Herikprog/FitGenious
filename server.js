import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.css') {
            res.setHeader('Content-Type', 'text/css');
        } else if (ext === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// CORREÇÃO: Mudar a rota para /api/genius (igual ao frontend)
app.post('/api/genius', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ text: 'Por favor, envie uma mensagem.' });
        }

        console.log('📨 Mensagem recebida:', message);

        // Se não tiver API key, retorna resposta simulada
        if (!process.env.GEMINI_API_KEY) {
            console.log('⚠️  Gemini API Key não configurada');
            return res.json({ 
                text: "Olá! Sou o assistente do FitGenious. No momento estou em modo de demonstração. Para respostas completas com IA, configure a API key do Gemini nas variáveis de ambiente.",
                simulated: true
            });
        }

        console.log('🔑 Gemini API Key encontrada');

        // Gemini real
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        const prompt = `Você é o FitGenious Assistant, especialista em marketing digital para coaches de fitness.

Contexto: FitGenious é uma agência que ajuda coaches de fitness a atrair clientes através de conteúdo estratégico.

Responda de forma profissional, amigável e útil sobre:
- Estratégias de conteúdo para coaches de fitness
- Como atrair clientes online
- Marketing digital para profissionais de fitness
- Gestão de redes sociais
- Dicas para criar conteúdo engajante
- Como converter seguidores em clientes

Mantenha a resposta em português, seja direto e ofereça valor.

Pergunta do usuário: "${message}"

Resposta (seja útil e específico):`;

        console.log('🤖 Enviando para Gemini...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        console.log('✅ Resposta do Gemini:', responseText);

        res.json({ 
            text: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Erro Gemini:', error);
        res.status(500).json({ 
            text: "Desculpe, estou com problemas técnicos no momento. Você pode entrar em contato conosco diretamente pelo WhatsApp: +351 963 828 378",
            error: true
        });
    }
});

// Rota para servir o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor FitGenious rodando na porta ${PORT}`);
    console.log(`🔗 Acesse: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🤖 API Gemini: http://localhost:${PORT}/api/genius`);
    console.log(`🔑 Gemini API Key configurada: ${!!process.env.GEMINI_API_KEY}`);
});
