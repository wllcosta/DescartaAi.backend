const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

require('dotenv').config(); // Carrega variaveis do arquivo ".env"

//Configurações base do servidor
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

//Configurações IA
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//Rotas
app.post('/chat', async (req, res) => {
    console.log('Recebi um requisição em -> /chat  com o corpo: ', req.body);

    try {
        const { prompt } = req.body;

        if(!prompt) {
            return res.status(400).json({ error: 'Nenhum prompt foi fornecido' });
        }

        const systemPrompt = `
            Você é o "DescartAI", um assistente virtual especialista em descarte de resíduos e reciclagem.
            Sua personalidade é prestativa, direta e ecológica.
            Responda sempre em português do Brasil.
            Suas respostas devem ser curtas e fáceis de entender.
            Sempre que um item for reciclável, mecionar a cor da lixeira correta e use a tag <strong. para destacar essa informação.
            Exemplo: "Papel deve ser descartado na <strong>lixeira azul<strong>."

            Pergunta do usuário: "${prompt}"
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Erro ao contatar a API do Gemini:", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor ao processar a resposta da IA.' })
    }
});

app.listen(port, () => {
    console.log(`Servidor DescartAI rodando em http://localhost:${port}`)
})