import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bell, CalendarDays, FileText, LogOut, Plus, RefreshCw, Send, Trash2, UploadCloud, ExternalLink, Clock3, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '../lib/adminApi';

const field = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white';
const emptyForm = { kind: 'material', title: '', category: 'Lecture Notes', description: '', url: '', courseCode: '', department: 'Computer Science', level: '100', year: '' };
const fmtDate = value => value ? new Date(value).toLocaleDateString() : '—';

export default function LecturerDashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const request = useCallback(async (method = 'GET', body) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) throw new Error('Your session has expired. Sign in again.');
    const response = await fetch('/api/lecturer', {
      method,
      headers: { Authorization: 'Bearer ' + token, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Lecturer request failed.');
    return result;
  }, []);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { navigate('/login', { replace: true }); return; }
      const response = await fetch('/api/auth/profile', { headers: { Authorization: 'Bearer ' + data.session.access_token } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Could not verify account.');
      if (result.role !== 'lecturer') { navigate(result.role === 'super_admin' ? '/admin' : '/dashboard', { replace: true }); return; }
      setProfile(result);
      const content = await request();
      setItems(content.items || []);
    } catch (e) { setError(e.message || 'Could not load lecturer dashboard.'); }
    finally { setLoading(false); }
  }, [navigate, request]);

  useEffect(() => {
    if (!supabase) { setLoading(false); setError('Authentication is not configured.'); return; }
    load();
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, [load]);

  const materials = useMemo(() => items.filter(x => x.content_type === 'resources'), [items]);
  const notices = useMemo(() => items.filter(x => x.content_type === 'announcements'), [items]);
  const pending = items.filter(x => !x.published).length;
  const published = items.filter(x => x.published).length;

  const submit = async e => {
    e.preventDefault(); setSaving(true); setError(''); setNotice('');
    try {
      let uploaded = null;
      if (form.kind === 'material' && !selectedFile) throw new Error('Choose a file from your device before submitting.');
      if (selectedFile) {
        if (selectedFile.size > 20 * 1024 * 1024) throw new Error('Files must be 20 MB or smaller.');
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) throw new Error('Your session has expired. Sign in again.');
        const uploadResponse = await fetch('/api/lecturer/upload', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': selectedFile.type || 'application/octet-stream',
            'X-File-Name': encodeURIComponent(selectedFile.name)
          },
          body: selectedFile
        });
        uploaded = await uploadResponse.json().catch(() => ({}));
        if (!uploadResponse.ok) throw new Error(uploaded.error || 'Could not upload the selected file.');
      }
      const result = await request('POST', {
        ...form,
        url: uploaded?.url || '',
        fileName: uploaded?.name || '',
        filePath: uploaded?.path || '',
        fileSize: uploaded?.size || 0,
        fileType: uploaded?.contentType || ''
      });
      setItems(current => [result.item, ...current]);
      setNotice(result.message || 'Submitted for review.');
      setForm({ ...emptyForm, kind: form.kind, category: form.category });
      setSelectedFile(null);
      setActiveTab('submissions');
    } catch (e) { setError(e.message || 'Could not submit.'); }
    finally { setSaving(false); }
  };

  const remove = async id => {
    if (!window.confirm('Delete this unpublished submission?')) return;
    setDeleting(id); setError(''); setNotice('');
    try { await request('DELETE', { id }); setItems(current => current.filter(x => x.id !== id)); setNotice('Draft submission deleted.'); }
    catch (e) { setError(e.message || 'Could not delete submission.'); }
    finally { setDeleting(''); }
  };

  const logout = async () => { await supabase?.auth.signOut(); navigate('/login', { replace: true }); };
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }));

  return <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="flex items-center gap-4"><img src="/logo.png" alt="FOSSA" className="h-12 w-12 rounded-xl object-contain"/><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-indigo-600">FOSSA • Lecturer workspace</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">Lecturer Dashboard</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome{profile?.display_name ? ', ' + profile.display_name : ''}. Manage academic materials and notices.</p></div></div>
        <div className="flex gap-2"><button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"><RefreshCw size={16}/>Refresh</button><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-slate-900"><LogOut size={16}/>Sign out</button></div>
      </header>

      {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">{error}</div>}
      {notice && <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">{notice}</div>}

      {loading ? <div className="py-20 text-center text-sm text-slate-500">Loading lecturer workspace…</div> : <div className="mt-6">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[['My submissions', items.length, FileText], ['Academic materials', materials.length, BookOpen], ['Notices submitted', notices.length, Bell], ['Awaiting review', pending, Clock3]].map(([label, value, Icon]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-500 sm:text-sm">{label}</span><Icon size={19} className="text-indigo-600"/></div><p className="mt-3 text-3xl font-black">{value}</p></article>)}
        </section>

        <nav aria-label="Lecturer dashboard sections" className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
          {[['overview','Overview'],['new','Submit material / notice'],['submissions','My submissions']].map(([id,label]) => <button key={id} onClick={() => {setActiveTab(id);setError('');setNotice('');}} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold ${activeTab===id?'bg-indigo-600 text-white':'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>{label}</button>)}
        </nav>

        {activeTab === 'overview' && <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-black">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Prepare content for students.</p></div><UploadCloud className="text-indigo-600" size={25}/></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><button onClick={() => {setForm({...emptyForm,kind:'material',category:'Lecture Notes'});setSelectedFile(null);setActiveTab('new');}} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-indigo-400 dark:border-slate-700"><BookOpen className="text-indigo-600" size={22}/><h3 className="mt-3 font-bold">Send lecture notes</h3><p className="mt-1 text-xs text-slate-500">Add course details and upload a file from your device.</p></button><button onClick={() => {setForm({...emptyForm,kind:'material',category:'Past Questions'});setSelectedFile(null);setActiveTab('new');}} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-indigo-400 dark:border-slate-700"><FileText className="text-indigo-600" size={22}/><h3 className="mt-3 font-bold">Send past questions</h3><p className="mt-1 text-xs text-slate-500">Upload exam papers for review.</p></button><button onClick={() => {setForm({...emptyForm,kind:'material',category:'Course Outlines'});setSelectedFile(null);setActiveTab('new');}} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-indigo-400 dark:border-slate-700"><CalendarDays className="text-indigo-600" size={22}/><h3 className="mt-3 font-bold">Share course outline</h3><p className="mt-1 text-xs text-slate-500">Upload a syllabus or course outline.</p></button><button onClick={() => {setForm({...emptyForm,kind:'notice'});setSelectedFile(null);setActiveTab('new');}} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-indigo-400 dark:border-slate-700"><Bell className="text-indigo-600" size={22}/><h3 className="mt-3 font-bold">Send a notice</h3><p className="mt-1 text-xs text-slate-500">Submit a class update or announcement.</p></button></div></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><div><h2 className="text-lg font-black">Recent submissions</h2><p className="mt-1 text-sm text-slate-500">Status of your last few submissions.</p></div><button onClick={() => setActiveTab('submissions')} className="text-sm font-bold text-indigo-600">View all</button></div>{items.length ? <div className="mt-4 space-y-3">{items.slice(0,5).map(item => <div key={item.id} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70"><div className="mt-0.5">{item.published?<CheckCircle2 className="text-emerald-600" size={18}/>:<Clock3 className="text-amber-600" size={18}/>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.payload?.title || 'Untitled submission'}</p><p className="mt-1 text-xs text-slate-500">{item.content_type==='announcements'?'Notice':item.payload?.category||'Academic material'} · {fmtDate(item.created_at)}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-extrabold ${item.published?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-800'}`}>{item.published?'Published':'In review'}</span></div>)}</div>:<p className="mt-5 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No submissions yet. Use a quick action to get started.</p>}</section>
        </div>}

        {activeTab === 'new' && <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"><h2 className="text-xl font-black">Submit academic content</h2><p className="mt-1 text-sm text-slate-500">Your submission is saved for administrator review. Uploaded materials become available to students only after an administrator publishes them.</p><form onSubmit={submit} className="mt-6 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Submission type<select value={form.kind} onChange={e=>set('kind',e.target.value)} className={field}><option value="material">Academic material</option><option value="notice">Notice / announcement</option></select></label>{form.kind==='material'&&<label className="text-sm font-bold">Material category<select value={form.category} onChange={e=>set('category',e.target.value)} className={field}>{['Lecture Notes','Past Questions','Course Outlines','Other Academic Resource'].map(x=><option key={x}>{x}</option>)}</select></label>}</div><label className="block text-sm font-bold">Title<input required maxLength={180} value={form.title} onChange={e=>set('title',e.target.value)} className={field} placeholder={form.kind==='notice'?'e.g. Change in lecture venue':'e.g. CSC 401 — Lecture 3 Notes'}/></label>{form.kind==='material'&&<div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">Course code<input value={form.courseCode} maxLength={40} onChange={e=>set('courseCode',e.target.value)} className={field} placeholder="e.g. CSC 401"/></label><label className="text-sm font-bold">Department<input value={form.department} maxLength={120} onChange={e=>set('department',e.target.value)} className={field} placeholder="Department"/></label><label className="text-sm font-bold">Student level<select value={form.level} onChange={e=>set('level',e.target.value)} className={field}>{[100,200,300,400,500,600].map(x=><option key={x} value={x}>{x} Level</option>)}</select></label><label className="text-sm font-bold">Academic year<input value={form.year} maxLength={20} onChange={e=>set('year',e.target.value)} className={field} placeholder="e.g. 2026/2027"/></label></div>}<label className="block text-sm font-bold">{form.kind==='material'?'Choose academic file':'Attach a picture or file (optional)'}<input type="file" required={form.kind==='material'} accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt" onChange={e=>setSelectedFile(e.target.files?.[0]||null)} className={field+" file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-indigo-700"} /><span className="mt-1 block text-xs font-normal text-slate-500">Choose a picture or document directly from your phone or computer folders. Supported: JPG, PNG, WebP, GIF, PDF, Word, PowerPoint, Excel and TXT. Maximum file size: 20 MB. Academic materials require a file; notices may include one optionally.</span>{selectedFile&&<span className="mt-2 block rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200">{selectedFile.name} · {(selectedFile.size/1024/1024).toFixed(2)} MB</span>}</label><label className="block text-sm font-bold">Description / message<textarea required rows={4} maxLength={5000} value={form.description} onChange={e=>set('description',e.target.value)} className={field} placeholder={form.kind==='notice'?'Write the notice for students…':'Briefly describe this material…'}/></label><div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={()=>setActiveTab('overview')} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold dark:border-slate-700">Cancel</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Send size={16}/>{saving?'Submitting…':'Submit for review'}</button></div></form></section>}

        {activeTab === 'submissions' && <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7"><div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-black">My submissions</h2><p className="mt-1 text-sm text-slate-500">Published items are read-only here; you can delete your own unpublished drafts.</p></div><button onClick={load} className="rounded-xl border border-slate-200 p-2.5 dark:border-slate-700" aria-label="Refresh submissions"><RefreshCw size={17}/></button></div>{items.length ? <div className="mt-5 space-y-3">{items.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{item.payload?.title || 'Untitled submission'}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-extrabold ${item.published?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-800'}`}>{item.published?'Published':'Awaiting review'}</span></div><p className="mt-1 text-xs text-slate-500">{item.content_type==='announcements'?'Notice':item.payload?.category||'Academic material'} · Submitted {fmtDate(item.created_at)}</p>{item.payload?.description&&<p className="mt-2 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{item.payload.description}</p>}{item.payload?.url&&<a href={item.payload.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-600">Open document <ExternalLink size={14}/></a>}</div>{!item.published&&<button onClick={()=>remove(item.id)} disabled={deleting===item.id} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-50"><Trash2 size={14}/>{deleting===item.id?'Deleting…':'Delete draft'}</button>}</div></article>)}</div>:<div className="py-12 text-center"><XCircle className="mx-auto text-slate-300" size={32}/><p className="mt-3 font-bold">No submissions yet</p><p className="mt-1 text-sm text-slate-500">Your lecture notes, past questions and notices will appear here.</p></div>}</section>}
      </div>}
    </div>
  </main>;
}
