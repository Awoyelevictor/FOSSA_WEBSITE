import React from 'react';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText } from '../components/AnimateLoad';
import { ChevronRight } from '../components/animate-ui/icons/chevron-right';
import { Sparkles } from '../components/animate-ui/icons/sparkles';

export const DepartmentsPage = () => {
    const departments = [
        {
            name: "Computer Science",
            tagline: "Computing & Software Systems",
            description: "Explore the frontiers of artificial intelligence, software engineering, cybersecurity, and algorithms. Empowering students with rigorous computational thinking and state-of-the-art analytical tools.",
            hod: "Prof. Adeleke J. O.",
            labs: "4 High-spec Computation Labs",
            courses: ["Data Structures", "Web Architectures", "Machine Learning", "Information Networks"],
            color: "border-indigo-550 dark:border-indigo-500",
            bgIcon: "text-indigo-600/10 bg-indigo-50 dark:bg-indigo-950/30"
        },
        {
            name: "Microbiology",
            tagline: "Pathogens, Immunology & Biotech",
            description: "Dive into micro-organic pathways, genetics, food security, disease control, and biomedical breakthroughs using advanced microbiological culture techniques and biosafety laboratories.",
            hod: "Dr. Mrs. Evelyn T.",
            labs: "3 Sterile Diagnostic Suites",
            courses: ["Medical Virology", "Mycology", "Applied Industrial Genetics", "Bioremediation"],
            color: "border-emerald-550 dark:border-emerald-500",
            bgIcon: "text-emerald-600/10 bg-emerald-50 dark:bg-emerald-950/30"
        },
        {
            name: "Physics",
            tagline: "Theoretical energy & materials",
            description: "Unravel mathematical realities, optics, acoustics, solid-state electronics, geophysics, and quantum mechanics, bridging the physical universe with state-of-the-art laboratory research.",
            hod: "Prof. Alabi Johnson",
            labs: "2 Laser & Thermoelectric Laboratories",
            courses: ["Quantum Mechanics", "Electrodynamics", "Solid State Physics", "Biophysics"],
            color: "border-purple-550 dark:border-purple-500",
            bgIcon: "text-purple-600/10 bg-purple-50 dark:bg-purple-950/30"
        },
        {
            name: "Biochemistry",
            tagline: "Metabolism & Molecular Bioscience",
            description: "Anaylze enzyme chemistry, clinical endocrinology, metabolism pathways, and clinical assays. Empowering students for pharmacological advancement and molecular biochemistry.",
            hod: "Dr. G. Adeoyele",
            labs: "3 Molecular Biochemistry Labs",
            courses: ["Enzymology", "Nucleic Acid Chemistry", "Nutritional Biochemistry", "Oncology Assays"],
            color: "border-rose-550 dark:border-rose-500",
            bgIcon: "text-rose-600/10 bg-rose-50 dark:bg-rose-950/30"
        },
        {
            name: "Mathematics",
            tagline: "Computational Mechanics & Stats",
            description: "Develop structural mathematical proofs, statistical frameworks, cryptography matrixes, and computational mechanics modeling tailored for industry analytical workflows.",
            hod: "Dr. Mrs. Susan T.",
            labs: "1 Actuarial Computing Lab",
            courses: ["Abstract Algebra", "Real Analysis", "Probability Theory", "Dynamical Equations"],
            color: "border-blue-550 dark:border-blue-500",
            bgIcon: "text-blue-600/10 bg-blue-50 dark:bg-blue-950/30"
        },
        {
            name: "Chemistry",
            tagline: "Industrial synthesis & Organic compounds",
            description: "Investigate organic polymers, physical analytics, metallurgy, environmental pollutants, and industrial chemical manufacturing using industry-ready mass spectroscopy equipment.",
            hod: "Prof. Thomas I.",
            labs: "2 Polymer Synthesis Suites",
            courses: ["Physical Chemistry", "Heterocyclic Synthetics", "Spectrometric Analysis", "Geochemistry"],
            color: "border-amber-550 dark:border-amber-500",
            bgIcon: "text-amber-600/10 bg-amber-50 dark:bg-amber-950/30"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 text-left">
            {/* Header section */}
            <div className="max-w-3xl mb-16">
                <AnimateIn direction="down" delay={0.05}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-905/30 border border-indigo-100 dark:border-indigo-900 rounded-full text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" animateOnHover={true} />
                        Academic Disciplines
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        <AnimatedText text="Faculty Departments" />
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg leading-relaxed font-medium">
                        Welcome to the intellectual branches of the Adeleke School of Science. We cultivate robust exploration, research initiatives, and professional mastery across six core departments.
                    </p>
                </AnimateIn>
            </div>

            {/* Department grid */}
            <AnimateStaggerContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {departments.map((dept, idx) => (
                    <AnimateStaggerItem key={idx}>
                        <div className={`p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[2rem] border-t-4 ${dept.color} border-x border-b border-rose-100/30 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group`}>
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-920 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                            {dept.name}
                                        </h3>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1">
                                            {dept.tagline}
                                        </p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${dept.bgIcon}`}>
                                        FOSSA
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                    {dept.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="font-extrabold text-slate-400">H.O.D:</span>
                                        <span className="font-bold">{dept.hod}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="font-extrabold text-slate-400">Facilities:</span>
                                        <span className="font-semibold">{dept.labs}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Core Syllabus Focus</h4>
                                <div className="flex flex-wrap gap-2">
                                    {dept.courses.map((course, cIdx) => (
                                        <span key={cIdx} className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800/80">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimateStaggerItem>
                ))}
            </AnimateStaggerContainer>
        </div>
    );
};
