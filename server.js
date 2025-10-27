import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos corretamente
app.use(express.static(__dirname));

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

        // Se não tiver API key, retorna resposta simulada
        if (!process.env.GEMINI_API_KEY) {
            return res.json({ 
                text: "Olá! Sou o assistente do FitGenious. Para respostas completas, configure a API key do Gemini.",
                simulated: true
            });
        }

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

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para servir CSS e JS
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor FitGenious rodando na porta ${PORT}`);
    console.log(`🔗 Acesse: http://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});
