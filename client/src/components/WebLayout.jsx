import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { 
    Bot, Building2, Coins, MapPin, Sparkles, Menu, X, 
    Home, Phone, Mail, ChevronDown, ExternalLink, ShieldCheck,
    ArrowRight
} from 'lucide-react';

export default function WebLayout() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: isRTL ? 'الرئيسية' : 'Home' },
        { path: '/copilot', label: isRTL ? 'المستشار الذكي (أمولة AI)' : 'AI Copilot', badge: 'AI' },
        { path: '/valuation', label: isRTL ? 'تقييم الأسعار العادلة' : 'Price Valuator' },
        { path: '/payment-plans', label: isRTL ? 'حاسبة الأقساط (NPV)' : 'Payment Calculator' },
        { path: '/market', label: isRTL ? 'خريطة المناطق والكمبوندات' : 'Market Explorer' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#070D18] text-[#F8FAFC] font-sans antialiased selection:bg-amber-500 selection:text-black" dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* 1. TOP MARKET TICKER BAR */}
            <div className="bg-[#050A14] border-b border-white/5 py-2 px-4 text-[11px] text-neutral-400">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
                        <span className="flex items-center gap-1.5 text-amber-400 font-bold shrink-0">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            {isRTL ? 'مؤشر أسعار مصر الحي:' : 'Live Egypt Market Pulse:'}
                        </span>
                        <span className="shrink-0 text-neutral-300">📍 التجمع: <b className="text-white">~48k ج.م/م²</b></span>
                        <span className="text-neutral-600">•</span>
                        <span className="shrink-0 text-neutral-300">📍 الشيخ زايد: <b className="text-white">~46k ج.م/م²</b></span>
                        <span className="text-neutral-600">•</span>
                        <span className="shrink-0 text-neutral-300">📍 العاصمة الإدارية: <b className="text-white">~39k ج.م/م²</b></span>
                        <span className="text-neutral-600">•</span>
                        <span className="shrink-0 text-neutral-300">🏖️ الساحل ورأس الحكمة: <b className="text-amber-300">~85k ج.م/م²</b></span>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 text-neutral-400">
                        <span>📞 {isRTL ? 'الخط الساخن للاستشارة:' : 'Helpline:'} <b className="text-amber-400">19XXX</b></span>
                        <span className="text-neutral-700">|</span>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* 2. MAIN WEBSITE NAVBAR */}
            <header className="sticky top-0 z-50 bg-[#091222]/90 backdrop-blur-md border-b border-white/10 shadow-xl transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <div 
                        onClick={() => navigate('/')} 
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/15 group-hover:scale-105 transition-transform">
                            🏢
                        </div>
                        <div>
                            <div className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                                <span>أمولة للعقارات</span>
                            </div>
                            <div className="text-[10px] font-bold text-amber-400 tracking-wider">
                                {isRTL ? 'بوابة الذكاء العقاري في مصر | Amola' : 'Amola PropTech Real Estate Intelligence'}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                        isActive 
                                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                                            : 'text-neutral-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    {link.badge && (
                                        <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-black">
                                            {link.badge}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden sm:flex items-center gap-3">
                        <button
                            onClick={() => navigate('/copilot')}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            <Bot className="w-4 h-4" />
                            <span>استشر العمدة AI الآن</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden items-center gap-2">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#0A1325] border-b border-white/10 px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-200 hover:bg-white/5 hover:text-amber-400"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="pt-2 border-t border-white/10">
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/copilot');
                                }}
                                className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-2"
                            >
                                <Bot className="w-4 h-4" />
                                <span>استشر العمدة AI</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* 3. MAIN PAGE CONTENT (Full-Width Website Canvas) */}
            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* 4. FLOATING AI AGENT BUTTON (Quick Access from any page) */}
            {location.pathname !== '/copilot' && (
                <button
                    onClick={() => navigate('/copilot')}
                    className="fixed bottom-6 start-6 z-50 p-3.5 md:px-5 md:py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2 border-2 border-white/20"
                    title="تحدث مع العمدة AI"
                >
                    <Bot className="w-5 h-5 animate-bounce" />
                    <span className="hidden md:inline">مستشارك العقاري (العمدة AI)</span>
                </button>
            )}

            {/* 5. LUXURY REAL ESTATE WEBSITE FOOTER */}
            <footer className="bg-[#050912] border-t border-white/10 pt-16 pb-12 text-neutral-400 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand Column */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">🏢</span>
                                <span className="text-lg font-black text-white">أمولة للعقارات</span>
                            </div>
                            <p className="text-neutral-400 leading-relaxed text-[11px]">
                                أول منصة عقارية ذكية في مصر تجمع بين فحص الصفقات العادلة، محاكاة أنظمة السداد مع التضخم، والاستشارة المستقلة لحماية مصلحة المشتري والمستثمر.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                                <ShieldCheck className="w-4 h-4" />
                                <span>تقييمات مستقلة 100% بدون انحياز</span>
                            </div>
                        </div>

                        {/* Top Zones */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                أشهر مناطق الاستثمار
                            </h4>
                            <ul className="space-y-2 text-[11px]">
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">القاهرة الجديدة والتجمع الخامس</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">الشيخ زايد وتوسعات زايد الجديدة</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">العاصمة الإدارية الجديدة (R7, R8, CBD)</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">الساحل الشمالي ومشروعات رأس الحكمة</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">مدينة المستقبل والشروق</a></li>
                            </ul>
                        </div>

                        {/* Smart Tools */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                أدوات المنظومة الذكية
                            </h4>
                            <ul className="space-y-2 text-[11px]">
                                <li><a href="/copilot" className="hover:text-amber-400 transition-colors">المستشار العقاري التفاعلي (أمولة AI)</a></li>
                                <li><a href="/valuation" className="hover:text-amber-400 transition-colors">مُقَيِّم الأسعار وفاحص الصفقات اللقطة</a></li>
                                <li><a href="/payment-plans" className="hover:text-amber-400 transition-colors">حاسبة القيمة الحقيقية للتقسيط (NPV)</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">مؤشر متوسط أسعار المتر في مصر</a></li>
                            </ul>
                        </div>

                        {/* Contact & Support */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                تواصل مع فريق أمولة
                            </h4>
                            <p className="text-[11px] text-neutral-400 mb-3">
                                فريق من المستشارين العقاريين والماليين لمساعدتك في اتخاذ أفضل قرار شراء.
                            </p>
                            <div className="space-y-2 text-[11px] text-neutral-300">
                                <div>📍 القاهرة الجديدة، التجمع الخامس، مصر</div>
                                <div>✉️ info@amola.ai</div>
                                <div className="text-amber-400 font-bold">📞 19XXX / 010XXXXXXXX</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
                        <div>
                            جميع الحقوق محفوظة © {new Date().getFullYear()} أمولة للعقارات (Amola Real Estate AI).
                        </div>
                        <div className="text-neutral-400">
                            التقييمات والتحليلات مبنية على مؤشرات السوق العقاري المصري ونماذج الذكاء الاصطناعي الاستشارية.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
