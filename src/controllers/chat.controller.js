const geminiService = require('../services/gemini.service');

async function handleChat(req, res, next) {
    try {
        const { prompt } = req.body;

        if(!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            const error = new Error('O prompt é obrigatório e deve ser um texto válido');
            error.statusCode = 400
            throw error;
        }

        const aiResponse = await geminiService.generateChatResponse(prompt);
        res.json({ response: aiResponse });
    } catch {
        next(error);
    }
}

module.exports = { handleChat };