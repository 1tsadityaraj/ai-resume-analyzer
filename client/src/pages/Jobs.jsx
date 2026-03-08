import { useState } from 'react';
import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { PrimaryButton } from '../components/ui/Button';
import { Briefcase, Building2, Terminal, AlignLeft, CalendarClock } from 'lucide-react';
import { designSystem } from '../utils/designSystem';

const mockJobs = [
    {
        title: "Frontend Developer (React)",
        company: "Tech Corp Inc.",
        skills: "React, TypeScript, Tailwind",
        date: "Oct 24, 2023",
        status: "Active"
    },
    {
        title: "Senior Node.js Engineer",
        company: "StartupLab",
        skills: "Node.js, Express, MongoDB, AWS",
        date: "Oct 20, 2023",
        status: "Active"
    }
];

const Jobs = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');
    const [jobs, setJobs] = useState(mockJobs);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJob = {
            title,
            company,
            skills,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: "Active"
        };
        setJobs([newJob, ...jobs]);
        setTitle('');
        setCompany('');
        setSkills('');
        setDescription('');
    };

    return (
        <SectionContainer>
            <PageHeader
                title="Job Postings"
                subtitle="Create a new posting and track existing requisitions."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <DashboardCard>
                        <h3 className={designSystem.typography.sectionHeading + " mb-6"}>Create Job Posting</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <div>
                                <label className="flex items-center space-x-2 mb-1.5">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                    <span>Job Title</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Software Engineer"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 rounded-xl p-3 outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 mb-1.5">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                    <span>Company / Department</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Acme Corp"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 rounded-xl p-3 outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 mb-1.5">
                                    <Terminal className="w-4 h-4 text-gray-400" />
                                    <span>Required Skills (CSV)</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. React, Node, SQL"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 rounded-xl p-3 outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 mb-1.5">
                                    <AlignLeft className="w-4 h-4 text-gray-400" />
                                    <span>Job Description</span>
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Paste full description here..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 rounded-xl p-3 outline-none resize-none"
                                ></textarea>
                            </div>

                            <PrimaryButton type="submit" className="mt-4">
                                Create Job Post
                            </PrimaryButton>
                        </form>
                    </DashboardCard>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className={designSystem.typography.sectionHeading + " mb-2"}>Active Postings ({jobs.length})</h3>
                    {jobs.length > 0 ? jobs.map((job, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h4>
                                    <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 space-x-2 mb-3">
                                        <Building2 className="w-4 h-4 text-emerald-500" />
                                        <span>{job.company}</span>
                                    </span>
                                </div>
                                <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full border border-indigo-100 dark:border-indigo-800">
                                    {job.status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                                <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase block mb-1">Requirements</span>
                                {job.skills}
                            </p>

                            <div className="flex items-center justify-between text-xs font-medium text-gray-400 dark:text-gray-500">
                                <div className="flex items-center space-x-1.5">
                                    <CalendarClock className="w-4 h-4" />
                                    <span>Posted {job.date}</span>
                                </div>
                                <button className="text-blue-600 dark:text-blue-400 hover:underline">View Candidates</button>
                            </div>
                        </div>
                    )) : (
                        <DashboardCard className="flex flex-col items-center justify-center p-12 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                            <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                            <h3 className={designSystem.typography.sectionHeading}>No active jobs</h3>
                            <p className={designSystem.typography.body}>Create a posting on the left panel to begin.</p>
                        </DashboardCard>
                    )}
                </div>
            </div>
        </SectionContainer>
    );
};

export default Jobs;
