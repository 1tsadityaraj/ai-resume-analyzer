import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 flex selection:bg-indigo-100 selection:text-indigo-900 font-sans transition-colors duration-200">
            <Sidebar />
            <div className="flex-1 ml-64 overflow-y-auto">
                <main className="max-w-7xl mx-auto px-6 py-8 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
