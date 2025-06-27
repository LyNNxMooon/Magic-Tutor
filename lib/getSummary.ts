import { generateSummary } from "./gemini";

export async function getSummaryFromGemini(content: string): Promise<string> {
  const isYouTube = content.includes("youtube.com") || content.includes("youtu.be");
  return await generateSummary(content, isYouTube);
}