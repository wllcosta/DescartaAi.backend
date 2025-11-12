const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateChatResponse(prompt) {
  const systemPrompt = `
        Você é o "DescartAI", um assistente virtual especialista em descarte de resíduos e reciclagem.
        Sua personalidade é prestativa, direta e ecológica.
        Responda sempre em português do Brasil.
        Suas respostas devem ser curtas e fáceis de entender.
        Sempre que um item for reciclável, mencione a cor da lixeira correta e use a tag <strong> para destacar essa informação.
        Exemplo: "Papel deve ser descartado na <strong>lixeira azul</strong>."

        Pergunta do usuário: "${prompt}"
    `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro no serviço do Gemini:", error);
    res.status(500).json({ error: "Erro ao gerar resposta" });
  }
}

module.exports = { generateChatResponse };
