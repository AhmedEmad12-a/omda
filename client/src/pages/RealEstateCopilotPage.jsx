import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
    Send, Bot, User, Sparkles, Building2, Calculator, MapPin, 
    TrendingUp, ShieldAlert, ArrowRight, RefreshCw, Layers
} from 'lucide-react';

const SUGGESTIONS = [
    {
        titleAr: 'متوسط أسعار التجمع الخامس',
        titleEn: 'New Cairo Price Trends',
        prompt: 'ما هو متوسط سعر المتر للشقق في التجمع الخامس والمربع الذهبي مع أنظمة السداد المتاحة؟',
        icon: Building2
    },
    {
        titleAr: 'تقييم كمبوندات زايد وأكتوبر',
        titleEn: 'Sheikh Zayed & October Value',
        prompt: 'عايز مقارنة بين كمبوندات زايد الجديدة ومدينة 6 أكتوبر من حيث الاستثمار وسعر المتر والعائد الإيجاري.',
        icon: MapPin
    },
    {
        titleAr: 'تحليل الكاش مقابل التقسيط (NPV)',
        titleEn: 'Cash vs Installments (NPV)',
        prompt: 'معروض عليّ شقة بـ 7 مليون تقسيط على 7 سنين أو 4.8 مليون كاش، إيهما أفضل مالياً مع التضخم؟',
        icon: Calculator
    },
    {
        titleAr: 'فرص العاصمة الإدارية',
        titleEn: 'New Capital Opportunities',
        prompt: 'ما هي أفضل الأحياء السكنية والتجارية في العاصمة الإدارية للاستثمار طويل الأجل؟',
        icon: TrendingUp
    }
];

export default function RealEstateCopilotPage() {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const location = useLocation();
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            sender: 'bot',
            text: isRTL 
                ? `### 🏠 أهلاً بك في أمولة للعقارات - مستشارك العقاري الذكي
أنا مساعدك المتخصص في **سوق العقارات المصري**. يمكنني مساعدتك في:
* **تقييم السعر العادل** للشقق والفلل ومقارنتها بأسعار السوق.
* **حساب القيمة الحقيقية للأقساط (NPV)** ومقارنتها بخصومات الكاش والتضخم.
* **استكشاف أفضل الكمبوندات والمطورين** في التجمع، زايد، العاصمة الإدارية، والساحل الشمالي.

جرّب طرح سؤال أو اختر من الاقتراحات السريعة أدناه 👇`
                : `### 🏠 Welcome to Amola Real Estate Copilot (أمولة للعقارات)
I am your dedicated **Egyptian Real Estate & Financial Intelligence Agent**. I can help you:
* **Evaluate Fair Market Value** of properties and spot underpriced bargain deals.
* **Calculate Net Present Value (NPV)** to evaluate developer installment plans vs. cash discounts.
* **Explore top compounds & developers** across New Cairo, Sheikh Zayed, New Capital, and the North Coast.

Try asking a question or choose from the quick prompts below 👇`
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [chatId] = useState(`chat-${Date.now()}`);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        if (location.state?.initialQuery) {
            handleSend(location.state.initialQuery);
        }
    }, [location.state]);

    const handleSend = async (customPrompt) => {
        const queryText = customPrompt || input.trim();
        if (!queryText || loading) return;

        const userMsg = {
            id: `user-${Date.now()}`,
            sender: 'user',
            text: queryText
        };

        setMessages(prev => [...prev, userMsg]);
        if (!customPrompt) setInput('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/v1/ai/chat/aqarat-copilot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    question: queryText,
                    chatId
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            const data = await res.json();
            const botText = data.text || data.response || data.message || 'عذراً، لم أتمكن من الحصول على إجابة حالياً.';

            setMessages(prev => [
                ...prev,
                {
                    id: `bot-${Date.now()}`,
                    sender: 'bot',
                    text: botText
                }
            ]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages(prev => [
                ...prev,
                {
                    id: `bot-err-${Date.now()}`,
                    sender: 'bot',
                    text: isRTL 
                        ? '⚠️ حدث خطأ في الاتصال بالوكيل الذكي. يرجى المحاولة مرة أخرى.'
                        : '⚠️ Error connecting to the AI Agent. Please try again.'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-6xl mx-auto px-4 py-3" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            {isRTL ? 'أمولة للعقارات - المستشار الذكي' : 'Amola Real Estate Copilot'}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                {isRTL ? 'مباشر' : 'Live Agent'}
                            </span>
                        </h1>
                        <p className="text-xs text-neutral-400">
                            {isRTL ? 'تحليل أسعار العقارات، خطط السداد، والفرص الاستثمارية في مصر' : 'Egyptian property valuation, payment plan simulations, and market insights'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setMessages([messages[0]])}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {isRTL ? 'محادثة جديدة' : 'New Chat'}
                </button>
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                    {SUGGESTIONS.map((s, idx) => {
                        const Icon = s.icon;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleSend(s.prompt)}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/5 hover:border-amber-500/30 text-start transition-all duration-200 group"
                            >
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold text-neutral-200 group-hover:text-amber-300 transition-colors truncate">
                                        {isRTL ? s.titleAr : s.titleEn}
                                    </div>
                                    <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                                        {s.prompt}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.sender === 'user' ? (isRTL ? 'flex-row-reverse' : 'flex-row-reverse') : ''}`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            msg.sender === 'user'
                                ? 'bg-amber-500 text-black font-semibold'
                                : 'bg-neutral-800 border border-amber-500/30 text-amber-400 shadow-md'
                        }`}>
                            {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        {/* Content */}
                        <div className={`max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${
                            msg.sender === 'user'
                                ? 'bg-amber-500/20 text-white border border-amber-500/40 rounded-tr-none'
                                : 'bg-neutral-900/90 text-neutral-200 border border-white/10 shadow-xl rounded-tl-none prose prose-invert prose-sm max-w-none'
                        }`}>
                            {msg.sender === 'user' ? (
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            ) : (
                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                            <Bot className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-150"></span>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse delay-300"></span>
                            <span className="text-xs text-neutral-400 ml-2">
                                {isRTL ? 'جاري تحليل بيانات السوق وخيارات السداد...' : 'Analyzing Egyptian market data & payment plans...'}
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="mt-3 pt-3 border-t border-white/10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center bg-neutral-900/90 border border-white/15 focus-within:border-amber-500/60 rounded-xl p-1.5 shadow-2xl transition-all"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isRTL ? 'اسأل عن سعر كمبوند، تقييم شقة، خطة سداد، أو مقارنة الكاش بالتقسيط...' : 'Ask about compound prices, unit valuation, payment plan NPV, or market trends...'}
                        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-semibold transition-all shadow-md"
                    >
                        <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                </form>
            </div>
        </div>
    );
}
