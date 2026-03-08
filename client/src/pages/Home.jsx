import { useState } from 'react';
import { analyzeResume } from '../services/api';
import UploadDropzone from '../components/UploadDropzone';
import AnalysisResult from '../components/AnalysisResult';
import { Loader2, Briefcase, FileSearch, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionContainer } from '../components/ui/SectionContainer';
import { UploadCard } from '../components/ui/UploadCard';
import { PrimaryButton } from '../components/ui/Button';
import { designSystem } from '../utils/designSystem';

const Home = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please upload a resume first.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await analyzeResume(file, jobDescription);
            setResult(response.data.analysis);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during analysis.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SectionContainer>
            <div className="text-center mb-12">
                <h1 className={`${designSystem.typography.pageTitle} text-4xl md:text-5xl font-extrabold tracking-tight mb-4`}>
                    Is Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">ATS-Ready?</span>
                </h1>
                <p className={`${designSystem.typography.body} text-lg max-w-2xl mx-auto`}>
                    Paste the target job description and upload your resume. Our AI will analyze your fit, highlight missing skills, and provide actionable feedback.
                </p>
            </div>

            <UploadCard className="max-w-3xl mx-auto">
                <div className="space-y-8">
                    {/* Job Description Textarea */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center dark:text-gray-100">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                            Paste Job Description
                        </label>
                        <textarea
                            rows={5}
                            placeholder="E.g., We are looking for a Software Engineer with experience in React, Node.js..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-4 outline-none transition-all hover:bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800 resize-none"
                        />
                    </div>

                    {/* Upload Area */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 dark:text-gray-100">Resume Document (PDF)</label>
                        <UploadDropzone onFileSelect={setFile} />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <PrimaryButton
                        onClick={handleAnalyze}
                        disabled={loading || !file}
                        loading={loading}
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2 animate-pulse">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Analyzing Resume with AI...</span>
                            </div>
                        ) : (
                            'Analyze Resume'
                        )}
                    </PrimaryButton>
                </div>
            </UploadCard>

            {/* Results Area */}
            {result && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-12"
                >
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Resume Preview */}
                        <div className="flex flex-col w-full h-full space-y-6 lg:sticky lg:top-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                                <FileText className="w-6 h-6 mr-3 text-indigo-500" />
                                Resume Preview
                            </h3>
                            <div className="w-full h-[600px] lg:h-[800px] rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm bg-gray-50 dark:bg-gray-800/50">
                                {file && (
                                    <iframe
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-full"
                                        title="Resume Preview"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Analysis Results */}
                        <div className="flex flex-col w-full">
                            <AnalysisResult data={result} />
                        </div>
                    </div>
                </motion.div>
            )}
        </SectionContainer>
    );
};

export default Home;
