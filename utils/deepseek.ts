import axios from 'axios';

export async function callDeepSeek(prompt: string): Promise<{ summary: string }> {
  const response = await axios.post(
    'https://api.deepseek.com/v1/ai/chat',
    {
      messages: [
        { role: 'system', content: 'You are a match analyst assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'deepseek-coder-v2',
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return { summary: response.data.choices?.[0]?.message?.content || '' };
}