import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { designSystem } from '../utils/designSystem';

const monthlyData = [
    { name: 'Jan', resumes: 120 },
    { name: 'Feb', resumes: 180 },
    { name: 'Mar', resumes: 250 },
    { name: 'Apr', resumes: 210 },
    { name: 'May', resumes: 340 },
    { name: 'Jun', resumes: 410 },
];

const scoreDistData = [
    { range: '90-100', count: 45 },
    { range: '80-89', count: 120 },
    { range: '70-79', count: 210 },
    { range: '60-69', count: 85 },
    { range: '<60', count: 30 },
];

const topSkillsData = [
    { name: 'React', value: 400 },
    { name: 'Node.js', value: 300 },
    { name: 'Python', value: 300 },
    { name: 'AWS', value: 200 },
];
const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6'];

const Analytics = () => {
    return (
        <SectionContainer>
            <PageHeader
                title="Analytics & insights"
                subtitle="Deep dive into your resume evaluation metrics."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Monthly Uploads */}
                <DashboardCard className="h-96 flex flex-col">
                    <div className="mb-6">
                        <h3 className={designSystem.typography.sectionHeading}>Monthly Resumes Analyzed</h3>
                        <p className={designSystem.typography.body}>Volume of resumes processed over time</p>
                    </div>
                    <div className="flex-1 w-full relative -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <RTTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1E293B', color: '#fff' }}
                                    cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '3 3' }}
                                />
                                <Area type="monotone" dataKey="resumes" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorResumes)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Score Distribution */}
                <DashboardCard className="h-96 flex flex-col">
                    <div className="mb-6">
                        <h3 className={designSystem.typography.sectionHeading}>ATS Score Distribution</h3>
                        <p className={designSystem.typography.body}>Breakdown of candidate quality by match score</p>
                    </div>
                    <div className="flex-1 w-full relative -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoreDistData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <RTTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1E293B', color: '#fff' }}
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Top Skills Detected */}
                <DashboardCard className="h-96 flex flex-col lg:col-span-2">
                    <div className="mb-6 flex flex-col items-center">
                        <h3 className={designSystem.typography.sectionHeading}>Top Skills Detected</h3>
                        <p className={designSystem.typography.body}>Most frequent core competencies among candidates</p>
                    </div>
                    <div className="flex-1 w-full md:w-1/2 mx-auto relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topSkillsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {topSkillsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RTTooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1E293B', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>
            </div>
        </SectionContainer>
    );
};

export default Analytics;
