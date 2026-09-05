import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Calculator, Building2, TrendingUp, AlertCircle, CheckCircle, 
    ShieldCheck, Coins, HelpCircle, ArrowUpRight, Scale
} from 'lucide-react';

export default function ValuationCalculatorPage() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [zones, setZones] = useState([]);
    const [finishingOptions, setFinishingOptions] = useState({});
    const [loadingZones, setLoadingZones] = useState(true);

    // Form inputs
    const [selectedZoneId, setSelectedZoneId] = useState('new-cairo');
    const [selectedCompound, setSelectedCompound] = useState('');
    const [areaM2, setAreaM2] = useState(150);
    const [finishing, setFinishing] = useState('semi_finished');
    const [floor, setFloor] = useState(2);
    const [isGarden, setIsGarden] = useState(false);
    const [isRoof, setIsRoof] = useState(false);
    const [deliveryYear, setDeliveryYear] = useState(2026);
    const [askingPriceTotal, setAskingPriceTotal] = useState('');

    // Results state
    const [evalResult, setEvalResult] = useState(null);
    const [evaluating, setEvaluating] = useState(false);

    // Fetch zones on mount
    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await fetch('/api/v1/real-estate/zones');
                if (res.ok) {
                    const data = await res.json();
                    setZones(data.data || []);
                    setFinishingOptions(data.finishingOptions || {});
                }
            } catch (err) {
                console.error('Failed to fetch zones:', err);
            } finally {
                setLoadingZones(false);
            }
        };
        fetchZones();
    }, []);

    // Active zone object
    const activeZone = zones.find(z => z.id === selectedZoneId) || zones[0];

    const handleCalculate = async () => {
        if (!selectedZoneId || !areaM2) return;
        setEvaluating(true);

        try {
            const res = await fetch('/api/v1/real-estate/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    zoneId: selectedZoneId,
                    compoundName: selectedCompound || null,
                    areaM2: parseFloat(areaM2),
                    finishing,
                    floor: parseInt(floor),
                    isGarden,
                    isRoof,
                    deliveryYear: parseInt(deliveryYear),
                    askingPriceTotal: askingPriceTotal ? parseFloat(askingPriceTotal) : null
                })
            });

            if (res.ok) {
                const data = await res.json();
                setEvalResult(data.data);
            }
        } catch (err) {
            console.error('Evaluation error:', err);
        } finally {
            setEvaluating(false);
        }
    };

    // Auto-calculate on initial load after zones load
    useEffect(() => {
        if (zones.length > 0 && !evalResult) {
            handleCalculate();
        }
    }, [zones]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Title Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Scale className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {isRTL ? 'مُقَيِّم الأسعار العادلة وفاحص الصفقات' : 'Fair Market Valuation & Deal Evaluator'}
                        </h1>
                        <p className="text-sm text-neutral-400">
                            {isRTL 
                                ? 'احسب السعر العادل للمتر الإجمالي وتعرّف إذا كان السعر المعروض لقطة، عادل، أو مبالغ فيه'
                                : 'Estimate fair price per m² and benchmark any asking price against live market transactions'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inputs Form */}
                <div className="lg:col-span-5 space-y-4 bg-neutral-900/80 p-5 rounded-2xl border border-white/10 shadow-xl">
                    <h2 className="text-base font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        {isRTL ? 'بيانات الوحدة العقارية' : 'Property Parameters'}
                    </h2>

                    {/* Zone Selector */}
                    <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                            {isRTL ? 'المنطقة أو المدينة' : 'City / Zone'}
                        </label>
                        <select
                            value={selectedZoneId}
                            onChange={(e) => {
                                setSelectedZoneId(e.target.value);
                                setSelectedCompound('');
                            }}
                            className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                            {zones.map((z) => (
                                <option key={z.id} value={z.id}>
                                    {isRTL ? z.nameAr : z.nameEn} ({z.avgPricePerMeter.toLocaleString()} EGP/m²)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Compound Selector */}
                    {activeZone?.topCompounds?.length > 0 && (
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                {isRTL ? 'الكمبوند (اختياري)' : 'Compound (Optional)'}
                            </label>
                            <select
                                value={selectedCompound}
                                onChange={(e) => setSelectedCompound(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                                <option value="">{isRTL ? '-- متوسط عام المنطقة --' : '-- General Zone Average --'}</option>
                                {activeZone.topCompounds.map((c, i) => (
                                    <option key={i} value={c.nameEn}>
                                        {isRTL ? c.nameAr : c.nameEn} - {c.tier} (~{c.avgPrice.toLocaleString()} EGP/m²)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Area m2 */}
                    <div>
                        <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
                            <span>{isRTL ? 'المساحة بالمتر المربع (م²)' : 'Area (m²)'}</span>
                            <span className="text-amber-400 font-bold">{areaM2} m²</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="600"
                            step="5"
                            value={areaM2}
                            onChange={(e) => setAreaM2(e.target.value)}
                            className="w-full accent-amber-500"
                        />
                    </div>

                    {/* Finishing Level */}
                    <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                            {isRTL ? 'مستوى التشطيب' : 'Finishing Status'}
                        </label>
                        <select
                            value={finishing}
                            onChange={(e) => setFinishing(e.target.value)}
                            className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        >
                            <option value="core_and_shell">{isRTL ? 'على المحارة (Core & Shell)' : 'Core & Shell'}</option>
                            <option value="semi_finished">{isRTL ? 'نصف تشطيب (Semi-Finished)' : 'Semi-Finished'}</option>
                            <option value="fully_finished">{isRTL ? 'تشطيب كامل سوبر لوكس' : 'Fully Finished Super Lux'}</option>
                            <option value="ultra_lux">{isRTL ? 'ألترا سوبر لوكس بالتكييفات' : 'Ultra Super Lux'}</option>
                        </select>
                    </div>

                    {/* Floor & Delivery Year */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                {isRTL ? 'الدور' : 'Floor Level'}
                            </label>
                            <select
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                                <option value="0">{isRTL ? 'أرضي' : 'Ground Floor'}</option>
                                <option value="1">{isRTL ? 'الأول' : '1st Floor'}</option>
                                <option value="2">{isRTL ? 'الثاني (متكرر)' : '2nd Floor'}</option>
                                <option value="3">{isRTL ? 'الثالث (متكرر)' : '3rd Floor'}</option>
                                <option value="5">{isRTL ? 'الخامس فأعلى' : '5th Floor+'}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                {isRTL ? 'سنة الاستلام' : 'Delivery Year'}
                            </label>
                            <select
                                value={deliveryYear}
                                onChange={(e) => setDeliveryYear(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                                <option value="2026">{isRTL ? 'استلام فوري / 2026' : 'Immediate / 2026'}</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029+</option>
                            </select>
                        </div>
                    </div>

                    {/* Garden / Roof Checkboxes */}
                    <div className="flex gap-4 pt-1">
                        <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isGarden}
                                onChange={(e) => setIsGarden(e.target.checked)}
                                className="rounded accent-amber-500"
                            />
                            {isRTL ? 'حديقة خاصة (Garden)' : 'Private Garden'}
                        </label>
                        <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isRoof}
                                onChange={(e) => setIsRoof(e.target.checked)}
                                className="rounded accent-amber-500"
                            />
                            {isRTL ? 'رووف / بنتهاوس (Roof)' : 'Private Roof'}
                        </label>
                    </div>

                    {/* Optional Asking Price for Deal Rating */}
                    <div className="pt-2 border-t border-white/10">
                        <label className="block text-xs font-medium text-amber-400 mb-1.5">
                            {isRTL ? 'السعر المعروض من البائع/المطور (اختياري للفحص)' : 'Asking Price for Deal Rating (Optional)'}
                        </label>
                        <input
                            type="number"
                            placeholder={isRTL ? 'مثال: 6500000' : 'e.g. 6,500,000 EGP'}
                            value={askingPriceTotal}
                            onChange={(e) => setAskingPriceTotal(e.target.value)}
                            className="w-full bg-neutral-800 border border-amber-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={evaluating}
                        className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                    >
                        <Calculator className="w-4 h-4" />
                        {evaluating 
                            ? (isRTL ? 'جاري التقييم...' : 'Evaluating...') 
                            : (isRTL ? 'حساب السعر العادل وفحص الصفقة' : 'Calculate Fair Market Value')}
                    </button>
                </div>

                {/* Results Card */}
                <div className="lg:col-span-7 space-y-4">
                    {evalResult ? (
                        <>
                            {/* Main Fair Value Banner */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -z-0"></div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                                    <div>
                                        <div className="text-xs uppercase font-bold tracking-wider text-amber-400">
                                            {isRTL ? 'السعر العادل التقديري للوحدة' : 'Estimated Fair Market Value'}
                                        </div>
                                        <div className="text-3xl font-black text-white mt-1">
                                            {evalResult.estimatedTotalPrice.toLocaleString()} <span className="text-lg font-normal text-neutral-400">EGP</span>
                                        </div>
                                    </div>
                                    <div className="bg-neutral-800/90 px-4 py-2.5 rounded-xl border border-white/10 text-right">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'سعر المتر العادل' : 'Fair Price / m²'}</div>
                                        <div className="text-xl font-bold text-amber-300">
                                            {evalResult.estimatedPricePerM2.toLocaleString()} <span className="text-xs font-normal">EGP/m²</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fair Price Range */}
                                <div className="text-xs text-neutral-400 flex items-center justify-between mb-4">
                                    <span>{isRTL ? 'النطاق السعري العادل المقبول:' : 'Fair Trading Range:'}</span>
                                    <span className="text-neutral-200 font-semibold">
                                        {evalResult.fairRange.min.toLocaleString()} - {evalResult.fairRange.max.toLocaleString()} EGP
                                    </span>
                                </div>

                                {/* Deal Rating Diagnosis (If asking price was passed) */}
                                {evalResult.dealRating && (
                                    <div className="p-4 rounded-xl mb-4 border" style={{ 
                                        backgroundColor: `${evalResult.dealRating.color}15`, 
                                        borderColor: `${evalResult.dealRating.color}50` 
                                    }}>
                                        <div className="flex items-center gap-2 font-bold text-base" style={{ color: evalResult.dealRating.color }}>
                                            {evalResult.dealRating.status === 'BARGAIN' && <CheckCircle className="w-5 h-5" />}
                                            {evalResult.dealRating.status === 'OVERPRICED' && <AlertCircle className="w-5 h-5" />}
                                            {evalResult.dealRating.status === 'FAIR' && <ShieldCheck className="w-5 h-5" />}
                                            {isRTL ? evalResult.dealRating.labelAr : evalResult.dealRating.labelEn}
                                        </div>
                                        <p className="text-xs text-neutral-200 mt-2 leading-relaxed">
                                            {evalResult.negotiationAdvice}
                                        </p>
                                    </div>
                                )}

                                {/* Investment Projections */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'متوسط الإيجار الشهري' : 'Est. Monthly Rent'}</div>
                                        <div className="text-sm font-bold text-white mt-0.5">
                                            ~{evalResult.investmentMetrics.estimatedMonthlyRent.toLocaleString()} EGP
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'العائد الإيجاري السنوي' : 'Annual Yield'}</div>
                                        <div className="text-sm font-bold text-emerald-400 mt-0.5">
                                            {evalResult.investmentMetrics.annualRentalYield}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 col-span-2 sm:col-span-1">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'القيمة المتوقعة بعد 3 سنوات' : 'Proj. Value (3 Yrs)'}</div>
                                        <div className="text-sm font-bold text-amber-400 mt-0.5">
                                            ~{evalResult.investmentMetrics.projectedValueIn3Years.toLocaleString()} EGP
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-64 rounded-2xl bg-neutral-900/40 border border-dashed border-white/10 flex flex-col items-center justify-center text-neutral-500">
                            <Calculator className="w-8 h-8 mb-2 opacity-50" />
                            <p className="text-sm">{isRTL ? 'اضغط "حساب السعر العادل" لعرض نتائج التقييم' : 'Click "Calculate Fair Market Value" to view appraisal'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
