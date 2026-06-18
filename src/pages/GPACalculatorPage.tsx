import React, { useState } from 'react';
import { Plus } from '../components/animate-ui/icons/plus';
import { Trash2 } from '../components/animate-ui/icons/trash-2';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText, AnimateReveal } from '../components/AnimateLoad';

interface Course {
    id: number;
    code: string;
    title: string;
    unit: string;
    grade: string;
}

export const GPACalculatorPage = () => {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, code: 'CSC 101', title: 'Programming I', unit: '3', grade: 'A' },
        { id: 2, code: 'MTH 101', title: 'Calculus I', unit: '3', grade: 'B+' },
        { id: 3, code: 'PHY 101', title: 'General Physics I', unit: '2', grade: 'A' },
    ]);
    const [activeStep, setActiveStep] = useState(1);
    
    // Form state
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [grade, setGrade] = useState('');

    const handleAddCourse = () => {
        if (!code || !title || !unit || !grade) return;
        
        const newCourse: Course = {
            id: Date.now(),
            code,
            title,
            unit,
            grade
        };
        
        setCourses([...courses, newCourse]);
        setCode('');
        setTitle('');
        setUnit('');
        setGrade('');
    };

    const handleDelete = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const handleClearAll = () => {
        setCourses([]);
    };

    return (
        <div className="max-w-5xl mx-auto w-full pb-10">
            <AnimateIn direction="down" delay={0.05} className="mb-6 lg:mb-8 hidden lg:block text-left">
                <h1 className="text-2xl md:text-[1.75rem] font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-200">
                    <AnimatedText text="GPA Calculator" />
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Calculate your GPA easily and accurately.</p>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 md:p-8 shadow-sm mb-6 transition-colors duration-200">
                
                {/* Stepper */}
                <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl mb-8 overflow-x-auto">
                    <button className={`flex-1 min-w-[140px] px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 ${activeStep === 1 ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`} onClick={() => setActiveStep(1)}>1. Add Courses</button>
                    <button className={`flex-1 min-w-[140px] px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 ${activeStep === 2 ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`} onClick={() => setActiveStep(2)}>2. Enter Grades</button>
                    <button className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 ${activeStep === 3 ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`} onClick={() => { if (courses.length > 0) setActiveStep(3) }}>3. Result</button>
                </div>

                {activeStep === 1 && (
                    <div className="mb-10 text-left">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5">Add Courses</h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
                            <div className="md:col-span-3">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Course Code</label>
                                <input value={code} onChange={e => setCode(e.target.value)} type="text" placeholder="e.g. CSC 101" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors" />
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Course Title</label>
                                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="e.g. Programming I" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors" />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Unit</label>
                                <input value={unit} onChange={e => setUnit(e.target.value)} type="number" placeholder="e.g. 3" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors" />
                            </div>
                            <div className="col-span-1 md:col-span-3">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Grade</label>
                                <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900/50 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none transition-colors cursor-pointer">
                                    <option value="">Select...</option>
                                    <option value="A">A</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleAddCourse} disabled={!code || !title || !unit || !grade} className="flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
                                <Plus className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                                Add Course
                            </button>
                        </div>
                    </div>
                )}

                {activeStep === 1 && (
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Added Courses ({courses.length})</h3>
                        <div className="overflow-x-auto mb-8 border border-slate-100 dark:border-slate-800 rounded-2xl">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Course Code</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Course Title</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Unit</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Grade</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id} className="border-b last:border-b-0 border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200">{course.code}</td>
                                            <td className="py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">{course.title}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200">{course.unit}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200">{course.grade}</td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={() => handleDelete(course.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 inline-flex">
                                                    <Trash2 className="w-4 h-4" animateOnHover={true} animateOnTap={true} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {courses.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">No courses added yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
                            <button onClick={handleClearAll} className="w-full sm:w-auto px-6 py-3.5 border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm rounded-xl transition-colors">Clear All</button>
                            <button onClick={() => { if(courses.length > 0) setActiveStep(3) }} disabled={courses.length === 0} className="w-full sm:w-auto px-6 py-3.5 bg-indigo-700 disabled:opacity-50 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">Next, view Result</button>
                        </div>
                    </div>
                )}
                
                {activeStep === 2 && (
                    <div className="mb-4">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Enter Grades ({courses.length})</h3>
                        <div className="overflow-x-auto mb-8 border border-slate-100 dark:border-slate-800 rounded-2xl">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Course Code</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Course Title</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Unit</th>
                                        <th className="py-3 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">Update Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id} className="border-b last:border-b-0 border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200">{course.code}</td>
                                            <td className="py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">{course.title}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200">{course.unit}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-slate-900 dark:text-slate-200 w-48">
                                                <select 
                                                    value={course.grade} 
                                                    onChange={e => {
                                                        const updated = courses.map(c => c.id === course.id ? {...c, grade: e.target.value} : c);
                                                        setCourses(updated);
                                                    }}
                                                    className="w-full appearance-none bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none transition-colors cursor-pointer"
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="A">A</option>
                                                    <option value="B+">B+</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="D">D</option>
                                                    <option value="E">E</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {courses.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 font-medium">No courses added yet. Please go back to step 1.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                            <button onClick={() => setActiveStep(1)} className="w-full sm:w-auto px-6 py-3.5 border-2 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm rounded-xl transition-colors">Back to Add Courses</button>
                            <button onClick={() => { if(courses.length > 0) setActiveStep(3) }} disabled={courses.length === 0} className="w-full sm:w-auto px-6 py-3.5 bg-indigo-700 disabled:opacity-50 hover:bg-indigo-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">Calculate Result</button>
                        </div>
                    </div>
                )}
                
                {activeStep === 3 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Cumulative GPA</h2>
                        <div className="text-6xl font-black text-indigo-700 dark:text-indigo-400 my-6 tracking-tighter">
                            {(() => {
                                const weights: Record<string, number> = { 'A': 5, 'B+': 4.5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };
                                let totalUnits = 0;
                                let totalPoints = 0;
                                courses.forEach(c => {
                                    const u = parseFloat(c.unit) || 0;
                                    totalUnits += u;
                                    totalPoints += u * (weights[c.grade] || 0);
                                });
                                return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
                            })()}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">Based on {courses.length} courses and {courses.reduce((sum, c) => sum + (parseFloat(c.unit) || 0), 0)} total units calculated on a 5.0 scale.</p>
                        <button onClick={() => setActiveStep(1)} className="px-8 py-3.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-bold text-sm rounded-xl transition-colors">Go Back and Edit</button>
                    </div>
                )}

            </AnimateIn>
        </div>
    );
};
