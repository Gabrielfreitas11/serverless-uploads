import { Configuration, OpenAIApi } from 'openai';

export async function chatGPT(content, EAN) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.AUTH_CHAT_GPT,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Ola, você me trazer as especificações do produto ${content} com o codigo de barras (EAN) ${EAN} no formato de uma tabela`,
        },
      ],
    });

    return completion.data.choices;
  } catch (e) {
    throw null;
  }
}
