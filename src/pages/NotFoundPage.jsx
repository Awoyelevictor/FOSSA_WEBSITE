import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Atom, Compass, FlaskConical, Home, Orbit, Sparkles } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5 py-16 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-12rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-700/20" />
        <div className="absolute bottom-[-12rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-700/20" />
        <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(#818cf8_1px,transparent_1px)] [background-size:26px_26px] dark:opacity-[0.12]" />
      </div>

      <section className="mx-auto w-full max-w-4xl text-center">
        <Link to="/" className="mb-12 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-sm font-black tracking-tight text-white">F</span>
          <span className="text-left">
            <span className="block text-sm font-extrabold tracking-wide">FOSSA</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Science Students Association</span>
          </span>
        </Link>

        <div className="relative mx-auto mb-7 flex h-56 max-w-xl items-center justify-center sm:h-64">
          <div className="absolute h-44 w-44 rounded-full border border-indigo-300/70 dark:border-indigo-500/30 sm:h-52 sm:w-52" />
          <div className="absolute h-56 w-72 rotate-[-24deg] rounded-[50%] border border-dashed border-violet-300 dark:border-violet-500/40 sm:h-64 sm:w-96" />
          <div className="absolute left-[16%] top-[20%] grid h-10 w-10 place-items-center rounded-2xl bg-white text-indigo-600 shadow-lg shadow-indigo-900/10 dark:bg-slate-800 dark:text-indigo-300">
            <Atom size={21} />
          </div>
          <div className="absolute right-[15%] top-[27%] grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-200">
            <Sparkles size={17} />
          </div>
          <div className="absolute bottom-[12%] left-[25%] grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300">
            <FlaskConical size={16} />
          </div>
          <div className="relative select-none bg-gradient-to-br from-indigo-500 via-violet-600 to-fuchsia-500 bg-clip-text text-[7rem] font-black leading-none tracking-[-0.09em] text-transparent drop-shadow-sm sm:text-[9rem]">
            404
          </div>
          <div className="absolute bottom-2 right-[18%] rounded-full border border-indigo-100 bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 dark:text-indigo-300">
            <Orbit className="mr-1 inline-block" size={13} /> Off the map
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Compass size={14} /> Unknown territory
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Oops! This page went on a field trip.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            We searched the lab, checked the orbit, and still couldn’t find it. The link may be broken, or the page may have moved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30">
              <Home size={17} /> Back to FOSSA Home <ArrowRight size={16} />
            </Link>
            <button type="button" onClick={() => navigate(-1)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800">
              <ArrowLeft size={17} /> Go back
            </button>
          </div>
          <p className="mt-8 text-xs font-medium text-slate-500 dark:text-slate-400">FOSSA · Curious minds, brighter futures.</p>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
