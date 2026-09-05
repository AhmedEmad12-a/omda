const express = require('express');
const router = express.Router();

// Egyptian Real Estate Benchmark Database (Price per m² in EGP as of 2024-2026 market tiers)
const EGYPT_MARKET_DATA = {
    zones: [
        {
            id: 'new-cairo',
            nameEn: 'New Cairo (Fifth Settlement)',
            nameAr: 'القاهرة الجديدة (التجمع الخامس)',
            region: 'East Cairo',
            avgPricePerMeter: 48000,
            priceRange: { min: 32000, max: 85000 },
            rentalYieldAnnual: 0.075,
            annualAppreciation: 0.22,
            topCompounds: [
                { nameEn: 'Mivida (Emaar)', nameAr: 'ميفيدا (إعمار)', avgPrice: 75000, tier: 'Ultra Luxury' },
                { nameEn: 'Mountain View iCity', nameAr: 'ماونتن فيو آي سيتي', avgPrice: 52000, tier: 'Luxury' },
                { nameEn: 'Palm Hills New Cairo', nameAr: 'بالم هيلز نيو كايرو', avgPrice: 62000, tier: 'Luxury' },
                { nameEn: 'Beit El Watan (Private)', nameAr: 'بيت الوطن (عمارات مستقلة)', avgPrice: 34000, tier: 'Mid-Market' },
                { nameEn: 'South of Academy', nameAr: 'جنوب الأكاديمية', avgPrice: 42000, tier: 'Upscale' },
                { nameEn: 'Golden Square (General)', nameAr: 'المربع الذهبي', avgPrice: 56000, tier: 'Luxury' }
            ],
            coordinates: [30.0131, 31.4913]
        },
        {
            id: 'sheikh-zayed',
            nameEn: 'Sheikh Zayed City & New Zayed',
            nameAr: 'مدينة الشيخ زايد وزايد الجديدة',
            region: 'West Cairo',
            avgPricePerMeter: 46000,
            priceRange: { min: 30000, max: 90000 },
            rentalYieldAnnual: 0.07,
            annualAppreciation: 0.20,
            topCompounds: [
                { nameEn: 'Allegria (SODIC)', nameAr: 'أليجريا (سوديك)', avgPrice: 85000, tier: 'Ultra Luxury' },
                { nameEn: 'VYE SODIC (New Zayed)', nameAr: 'فاي سوديك (زايد الجديدة)', avgPrice: 58000, tier: 'Luxury' },
                { nameEn: 'Karma (Al Karma)', nameAr: 'الكرما', avgPrice: 48000, tier: 'Upscale' },
                { nameEn: 'Zed Towers (Ora)', nameAr: 'أبراج زد (أورا)', avgPrice: 92000, tier: 'Ultra Luxury' },
                { nameEn: 'Green Belt (Private Villas)', nameAr: 'الحزام الأخضر', avgPrice: 32000, tier: 'Mid-Market' }
            ],
            coordinates: [30.0444, 30.9833]
        },
        {
            id: 'october-6',
            nameEn: '6th of October City',
            nameAr: 'مدينة 6 أكتوبر',
            region: 'West Cairo',
            avgPricePerMeter: 32000,
            priceRange: { min: 22000, max: 55000 },
            rentalYieldAnnual: 0.08,
            annualAppreciation: 0.18,
            topCompounds: [
                { nameEn: 'O West (Orascom)', nameAr: 'أو ويست (أوراسكوم)', avgPrice: 52000, tier: 'Luxury' },
                { nameEn: 'Sun Capital', nameAr: 'صن كابيتال', avgPrice: 42000, tier: 'Upscale' },
                { nameEn: 'October Plaza (SODIC)', nameAr: 'أكتوبر بلازا (سوديك)', avgPrice: 48000, tier: 'Luxury' },
                { nameEn: 'Ashgar City', nameAr: 'حي الأشجار', avgPrice: 28000, tier: 'Mid-Market' },
                { nameEn: 'Northern Expansions', nameAr: 'التوسعات الشمالية', avgPrice: 25000, tier: 'Economy/Mid' }
            ],
            coordinates: [29.9737, 30.9529]
        },
        {
            id: 'new-capital',
            nameEn: 'New Administrative Capital (NAC)',
            nameAr: 'العاصمة الإدارية الجديدة',
            region: 'East Cairo',
            avgPricePerMeter: 39000,
            priceRange: { min: 26000, max: 70000 },
            rentalYieldAnnual: 0.085,
            annualAppreciation: 0.25,
            topCompounds: [
                { nameEn: 'Celia (TMG)', nameAr: 'سيليا (طلعت مصطفى)', avgPrice: 55000, tier: 'Luxury' },
                { nameEn: 'Il Bosco (Misr Italia)', nameAr: 'إل بوسكو (مصر إيطاليا)', avgPrice: 44000, tier: 'Upscale' },
                { nameEn: 'Al Maqsad (City Edge)', nameAr: 'المقصد (سيتي إيدج)', avgPrice: 48000, tier: 'Upscale Ready' },
                { nameEn: 'R7 District (Avg)', nameAr: 'الحي السكني السابع R7', avgPrice: 34000, tier: 'Mid-Market' },
                { nameEn: 'R8 District (Avg)', nameAr: 'الحي السكني الثامن R8', avgPrice: 31000, tier: 'Mid-Market' },
                { nameEn: 'CBD Iconic Towers (Admin)', nameAr: 'منطقة الأعمال المركزية CBD', avgPrice: 95000, tier: 'Commercial/Admin' }
            ],
            coordinates: [30.0167, 31.7500]
        },
        {
            id: 'mostakbal-city',
            nameEn: 'Mostakbal City',
            nameAr: 'مدينة المستقبل',
            region: 'East Cairo',
            avgPricePerMeter: 42000,
            priceRange: { min: 32000, max: 60000 },
            rentalYieldAnnual: 0.07,
            annualAppreciation: 0.24,
            topCompounds: [
                { nameEn: 'Bloomfields (Tatweer Misr)', nameAr: 'بلوم فيلدز (تطوير مصر)', avgPrice: 46000, tier: 'Luxury' },
                { nameEn: 'Haptown (Hassan Allam)', nameAr: 'هاب تاون (حسن علام)', avgPrice: 54000, tier: 'Ultra Luxury' },
                { nameEn: 'Il Bosco City', nameAr: 'إل بوسكو سيتي', avgPrice: 41000, tier: 'Upscale' },
                { nameEn: 'Aria (LMD)', nameAr: 'أريا', avgPrice: 39000, tier: 'Mid/Upscale' }
            ],
            coordinates: [30.0833, 31.6500]
        },
        {
            id: 'north-coast',
            nameEn: 'North Coast (Sahel & Ras El Hekma)',
            nameAr: 'الساحل الشمالي ورأس الحكمة',
            region: 'Coastal',
            avgPricePerMeter: 85000,
            priceRange: { min: 45000, max: 180000 },
            rentalYieldAnnual: 0.11,
            annualAppreciation: 0.35,
            topCompounds: [
                { nameEn: 'Marassi (Emaar)', nameAr: 'مراسي (إعمار)', avgPrice: 150000, tier: 'Ultra Luxury' },
                { nameEn: 'Hacienda Bay / Red (Palm Hills)', nameAr: 'هاسيندا (بالم هيلز)', avgPrice: 135000, tier: 'Ultra Luxury' },
                { nameEn: 'Ras El Hekma Mega Projects', nameAr: 'مشروعات رأس الحكمة', avgPrice: 110000, tier: 'Global Luxury' },
                { nameEn: 'Silver Sands (Ora)', nameAr: 'سيلفر ساندز (أورا)', avgPrice: 140000, tier: 'Ultra Luxury' },
                { nameEn: 'Sidi Abdel Rahman (General)', nameAr: 'سيدي عبد الرحمن', avgPrice: 75000, tier: 'Luxury' }
            ],
            coordinates: [30.9833, 28.8500]
        },
        {
            id: 'maadi',
            nameEn: 'Maadi & Degla',
            nameAr: 'المعادي ودجلة',
            region: 'South Cairo',
            avgPricePerMeter: 38000,
            priceRange: { min: 25000, max: 65000 },
            rentalYieldAnnual: 0.085,
            annualAppreciation: 0.16,
            topCompounds: [
                { nameEn: 'Sarayat El Maadi', nameAr: 'سرايات المعادي', avgPrice: 62000, tier: 'Heritage Luxury' },
                { nameEn: 'Degla El Maadi', nameAr: 'دجلة المعادي', avgPrice: 42000, tier: 'Upscale' },
                { nameEn: 'Zahraa El Maadi', nameAr: 'زهراء المعادي', avgPrice: 28000, tier: 'Mid-Market' }
            ],
            coordinates: [29.9602, 31.2569]
        }
    ]
};

// Finishing Multipliers
const FINISHING_MULTIPLIERS = {
    'core_and_shell': { multiplier: 1.0, labelEn: 'Core & Shell (على المحارة)', labelAr: 'على المحارة / بدون تشطيب', costPerMeter: 0 },
    'semi_finished': { multiplier: 1.12, labelEn: 'Semi Finished (نصف تشطيب)', labelAr: 'نصف تشطيب (محارة وحلوق وتأسيس)', costPerMeter: 2500 },
    'fully_finished': { multiplier: 1.30, labelEn: 'Fully Finished (تشطيب كامل / سوبر لوكس)', labelAr: 'تشطيب كامل سوبر لوكس', costPerMeter: 6500 },
    'ultra_lux': { multiplier: 1.50, labelEn: 'Ultra Super Lux (ألترا سوبر لوكس بالتكييفات)', labelAr: 'ألترا سوبر لوكس مع التكييفات والديكور', costPerMeter: 11000 }
};

// GET /api/v1/real-estate/zones - List all zones and benchmark prices
router.get('/zones', (req, res) => {
    res.json({
        success: true,
        data: EGYPT_MARKET_DATA.zones,
        finishingOptions: FINISHING_MULTIPLIERS
    });
});

// POST /api/v1/real-estate/evaluate - Fair Price Evaluation Engine
router.post('/evaluate', (req, res) => {
    try {
        const {
            zoneId,
            compoundName,
            areaM2,
            finishing = 'semi_finished',
            floor = 2,
            isGarden = false,
            isRoof = false,
            deliveryYear = 2026,
            askingPriceTotal = null
        } = req.body;

        if (!zoneId || !areaM2) {
            return res.status(400).json({ error: 'zoneId and areaM2 are required' });
        }

        const zone = EGYPT_MARKET_DATA.zones.find(z => z.id === zoneId) || EGYPT_MARKET_DATA.zones[0];
        const numArea = parseFloat(areaM2);
        let baseMeterPrice = zone.avgPricePerMeter;

        if (compoundName) {
            const compound = zone.topCompounds.find(c => c.nameEn === compoundName || c.nameAr === compoundName);
            if (compound) {
                baseMeterPrice = compound.avgPrice;
            }
        }

        const finishingData = FINISHING_MULTIPLIERS[finishing] || FINISHING_MULTIPLIERS['semi_finished'];
        let adjustedMeterPrice = baseMeterPrice * finishingData.multiplier;

        if (isGarden) adjustedMeterPrice *= 1.10;
        if (isRoof) adjustedMeterPrice *= 1.08;
        if (floor === 0 && !isGarden) adjustedMeterPrice *= 0.95;
        if (floor >= 5 && !isRoof) adjustedMeterPrice *= 1.02;

        const currentYear = new Date().getFullYear();
        const yearsToDelivery = Math.max(0, parseInt(deliveryYear) - currentYear);
        if (yearsToDelivery === 0) {
            adjustedMeterPrice *= 1.12;
        } else if (yearsToDelivery >= 3) {
            adjustedMeterPrice *= 0.88;
        }

        const estimatedPricePerM2 = Math.round(adjustedMeterPrice);
        const estimatedTotalPrice = Math.round(estimatedPricePerM2 * numArea);
        const fairRangeMin = Math.round(estimatedTotalPrice * 0.92);
        const fairRangeMax = Math.round(estimatedTotalPrice * 1.08);

        let dealRating = null;
        let dealDifferencePercentage = null;
        let negotiationAdvice = null;

        if (askingPriceTotal && parseFloat(askingPriceTotal) > 0) {
            const asking = parseFloat(askingPriceTotal);
            dealDifferencePercentage = (((asking - estimatedTotalPrice) / estimatedTotalPrice) * 100).toFixed(1);

            if (asking < fairRangeMin) {
                dealRating = {
                    status: 'BARGAIN',
                    labelEn: '🔥 Underpriced / Bargain Deal (لقطة)',
                    labelAr: '🔥 فرصة ممتازة / سعر لقطة تحت السوق',
                    color: '#22c55e'
                };
                negotiationAdvice = `This unit is priced ${Math.abs(dealDifferencePercentage)}% BELOW estimated market fair value. Verify developer credentials and property title immediately before closing.`;
            } else if (asking > fairRangeMax) {
                dealRating = {
                    status: 'OVERPRICED',
                    labelEn: '⚠️ Overpriced vs Market (سعر مرتفع)',
                    labelAr: '⚠️ السعر مبالغ فيه مقارنة بمتوسط المنطقة',
                    color: '#ef4444'
                };
                negotiationAdvice = `Asking price is ${dealDifferencePercentage}% ABOVE fair market value. Recommended aggressive counter-offer: ${Math.round(estimatedTotalPrice * 0.95).toLocaleString()} EGP (~${Math.round(estimatedPricePerM2 * 0.95).toLocaleString()} EGP/m²).`;
            } else {
                dealRating = {
                    status: 'FAIR',
                    labelEn: '✅ Fair Market Price (سعر عادل)',
                    labelAr: '✅ سعر عادل ومطابق لأسعار السوق الحالية',
                    color: '#eab308'
                };
                negotiationAdvice = `The asking price aligns with the current market valuation. Target a 3% to 5% cash discount for immediate payment.`;
            }
        }

        const estAnnualRent = Math.round(estimatedTotalPrice * zone.rentalYieldAnnual);
        const estMonthlyRent = Math.round(estAnnualRent / 12);
        const projectedValue3Years = Math.round(estimatedTotalPrice * Math.pow(1 + zone.annualAppreciation, 3));

        res.json({
            success: true,
            data: {
                zone: zone.nameEn,
                zoneAr: zone.nameAr,
                areaM2: numArea,
                finishing: finishingData.labelEn,
                finishingAr: finishingData.labelAr,
                estimatedPricePerM2,
                estimatedTotalPrice,
                fairRange: {
                    min: fairRangeMin,
                    max: fairRangeMax
                },
                dealRating,
                dealDifferencePercentage,
                negotiationAdvice,
                investmentMetrics: {
                    annualRentalYield: `${(zone.rentalYieldAnnual * 100).toFixed(1)}%`,
                    estimatedMonthlyRent: estMonthlyRent,
                    estimatedAnnualRent: estAnnualRent,
                    annualAppreciationRate: `${(zone.annualAppreciation * 100).toFixed(0)}%`,
                    projectedValueIn3Years: projectedValue3Years
                }
            }
        });
    } catch (err) {
        console.error('Error in real estate valuation:', err);
        res.status(500).json({ error: 'Internal valuation error', details: err.message });
    }
});

// POST /api/v1/real-estate/payment-plan - NPV & Egyptian Installment Simulator
router.post('/payment-plan', (req, res) => {
    try {
        const {
            totalPrice,
            downPaymentPercent = 10,
            years = 7,
            frequency = 'quarterly',
            discountRateAnnual = 0.18,
            deliveryYearInMonths = 24,
            deliveryPaymentPercent = 10,
            maintenanceDepositPercent = 8
        } = req.body;

        const price = parseFloat(totalPrice);
        if (!price || price <= 0) {
            return res.status(400).json({ error: 'Valid totalPrice is required' });
        }

        const downPayment = price * (parseFloat(downPaymentPercent) / 100);
        const deliveryPayment = price * (parseFloat(deliveryPaymentPercent) / 100);
        const maintenanceDeposit = price * (parseFloat(maintenanceDepositPercent) / 100);

        const remainingToInstall = price - downPayment - deliveryPayment;
        const totalPeriods = frequency === 'quarterly' ? years * 4 : years * 12;
        const installmentPerPeriod = Math.max(0, remainingToInstall / totalPeriods);

        const annualDiscount = parseFloat(discountRateAnnual);
        const periodDiscountRate = frequency === 'quarterly'
            ? Math.pow(1 + annualDiscount, 1 / 4) - 1
            : Math.pow(1 + annualDiscount, 1 / 12) - 1;

        let npvTotal = downPayment;
        const schedule = [];

        for (let i = 1; i <= totalPeriods; i++) {
            const monthsPassed = frequency === 'quarterly' ? i * 3 : i;
            let paymentAmount = installmentPerPeriod;
            let isDelivery = false;

            if (Math.abs(monthsPassed - deliveryYearInMonths) < (frequency === 'quarterly' ? 3 : 1) && deliveryPayment > 0) {
                paymentAmount += deliveryPayment;
                isDelivery = true;
            }

            const pv = paymentAmount / Math.pow(1 + periodDiscountRate, i);
            npvTotal += pv;

            if (i <= 12 || i % 4 === 0 || i === totalPeriods) {
                schedule.push({
                    period: i,
                    month: monthsPassed,
                    amount: Math.round(paymentAmount),
                    presentValue: Math.round(pv),
                    isDelivery
                });
            }
        }

        const realPresentCashCost = Math.round(npvTotal);
        const nominalSavingsOverCash = Math.round(price - realPresentCashCost);
        const effectiveRealDiscountPercent = (((price - realPresentCashCost) / price) * 100).toFixed(1);

        res.json({
            success: true,
            data: {
                nominalPrice: price,
                downPayment: Math.round(downPayment),
                downPaymentPercent,
                deliveryPayment: Math.round(deliveryPayment),
                maintenanceDeposit: Math.round(maintenanceDeposit),
                installmentPerPeriod: Math.round(installmentPerPeriod),
                frequency,
                totalYears: years,
                totalInstallmentsCount: totalPeriods,
                realPresentCashValue: realPresentCashCost,
                inflationSavingsVsNominal: nominalSavingsOverCash,
                effectiveInflationDiscount: `${effectiveRealDiscountPercent}%`,
                schedulePreview: schedule,
                financialVerdictEn: `Due to ~${(annualDiscount * 100).toFixed(0)}% annual inflation discount, this ${price.toLocaleString()} EGP payment plan has a TRUE cash cost of only ${realPresentCashCost.toLocaleString()} EGP in today's money. If a developer offers less than a ${effectiveRealDiscountPercent}% cash discount, taking the ${years}-year installment plan is mathematically more profitable!`,
                financialVerdictAr: `بسبب معدل الخصم والتضخم (~${(annualDiscount * 100).toFixed(0)}% سنوياً)، خطة التقسيط بمبلغ ${price.toLocaleString()} ج.م تعادل قيمة كاش حقيقية قدرها ${realPresentCashCost.toLocaleString()} ج.م فقط بأسعار اليوم. إذا عرض المطور خصم كاش أقل من ${effectiveRealDiscountPercent}%، فإن اختيار التقسيط على ${years} سنوات هو الخيار الأفضل والأوفر مالياً!`
            }
        });
    } catch (err) {
        console.error('Error in payment plan simulator:', err);
        res.status(500).json({ error: 'Internal payment plan calculation error', details: err.message });
    }
});

module.exports = router;
