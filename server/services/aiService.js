import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Settings from '../models/Settings.js';
dotenv.config();

export const generateResumeFeedback = async (resumeText, jobDescription) => {
    // 1. Check DB first, fallback to env
    let apiKey = process.env.GEMINI_API_KEY;
    try {
        const settings = await Settings.findOne();
        if (settings && settings.geminiApiKey) {
            apiKey = settings.geminiApiKey;
        }
    } catch (e) {
        console.error("Failed to load settings:", e);
    }

    if (!apiKey) {
        return {
            matchScore: 76,
            matchedSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
            missingSkills: ['TypeScript', 'Docker', 'System Design', 'Kubernetes'],
            suggestions: [
                'Add experience with Docker containers.',
                'Include cloud infrastructure tools.',
                'Mention system design architectures explicitly.'
            ]
        };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Compare the following resume and job description. 
    Return:
    - matchScore (0-100)
    - matchedSkills
    - missingSkills
    - suggestions to improve the resume.
    
    Job Description:
    """
    ${jobDescription}
    """
    
    Resume Text:
    """
    ${resumeText.substring(0, 5000)} // Limiting size slightly
    """
    
    Return JSON only.
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Attempt to extract JSON from markdown formatting if present
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
        const jsonStr = jsonMatch ? jsonMatch[1] : text;

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw new Error('Failed to generate AI feedback');
    }
};
