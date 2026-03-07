import { useState } from 'react';
import { analyzeResume } from '../services/api';
import UploadDropzone from '../components/UploadDropzone';
import AnalysisResult from '../components/AnalysisResult';
import { Loader2, Briefcase, FileSearch } from 'lucide-react';

const ROLES = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Software Engineer",
    "Data Scientist",
    "Product Manager"
];

const Home = () => {
    const [file, setFile] = useState(null);
    const [targetRole, setTargetRole] = useState(ROLES[0]);
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
            const response = await analyzeResume(file, targetRole);
            setResult(response.data.analysis);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during analysis.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero Section */}
            <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <FileSearch className="w-6 h-6 text-blue-600" />
                            <span className="font-bold text-xl tracking-tight text-gray-900">Resume<span className="text-blue-600">AI</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                        Is Your Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ATS-Ready?</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload your resume, select your target role, and let our AI analyze your fit, highlight missing skills, and provide actionable feedback.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 mb-8 max-w-2xl mx-auto">
                    <div className="space-y-8">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                                Target Job Role
                            </label>
                            <select
                                value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all hover:bg-white"
                            >
                                {ROLES.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upload Area */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Resume Document (PDF)</label>
                            <UploadDropzone onFileSelect={setFile} />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !file}
                            className={`w-full py-4 px-6 rounded-xl text-white font-semibold flex justify-center items-center transition-all duration-200 ${loading || !file
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Analyzing Resume with AI...
                                </>
                            ) : (
                                'Analyze Resume'
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                {result && !loading && (
                    <div className="mt-16 border-t border-gray-200">
                        <AnalysisResult data={result} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
