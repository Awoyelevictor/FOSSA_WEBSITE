import React from 'react';
import { Hero } from '../components/Hero';
import { ExecutiveAvatarGroup } from '../components/ExecutiveAvatarGroup';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '../components/animate-ui/components/headless/accordion';
import { 
  GraduationCap as LucideGraduationCap, 
  BookOpen as LucideBookOpen, 
  Terminal as LucideTerminal, 
  FlaskConical as LucideFlaskConical, 
  MessageSquare as LucideMessageSquare,
  ArrowRight
} from 'lucide-react';
import { Users } from "../components/animate-ui/icons/users";
import { Clock as Calendar } from "../components/animate-ui/icons/clock";
import { ClipboardList as BookOpen } from "../components/animate-ui/icons/clipboard-list";
import { ClipboardList as FileText } from "../components/animate-ui/icons/clipboard-list";
import { Star as FlaskConical } from "../components/animate-ui/icons/star";
import { Lock } from "../components/animate-ui/icons/lock";
import { Binary } from "../components/animate-ui/icons/binary";
import { Link } from 'react-router-dom';
import { AnimateStaggerContainer, AnimateStaggerItem, AnimateIn } from '../components/AnimateLoad';
import { ScrollReveal } from '../components/ScrollReveal';
import { GlareHover } from '../components/GlareHover';

export const HomePage = () => {
    return (
        <main className="pb-24 md:pb-0 text-left">
            <Hero />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-[-2rem] relative z-20 mb-12">
                <AnimateIn direction="up" delay={0.1} className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <AnimateStaggerContainer delay={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <AnimateStaggerItem className="flex flex-col items-center">
                            <Users className="w-7 h-7 md:w-8 md:h-8 text-indigo-500 mb-2" animateOnHover={true} animateOnTap={true} />
                            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white">6+</h3>
                            <p className="text-[0.65rem] md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Departments</p>
                        </AnimateStaggerItem>
                        <AnimateStaggerItem className="flex flex-col items-center">
                            <LucideGraduationCap className="w-7 h-7 md:w-8 md:h-8 text-purple-500 mb-2" />
                            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white">2000+</h3>
                            <p className="text-[0.65rem] md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Students</p>
                        </AnimateStaggerItem>
                        <AnimateStaggerItem className="flex flex-col items-center">
                            <Calendar className="w-7 h-7 md:w-8 md:h-8 text-blue-500 mb-2" animateOnHover={true} animateOnTap={true} />
                            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white">30+</h3>
                            <p className="text-[0.65rem] md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Events Annually</p>
                        </AnimateStaggerItem>
                        <AnimateStaggerItem className="flex flex-col items-center">
                            <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-rose-500 mb-2" animateOnHover={true} animateOnTap={true} />
                            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white">100+</h3>
                            <p className="text-[0.65rem] md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Resources</p>
                        </AnimateStaggerItem>
                    </AnimateStaggerContainer>
                </AnimateIn>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-12">
                   {/* About FOSSA Section */}
                   <AnimateIn direction="up" delay={0.15}>
                       <section>
                           <h2 className="text-[1.1rem] md:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">About FOSSA</h2>
                           <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 grid md:grid-cols-2 gap-8 items-center">
                               <div>
                                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Who We Are</h3>
                                   <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">We are the united voice of science students, dedicated to academic excellence, leadership development, and community impact.</p>
                                   <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                       Learn More About Us
                                   </Link>
                               </div>
                               <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&h=350&auto=format&fit=crop" className="rounded-3xl w-full h-64 object-cover hover:scale-[1.01] transition-transform duration-500" alt="About FOSSA" referrerPolicy="no-referrer" />
                           </div>
                       </section>
                   </AnimateIn>

                   {/* Departments Section */}
                   <AnimateIn direction="up" delay={0.2}>
                       <section>
                            <h2 className="text-[1.1rem] md:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Explore Our Departments</h2>
                            <AnimateStaggerContainer delay={0.06} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[ {icon: Binary, name: 'Computer Science'}, {icon: FlaskConical, name: 'Physics'} ].map((dept, i) => (
                                    <AnimateStaggerItem key={i}>
                                        <GlareHover borderRadius="1.5rem" className="h-full">
                                            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center hover:border-indigo-500/30 transition-all duration-300 h-full">
                                                <dept.icon className="w-8 h-8 text-indigo-500 mb-4" animateOnHover={true} animateOnTap={true} />
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dept.name}</h3>
                                            </div>
                                        </GlareHover>
                                    </AnimateStaggerItem>
                                ))}
                            </AnimateStaggerContainer>
                       </section>
                   </AnimateIn>

                   {/* Faculty FAQs Accordion Section */}
                   <AnimateIn direction="up" delay={0.24}>
                       <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800/80">
                           <div className="mb-6 text-left">
                               <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1">Faculty Handbook</span>
                               <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-sans">Frequently Answered Queries</h2>
                               <p className="text-xs text-slate-550 dark:text-slate-400 mt-1 font-semibold leading-relaxed">Swift answers regarding FOSSA membership, syllabi, past archives, and diagnostic labs.</p>
                           </div>

                            <Accordion className="space-y-1 text-left">
                               <AccordionItem className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                                   <AccordionButton className="py-3.5 text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline transition-colors focus:outline-none flex items-center justify-between">
                                       <span className="flex items-center gap-2.5">
                                           <LucideGraduationCap className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                                           <span>What is FOSSA and who can join?</span>
                                       </span>
                                   </AccordionButton>
                                   <AccordionPanel className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pb-3.5 font-semibold pl-7">
                                       FOSSA stands for the Faculty of Science Students Association at Adeleke University. All students enrolled across our 6 departments (Computer Science, Microbiology, Physics, Biochemistry, Mathematics, and Chemistry) are automatic members and eligible to participate in our events, elections, and academic pools.
                                   </AccordionPanel>
                               </AccordionItem>

                               <AccordionItem className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                                   <AccordionButton className="py-3.5 text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline transition-colors focus:outline-none flex items-center justify-between">
                                       <span className="flex items-center gap-2.5">
                                           <LucideBookOpen className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                                           <span>How do I access lecture notes & past archives?</span>
                                       </span>
                                   </AccordionButton>
                                   <AccordionPanel className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pb-3.5 font-semibold pl-7">
                                       Students can log in to their student portal by clicking on the "Login to Access Resources" or "My Portal" tabs. If you don't have login credentials, kindly register or contact the departmental representative or the FOSSA secretariat office, room 102 Block B.
                                   </AccordionPanel>
                               </AccordionItem>

                               <AccordionItem className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                                   <AccordionButton className="py-3.5 text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline transition-colors focus:outline-none flex items-center justify-between">
                                       <span className="flex items-center gap-2.5">
                                           <LucideTerminal className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                           <span>Are there hackathons & practical workshops?</span>
                                       </span>
                                   </AccordionButton>
                                   <AccordionPanel className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pb-3.5 font-semibold pl-7">
                                       Absolutely! In collaboration with external corporate tech bodies and research laboratories, FOSSA hosts several flagship programs annually—including the 24-hour engineering hackathons and diagnostic virus mapping workshops. Visit the Events Calendar page to secure your seat tickets.
                                   </AccordionPanel>
                               </AccordionItem>

                               <AccordionItem className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                                   <AccordionButton className="py-3.5 text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline transition-colors focus:outline-none flex items-center justify-between">
                                       <span className="flex items-center gap-2.5">
                                           <LucideFlaskConical className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                                           <span>What are the laboratory safety regulations?</span>
                                       </span>
                                   </AccordionButton>
                                   <AccordionPanel className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pb-3.5 font-semibold pl-7">
                                       To maintain state-of-the-art diagnostic integrity, all students accessing computation or biological laboratories MUST wear clean lab coats, sterile disposable gloves, and protective eyewear. Safe procedures must be conducted only under supervised instruction from research H.O.D.s or assistants.
                                   </AccordionPanel>
                               </AccordionItem>

                               <AccordionItem className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                                   <AccordionButton className="py-3.5 text-left font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base hover:text-indigo-600 dark:hover:text-indigo-400 hover:no-underline transition-colors focus:outline-none flex items-center justify-between">
                                       <span className="flex items-center gap-2.5">
                                           <LucideMessageSquare className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                                           <span>How do I submit suggestions or feedback?</span>
                                       </span>
                                   </AccordionButton>
                                   <AccordionPanel className="text-xs md:text-sm text-slate-550 dark:text-slate-400 leading-relaxed pb-3.5 font-semibold pl-7">
                                       We welcome suggestions, feedback, and student welfare reports. Please navigate to our Contact page to transmit a direct ticket request to the FOSSA Secretariat, and an administrative representative will respond to your registered email directory.
                                   </AccordionPanel>
                               </AccordionItem>
                            </Accordion>
                       </section>
                   </AnimateIn>
                </div>
                
                <div className="space-y-12">
                   {/* Academic Resources */}
                    <AnimateIn direction="up" delay={0.22}>
                        <section>
                            <h2 className="text-[1.1rem] md:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Academic Resources</h2>
                            <AnimateStaggerContainer delay={0.05} className="grid grid-cols-1 gap-3 mb-6">
                                <AnimateStaggerItem>
                                    <GlareHover borderRadius="1.5rem">
                                        <Link to="/dashboard" className="bg-white dark:bg-slate-900 rounded-3xl pb-6 p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center relative group hover:border-indigo-400 transition-colors block w-full">
                                            <div className="w-12 h-12 bg-indigo-50/50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex items-center justify-center mb-3">
                                                <FileText className="w-5 h-5 text-indigo-500" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                            <h3 className="text-[0.65rem] md:text-sm font-bold text-slate-700 dark:text-slate-200">Past Questions</h3>
                                            <Lock className="w-3 h-3 text-slate-400 absolute bottom-3 right-3" animateOnHover={true} animateOnTap={true} />
                                        </Link>
                                    </GlareHover>
                                </AnimateStaggerItem>
                                <AnimateStaggerItem>
                                    <GlareHover borderRadius="1.5rem">
                                        <Link to="/dashboard" className="bg-white dark:bg-slate-900 rounded-3xl pb-6 p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center relative group hover:border-purple-400 transition-colors block w-full">
                                            <div className="w-12 h-12 bg-purple-50/50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-900/50 rounded-2xl flex items-center justify-center mb-3">
                                                <BookOpen className="w-5 h-5 text-purple-500" animateOnHover={true} animateOnTap={true} />
                                            </div>
                                            <h3 className="text-[0.65rem] md:text-sm font-bold text-slate-700 dark:text-slate-200">Lecture Notes</h3>
                                            <Lock className="w-3 h-3 text-slate-400 absolute bottom-3 right-3" animateOnHover={true} animateOnTap={true} />
                                        </Link>
                                    </GlareHover>
                                </AnimateStaggerItem>
                            </AnimateStaggerContainer>
                            <div className="flex justify-center">
                                <Link to="/dashboard" className="w-full px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-50 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl text-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Login to Access Resources</Link>
                            </div>
                        </section>
                    </AnimateIn>

                    {/* Gallery Preview */}
                    <AnimateIn direction="up" delay={0.25}>
                        <section>
                            <h2 className="text-[1.1rem] md:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Gallery Preview</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=300&h=200&auto=format&fit=crop" className="rounded-2xl h-24 w-full object-cover shadow-sm hover:scale-105 transition-all" alt="Gallery" referrerPolicy="no-referrer" />
                                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=300&h=200&auto=format&fit=crop" className="rounded-2xl h-24 w-full object-cover shadow-sm hover:scale-105 transition-all" alt="Gallery" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex justify-center mt-6">
                                <Link to="/gallery" className="w-full px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-indigo-50 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl text-center text-sm hover:bg-slate-50 dark:hover:bg-slate-800">View Full Gallery</Link>
                            </div>
                        </section>
                    </AnimateIn>
                </div>
            </div>

            {/* CTA Banner */}
            <AnimateIn direction="up" delay={0.28}>
                <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mt-12 mb-12">
                    <div className="bg-[#2e1065] dark:bg-indigo-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
                        <FlaskConical className="absolute -left-10 md:left-10 opacity-10 w-48 h-48 bottom-0 translate-y-1/4" animateOnHover={true} animateOnTap={true} />
                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-xl md:text-3xl font-extrabold mb-2 text-center max-w-xs md:max-w-md leading-snug">Become Part of the Science Community</h2>
                            <p className="text-lg mb-6">Join Fusana now.</p>
                            <Link to="/join" className="w-full sm:w-auto px-10 py-4 bg-white text-[#2e1065] font-bold rounded-xl text-center shadow-lg text-sm hover:scale-105 transition-transform duration-200">Join FOSSA Now</Link>
                        </div>
                    </div>
                </section>
            </AnimateIn>

            {/* Scroll Reveal Quote Block */}
            <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mt-12 mb-6">
                <div className="px-6 md:px-12 py-16 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/85 rounded-[2.5rem] text-center shadow-sm">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] mb-4">Academic Motto</p>
                    <ScrollReveal
                        baseOpacity={0.15}
                        enableBlur={true}
                        baseRotation={2}
                        blurStrength={8}
                        containerClassName="max-w-4xl mx-auto"
                        textClassName="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight"
                    >
                        Knowledge is power, but the pursuit of understanding is the true engine of human progress and societal transformation.
                    </ScrollReveal>
                </div>
            </section>

            <AnimateIn direction="up" delay={0.32}>
                <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mt-12 mb-20">
                    <section className="p-8 md:p-12 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 rounded-[2rem] transition-all duration-300 text-center flex flex-col items-center shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-10 gap-4 text-center md:text-left">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">FOSSA Executives</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Meet the inspiring leaders steering the science faculty community.</p>
                            </div>
                            <Link to="/executives" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline group text-sm md:text-base">
                                View All Executives <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                            </Link>
                        </div>
                        <div className="w-full flex justify-center py-6 overflow-visible">
                            <ExecutiveAvatarGroup />
                        </div>
                    </section>
                </div>
            </AnimateIn>
        </main>
    );
};
