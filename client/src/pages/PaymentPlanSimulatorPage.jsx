import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Coins, Calculator, Calendar, Percent, CheckCircle2, 
    ArrowRight, AlertTriangle, TrendingDown, Info
} from 'lucide-react';

export default function PaymentPlanSimulatorPage() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [totalPrice, setTotalPrice] = useState(6000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(10);
    const [years, setYears] = useState(7);
    const [frequency, setFrequency] = useState('quarterly');
    const [discountRateAnnual, setDiscountRateAnnual] = useState(0.18);
    const [deliveryPaymentPercent, setDeliveryPaymentPercent] = useState(10);
    const [maintenanceDepositPercent, setMaintenanceDepositPercent] = useState(8);

    const [simResult, setSimResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const handleCalculate = async () => {
        if (!totalPrice || totalPrice <= 0) return;
        setCalculating(true);

        try {
            const res = await fetch('/api/v1/real-estate/payment-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    totalPrice: parseFloat(totalPrice),
                    downPaymentPercent: parseFloat(downPaymentPercent),
                    years: parseInt(years),
                    frequency,
                    discountRateAnnual: parseFloat(discountRateAnnual),
                    deliveryPaymentPercent: parseFloat(deliveryPaymentPercent),
                    maintenanceDepositPercent: parseFloat(maintenanceDepositPercent)
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSimResult(data.data);
            }
        } catch (err) {
            console.error('Payment plan error:', err);
        } finally {
            setCalculating(false);
        }
    };

    useEffect(() => {
        handleCalculate();
    }, [totalPrice, downPaymentPercent, years, frequency, discountRateAnnual]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Coins className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {isRTL ? 'حاسبة القيمة الحقيقية لأنظمة السداد (NPV)' : 'Payment Plan & NPV True Cost Simulator'}
                        </h1>
                        <p className="text-sm text-neutral-400">
                            {isRTL 
                                ? 'اكتشف التكلفة الكاش الحقيقية للأقساط بعد حساب التضخم ومعدلات الخصم في مصر'
                                : 'Discover the true present cash value of 5-10 year installment plans adjusted for Egyptian inflation'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Controls */}
                <div className="lg:col-span-5 space-y-4 bg-neutral-900/80 p-5 rounded-2xl border border-white/10 shadow-xl">
                    <h2 className="text-base font-semibold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-amber-400" />
                        {isRTL ? 'شروط ونظام السداد' : 'Payment Terms'}
                    </h2>

                    {/* Total Price */}
                    <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                            {isRTL ? 'إجمالي سعر الوحدة (ج.م)' : 'Nominal Total Price (EGP)'}
                        </label>
                        <input
                            type="number"
                            step="100000"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    {/* Down Payment % */}
                    <div>
                        <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
                            <span>{isRTL ? 'نسبة المقدم (Down Payment)' : 'Down Payment'}</span>
                            <span className="text-amber-400 font-bold">{downPaymentPercent}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="5"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(e.target.value)}
                            className="w-full accent-amber-500"
                        />
                    </div>

                    {/* Installment Years */}
                    <div>
                        <div className="flex justify-between text-xs font-medium text-neutral-300 mb-1.5">
                            <span>{isRTL ? 'مدة التقسيط (سنوات)' : 'Installment Duration (Years)'}</span>
                            <span className="text-amber-400 font-bold">{years} {isRTL ? 'سنوات' : 'Years'}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full accent-amber-500"
                        />
                    </div>

                    {/* Frequency */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                {isRTL ? 'دورية السداد' : 'Frequency'}
                            </label>
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                                <option value="quarterly">{isRTL ? 'ربع سنوي (كل 3 شهور)' : 'Quarterly (3 Mo)'}</option>
                                <option value="monthly">{isRTL ? 'شهرياً' : 'Monthly'}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                                {isRTL ? 'معدل التضخم/الخصم' : 'Discount / Inflation'}
                            </label>
                            <select
                                value={discountRateAnnual}
                                onChange={(e) => setDiscountRateAnnual(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                            >
                                <option value="0.15">15% سنوياً</option>
                                <option value="0.18">18% سنوياً (المعياري)</option>
                                <option value="0.22">22% سنوياً</option>
                                <option value="0.25">25% سنوياً</option>
                            </select>
                        </div>
                    </div>

                    {/* Secondary Fees */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">
                                {isRTL ? 'دفعة استلام %' : 'Delivery %'}
                            </label>
                            <input
                                type="number"
                                value={deliveryPaymentPercent}
                                onChange={(e) => setDeliveryPaymentPercent(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-1">
                                {isRTL ? 'وديعة صيانة %' : 'Maintenance %'}
                            </label>
                            <input
                                type="number"
                                value={maintenanceDepositPercent}
                                onChange={(e) => setMaintenanceDepositPercent(e.target.value)}
                                className="w-full bg-neutral-800 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-7 space-y-4">
                    {simResult && (
                        <>
                            {/* NPV Comparison Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-amber-500/30 shadow-2xl">
                                <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                                    {isRTL ? 'القيمة الحقيقية للكاش اليوم (NPV)' : 'Real Present Cash Value (NPV)'}
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
                                    <div className="text-3xl font-black text-emerald-400">
                                        {simResult.realPresentCashValue.toLocaleString()} <span className="text-base text-neutral-400 font-normal">EGP</span>
                                    </div>
                                    <div className="text-xs text-neutral-400">
                                        {isRTL ? 'بدلاً من السعر الاسمي المعروض:' : 'vs Nominal Price:'}{' '}
                                        <span className="line-through text-neutral-400 font-bold">{simResult.nominalPrice.toLocaleString()} EGP</span>
                                    </div>
                                </div>

                                {/* Inflation Discount Meter */}
                                <div className="py-4 border-b border-white/10">
                                    <div className="flex items-center justify-between text-xs mb-2">
                                        <span className="text-neutral-300 font-medium">{isRTL ? 'الخصم الفعلي الناتج عن التقسيط والتضخم:' : 'Effective Real Inflation Discount:'}</span>
                                        <span className="text-emerald-400 font-bold text-sm">{simResult.effectiveInflationDiscount}</span>
                                    </div>
                                    <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden flex">
                                        <div 
                                            className="h-full bg-emerald-500 transition-all duration-500" 
                                            style={{ width: `${Math.min(100, (simResult.realPresentCashValue / simResult.nominalPrice) * 100)}%` }}
                                        />
                                        <div 
                                            className="h-full bg-amber-500/40" 
                                            style={{ width: `${Math.min(100, 100 - ((simResult.realPresentCashValue / simResult.nominalPrice) * 100))}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Financial Verdict */}
                                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-200 leading-relaxed">
                                    <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                                        <Info className="w-4 h-4" />
                                        {isRTL ? 'الحكم المالي للمستشار الذكي:' : 'Financial Verdict & Cash Discount Advice:'}
                                    </div>
                                    {isRTL ? simResult.financialVerdictAr : simResult.financialVerdictEn}
                                </div>

                                {/* Key Figures Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'المقدم المطلوب' : 'Down Payment'}</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{simResult.downPayment.toLocaleString()} EGP</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? (frequency === 'quarterly' ? 'القسط الربع سنوي' : 'القسط الشهري') : 'Installment / Period'}</div>
                                        <div className="text-sm font-bold text-amber-300 mt-0.5">{simResult.installmentPerPeriod.toLocaleString()} EGP</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'دفعة الاستلام' : 'Delivery Payment'}</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{simResult.deliveryPayment.toLocaleString()} EGP</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-white/5">
                                        <div className="text-[11px] text-neutral-400">{isRTL ? 'وديعة الصيانة' : 'Maintenance'}</div>
                                        <div className="text-sm font-bold text-white mt-0.5">{simResult.maintenanceDeposit.toLocaleString()} EGP</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
