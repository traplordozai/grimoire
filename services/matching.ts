import { callDeepSeek } from '../utils/deepseek';

export async function generateExplanation(candidate: any, role: any): Promise<string> {
  const prompt = `Explain why the candidate is a good fit for this internship role based on:\n\nCandidate:\n${JSON.stringify(candidate, null, 2)}\n\nRole:\n${JSON.stringify(role, null, 2)}`;

  const response = await callDeepSeek(prompt);
  return response.summary || 'Explanation unavailable.';
}