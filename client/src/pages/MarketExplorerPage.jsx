import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
    MapPin, Building2, TrendingUp, DollarSign, Percent, 
    ChevronRight, Search, Sparkles, Filter, ExternalLink
} from 'lucide-react';

export default function MarketExplorerPage() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const navigate = useNavigate();

    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('ALL');

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await fetch('/api/v1/real-estate/zones');
                if (res.ok) {
                    const data = await res.json();
                    setZones(data.data || []);
                }
            } catch (err) {
                console.error('Failed to fetch zones:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchZones();
    }, []);

    const filteredZones = zones.filter(z => {
        const matchesSearch = (z.nameEn + z.nameAr).toLowerCase().includes(searchQuery.toLowerCase()) ||
            z.topCompounds.some(c => (c.nameEn + c.nameAr).toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesRegion = selectedRegion === 'ALL' || z.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    const regions = ['ALL', 'East Cairo', 'West Cairo', 'Coastal', 'South Cairo'];

    return (
        <div className="max-w-6xl mx-auto px-4 py-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-amber-400" />
                        {isRTL ? 'مستكشف أسعار المناطق والكمبوندات في مصر' : 'Egypt Real Estate Market & Zone Explorer'}
                    </h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        {isRTL 
                            ? 'دليل حي لمتوسط أسعار المتر، العوائد الإيجارية، وأهم الكمبوندات في السوق المصري'
                            : 'Live benchmark metrics for price/m², rental yield, and top developer compounds across Egypt'}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className={`w-4 h-4 text-neutral-400 absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                        type="text"
                        placeholder={isRTL ? 'ابحث عن منطقة أو كمبوند...' : 'Search zone or compound...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full bg-neutral-900 border border-white/10 rounded-xl py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                    />
                </div>
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                {regions.map((reg) => (
                    <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                            selectedRegion === reg
                                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
                        }`}
                    >
                        {reg === 'ALL' ? (isRTL ? 'جميع المناطق' : 'All Regions') : reg}
                    </button>
                ))}
            </div>

            {/* Grid of Zones */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 rounded-2xl bg-neutral-900 animate-pulse border border-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredZones.map((zone) => (
                        <div
                            key={zone.id}
                            className="bg-neutral-900/80 border border-white/10 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Zone Header */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            {zone.region}
                                        </span>
                                        <h3 className="text-lg font-bold text-white mt-1.5 group-hover:text-amber-300 transition-colors">
                                            {isRTL ? zone.nameAr : zone.nameEn}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'متوسط المتر' : 'Avg / m²'}</div>
                                        <div className="text-base font-bold text-amber-400">
                                            {zone.avgPricePerMeter.toLocaleString()} <span className="text-[10px]">EGP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Metrics Bar */}
                                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-neutral-950/60 border border-white/5 mb-4">
                                    <div>
                                        <div className="text-[10px] text-neutral-400">{isRTL ? 'العائد الإيجاري' : 'Rental Yield'}</div>
                                        <div className="text-xs font-bold text-emerald-400">
                                            {(zone.rentalYieldAnnual * 100).toFixed(1)}% {isRTL ? 'سنوياً' : '/ yr'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-neutral-400">{isRTL ? 'النمو السنوي' : 'Appreciation'}</div>
                                        <div className="text-xs font-bold text-amber-400">
                                            +{(zone.annualAppreciation * 100).toFixed(0)}% {isRTL ? 'سنوياً' : '/ yr'}
                                        </div>
                                    </div>
                                </div>

                                {/* Top Compounds List */}
                                <div className="space-y-1.5 mb-4">
                                    <div className="text-[11px] font-semibold text-neutral-400">
                                        {isRTL ? 'أبرز الكمبوندات والأسعار:' : 'Top Compounds & Pricing:'}
                                    </div>
                                    {zone.topCompounds.slice(0, 3).map((comp, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                                            <span className="text-neutral-300 truncate max-w-[65%]">
                                                {isRTL ? comp.nameAr : comp.nameEn}
                                            </span>
                                            <span className="text-neutral-400 font-mono text-[11px]">
                                                ~{comp.avgPrice.toLocaleString()} EGP
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-3 border-t border-white/10 flex gap-2">
                                <button
                                    onClick={() => navigate('/valuation')}
                                    className="flex-1 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all text-center"
                                >
                                    {isRTL ? 'تقييم شقة هنا' : 'Valuate Unit Here'}
                                </button>
                                <button
                                    onClick={() => navigate('/copilot')}
                                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                                    title={isRTL ? 'استشر الوكيل الذكي' : 'Ask AI Agent'}
                                >
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
