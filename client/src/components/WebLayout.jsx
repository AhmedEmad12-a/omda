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
        { path: '/copilot', label: isRTL ? 'المستشار الذكي (العمده AI)' : 'AI Copilot', badge: 'AI' },
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
                        <LanguageSwitcher direction="down" />
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
                                <span>{isRTL ? 'العمده للعقارات' : 'El Omda Real Estate'}</span>
                            </div>
                            <div className="text-[10px] font-bold text-amber-400 tracking-wider">
                                {isRTL ? 'بوابة الذكاء العقاري في مصر' : 'PropTech Real Estate Intelligence'}
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
                        <LanguageSwitcher compact={true} />
                        <button
                            onClick={() => navigate('/copilot')}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                        >
                            <Bot className="w-4 h-4" />
                            <span>{isRTL ? 'استشر العمدة AI الآن' : 'Consult El Omda AI'}</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex lg:hidden items-center gap-2">
                        <LanguageSwitcher compact={true} />
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
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                            <LanguageSwitcher direction="down" />
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/copilot');
                                }}
                                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center justify-center gap-2"
                            >
                                <Bot className="w-4 h-4" />
                                <span>{isRTL ? 'استشر العمدة AI' : 'Consult El Omda AI'}</span>
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
                                <span className="text-lg font-black text-white">{isRTL ? 'العمده للعقارات' : 'El Omda Real Estate'}</span>
                            </div>
                            <p className="text-neutral-400 leading-relaxed text-[11px]">
                                {isRTL 
                                    ? 'أول منصة عقارية ذكية في مصر تجمع بين فحص الصفقات العادلة، محاكاة أنظمة السداد مع التضخم، والاستشارة المستقلة لحماية مصلحة المشتري والمستثمر.'
                                    : 'Egypt’s premier PropTech AI platform combining fair market valuation, inflation-adjusted installment simulation, and unbiased advisory.'
                                }
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                                <ShieldCheck className="w-4 h-4" />
                                <span>{isRTL ? 'تقييمات مستقلة 100% بدون انحياز' : '100% Independent & Unbiased Valuations'}</span>
                            </div>
                        </div>

                        {/* Top Zones */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                {isRTL ? 'أشهر مناطق الاستثمار' : 'Top Investment Areas'}
                            </h4>
                            <ul className="space-y-2 text-[11px]">
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'القاهرة الجديدة والتجمع الخامس' : 'New Cairo & 5th Settlement'}</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'الشيخ زايد وتوسعات زايد الجديدة' : 'Sheikh Zayed & New Zayed'}</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'العاصمة الإدارية الجديدة (R7, R8, CBD)' : 'New Administrative Capital (R7, R8, CBD)'}</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'الساحل الشمالي ومشروعات رأس الحكمة' : 'North Coast & Ras El Hekma'}</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'مدينة المستقبل والشروق' : 'Mostakbal City & El Shorouk'}</a></li>
                            </ul>
                        </div>

                        {/* Smart Tools */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                {isRTL ? 'أدوات المنظومة الذكية' : 'Smart PropTech Suite'}
                            </h4>
                            <ul className="space-y-2 text-[11px]">
                                <li><a href="/copilot" className="hover:text-amber-400 transition-colors">{isRTL ? 'المستشار العقاري التفاعلي (العمدة AI)' : 'Interactive AI Advisor (El Omda)'}</a></li>
                                <li><a href="/valuation" className="hover:text-amber-400 transition-colors">{isRTL ? 'مُقَيِّم الأسعار وفاحص الصفقات اللقطة' : 'Fair Price Valuator & Deal Auditor'}</a></li>
                                <li><a href="/payment-plans" className="hover:text-amber-400 transition-colors">{isRTL ? 'حاسبة القيمة الحقيقية للتقسيط (NPV)' : 'Real Installment Value Calculator (NPV)'}</a></li>
                                <li><a href="/market" className="hover:text-amber-400 transition-colors">{isRTL ? 'مؤشر متوسط أسعار المتر في مصر' : 'Egypt Price Index per m²'}</a></li>
                            </ul>
                        </div>

                        {/* Contact & Support */}
                        <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                {isRTL ? 'تواصل مع فريق العمده' : 'Contact El Omda Team'}
                            </h4>
                            <p className="text-[11px] text-neutral-400 mb-3">
                                {isRTL 
                                    ? 'فريق من المستشارين العقاريين والماليين لمساعدتك في اتخاذ أفضل قرار شراء.'
                                    : 'A dedicated team of property and financial consultants to help you make the best purchase decision.'
                                }
                            </p>
                            <div className="space-y-2 text-[11px] text-neutral-300">
                                <div>📍 {isRTL ? 'القاهرة الجديدة، التجمع الخامس، مصر' : 'New Cairo, 5th Settlement, Egypt'}</div>
                                <div>✉️ info@alomda-realestate.com</div>
                                <div className="text-amber-400 font-bold">📞 19XXX / 010XXXXXXXX</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
                        <div>
                            {isRTL 
                                ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} العمده للعقارات (El Omda Real Estate AI).`
                                : `All rights reserved © ${new Date().getFullYear()} El Omda Real Estate AI.`
                            }
                        </div>
                        <div className="text-neutral-400">
                            {isRTL 
                                ? 'التقييمات والتحليلات مبنية على مؤشرات السوق العقاري المصري ونماذج الذكاء الاصطناعي الاستشارية.'
                                : 'Valuations & metrics are powered by Egyptian real estate market benchmarks & advisory AI models.'
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
