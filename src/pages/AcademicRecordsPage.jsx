import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, ShieldCheck, Upload } from 'lucide-react';
import { supabase } from '../lib/adminApi';

const levels = new Set([100, 200, 300, 400, 500, 600]);
const field = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white';

function parseLine(line) {
  const cells = []; let value = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && quoted && line[i + 1] === '"') { value += '"'; i++; }
    else if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) { cells.push(value.trim()); value = ''; }
    else value += ch;
  }
  cells.push(value.trim()); return cells;
}
function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim());
  if (lines.length < 2) throw new Error('Add a header row and at least one student record.');
  const headers = parseLine(lines[0]).map(h => h.toLowerCase().replace(/[\s-]+/g, '_'));
  const find = names => names.map(name => headers.indexOf(name)).find(index => index >= 0);
  const matricIndex = find(['matric_number', 'matric', 'student_number']);
  const departmentIndex = find(['department']), levelIndex = find(['level']);
  if (matricIndex === undefined || departmentIndex === undefined || levelIndex === undefined) throw new Error('CSV headers must include matric_number, department, and level.');
  return lines.slice(1).map(line => {
    const cells = parseLine(line);
    return {
      matric_number: String(cells[matricIndex] || '').toUpperCase().replace(/\s+/g, ''),
      department: String(cells[departmentIndex] || '').trim(),
      level: Number(String(cells[levelIndex] || '').replace(/\s*level$/i, ''))
    };
  });
}

export default function AcademicRecordsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true), [authorized, setAuthorized] = useState(false), [busy, setBusy] = useState(false);
  const [csv, setCsv] = useState('matric_number,department,level\nAU/CSC/23/0123,Computer Science,400');
  const [error, setError] = useState(''), [notice, setNotice] = useState(''), [rejected, setRejected] = useState([]);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!supabase) throw new Error('Authentication is not configured.');
        const { data } = await supabase.auth.getSession(), token = data.session?.access_token;
        if (!token) { navigate('/login', { replace: true }); return; }
        const response = await fetch('/api/auth/profile', { headers: { Authorization: 'Bearer ' + token } });
        const profile = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(profile.error || 'Could not verify account.');
        if (!['admin', 'super_admin'].includes(profile.role)) throw new Error('Only administrators can manage verified academic records.');
        if (active) setAuthorized(true);
      } catch (e) { if (active) setError(e.message || 'Could not verify administrator access.'); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [navigate]);
  const preview = useMemo(() => {
    try {
      const parsed = parseCsv(csv), seen = new Set();
      const invalid = parsed.filter(row => {
        if (!row.matric_number || row.matric_number.length < 4 || row.matric_number.length > 32 || !row.department || row.department.length > 120 || !levels.has(row.level) || seen.has(row.matric_number)) return true;
        seen.add(row.matric_number); return false;
      });
      return { parsed, invalid: invalid.length, message: '' };
    } catch (e) { return { parsed: [], invalid: 0, message: e.message }; }
  }, [csv]);
  const loadFile = async event => {
    const file = event.target.files?.[0]; if (!file) return;
    setError(''); setNotice(''); setRejected([]);
    if (file.size > 2 * 1024 * 1024) { setError('CSV files must be 2 MB or smaller.'); return; }
    try { setCsv(await file.text()); } catch { setError('Could not read the file. Save it as a UTF-8 CSV and try again.'); }
    event.target.value = '';
  };
  const importRecords = async () => {
    setError(''); setNotice(''); setRejected([]);
    let records;
    try { records = parseCsv(csv); } catch (e) { setError(e.message); return; }
    if (records.length > 500) { setError('Import up to 500 records at a time.'); return; }
    setBusy(true);
    try {
      const { data } = await supabase.auth.getSession(), token = data.session?.access_token;
      if (!token) throw new Error('Your session has expired. Sign in again.');
      const response = await fetch('/api/academic/students', { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify({ records }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Academic record import failed.');
      setRejected(result.rejected || []);
      setNotice(`Imported or updated ${result.imported || 0} record(s). ${(result.rejected || []).length} row(s) need attention.`);
    } catch (e) { setError(e.message || 'Could not import records.'); }
    finally { setBusy(false); }
  };
  if (loading) return <main className="mx-auto max-w-5xl px-4 py-12 text-center text-slate-500">Verifying administrator access…</main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-7 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6"><div className="mx-auto max-w-5xl">
    <button onClick={() => navigate('/admin/academic')} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"><ArrowLeft size={16}/>Academic administration</button>
    <header className="flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white sm:p-8"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-200">FOSSA · Verified academic records</p><h1 className="mt-2 text-3xl font-black">Student records</h1><p className="mt-2 max-w-2xl text-sm text-indigo-100/80">Import official matric numbers, departments and levels so eligibility checks and Level Advisor workflows can work correctly.</p></div><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold"><ShieldCheck size={15}/>Admin only</span></header>
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {authorized && <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
      <div className="flex items-start gap-3"><FileSpreadsheet className="mt-1 text-indigo-600" size={24}/><div><h2 className="text-xl font-black">Import from CSV</h2><p className="mt-1 text-sm text-slate-500">Use the matric number already registered on each FOSSA account. This import does not create accounts or grant roles.</p></div></div>
      <label className="mt-5 block text-sm font-bold">Choose CSV file<input type="file" accept=".csv,text/csv" onChange={loadFile} className="mt-2 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-bold file:text-indigo-700"/></label>
      <label className="mt-5 block text-sm font-bold">CSV content<textarea className={field+' mt-2 font-mono'} rows={8} value={csv} onChange={e=>setCsv(e.target.value)} spellCheck={false}/></label>
      <p className="mt-2 text-xs leading-5 text-slate-500">Required headers: <code>matric_number,department,level</code>. Accepted levels: 100, 200, 300, 400, 500, 600. Example: <code>AU/CSC/23/0123,Computer Science,400</code>. Department names must match election eligibility settings.</p>
      {preview.message ? <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{preview.message}</p> : <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Preview: {preview.parsed.length} row(s), {preview.invalid} obvious validation issue(s). Account matching is checked securely by the server.</p>}
      {preview.parsed.length>0 && <div className="mt-4 overflow-x-auto rounded-xl border dark:border-slate-700"><table className="w-full min-w-[500px] text-left text-sm"><thead className="bg-slate-50 dark:bg-slate-800"><tr><th className="p-3">Matric number</th><th className="p-3">Department</th><th className="p-3">Level</th></tr></thead><tbody>{preview.parsed.slice(0,10).map((row,i)=><tr key={row.matric_number+'-'+i} className="border-t dark:border-slate-800"><td className="p-3 font-mono text-xs">{row.matric_number}</td><td className="p-3">{row.department}</td><td className="p-3">{row.level}</td></tr>)}</tbody></table>{preview.parsed.length>10&&<p className="border-t p-3 text-xs text-slate-500">Showing first 10 rows of {preview.parsed.length}.</p>}</div>}
      {notice&&<p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
      {rejected.length>0&&<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><h3 className="font-bold">Rows not imported</h3><ul className="mt-2 list-disc space-y-1 pl-5">{rejected.slice(0,30).map((item,i)=><li key={item.row+'-'+i}>Row {item.row}{item.matric_number?' ('+item.matric_number+')':''}: {item.reason}</li>)}</ul>{rejected.length>30&&<p className="mt-2">Showing first 30 of {rejected.length} rejected rows.</p>}</div>}
      <div className="mt-5 flex flex-wrap gap-3"><button disabled={busy||!authorized||!preview.parsed.length||!!preview.message} onClick={importRecords} className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><Upload size={16}/>{busy?'Importing…':'Import verified records'}</button><button onClick={()=>{setCsv('matric_number,department,level\nAU/CSC/23/0123,Computer Science,400');setError('');setNotice('');setRejected([]);}} className="rounded-xl border px-5 py-3 text-sm font-bold dark:border-slate-700">Reset example</button></div>
    </section>}
  </div></main>;
}
