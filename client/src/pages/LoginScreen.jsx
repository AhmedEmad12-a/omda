import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { User, Lock, ArrowRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(username, password);
            navigate('/');
        } catch {
            setError('بيانات الدخول غير صحيحة، أو يمكنك استخدام زر الدخول السريع أدناه للتجربة الفورية.');
        } finally {
            setLoading(false);
        }
    };

    const handleDirectDemoAccess = () => {
        localStorage.setItem('token', 'demo-jwt-token');
        localStorage.setItem('user', JSON.stringify({
            id: 'demo-user-1',
            displayName: 'مستثمر عقاري',
            name: 'مستثمر عقاري',
            role: 'ADMIN',
            email: 'investor@alomda.ai'
        }));
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#060A11] via-[#0D1524] to-[#04070D] relative overflow-hidden" dir="rtl">
            {/* Ambient Lighting Orbs */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Login Card */}
            <div className="w-full max-w-md bg-[#0F182A]/90 border border-amber-500/25 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
                {/* Header & Emblem */}
                <div className="text-center pb-6 border-b border-white/10">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/15">
                        <span className="text-3xl">🏢</span>
                    </div>

                    <h1 className="text-2xl font-black text-white tracking-tight">
                        العمده للعقارات
                    </h1>
                    <p className="text-xs font-semibold text-amber-400 mt-1">
                        منظومة المستشار والتقييم العقاري الذكي
                    </p>
                </div>

                {/* Quick 1-Click Access Banner */}
                <div className="my-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>تجربة فورية بدون تسجيل حساب:</span>
                    </div>
                    <button
                        onClick={handleDirectDemoAccess}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                    >
                        <span>⚡ الدخول المباشر إلى المنظومة</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                </div>

                <div className="relative flex items-center justify-center my-6">
                    <div className="border-t border-white/10 w-full"></div>
                    <span className="bg-[#0F182A] px-3 text-[11px] text-neutral-400 uppercase font-semibold">
                        أو تسجيل الدخول
                    </span>
                    <div className="border-t border-white/10 w-full"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                            البريد الإلكتروني / اسم المستخدم
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-neutral-500 absolute top-3.5 right-3.5 pointer-events-none" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin@acme.com"
                                className="w-full bg-neutral-900/90 border border-white/15 focus:border-amber-500 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                            كلمة المرور
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-neutral-500 absolute top-3.5 right-3.5 pointer-events-none" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-neutral-900/90 border border-white/15 focus:border-amber-500 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs leading-relaxed">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                    </button>
                </form>

                {/* Footer Notes */}
                <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-neutral-400">
                    العمده للعقارات © 2025-2026 | مدعوم بنماذج الذكاء الاصطناعي العقاري
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
