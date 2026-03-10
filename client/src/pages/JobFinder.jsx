import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { 
    Search, Building2, MapPin, ExternalLink, Briefcase, Sparkles, 
    ArrowUpRight, CheckCircle2, XCircle, Loader2, Filter, Globe 
} from 'lucide-react';
import { designSystem } from '../utils/designSystem';
import { findJobs } from '../services/api';

const platformColors = {
    'LinkedIn': { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    'Wellfound': { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
    'Internshala': { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800' },
    'Indeed': { bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800' },
    'Naukri': { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
    'Glassdoor': { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
};

const platformLogos = {
    'LinkedIn': '💼',
    'Wellfound': '🚀',
    'Internshala': '🎓',
    'Indeed': '🔍',
    'Naukri': '📋',
    'Glassdoor': '🏢',
};

const JobFinder = () => {
    const [jobs, setJobs] = useState([]);
    const [platformLinks, setPlatformLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, internship, full-time
    const [platformFilter, setPlatformFilter] = useState('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await findJobs();
            setJobs(data.jobs || []);
            setPlatformLinks(data.platformLinks || []);
            if (data.message) setError(data.message);
        } catch (err) {
            console.error('Error finding jobs:', err);
            setError('Failed to fetch job recommendations. Please analyze a resume first.');
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const typeMatch = filter === 'all' || job.type?.toLowerCase() === filter;
        const platMatch = platformFilter === 'all' || job.platform === platformFilter;
        return typeMatch && platMatch;
    });

    const getScoreColor = (score) => {
        if (score >= 80) return 'from-emerald-400 to-emerald-600';
        if (score >= 60) return 'from-indigo-400 to-indigo-600';
        if (score >= 40) return 'from-amber-400 to-amber-600';
        return 'from-gray-400 to-gray-500';
    };

    const getScoreTextColor = (score) => {
        if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
        if (score >= 60) return 'text-indigo-600 dark:text-indigo-400';
        if (score >= 40) return 'text-amber-600 dark:text-amber-400';
        return 'text-gray-500';
    };

    const uniquePlatforms = [...new Set(jobs.map(j => j.platform).filter(Boolean))];

    return (
        <SectionContainer>
            <PageHeader
                title="Job Finder"
                subtitle="AI-powered job & internship recommendations based on your resume skills."
            />

            {/* Platform External Links */}
            {platformLinks.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <h3 className={designSystem.typography.sectionHeading + " mb-3 flex items-center"}>
                        <Globe className="w-5 h-5 mr-2 text-indigo-500" />
                        Search on Job Platforms
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {platformLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center space-x-2.5 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-none transition-all duration-200"
                            >
                                <span className="text-xl">{link.logo}</span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{link.name}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 ml-auto transition-colors" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap items-center gap-3 mb-6"
            >
                <div className="flex items-center space-x-2 mr-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter:</span>
                </div>
                {['all', 'internship', 'full-time'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                            filter === f 
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none' 
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                        }`}
                    >
                        {f === 'all' ? 'All Types' : f === 'internship' ? 'Internships' : 'Full-time'}
                    </button>
                ))}
                
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {['all', ...uniquePlatforms].map(p => (
                    <button
                        key={p}
                        onClick={() => setPlatformFilter(p)}
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all border flex items-center space-x-1.5 ${
                            platformFilter === p
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                        }`}
                    >
                        {p !== 'all' && <span className="text-sm">{platformLogos[p] || '🌐'}</span>}
                        <span>{p === 'all' ? 'All Platforms' : p}</span>
                    </button>
                ))}
            </motion.div>

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Finding relevant jobs for your skills...</p>
                </div>
            )}

            {/* Error / Empty State */}
            {!loading && jobs.length === 0 && (
                <DashboardCard className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <Search className="w-14 h-14 text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className={designSystem.typography.sectionHeading + " mb-2"}>
                        {error ? "No Resume Analyzed Yet" : "No Jobs Found matching your skills"}
                    </h3>
                    <p className={designSystem.typography.body + " max-w-md"}>
                        {error
                            ? "Head to the Resume Analyzer section, upload your resume, and come back here to see personalized job recommendations from Wellfound, Internshala, LinkedIn & more."
                            : "We couldn't find exact matches. Try updating your resume with more skills or exploring the platform links above."}
                    </p>
                </DashboardCard>
            )}

            {/* Job Cards Grid */}
            {!loading && filteredJobs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h3 className={designSystem.typography.sectionHeading + " mb-4 flex items-center"}>
                        <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
                        {filteredJobs.length} Jobs Found for Your Skills
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <AnimatePresence>
                            {filteredJobs.map((job, idx) => {
                                const pColor = platformColors[job.platform] || platformColors['LinkedIn'];
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm hover:shadow-lg transition-all duration-200 ${
                                            job.matchScore >= 70
                                                ? 'border-indigo-300 dark:border-indigo-600 hover:border-indigo-400'
                                                : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 truncate">{job.title}</h4>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center space-x-1">
                                                        <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                                                        <span className="font-medium">{job.company}</span>
                                                    </span>
                                                    {job.location && (
                                                        <span className="flex items-center space-x-1">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span>{job.location}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Score Ring */}
                                            <div className="flex-shrink-0 ml-3 relative w-14 h-14">
                                                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
                                                    <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-100 dark:text-gray-700" />
                                                    <circle
                                                        cx="28" cy="28" r="24" fill="none"
                                                        strokeWidth="4" strokeLinecap="round"
                                                        stroke="url(#scoreGrad)"
                                                        strokeDasharray={`${(job.matchScore / 100) * 150.8} 150.8`}
                                                    />
                                                    <defs>
                                                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor={job.matchScore >= 70 ? '#6366f1' : job.matchScore >= 40 ? '#f59e0b' : '#9ca3af'} />
                                                            <stop offset="100%" stopColor={job.matchScore >= 70 ? '#818cf8' : job.matchScore >= 40 ? '#fbbf24' : '#d1d5db'} />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className={`text-sm font-bold ${getScoreTextColor(job.matchScore)}`}>{job.matchScore}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tags: Platform + Type */}
                                        <div className="flex items-center space-x-2 mb-3">
                                            {job.platform && (
                                                <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${pColor.bg} ${pColor.text} ${pColor.border}`}>
                                                    <span>{platformLogos[job.platform] || '🌐'}</span>
                                                    <span>{job.platform}</span>
                                                </span>
                                            )}
                                            {job.type && (
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                    job.type === 'Internship' 
                                                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                                                        : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                                                }`}>
                                                    {job.type}
                                                </span>
                                            )}
                                        </div>

                                        {/* Skills */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-emerald-50 dark:bg-emerald-900/15 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                                                <div className="flex items-center space-x-1 mb-1">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Matched</span>
                                                </div>
                                                <p className="text-xs text-emerald-600 dark:text-emerald-300 leading-relaxed">
                                                    {job.matchedSkills?.length > 0 ? job.matchedSkills.join(', ') : 'None'}
                                                </p>
                                            </div>
                                            <div className="bg-red-50 dark:bg-red-900/15 p-2.5 rounded-lg border border-red-100 dark:border-red-800/30">
                                                <div className="flex items-center space-x-1 mb-1">
                                                    <XCircle className="w-3 h-3 text-red-400" />
                                                    <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wide">Missing</span>
                                                </div>
                                                <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
                                                    {job.missingSkills?.length > 0 ? job.missingSkills.join(', ') : 'None — perfect fit!'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Apply Button */}
                                        {job.applyUrl && (
                                            <a
                                                href={job.applyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
                                            >
                                                Apply Now
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </a>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}

            {/* No results after filter */}
            {!loading && jobs.length > 0 && filteredJobs.length === 0 && (
                <DashboardCard className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
                    <Filter className="w-10 h-10 text-gray-400 mb-3" />
                    <h3 className={designSystem.typography.sectionHeading}>No jobs match this filter</h3>
                    <p className={designSystem.typography.body}>Try changing the type or platform filter above.</p>
                </DashboardCard>
            )}
        </SectionContainer>
    );
};

export default JobFinder;
