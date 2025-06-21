import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    try {
    const { ingredientes, restricoes } = await request.json();

    const promptTexto = `Gere uma receita detalhada de comida usando os seguintes ingredientes: ${ingredientes}. ${restricoes ? `A receita deve ser ${restricoes}.` : ''} Inclua um título, lista de ingredientes com quantidades e instruções passo a passo.`;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
        { role: "system", content: "Você é um chef de cozinha criativo e útil, que gera receitas claras e fáceis de seguir." },
        { role: "user", content: promptTexto }
        ],
        max_tokens: 500,
        temperature: 0.7,
    });

    const receitaGerada = chatCompletion.choices[0].message.content;

    return new Response(JSON.stringify({ receita: receitaGerada }), {
        status: 200,
        headers: {
        'Content-Type': 'application/json',
        },
    });

    } catch (error) {
    console.error("Erro na API Route ao chamar OpenAI:", error);
    return new Response(JSON.stringify({ error: "Erro ao gerar receita. Tente novamente mais tarde." }), {
        status: 500,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    }
}