import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Cross as Target } from "../components/animate-ui/icons/cross";
import { Sparkles as Telescope } from "../components/animate-ui/icons/sparkles";
import { CheckCheck as Shield } from "../components/animate-ui/icons/check-check";
import { Users } from "../components/animate-ui/icons/users";
import { PlugZap as Zap } from "../components/animate-ui/icons/plug-zap";
import { BadgeCheck as Award } from "../components/animate-ui/icons/badge-check";
import { ClipboardList as BookOpen } from "../components/animate-ui/icons/clipboard-list";
import { Link as LinkIcon } from "../components/animate-ui/icons/link";
import { Layers as Briefcase } from "../components/animate-ui/icons/layers";
import { Download } from "../components/animate-ui/icons/download";
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn, AnimatedText, AnimateReveal } from '../components/AnimateLoad';
import { ScrollReveal } from '../components/ScrollReveal';

export const AboutPage = () => {
    const coreValues = [
        { 
            title: 'Excellence', 
            description: 'We will continue to set our sights and standards high.', 
            icon: Award, 
            color: 'text-purple-600', 
            bg: 'bg-purple-100',
            darkColor: 'dark:text-purple-400',
            darkBg: 'dark:bg-purple-900/30'
        },
        { 
            title: 'Collegiality', 
            description: 'We will maintain an inclusive and supportive yet challenging environment that attracts the best students, staff and faculty, working together with mutual respect.', 
            icon: Users, 
            color: 'text-green-600', 
            bg: 'bg-green-100',
            darkColor: 'dark:text-green-400',
            darkBg: 'dark:bg-green-900/30'
        },
        { 
            title: 'Sustainability', 
            description: 'We will maintain our self-sufficiency by seeking efficiencies and being entrepreneurial in our approach to challenges.', 
            icon: Shield, 
            color: 'text-slate-600', 
            bg: 'bg-slate-100',
            darkColor: 'dark:text-slate-400',
            darkBg: 'dark:bg-slate-800'
        },
        { 
            title: 'Achievement', 
            description: 'We will capitalise on our distinctive strengths and unique opportunities to excel in an increasingly competitive world.', 
            icon: Briefcase, 
            color: 'text-amber-600', 
            bg: 'bg-amber-100',
            darkColor: 'dark:text-amber-400',
            darkBg: 'dark:bg-amber-900/30'
        },
        { 
            title: 'Innovation', 
            description: 'We will be creative in our efforts to achieve our objectives.', 
            icon: Zap, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            darkColor: 'dark:text-blue-400',
            darkBg: 'dark:bg-blue-900/30'
        },
        { 
            title: 'Collaboration', 
            description: 'We will initiate mutually beneficial relationships with a variety of partners to ensure development of facilities, programmes and research for community development and service.', 
            icon: LinkIcon, 
            color: 'text-indigo-600', 
            bg: 'bg-indigo-100',
            darkColor: 'dark:text-indigo-400',
            darkBg: 'dark:bg-indigo-900/30'
        },
        { 
            title: 'Relevance', 
            description: 'We will seek to continually improve our programs, ensuring that they are appealing and well suited to the society and development, equipping our graduates for successful career and future.', 
            icon: Target, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-100',
            darkColor: 'dark:text-emerald-400',
            darkBg: 'dark:bg-emerald-900/30'
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 text-left">
            
            {/* Hero Section */}
            <section className="mb-16">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <AnimateIn direction="down" delay={0.05}>
                            <p className="text-indigo-700 dark:text-indigo-400 font-semibold text-sm mb-4 uppercase tracking-wider">About The Faculty</p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                <AnimatedText text="About the Faculty of Science" />
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
                                The Faculty of Science at Adeleke University is committed to excellence in teaching, research, innovation and community impact. We provide a dynamic environment where knowledge thrives and future leaders are built.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <Shield className="w-5 h-5 text-indigo-700 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
                                <span className="font-semibold text-slate-900 dark:text-white text-sm">Adeleke University</span>
                            </div>
                        </AnimateIn>
                    </div>
                    <div className="flex-1 w-full">
                        <AnimateIn direction="scale" delay={0.15}>
                            <img 
                                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" 
                                alt="Faculty Building" 
                                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3] transform hover:scale-[1.02] transition-transform duration-500"
                                referrerPolicy="no-referrer"
                             />
                        </AnimateIn>
                    </div>
                </div>
            </section>

            {/* Scroll Reveal Quote Block */}
            <AnimateIn direction="up" delay={0.2}>
                <section className="my-16 px-6 md:px-12 py-16 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/85 rounded-[2.5rem] text-center shadow-sm">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] mb-4">Core Philosophy</p>
                    <ScrollReveal
                        baseOpacity={0.15}
                        enableBlur={true}
                        baseRotation={2}
                        blurStrength={8}
                        containerClassName="max-w-4xl mx-auto"
                        textClassName="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-105 leading-relaxed tracking-tight"
                    >
                        Science is not merely a collection of facts; it is a quest for persistent truth, an active culture of infinite innovation, and a collaborative journey to shape the future of our society in an increasingly complex world.
                    </ScrollReveal>
                </section>
            </AnimateIn>

            {/* About the Faculty Content */}
            <AnimateIn direction="up" delay={0.2} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 mb-12 shadow-sm transition-colors duration-200">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About the Faculty</h2>
                <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-[1.05rem]">
                    <p>
                        Science is an organized body of knowledge on a particular subject. The Faculty started as the School of Science and Technology at inception, consisting of programmes in Agricultural Sciences, Health Sciences, and Science and Technology. In 2013 the then School of Science and Technology birthed two other Schools and was hence split into three in line with the programmes mounted. Consequently, we had the School of Agricultural Sciences, School of Health Sciences and School of Science and Technology without defined departments.
                    </p>
                    <p>
                        In 2016, under the Vice Chancellorship of Prof. Abdallah Uba Adamu, the University adopted the faculty system with defined departments and the School of Science and Technology metamorphosed into the Faculty of Sciences. The Faculty of Sciences has four departments namely; Department of Computer Science, Department of Environmental Sciences, Department of Mathematics and, the Department of Pure and Applied Sciences. The handbook gives an overview of the different programmes mounted by the different departments of the Faculty. It provides a summary of the course outline and details of the curriculum to cover.
                    </p>
                    <p>
                        It also provides information on graduation requirements and it is a must-have for any serious-minded student of the Faculty of Sciences. The faculty handbook also contains information related to student registration, choice of courses, programme duration, graduation requirements, together with other relevant matters that will enhance the students understanding of the Faculty and its programmes as well as job prospects. Contained also in the handbook, is a brief history of Adeleke University.
                    </p>
                    <p>
                        It is therefore quite expedient that all students of the Faculty of Sciences have a copy of this handbook, which will also assist them in decision making. For those who may be planning to undertake a programme in our faculty of excellence, this handbook also comes in handy. Our programmes are tailored towards lifelong learning because we believe there should be no impediment to learning. Programmes curricula are geared at ensuring access to as many people as qualify to pursue knowledge in the science domain and enhance national development. I, therefore, welcome you to the Faculty of Sciences, the faculty of excellence and the bedrock of national development.
                    </p>
                </div>
            </AnimateIn>

            {/* Vision and Mission */}
            <AnimateStaggerContainer delay={0.08} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Vision */}
                <AnimateStaggerItem>
                    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm flex flex-col h-full transition-colors duration-200 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                                <Telescope className="w-6 h-6 text-indigo-700 dark:text-indigo-400" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-0">Our Vision</h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg flex-grow">
                            Our vision is to be the foremost Faculty in terms of quality and relevance of curriculum, research and instruction, making science training available to and accessible by all at competitive yet affordable cost on the open distance learning platform.
                        </p>
                    </section>
                </AnimateStaggerItem>

                {/* Mission */}
                <AnimateStaggerItem>
                    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm flex flex-col h-full transition-colors duration-200 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-purple-700 dark:text-purple-400" animateOnHover={true} animateOnTap={true} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-0">Our Mission</h2>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white mb-4">The Faculty of Sciences is committed to:</p>
                            <ul className="space-y-4 text-left">
                                {[
                                    "Providing a comprehensive and relevant distance learning curriculum in science based programmes",
                                    "Producing well-informed graduates for careers in academia, industry and government",
                                    "Conducting high-quality research in science-related disciplines",
                                    "Encouraging and supporting strong cross-disciplinary, interdisciplinary, and multi-disciplinary collaborations both within and beyond the University (nationally and internationally)"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300">
                                        <div className="mt-1 w-5 h-5 bg-indigo-700 dark:bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </AnimateStaggerItem>
            </AnimateStaggerContainer>

            {/* Core Values */}
            <AnimateIn direction="up" delay={0.1}>
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 mb-12 shadow-sm transition-colors duration-200">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Our Core Values (Philosophy)</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-10">Our core values guide our actions, shape our culture and define our commitment to excellence.</p>
                    
                    <AnimateStaggerContainer delay={0.05} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreValues.map((value, idx) => (
                            <AnimateStaggerItem key={idx} className="flex gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-500/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors duration-300">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 ${value.bg} ${value.darkBg}`}>
                                    <value.icon className={`w-6 h-6 ${value.color} ${value.darkColor}`} animateOnHover={true} animateOnTap={true} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
                                </div>
                            </AnimateStaggerItem>
                        ))}
                    </AnimateStaggerContainer>
                </section>
            </AnimateIn>

            {/* Download Banner */}
            <AnimateIn direction="up" delay={0.15}>
                <section className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-200">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-24 bg-indigo-900 rounded shadow-lg flex items-center justify-center text-white flex-shrink-0 transform -rotate-2">
                            <BookOpen className="w-8 h-8 opacity-50" animateOnHover={true} animateOnTap={true} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Download Faculty Handbook</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">Get the complete guide to our programmes, course outlines, registration guidelines, graduation requirements and more.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-colors flex-shrink-0">
                        <Download className="w-5 h-5" animateOnHover={true} animateOnTap={true} />
                        <span>Download Handbook (PDF)</span>
                    </button>
                </section>
            </AnimateIn>
            
            {/* Social Connect */}
            <AnimateReveal delay={0.25}>
                <section className="text-center mt-12 pb-12">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Connect With Us</h3>
                    <div className="flex gap-4 justify-center">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </section>
            </AnimateReveal>

        </div>
    );
};
