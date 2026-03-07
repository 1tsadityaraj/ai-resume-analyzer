import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export const generateResumeFeedback = async (resumeText, targetRole) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
    if (!process.env.GEMINI_API_KEY) {
        // Return dummy data if no API key is set for local testing
        return {
            atsScore: 78,
            skillsFound: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
            missingSkills: ['TypeScript', 'Docker', 'System Design'],
            suggestions: [
                'Add more measurable achievements (e.g., "Increased performance by 30%").',
                'Include your knowledge of testing frameworks.',
                'Improve the visual formatting of the projects section.'
            ],
            keywordMatches: ['React', 'Node.js']
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert ATS (Applicant Tracking System) and senior tech recruiter.
    Analyze the following resume against the target role: "${targetRole}"
    
    Resume Text:
    """
    ${resumeText.substring(0, 5000)} // Limiting size slightly
    """
    
    Provide your output STRICTLY in the following JSON format:
    {
      "atsScore": a number between 0 and 100 representing the match,
      "skillsFound": [an array of technical/soft skills found in the resume relevant to the role],
      "missingSkills": [an array of key skills expected for this role but missing],
      "suggestions": [an array of 3-5 specific, actionable suggestions to improve the resume],
      "keywordMatches": [an array of keywords from the resume that perfectly match the job role]
    }
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
