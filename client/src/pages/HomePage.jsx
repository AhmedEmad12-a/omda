import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
    Bot, Building2, Coins, MapPin, TrendingUp, Sparkles, 
    ArrowRight, ShieldCheck, Search, CheckCircle2, Bed, Bath, 
    Maximize2, Heart, Share2, Filter, Eye, Calculator, ChevronDown
} from 'lucide-react';

// Curated high-res luxury architectural images for Egyptian developments
const FEATURED_PROPERTIES = [
    {
        id: 'prop-1',
        title: 'شقة فاخرة للبيع في كمبوند ميفيدا (Mivida)',
        titleEn: 'Luxury Apartment for Sale in Mivida Compound',
        developer: 'إعمار مصر (Emaar Misr)',
        developerEn: 'Emaar Misr',
        zoneId: 'new-cairo',
        zoneName: 'التجمع الخامس، القاهرة الجديدة',
        zoneNameEn: '5th Settlement, New Cairo',
        price: 8900000,
        pricePerMeter: 46840,
        area: 190,
        bedrooms: 3,
        bathrooms: 3,
        finishing: 'تشطيب كامل سوبر لوكس بالتكييفات',
        finishingEn: 'Fully Finished Super Lux w/ ACs',
        delivery: 'استلام 2026',
        deliveryEn: 'Delivery 2026',
        downPayment: 890000,
        years: 8,
        monthlyPayment: 83400,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        dealBadge: '✅ سعر عادل مطابق للسوق',
        dealBadgeEn: '✅ Fair Market Price',
        dealBadgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        featuredTag: 'الأعلى طلباً',
        featuredTagEn: 'Most Demanded'
    },
    {
        id: 'prop-2',
        title: 'تاون هاوس كورنر بحديقة في سوديك فاي (VYE SODIC)',
        titleEn: 'Corner Townhouse with Garden in VYE SODIC',
        developer: 'شركة سوديك (SODIC)',
        developerEn: 'SODIC',
        zoneId: 'sheikh-zayed',
        zoneName: 'زايد الجديدة، الشيخ زايد',
        zoneNameEn: 'New Zayed, Sheikh Zayed',
        price: 11500000,
        pricePerMeter: 50000,
        area: 230,
        bedrooms: 4,
        bathrooms: 4,
        finishing: 'نصف تشطيب (محارة وحلوق)',
        finishingEn: 'Semi-Finished Core & Shell',
        delivery: 'استلام سنتين (2027)',
        deliveryEn: 'Delivery in 2 Years (2027)',
        downPayment: 575000,
        years: 7,
        monthlyPayment: 130000,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        dealBadge: '🔥 صفقة لقطة (خصم 8% عن المرحلة الجديدة)',
        dealBadgeEn: '🔥 Bargain Deal (8% Below Next Phase)',
        dealBadgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        featuredTag: 'فرصة حصرية',
        featuredTagEn: 'Exclusive Opportunity'
    },
    {
        id: 'prop-3',
        title: 'شاليه يرى البحر واللاجون في مراسي (Marassi)',
        titleEn: 'Chalet with Sea & Lagoon View in Marassi',
        developer: 'إعمار مصر (Emaar Misr)',
        developerEn: 'Emaar Misr',
        zoneId: 'north-coast',
        zoneName: 'سيدي عبد الرحمن، الساحل الشمالي',
        zoneNameEn: 'Sidi Abdel Rahman, North Coast',
        price: 14200000,
        pricePerMeter: 113600,
        area: 125,
        bedrooms: 2,
        bathrooms: 2,
        finishing: 'ألترا سوبر لوكس مفروش بالكامل',
        finishingEn: 'Ultra Super Lux Fully Furnished',
        delivery: 'استلام فوري صيف 2026',
        deliveryEn: 'Ready Delivery Summer 2026',
        downPayment: 2840000,
        years: 4,
        monthlyPayment: 236000,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        dealBadge: '💎 عائد إيجاري متوقع 12% سنوياً',
        dealBadgeEn: '💎 Projected 12% Annual Rental Yield',
        dealBadgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        featuredTag: 'استثمار سياحي',
        featuredTagEn: 'Vacation Investment'
    },
    {
        id: 'prop-4',
        title: 'شقة بإطلالة حديقة في سيليا (Celia)',
        titleEn: 'Apartment with Garden View in Celia',
        developer: 'مجموعة طلعت مصطفى (TMG)',
        developerEn: 'Talaat Moustafa Group (TMG)',
        zoneId: 'new-capital',
        zoneName: 'الحي السكني، العاصمة الإدارية الجديدة',
        zoneNameEn: 'Residential District, New Capital',
        price: 5600000,
        pricePerMeter: 36100,
        area: 155,
        bedrooms: 3,
        bathrooms: 2,
        finishing: 'تشطيب كامل سوبر لوكس',
        finishingEn: 'Fully Finished Super Lux',
        delivery: 'استلام فوري',
        deliveryEn: 'Immediate Delivery',
        downPayment: 560000,
        years: 10,
        monthlyPayment: 42000,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        dealBadge: '🪙 أقساط مريحة على 10 سنوات',
        dealBadgeEn: '🪙 10-Year Flexible Installments',
        dealBadgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        featuredTag: 'أطول فترة سداد',
        featuredTagEn: 'Longest Payment Plan'
    }
];

export default function HomePage() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const navigate = useNavigate();

    // Search filter state
    const [selectedZone, setSelectedZone] = useState('ALL');
    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedPayment, setSelectedPayment] = useState('ALL');

    const filteredProperties = FEATURED_PROPERTIES.filter(p => {
        if (selectedZone !== 'ALL' && p.zoneId !== selectedZone) return false;
        return true;
    });

    const handleAskAiAboutProp = (propertyTitle, propertyPrice, propertyZone) => {
        navigate('/copilot', {
            state: {
                initialQuery: isRTL 
                    ? `عايز استشارتك في ${propertyTitle} بسعر ${propertyPrice.toLocaleString()} ج.م في ${propertyZone}. هل السعر عادل وإيه تقييمك للمشروع؟`
                    : `I want your advice regarding ${propertyTitle} priced at ${propertyPrice.toLocaleString()} EGP in ${propertyZone}. Is this price fair and what is your assessment of the project?`
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* HERO SECTION - Nawy / Property Finder Style */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B1528] via-[#0D182E] to-[#070D18] border border-amber-500/20 shadow-2xl p-6 md:p-12">
                {/* Background glowing gradients */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold mb-4 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isRTL ? 'منظومة بروبتيك الذكية الأولى في مصر' : "Egypt's #1 PropTech AI Platform"}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                        {isRTL ? (
                            <>ابحث، قيّم، واستشر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100">العمده AI</span> في أي عقار</>
                        ) : (
                            <>Search, Value & Consult <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-100">El Omda AI</span> for Any Real Estate</>
                        )}
                    </h1>

                    <p className="text-sm md:text-base text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {isRTL 
                            ? 'دليلك الذكي للشراء والاستثمار في أرقى كمبوندات القاهرة والساحل مع تقييم السعر العادل وحساب القيمة الحقيقية للأقساط والتضخم'
                            : 'Your smart guide to buying and investing in premier Cairo & Coast compounds, featuring fair market valuation and inflation-adjusted installment simulation.'
                        }
                    </p>

                    {/* SEARCH FILTER BAR (Nawy / Property Finder Style) */}
                    <div className="bg-neutral-900/95 border border-white/15 p-3 rounded-2xl shadow-2xl backdrop-blur-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                            {/* Zone Selector */}
                            <div className="relative">
                                <label className="block text-[11px] font-bold text-neutral-400 text-start px-2 mb-1">
                                    📍 {isRTL ? 'المنطقة أو المدينة' : 'Area / City'}
                                </label>
                                <select 
                                    value={selectedZone}
                                    onChange={(e) => setSelectedZone(e.target.value)}
                                    className="w-full bg-neutral-800/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option value="ALL">{isRTL ? 'جميع المناطق (القاهرة والساحل)' : 'All Areas (Cairo & Coast)'}</option>
                                    <option value="new-cairo">{isRTL ? 'التجمع الخامس والقاهرة الجديدة' : 'New Cairo & 5th Settlement'}</option>
                                    <option value="sheikh-zayed">{isRTL ? 'الشيخ زايد وزايد الجديدة' : 'Sheikh Zayed & New Zayed'}</option>
                                    <option value="new-capital">{isRTL ? 'العاصمة الإدارية الجديدة' : 'New Administrative Capital'}</option>
                                    <option value="north-coast">{isRTL ? 'الساحل الشمالي ورأس الحكمة' : 'North Coast & Ras El Hekma'}</option>
                                </select>
                            </div>

                            {/* Unit Type */}
                            <div className="relative">
                                <label className="block text-[11px] font-bold text-neutral-400 text-start px-2 mb-1">
                                    🏢 {isRTL ? 'نوع الوحدة' : 'Property Type'}
                                </label>
                                <select 
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full bg-neutral-800/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option value="ALL">{isRTL ? 'كل أنواع الوحدات' : 'All Property Types'}</option>
                                    <option value="apartment">{isRTL ? 'شقق سكنية ودوبلكس' : 'Apartments & Duplexes'}</option>
                                    <option value="villa">{isRTL ? 'فيلات مستقلة وتاون هاوس' : 'Villas & Townhouses'}</option>
                                    <option value="chalet">{isRTL ? 'شاليهات ساحلية' : 'Coastal Chalets'}</option>
                                    <option value="commercial">{isRTL ? 'مكاتب وعيادات إدارية' : 'Offices & Commercial'}</option>
                                </select>
                            </div>

                            {/* Payment Method */}
                            <div className="relative">
                                <label className="block text-[11px] font-bold text-neutral-400 text-start px-2 mb-1">
                                    💳 {isRTL ? 'نظام السداد المفضل' : 'Preferred Payment Plan'}
                                </label>
                                <select 
                                    value={selectedPayment}
                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                    className="w-full bg-neutral-800/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
                                >
                                    <option value="ALL">{isRTL ? 'جميع أنظمة السداد' : 'All Payment Plans'}</option>
                                    <option value="installments-long">{isRTL ? 'تقسيط 7-10 سنوات (مقدم 10%)' : '7-10 Years Installment (10% Down)'}</option>
                                    <option value="cash-discount">{isRTL ? 'شراء كاش مع خصم فوري' : 'Cash Purchase with Instant Discount'}</option>
                                    <option value="immediate">{isRTL ? 'استلام فوري' : 'Immediate Delivery'}</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                            <div className="flex items-center gap-2 text-xs text-neutral-400 px-2">
                                <span>{isRTL ? '🔥 مقترحات سريعة:' : '🔥 Quick Picks:'}</span>
                                <button onClick={() => setSelectedZone('new-cairo')} className="text-amber-400 hover:underline">{isRTL ? 'التجمع الخامس' : 'New Cairo'}</button>
                                <span>•</span>
                                <button onClick={() => setSelectedZone('sheikh-zayed')} className="text-amber-400 hover:underline">{isRTL ? 'الشيخ زايد' : 'Sheikh Zayed'}</button>
                                <span>•</span>
                                <button onClick={() => setSelectedZone('north-coast')} className="text-amber-400 hover:underline">{isRTL ? 'رأس الحكمة' : 'Ras El Hekma'}</button>
                            </div>

                            <button
                                onClick={() => navigate('/copilot')}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
                            >
                                <Bot className="w-4 h-4" />
                                <span>{isRTL ? 'استشر العمدة AI في خياراتك' : 'Consult El Omda AI on Options'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIVE MARKET BENCHMARKS (4 Clean Metrics) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="p-4 rounded-2xl bg-[#0E1726]/90 border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{isRTL ? 'متوسط سعر المتر بالقاهرة' : 'Avg Cairo Price / m²'}</div>
                        <div className="text-lg font-black text-white">46,500 <span className="text-xs font-normal text-neutral-400">{isRTL ? 'ج.م/م²' : 'EGP/m²'}</span></div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{isRTL ? '+22% نمو سنوي' : '+22% YoY Growth'}</div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E1726]/90 border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{isRTL ? 'أعلى عائد إيجاري سنوي' : 'Highest Rental Yield'}</div>
                        <div className="text-lg font-black text-emerald-400">11.0% <span className="text-xs font-normal text-neutral-400">{isRTL ? 'سنوياً' : '/yr'}</span></div>
                        <div className="text-[10px] text-neutral-400 font-semibold">{isRTL ? 'الساحل ورأس الحكمة' : 'Coast & Ras El Hekma'}</div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E1726]/90 border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                        <Coins className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{isRTL ? 'أطول فترة تقسيط متاحة' : 'Longest Installment Plan'}</div>
                        <div className="text-lg font-black text-sky-400">10 <span className="text-xs font-normal text-neutral-400">{isRTL ? 'سنوات' : 'Years'}</span></div>
                        <div className="text-[10px] text-neutral-400 font-semibold">{isRTL ? 'العاصمة الإدارية وزايد' : 'New Capital & Zayed'}</div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E1726]/90 border border-white/10 shadow-lg flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[11px] text-neutral-400 font-medium">{isRTL ? 'صفقات تم تدقيقها' : 'Deals Audited'}</div>
                        <div className="text-lg font-black text-purple-300">1,480+ <span className="text-xs font-normal text-neutral-400">{isRTL ? 'وحدة' : 'Units'}</span></div>
                        <div className="text-[10px] text-amber-400 font-semibold">{isRTL ? 'بواسطة العمدة AI' : 'By El Omda AI'}</div>
                    </div>
                </div>
            </div>

            {/* FEATURED REAL ESTATE LISTINGS - High-End Real Estate Cards */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
                            <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                            {isRTL ? 'وحدات مميزة وصفقات استثمارية في مصر' : 'Featured Units & Investment Deals in Egypt'}
                        </h2>
                        <p className="text-xs text-neutral-400 mt-1">
                            {isRTL 
                                ? 'مختارة ومفحوصة بالذكاء الاصطناعي مع خطط السداد الحقيقية من المطورين'
                                : 'Handpicked and AI-audited with real payment schedules direct from developers'
                            }
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/valuation')}
                            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                            <Calculator className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isRTL ? 'تقييم شقة خارجية' : 'Evaluate External Unit'}</span>
                        </button>
                        <button
                            onClick={() => navigate('/market')}
                            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{isRTL ? 'عرض خريطة الأسعار' : 'Explore Price Map'}</span>
                        </button>
                    </div>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProperties.map((prop) => (
                        <div
                            key={prop.id}
                            className="bg-[#0D1626] border border-white/10 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Property Image & Badges */}
                            <div className="relative h-52 overflow-hidden bg-neutral-900">
                                <img
                                    src={prop.image}
                                    alt={isRTL ? prop.title : (prop.titleEn || prop.title)}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1626] via-transparent to-black/40"></div>

                                {/* Top Badges */}
                                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[10px] font-black shadow-md">
                                        {isRTL ? prop.featuredTag : (prop.featuredTagEn || prop.featuredTag)}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                                        {isRTL ? prop.delivery : (prop.deliveryEn || prop.delivery)}
                                    </span>
                                </div>

                                {/* AI Rating Tag at bottom of photo */}
                                <div className="absolute bottom-3 inset-x-3">
                                    <div className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-md ${prop.dealBadgeColor}`}>
                                        {isRTL ? prop.dealBadge : (prop.dealBadgeEn || prop.dealBadge)}
                                    </div>
                                </div>
                            </div>

                            {/* Property Body Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    {/* Location & Developer */}
                                    <div className="text-[11px] font-bold text-amber-400 mb-1">
                                        {isRTL ? prop.developer : (prop.developerEn || prop.developer)}
                                    </div>
                                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-amber-300 transition-colors">
                                        {isRTL ? prop.title : (prop.titleEn || prop.title)}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                                        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                        <span className="truncate">{isRTL ? prop.zoneName : (prop.zoneNameEn || prop.zoneName)}</span>
                                    </div>

                                    {/* Specs Icons (Beds, Baths, Area) */}
                                    <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-white/5 text-center text-xs text-neutral-300 mb-4 bg-black/20 rounded-xl">
                                        <div className="flex items-center justify-center gap-1">
                                            <Bed className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{prop.bedrooms} {isRTL ? 'غرف' : 'Beds'}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 border-x border-white/10">
                                            <Bath className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{prop.bathrooms} {isRTL ? 'حمام' : 'Baths'}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1">
                                            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{prop.area} {isRTL ? 'م²' : 'm²'}</span>
                                        </div>
                                    </div>

                                    {/* Price & Payment Breakdown */}
                                    <div className="mb-4">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'إجمالي السعر:' : 'Total Price:'}</div>
                                        <div className="text-xl font-black text-white">
                                            {prop.price.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">{isRTL ? 'ج.م' : 'EGP'}</span>
                                        </div>
                                        <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                                            {isRTL 
                                                ? `مقدم ${prop.downPayment.toLocaleString()} ج.م • قسط شهري ~${prop.monthlyPayment.toLocaleString()} ج.م على ${prop.years} سنوات`
                                                : `Down ${prop.downPayment.toLocaleString()} EGP • Monthly ~${prop.monthlyPayment.toLocaleString()} EGP over ${prop.years} yrs`
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                    <button
                                        onClick={() => handleAskAiAboutProp(
                                            isRTL ? prop.title : (prop.titleEn || prop.title), 
                                            prop.price, 
                                            isRTL ? prop.zoneName : (prop.zoneNameEn || prop.zoneName)
                                        )}
                                        className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-bold border border-amber-500/30 transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <Bot className="w-4 h-4" />
                                        <span>{isRTL ? 'استشر العمدة AI في هذه الوحدة' : 'Consult El Omda AI on this Unit'}</span>
                                    </button>

                                    <button
                                        onClick={() => navigate('/payment-plans')}
                                        className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Coins className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>{isRTL ? 'محاكاة خطة السداد والـ NPV' : 'Simulate Installments & NPV'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* THREE CORE PROPTECH SUITE CARDS */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0C1527] to-[#080E1A] border border-amber-500/20 shadow-2xl">
                <div className="text-center max-w-xl mx-auto mb-8">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {isRTL ? 'أدوات العمده للعقارات' : 'El Omda PropTech Suite'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white mt-3">
                        {isRTL ? 'لماذا تشتري عبر منظومة العمده AI؟' : 'Why Buy with El Omda AI?'}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                        {isRTL 
                            ? 'نمنحك القوة التحليلية والمالية التي كان يحتكرها كبار المستثمرين العقاريين'
                            : 'We empower you with the analytical & financial insights once exclusive to top institutional investors'
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tool 1 */}
                    <div 
                        onClick={() => navigate('/copilot')}
                        className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all hover:translate-y-[-4px] group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                            {isRTL ? '1. المستشار العقاري الذكي (العمده AI)' : '1. Smart AI Advisor (El Omda)'}
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                            {isRTL 
                                ? 'وكيل ذكي مدرب على مصطلحات السوق المصري، يفهم ميزانيتك ومقدمك، ويقترح عليك الوحدات المناسبة دون تحيز لأي مطور.'
                                : 'Trained on Egyptian property market nuances. Understands your budget & down payment, recommending units independently.'
                            }
                        </p>
                        <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                            <span>{isRTL ? 'تحدث مع الوكيل الآن' : 'Chat with Advisor'}</span>
                            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Tool 2 */}
                    <div 
                        onClick={() => navigate('/valuation')}
                        className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all hover:translate-y-[-4px] group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                            {isRTL ? '2. فاحص الصفقات ومُقَيِّم السعر العادل' : '2. Deal Auditor & Fair Price Valuator'}
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                            {isRTL 
                                ? 'أدخل مساحة أي شقة وتشطيبها ودورها، وسيقوم النظام فوراً بتحديد سعر المتر العادل وإخبارك إذا كان السعر لقطة أم مبالغ فيه.'
                                : 'Input area, finishing, and floor to instantly determine fair price per m² and check whether the deal is a steal or overpriced.'
                            }
                        </p>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <span>{isRTL ? 'افحص صفقتك الآن' : 'Audit Your Deal Now'}</span>
                            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Tool 3 */}
                    <div 
                        onClick={() => navigate('/payment-plans')}
                        className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all hover:translate-y-[-4px] group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Coins className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                            {isRTL ? '3. حاسبة أنظمة السداد والقيمة الحقيقية (NPV)' : '3. Payment Plan & Real Value (NPV)'}
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                            {isRTL 
                                ? 'الأقساط على 8 سنوات ليست كما تبدو! نحسب لك قيمة الأقساط بعد خصم التضخم لنخبرك هل تشتري كاش بخصم أم تستفيد من التقسيط.'
                                : 'Long-term installments aren’t as simple as they look! We calculate discounted cash flows vs inflation so you know whether to pay cash or install.'
                            }
                        </p>
                        <div className="text-xs font-bold text-sky-400 flex items-center gap-1">
                            <span>{isRTL ? 'احسب القيمة الحقيقية' : 'Calculate Real Value'}</span>
                            <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
