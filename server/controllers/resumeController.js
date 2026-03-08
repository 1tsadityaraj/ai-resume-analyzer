import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { generateResumeFeedback } from '../utils/ai.js';

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const { jobDescription } = req.body;
        if (!jobDescription) {
            return res.status(400).json({ error: 'Target job description is required' });
        }

        // Read and parse PDF
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const rawText = pdfData.text;

        // Clean up file
        fs.unlinkSync(req.file.path);

        // Call AI to analyze resume text
        const aiAnalysis = await generateResumeFeedback(rawText, jobDescription);

        res.json({
            success: true,
            data: {
                extractedTextSnippet: rawText.substring(0, 150) + '...',
                analysis: aiAnalysis
            }
        });

    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).json({ error: 'Failed to analyze resume' });
    }
};
