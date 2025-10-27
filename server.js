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

// Servir arquivos estáticos corretamente
app.use(express.static(__dirname));

// Rota específica para arquivos CSS e JS
app.get('/styles.css', (req, res) => {
    const cssPath = path.join(__dirname, 'styles.css');
    if (fs.existsSync(cssPath)) {
        res.setHeader('Content-Type', 'text/css');
        res.sendFile(cssPath);
    } else {
        res.status(404).send('CSS not found');
    }
});

app.get('/script.js', (req, res) => {
    const jsPath = path.join(__dirname, 'script.js');
    if (fs.existsSync(jsPath)) {
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile(jsPath);
    } else {
        res.status(404).send('JS not found');
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// API Gemini
app.post('/api/genius', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ text: 'Por favor, envie uma mensagem.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.json({ 
                text: "Olá! Sou o assistente do FitGenious. Para respostas completas, configure a API key do Gemini.",
                simulated: true
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        const prompt = `Você é o FitGenious Assistant, especialista em marketing digital para coaches de fitness.

Responda de forma profissional sobre:
- Estratégias de conteúdo
- Atração de clientes  
- Marketing digital
- Gestão de redes sociais

Pergunta: "${message}"

Resposta (2-3 parágrafos):`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ 
            text: response.text(),
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Erro Gemini:', error);
        res.json({ 
            text: "Serviço temporariamente indisponível. Entre em contato conosco diretamente.",
            error: true
        });
    }
});

// Rota para todas as outras requisições (servir index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor FitGenious rodando na porta ${PORT}`);
    console.log(`📁 Diretório: ${__dirname}`);
    console.log(`🔗 Acesse: http://localhost:${PORT}`);
    console.log('📋 Arquivos no diretório:');
    fs.readdirSync(__dirname).forEach(file => {
        console.log(`   - ${file}`);
    });
});
