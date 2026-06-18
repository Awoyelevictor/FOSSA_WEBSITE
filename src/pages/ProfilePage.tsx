import React, { useState } from 'react';
import { ChevronDown } from '../components/animate-ui/icons/chevron-down';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('Personal Information');
    const [academicSaved, setAcademicSaved] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);
    const [personalSaved, setPersonalSaved] = useState(false);

    // Form states
    const [department, setDepartment] = useState('Computer Science');
    const [level, setLevel] = useState('300 Level');
    const [studentId, setStudentId] = useState('FOSSA/CSC/23/0488');
    const [gpa, setGpa] = useState('4.85');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSaveAcademic = (e: React.FormEvent) => {
        e.preventDefault();
        setAcademicSaved(true);
        setTimeout(() => setAcademicSaved(false), 3000);
    };

    const handleSavePersonal = (e: React.FormEvent) => {
        e.preventDefault();
        setPersonalSaved(true);
        setTimeout(() => setPersonalSaved(false), 3000);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('New password and confirm password do not match.');
            return;
        }
        setPasswordError('');
        setPasswordSaved(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSaved(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto w-full pb-10 text-left">
            {/* Header */}
            <AnimateIn direction="down" delay={0.05} className="mb-8 hidden lg:block">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-sm border border-indigo-800 flex-shrink-0">
                        <span className="font-serif font-bold text-lg">AU</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            <AnimatedText text="Profile" />
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">View and update your profile information.</p>
                    </div>
                </div>
            </AnimateIn>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <AnimateIn direction="left" delay={0.1}>
                        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-6 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800 mb-6">
                            <img 
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" 
                                alt="User Profile" 
                                className="w-24 h-24 rounded-full object-cover shadow-sm border-4 border-white dark:border-slate-700 mb-4"
                                referrerPolicy="no-referrer"
                            />
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Goodluck E.</h2>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Computer Science</p>
                        </div>

                        <div className="space-y-1">
                            <button 
                                onClick={() => setActiveTab('Personal Information')}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'Personal Information' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-900'}`}
                            >
                                Personal Information
                            </button>
                            <button 
                                onClick={() => setActiveTab('Academic Information')}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'Academic Information' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-900'}`}
                            >
                                Academic Information
                            </button>
                            <button 
                                onClick={() => setActiveTab('Change Password')}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'Change Password' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-slate-900'}`}
                            >
                                Change Password
                            </button>
                        </div>
                    </AnimateIn>
                </div>

                {/* Content Area */}
                <div className="flex-grow">
                    <AnimateIn direction="up" delay={0.15} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                        {activeTab === 'Personal Information' && (
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Personal Information</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            defaultValue="Goodluck E."
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            defaultValue="goodluck@example.com"
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            defaultValue="+234 800 123 4567"
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Gender</label>
                                        <div className="relative">
                                            <select className="appearance-none bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 ml-1">Profile Picture</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-indigo-900 rounded-full flex flex-col items-center justify-center text-white border-2 border-slate-100 dark:border-slate-800">
                                                <span className="font-serif font-bold">AU</span>
                                            </div>
                                            <button className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-bold text-sm rounded-xl transition-colors">
                                                Upload New Picture
                                            </button>
                                        </div>
                                    </div>
                                    {personalSaved && (
                                        <div className="p-4 mb-4 text-sm text-emerald-800 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/50">
                                            ✓ Personal details updated successfully!
                                        </div>
                                    )}
                                    <div className="pt-6 flex justify-end">
                                        <button onClick={(e) => handleSavePersonal(e)} className="px-8 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Academic Information' && (
                            <form onSubmit={handleSaveAcademic}>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Academic Information</h3>
                                {academicSaved && (
                                    <div className="p-4 mb-6 text-sm text-emerald-800 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/50 animate-fade-in">
                                        ✓ Academic record updated successfully!
                                    </div>
                                )}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Department</label>
                                        <div className="relative">
                                            <select 
                                                value={department} 
                                                onChange={(e) => setDepartment(e.target.value)} 
                                                className="appearance-none bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                                            >
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Microbiology">Microbiology</option>
                                                <option value="Physics">Physics</option>
                                                <option value="Biochemistry">Biochemistry</option>
                                                <option value="Mathematics">Mathematics</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Level of Study</label>
                                        <div className="relative">
                                            <select 
                                                value={level} 
                                                onChange={(e) => setLevel(e.target.value)} 
                                                className="appearance-none bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full pl-4 pr-10 py-3 focus:outline-none transition-all font-semibold cursor-pointer"
                                            >
                                                <option value="100 Level">100 Level</option>
                                                <option value="200 Level">200 Level</option>
                                                <option value="300 Level">300 Level</option>
                                                <option value="400 Level">400 Level</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                <ChevronDown className="h-4 w-4" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Student Registration ID</label>
                                        <input 
                                            type="text" 
                                            value={studentId}
                                            onChange={(e) => setStudentId(e.target.value)}
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Current CGPA Reference</label>
                                        <input 
                                            type="text" 
                                            value={gpa}
                                            onChange={(e) => setGpa(e.target.value)}
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <button type="submit" className="px-8 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                                            Save Academic Record
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {activeTab === 'Change Password' && (
                            <form onSubmit={handleChangePassword}>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Change Password</h3>
                                {passwordSaved && (
                                    <div className="p-4 mb-6 text-sm text-emerald-800 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/50 animate-fade-in">
                                        ✓ Password updated successfully!
                                    </div>
                                )}
                                {passwordError && (
                                    <div className="p-4 mb-6 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-red-950/30 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/50 animate-fade-in">
                                        ⚠ {passwordError}
                                    </div>
                                )}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Current Password</label>
                                        <input 
                                            type="password" 
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">New Password</label>
                                        <input 
                                            type="password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white text-sm rounded-xl block w-full px-4 py-3 focus:outline-none transition-all font-semibold"
                                        />
                                    </div>
                                    <div className="pt-6 flex justify-end">
                                        <button type="submit" className="px-8 py-3.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
};
