import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/adminApi';
import { AnimateIn, AnimatedText } from '../components/AnimateLoad';

const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white';
const labelClass = 'block text-sm font-bold text-slate-700 dark:text-slate-300';

export const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState('');
    const [matricNumber, setMatricNumber] = useState('');
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordBusy, setPasswordBusy] = useState(false);

    useEffect(() => {
        if (!supabase) return;
        supabase.auth.getUser().then(({ data, error: authError }) => {
            if (authError || !data?.user) {
                setError('Please sign in again to view your profile.');
                return;
            }
            const current = data.user;
            const meta = current.user_metadata || {};
            setUser(current);
            setName(meta.display_name || meta.full_name || meta.name || '');
            setPhone(meta.phone || '');
            setDepartment('');
            setLevel('');
            setMatricNumber('');
            const response = await fetch('/api/academic/me', { headers: { Authorization: 'Bearer ' + (await supabase.auth.getSession()).data.session?.access_token } });
            const recordResult = await response.json().catch(() => ({}));
            if (response.ok) {
                const record = recordResult.academicRecord;
                setDepartment(record?.department || '');
                setLevel(record?.level ? String(record.level) + ' Level' : '');
                setMatricNumber(recordResult.matricNumber || '');
            }
        });
    }, []);

    const saveProfile = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        if (!supabase || !user) { setError('Your session is not available. Please sign in again.'); return; }
        if (!name.trim()) { setError('Please enter your full name.'); return; }
        setBusy(true);
        try {
            const { data, error: updateError } = await supabase.auth.updateUser({
                data: {
                    display_name: name.trim(),
                    full_name: name.trim(),
                    phone: phone.trim(),
                }
            });
            if (updateError) throw updateError;
            setUser(data.user);
            setMessage('Your profile has been saved.');
        } catch (e) {
            setError(e.message || 'Could not save your profile. Please try again.');
        } finally {
            setBusy(false);
        }
    };

    const changePassword = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');
        if (newPassword.length < 8) { setError('Your new password must contain at least 8 characters.'); return; }
        if (newPassword !== confirmPassword) { setError('The new passwords do not match.'); return; }
        setPasswordBusy(true);
        try {
            const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
            if (updateError) throw updateError;
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Password updated successfully.');
        } catch (e) {
            setError(e.message || 'Could not update your password. Please try again.');
        } finally {
            setPasswordBusy(false);
        }
    };

    const email = user?.email || '';
    const initials = (name || email || 'S').trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join('');

    return (
        <div className="mx-auto w-full max-w-5xl pb-10">
            <AnimateIn direction="down" delay={0.05} className="mb-7">
                <Link to="/dashboard" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">← Back to dashboard</Link>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white"><AnimatedText text="Your profile" /></h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Keep your personal and academic details up to date.</p>
            </AnimateIn>

            {!user && !error && <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Loading your profile…</p>}
            {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
            {message && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">{message}</p>}

            {user && <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-700 text-2xl font-black text-white">{initials || 'S'}</div>
                    <h2 className="mt-4 break-words text-xl font-black text-slate-900 dark:text-white">{name || 'Your name'}</h2>
                    <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">{email}</p>
                    {matricNumber && <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{matricNumber}</p>}
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Your name and profile details are saved to your FOSSA account.</p>
                </aside>

                <div className="space-y-6">
                    <form onSubmit={saveProfile} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">Personal and academic information</h2>
                        <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">Your email is shown below as your sign-in address and is not changed here.</p>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className={labelClass}>Full name<input className={inputClass} value={name} onChange={e => setName(e.target.value)} autoComplete="name" maxLength={100} required /></label>
                            <label className={labelClass}>Email address<input className={inputClass + ' opacity-70'} value={email} type="email" readOnly /></label>
                            <label className={labelClass}>Phone number<input className={inputClass} value={phone} onChange={e => setPhone(e.target.value)} type="tel" autoComplete="tel" maxLength={30} placeholder="+234…" /></label>
                            <label className={labelClass}>Matric number<input className={inputClass + ' opacity-70'} value={matricNumber} readOnly aria-describedby="matric-note" /><span id="matric-note" className="mt-1 block text-xs font-normal text-slate-500">Contact an administrator if this needs correction.</span></label>
                            <label className={labelClass}>Verified department<input className={inputClass + ' opacity-80'} value={department || 'Not verified'} readOnly /><span className="mt-1 block text-xs font-normal text-slate-500">Official academic records are managed by FOSSA administration.</span></label>
                            <label className={labelClass}>Verified level<input className={inputClass + ' opacity-80'} value={level || 'Not verified'} readOnly /><span className="mt-1 block text-xs font-normal text-slate-500">This verified level is used for eligibility checks, including elections.</span></label>
                        </div>
                        <div className="mt-7 flex justify-end"><button disabled={busy} type="submit" className="rounded-xl bg-indigo-700 px-6 py-3 font-bold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Saving…' : 'Save profile'}</button></div>
                    </form>

                    <form onSubmit={changePassword} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white">Change password</h2>
                        <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">Choose a new password with at least 8 characters.</p>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className={labelClass}>New password<input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></label>
                            <label className={labelClass}>Confirm new password<input className={inputClass} type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></label>
                        </div>
                        <div className="mt-6 flex justify-end"><button disabled={passwordBusy} type="submit" className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">{passwordBusy ? 'Updating…' : 'Update password'}</button></div>
                    </form>
                </div>
            </div>}
        </div>
    );
};
