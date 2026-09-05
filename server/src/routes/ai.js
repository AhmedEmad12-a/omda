const express = require('express');
const router = express.Router();

/**
 * AI Chat Routes - Proxies to User Workflow API or MicroMind Core
 * 
 * Configurable via environment variables:
 *   WORKFLOW_API_URL - Custom Workflow URL (Flowise / n8n / Langflow / Dify / FastAPI)
 *   AI_API_URL      - Base AI endpoint (default: https://dev.aimicromind.com)
 *   AI_API_KEY      - Bearer token / API key
 *   AI_CHATFLOW_ID  - Chatflow ID
 */

const WORKFLOW_API_URL = process.env.WORKFLOW_API_URL;
const AI_API_URL = process.env.AI_API_URL || 'https://dev.aimicromind.com';
const AI_API_KEY = process.env.AI_API_KEY;
const DEFAULT_CHATFLOW_ID = process.env.AI_CHATFLOW_ID;

// Built-in Egyptian Real Estate AI Engine (Fallback & Local Intelligence)
function generateEgyptianRealEstateResponse(question) {
    const q = (question || '').toLowerCase();

    // 1. New Cairo / Tagamoa
    if (q.includes('تجمع') || q.includes('cairo') || q.includes('tagamoa') || q.includes('ميفيدا') || q.includes('بيت الوطن')) {
        return `### 📍 تقرير وخيارات القاهرة الجديدة (التجمع الخامس)

القاهرة الجديدة تشهد طلباً قوياً خاصة في مناطق **المربع الذهبي (Golden Square)** و **بيت الوطن** و **المستقبل سيتي**.

#### 💰 متوسط أسعار المتر الحالية (2025/2026):
* **كمبوندات فاخرة (Emaar / Mountain View / Palm Hills):** 55,000 - 85,000 ج.م / م²
* **عمارات مستقلة وبيت الوطن:** 30,000 - 38,000 ج.م / م²
* **شقق جاهزة للاستلام الفوري (سوبر لوكس):** تبدأ من 45,000 ج.م / م²

#### 💡 نصيحة المستشار الذكي:
1. إذا كانت ميزانيتك كاش، فاوض على خصم كاش يتراوح بين **25% إلى 35%**.
2. خطط السداد الحالية في التجمع توفر **10% مقدم وتقسيط حتى 7 أو 8 سنوات**.
3. احسب دائماً وديعة الصيانة (8% عادةً) ورسوم الجراج عند حساب التكلفة الإجمالية.`;
    }

    // 2. Sheikh Zayed / October
    if (q.includes('زايد') || q.includes('zayed') || q.includes('أكتوبر') || q.includes('october') || q.includes('سوديك') || q.includes('أليجريا')) {
        return `### 📍 تقرير مدينة الشيخ زايد وأكتوبر (غرب القاهرة)

الشيخ زايد وتوسعات **زايد الجديدة (New Zayed)** تعتبر من أعلى المناطق طلباً للاستثمار السكني والعائلي.

#### 💰 متوسط أسعار المتر:
* **كمبوندات زايد القديمة والمركزية (SODIC / Emaar):** 60,000 - 90,000 ج.م / م²
* **كمبوندات زايد الجديدة (الحزام الأخضر والتوسعات):** 35,000 - 55,000 ج.م / م²
* **مدينة 6 أكتوبر (أو ويست / صن كابيتال):** 32,000 - 52,000 ج.م / م²

#### 💡 مقارنة السداد والاستثمار:
* متوسط العائد الإيجاري في زايد يقارب **7% إلى 8.5% سنوياً** خاصة للوحدات المشطبة والمفروشة.
* ينصح بالتركيز على المطورين ذوي السابقة المؤكدة في التسليم قبل الموعد.`;
    }

    // 3. New Capital
    if (q.includes('عاصمة') || q.includes('capital') || q.includes('r7') || q.includes('r8') || q.includes('cbd') || q.includes('ايقوني')) {
        return `### 📍 تقرير العاصمة الإدارية الجديدة (NAC)

العاصمة الإدارية توفر أطول فترات سداد في السوق المصري تصل إلى **8 - 10 سنوات** بأقساط متساوية.

#### 💰 أسعار المناطق السكنية والتجارية:
* **الأحياء السكنية (R7 & R8):** 28,000 - 45,000 ج.م / م² (نصف تشطيب وتشطيب كامل)
* **المكاتب والعيادات الإدارية (منطقة CBD والداون تاون):** 70,000 - 130,000 ج.م / م² مع عوائد إيجارية إلزامية.
* **المشروعات الحكومية الجاهزة (المقصد / الحي السكني الثالث R3):** 40,000 - 50,000 ج.م / م² استلام فوري.

#### ⚠️ نقاط هامة قبل الشراء:
* تأكد من نسبة الإنشاءات على أرض الواقع (يجب ألا تقل عن 30% للأمان).
* راجع شروط عقد الإيجار الإلزامي أو إعادة الاستثمار في الوحدات التجارية.`;
    }

    // 4. Payment Plan & NPV / Cash vs Installments
    if (q.includes('قسط') || q.includes('تقسيط') || q.includes('كاش') || q.includes('سداد') || q.includes('npv') || q.includes('تضخم') || q.includes('مقدم')) {
        return `### 💳 الدليل المالي لتحليل خطط السداد والتضخم في مصر

في ظل معدلات الفائدة والتضخم الحالية في مصر (~18% - 22%):

#### 📊 المقارنة الرياضية (كاش vs تقسيط على 7-8 سنوات):
* **شراء شقة 6,000,000 ج.م تقسيط على 7 سنوات (10% مقدم):**
  * القيمة الحقيقية الحالية للكاش (NPV) تعادل فقط **حوالي 3,500,000 ج.م** بأسعار اليوم!
  * **النتيجة:** إذا عرض المطور خصماً أقل من **35% كاش**، فإن **التقسيط هو القرار المالي الأذكى** لأن التضخم يتآكل مع قيمة الأقساط المستقبلية.

#### 🔍 التكاليف الخفية التي يجب مراجعتها:
1. **وديعة الصيانة:** (8% إلى 10% تدفع قبل الاستلام بـ 6 أشهر).
2. **عدادات المرافق والجراج:** (عادة من 150,000 إلى 250,000 ج.م).
3. **دفعة الاستلام:** هل يوجد 10% دفعة إضافية مع المفتاح؟`;
    }

    // 5. Default Comprehensive Advisor Response
    return `### 🤖 مرحباً بك في مستشارك العقاري الذكي في مصر

أنا وكيلك الذكي لتحليل وتقييم العقارات في السوق المصري. يمكنني مساعدتك في:

1. **تقييم السعر العادل (Fair Price):** معرفة إذا كان السعر المعروض لقطة، عادل، أو مبالغ فيه.
2. **تحليل خطط السداد وتأثير التضخم (NPV):** مقارنة الشراء كاش بالتقسيط على 5 إلى 10 سنوات.
3. **ترشيح أفضل الفرص في:**
   * **القاهرة الجديدة والتجمع الخامس** (المربع الذهبي، بيت الوطن، المستقبل سيتي)
   * **الشيخ زايد وأكتوبر** (زايد الجديدة، الحزام الأخضر)
   * **العاصمة الإدارية الجديدة** (R7, R8, CBD)
   * **الساحل الشمالي ورأس الحكمة**

💬 *اكتب لي طلبك بالتفصيل (المنطقة، الميزانية، أو خطة السداد) وسأقوم بتحليله فوراً!*`;
}

// POST /api/v1/ai/chat/:chatflowId - Main AI Proxy & Workflow Connector
router.post('/chat/:chatflowId', async (req, res) => {
    const { question, chatflowId: bodyChatflowId, chatId, workflowUrl } = req.body;
    const chatflowId = bodyChatflowId || req.params.chatflowId || DEFAULT_CHATFLOW_ID;

    // Determine target endpoint
    let targetUrl = workflowUrl || WORKFLOW_API_URL;
    
    if (!targetUrl) {
        const targetChatflowId = (!chatflowId || chatflowId === 'micromind' || chatflowId === 'e2b' || chatflowId === 'null')
            ? DEFAULT_CHATFLOW_ID
            : chatflowId;
        
        if (targetChatflowId && AI_API_KEY) {
            targetUrl = `${AI_API_URL}/api/v1/prediction/${targetChatflowId}`;
        }
    }

    console.log(`🤖 AI Request received. Question: "${question?.substring(0, 60)}..."`);

    // If external workflow target is configured, try proxying
    if (targetUrl) {
        console.log(`📡 Forwarding to Workflow URL: ${targetUrl}`);
        try {
            const payload = {
                question,
                message: question,
                prompt: question,
                input: question
            };
            if (chatId) payload.chatId = chatId;

            const headers = {
                'Content-Type': 'application/json'
            };
            if (AI_API_KEY) {
                headers['Authorization'] = AI_API_KEY.startsWith('Bearer ') ? AI_API_KEY : `Bearer ${AI_API_KEY}`;
            }

            const response = await fetch(targetUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Workflow response received`);
                return res.json(typeof data === 'string' ? { text: data } : data);
            } else {
                const errText = await response.text();
                console.warn(`⚠️ External workflow returned ${response.status}: ${errText.substring(0, 100)}`);
            }
        } catch (fetchErr) {
            console.warn(`⚠️ Could not reach external workflow: ${fetchErr.message}. Falling back to internal intelligence engine.`);
        }
    }

    // Fallback to built-in Egyptian Real Estate AI logic
    const aiText = generateEgyptianRealEstateResponse(question);
    res.json({
        text: aiText,
        chatId: chatId || `session-${Date.now()}`,
        source: 'egypt_real_estate_ai_engine'
    });
});

// GET /api/v1/ai/chatflows - List available chatflows
router.get('/chatflows', (req, res) => {
    res.json([
        { id: DEFAULT_CHATFLOW_ID || 'aqarat-copilot', name: 'Aqarat AI Real Estate Copilot' }
    ]);
});

// GET /api/v1/ai/sessions - List chat sessions
router.get('/sessions', (req, res) => {
    res.json([]);
});

module.exports = router;
