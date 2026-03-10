import { useState, useEffect } from 'react';
import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { PrimaryButton } from '../components/ui/Button';
import { Briefcase, Building2, Terminal, AlignLeft, CalendarClock, Trash2, MapPin, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { designSystem } from '../utils/designSystem';
import { getJobs, createJob, deleteJob, getJobRecommendations, getCandidates } from '../services/api';



const Jobs = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [skills, setSkills] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [applyUrl, setApplyUrl] = useState('');
    const [jobs, setJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
            
            const candidatesData = await getCandidates();
            if (candidatesData && candidatesData.length > 0) {
                const latestCandidate = candidatesData[0];
                if (latestCandidate.skills && latestCandidate.skills.length > 0) {
                    const recs = await getJobRecommendations(latestCandidate.skills);
                    setRecommendedJobs(recs.jobs || []);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job posting?")) return;
        try {
            await deleteJob(id);
            setJobs(jobs.filter(j => j._id !== id));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const newJob = await createJob({ title, company, skills, description, location, applyUrl });
            setJobs([newJob, ...jobs]);
            setTitle('');
            setCompany('');
            setSkills('');
            setDescription('');
            setLocation('');
            setApplyUrl('');
        } catch (error) {
            console.error("Error creating job:", error);
        } finally {
            setSubmitting(false);
        }
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
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span>Location</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Remote, San Francisco"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-indigo-500 rounded-xl p-3 outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 mb-1.5">
                                    <LinkIcon className="w-4 h-4 text-gray-400" />
                                    <span>Apply URL (Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="e.g. https://company.com/apply"
                                    value={applyUrl}
                                    onChange={(e) => setApplyUrl(e.target.value)}
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

                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <h3 className={designSystem.typography.sectionHeading + " mb-2"}>Active Postings ({jobs.length})</h3>
                        {jobs.length > 0 ? jobs.map((job, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h4>
                                        <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 space-x-4 mb-3">
                                            <span className="flex items-center space-x-1.5">
                                                <Building2 className="w-4 h-4 text-emerald-500" />
                                                <span>{job.company}</span>
                                            </span>
                                            {job.location && (
                                                <span className="flex items-center space-x-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{job.location}</span>
                                                </span>
                                            )}
                                        </div>
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
                                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button className="text-blue-600 dark:text-blue-400 hover:underline">View Candidates</button>
                                        <button
                                            onClick={() => handleDelete(job._id)}
                                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                                            title="Delete Job"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <DashboardCard className="flex flex-col items-center justify-center p-12 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                                <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                                <h3 className={designSystem.typography.sectionHeading}>No jobs posted yet.</h3>
                                <p className={designSystem.typography.body}>Recommended jobs based on the candidate's resume are shown below.</p>
                            </DashboardCard>
                        )}
                    </div>

                    {recommendedJobs.length > 0 && (
                        <div className="space-y-4">
                            <h3 className={designSystem.typography.sectionHeading + " mb-2"}>Recommended Jobs for Candidate</h3>
                            {recommendedJobs.map((job, idx) => (
                                <div key={idx} className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border shadow-sm transition-shadow ${job.matchScore >= 70 ? 'border-indigo-500 dark:border-indigo-500' : 'border-gray-100 dark:border-gray-700'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">{job.title}</h4>
                                            <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 space-x-4">
                                                <span className="flex items-center space-x-1.5">
                                                    <Building2 className="w-4 h-4 text-emerald-500" />
                                                    <span>{job.company}</span>
                                                </span>
                                                {job.location && (
                                                    <span className="flex items-center space-x-1.5">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{job.location}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1.5 rounded-full text-sm font-bold border ${job.matchScore >= 70 ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800' : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>
                                            Match Score: {job.matchScore}%
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-5">
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                                            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase block mb-1">Matched Skills</span>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-300">
                                                {job.matchedSkills.length > 0 ? job.matchedSkills.join(', ') : 'None'}
                                            </p>
                                        </div>
                                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800/30">
                                            <span className="text-red-700 dark:text-red-400 text-xs font-semibold uppercase block mb-1">Missing Skills</span>
                                            <p className="text-sm text-red-600 dark:text-red-300">
                                                {job.missingSkills.length > 0 ? job.missingSkills.join(', ') : 'None'}
                                            </p>
                                        </div>
                                    </div>

                                    {job.applyUrl && (
                                        <div className="flex justify-end mt-2">
                                            <a 
                                                href={job.applyUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                                            >
                                                Apply Now
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </SectionContainer>
    );
};

export default Jobs;
