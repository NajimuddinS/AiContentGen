import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAP9xhvvJDWbq4FzAEKdcsithN17sd2b8w';
const genAI = new GoogleGenerativeAI(API_KEY);

const getPlatformPrompt = (topic, platform) => {
  const prompts = {
    LinkedIn: `Write a professional LinkedIn post about "${topic}". Keep it engaging, informative, and suitable for a professional network. Include relevant hashtags and make it shareable. The tone should be professional yet approachable. Aim for 150-200 words.`,
    
    Twitter: `Create a compelling Twitter thread or tweet about "${topic}". Make it concise, engaging, and Twitter-appropriate. Include relevant hashtags and emojis where appropriate. If it's longer content, structure it as a thread with numbered tweets. Keep each tweet under 280 characters.`,
    
    Instagram: `Write an engaging Instagram caption about "${topic}". Make it visually appealing, include relevant emojis, and add popular hashtags. The tone should be casual, inspiring, and Instagram-friendly. Include a call-to-action to encourage engagement. Aim for 125-150 words.`
  };

  return prompts[platform] || prompts.LinkedIn;
};

export const generateContent = async (topic, platform) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = getPlatformPrompt(topic, platform);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      content: text.trim(),
      platform,
      topic,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. Please check your API key and try again.');
  }
};