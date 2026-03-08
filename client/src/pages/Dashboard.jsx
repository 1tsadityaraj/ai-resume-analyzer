import { useState, useEffect } from 'react';
import { Info, CheckCircle2, RotateCw, FileText, Users, Star, Clock, MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { SecondaryButton } from '../components/ui/Button';
import { designSystem } from '../utils/designSystem';

import { getCandidates, getAnalytics } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalResumes: 0,
        avgScore: 0,
        topSkills: [],
        monthlyData: []
    });

    const [loading, setLoading] = useState(true);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [candidates, analytics] = await Promise.all([
                getCandidates(),
                getAnalytics()
            ]);

            const total = candidates.length;
            const avg = total > 0 ? Math.round(candidates.reduce((acc, c) => acc + (c.matchScore || c.atsScore || 0), 0) / total) : 0;

            setStats({
                totalResumes: total,
                avgScore: avg,
                topSkills: analytics.topSkills || [],
                monthlyData: analytics.monthlyUploads || []
            });
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    return (
        <SectionContainer>
            {/* Header section */}
            <PageHeader
                title="ATS Resume Analyzer"
                subtitle="AI-powered recruitment insights and candidate analysis."
                rightElement={
                    <>
                        <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 font-medium space-x-2">
                            <Info className="w-3.5 h-3.5" />
                            <span>Demo Mode</span>
                            <span className="bg-blue-200/50 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-[10px]">Checking...</span>
                        </div>
                        <button onClick={loadDashboardData} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs px-4 py-2 rounded-full font-medium">
                            Updated: 10:40:42 PM
                        </div>
                    </>
                }
            />

            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100/50 dark:border-blue-800/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start space-x-3 mb-4">
                    <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Demo Mode Active</h3>
                        <p className="text-blue-700/80 dark:text-blue-300/80 text-sm mb-4">
                            You're experiencing the full ATS interface with realistic demo data. All features are functional for testing and exploration.
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-blue-600 dark:text-blue-400 mb-4 font-medium">
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-blue-500" /> Interactive UI demonstration</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-blue-500" /> Realistic mock analysis results</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-blue-500" /> File upload simulation</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-blue-500" /> Chart visualizations</span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer">
                                Want real AI analysis? Set up the Python backend →
                            </span>
                            <SecondaryButton>
                                <span>Connecting...</span>
                                <span className="opacity-80">Setup Guide</span>
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Card 1 */}
                <DashboardCard className="flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-green-500 dark:text-green-400 text-xs font-semibold flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                            ↗ +12%
                        </span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalResumes}</h4>
                        <p className={designSystem.typography.body + " mt-1"}>Total Resumes</p>
                    </div>
                </DashboardCard>

                {/* Card 2 */}
                <DashboardCard className="flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-xl">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-green-500 dark:text-green-400 text-xs font-semibold flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                            ↗ +8%
                        </span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalResumes}</h4>
                        <p className={designSystem.typography.body + " mt-1"}>Analyzed Candidates</p>
                    </div>
                </DashboardCard>

                {/* Card 3 */}
                <DashboardCard className="flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-green-500 dark:text-green-400 text-xs font-semibold flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                            ↗ +5%
                        </span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgScore}%</h4>
                        <p className={designSystem.typography.body + " mt-1"}>Avg. Match Score</p>
                    </div>
                </DashboardCard>

                {/* Card 4 */}
                <DashboardCard className="flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-red-500 dark:text-red-400 text-xs font-semibold flex items-center bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-full">
                            ↘ -2 days
                        </span>
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">0 days</h4>
                        <p className={designSystem.typography.body + " mt-1"}>Avg. Processing Time</p>
                    </div>
                </DashboardCard>
            </div>

            {/* Grid for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                {/* Left Chart Panel */}
                <DashboardCard className="h-80 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className={designSystem.typography.sectionHeading}>Monthly Applications</h3>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 w-full relative -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#E2E8F0' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="resumes"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Right Skills Panel */}
                <DashboardCard className="h-80 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className={designSystem.typography.sectionHeading}>Top Skills Detected</h3>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center flex-col text-gray-400 p-4">
                        {stats.topSkills.length > 0 ? (
                            <div className="w-full space-y-3 mt-4">
                                {stats.topSkills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{skill.name}</span>
                                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                                            {skill.value} candidates
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 flex items-center justify-center rounded-full mb-3 mt-8">
                                    <Star className="w-8 h-8 text-gray-300 dark:text-gray-500" />
                                </div>
                                <p className={designSystem.typography.body + " font-medium"}>No skills detected yet</p>
                                <p className="text-xs mt-1">Upload resumes to see analytics</p>
                            </>
                        )}
                    </div>
                </DashboardCard>
            </div>
        </SectionContainer>
    );
};

export default Dashboard;
