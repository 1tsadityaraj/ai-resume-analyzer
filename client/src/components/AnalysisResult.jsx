import { CheckCircle2, AlertCircle, TrendingUp, Key } from 'lucide-react';

const AnalysisResult = ({ data }) => {
    if (!data) return null;

    const { atsScore, skillsFound, missingSkills, suggestions, keywordMatches } = data;

    // Score color logic
    let scoreColor = "text-red-500 dark:text-red-400";
    let scoreRing = "border-red-500";
    let scoreBg = "bg-red-50 dark:bg-red-500/10";

    if (atsScore >= 80) {
        scoreColor = "text-green-500 dark:text-green-400";
        scoreRing = "border-green-500";
        scoreBg = "bg-green-50 dark:bg-green-500/10";
    } else if (atsScore >= 60) {
        scoreColor = "text-yellow-500 dark:text-yellow-400";
        scoreRing = "border-yellow-500";
        scoreBg = "bg-yellow-50 dark:bg-yellow-500/10";
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* ATS Score Header Card */}
            <div className="glass rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 dark:bg-gray-800/80">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                        Resume Match Results
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">Based on standard Applicant Tracking Systems</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${scoreRing} ${scoreBg}`}>
                        <span className={`text-4xl font-bold ${scoreColor}`}>{atsScore}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ATS Score</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Identified Skills Card */}
                <div className="glass rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills Found</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skillsFound.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium rounded-full border border-green-200 dark:border-green-500/20">
                                {skill}
                            </span>
                        ))}
                        {skillsFound.length === 0 && <span className="text-gray-500 dark:text-gray-400 italic">No exact skill matches found.</span>}
                    </div>
                </div>

                {/* Missing Skills Card */}
                <div className="glass rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Missing Key Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-500/20">
                                {skill}
                            </span>
                        ))}
                        {missingSkills.length === 0 && <span className="text-green-600 dark:text-green-400 font-medium">No missing key skills! Great job.</span>}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Suggestions Card */}
                <div className="glass rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Improvement Suggestions</h3>
                    </div>
                    <ul className="space-y-4">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{suggestion}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;
