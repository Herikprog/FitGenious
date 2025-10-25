import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/genius', (req, res) => {
    console.log('Requisição recebida:', req.body);
    
    // Resposta simulada para teste
    res.json({ 
        text: "Este é um teste do FitGenious Assistant. A API está funcionando!",
        timestamp: new Date().toISOString(),
        status: "success"
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando' });
});

export default app;
