import { useState, useEffect } from 'react';
import { SectionContainer } from '../components/ui/SectionContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { DashboardCard } from '../components/ui/DashboardCard';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Search, Filter, Users as UsersIcon } from 'lucide-react';
import { designSystem } from '../utils/designSystem';
import { getCandidates } from '../services/api';

const Candidates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterScore, setFilterScore] = useState('all');

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getCandidates();
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    // Filter logic
    const filteredCandidates = candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.skills && c.skills.join(',').toLowerCase().includes(searchTerm.toLowerCase()));

        const score = c.atsScore || 0;
        let matchesScore = true;
        if (filterScore === 'high') matchesScore = score >= 80;
        else if (filterScore === 'medium') matchesScore = score >= 50 && score < 80;
        else if (filterScore === 'low') matchesScore = score < 50;

        return matchesSearch && matchesScore;
    });

    return (
        <SectionContainer>
            <PageHeader
                title="Candidates"
                subtitle="Manage and review analyzed resumes."
                rightElement={
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={filterScore}
                                onChange={(e) => setFilterScore(e.target.value)}
                                className="pl-9 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-500 appearance-none"
                            >
                                <option value="all">All Scores</option>
                                <option value="high">&ge; 80 (High)</option>
                                <option value="medium">&ge; 50 (Medium)</option>
                                <option value="low">&lt; 50 (Low)</option>
                            </select>
                        </div>
                    </div>
                }
            />

            <DashboardCard className="p-0 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                ) : filteredCandidates.length > 0 ? (
                    <Table headers={["Candidate Name", "Email", "ATS Score", "Top Skills", "Upload Date", "Status"]}>
                        {filteredCandidates.map((c, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{c.name}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.atsScore >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                                        c.atsScore >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                        }`}>
                                        {c.atsScore || 0}%
                                    </span>
                                </TableCell>
                                <TableCell className="truncate max-w-xs">{c.skills ? c.skills.join(', ') : 'N/A'}</TableCell>
                                <TableCell>{new Date(c.uploadedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                                        {c.status || 'Analyzed'}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-700">
                            <UsersIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className={designSystem.typography.sectionHeading + " mb-2"}>No candidates analyzed yet</h3>
                        <p className={designSystem.typography.body + " max-w-sm"}>
                            Upload and analyze resumes to see candidates appear in this list along with their ATS scores and skill matches.
                        </p>
                    </div>
                )}
            </DashboardCard>
        </SectionContainer>
    );
};

export default Candidates;
