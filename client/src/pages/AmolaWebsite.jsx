import React, { useState, useEffect, useRef } from 'react';
import { 
    Heart, 
    Sparkles, 
    Music, 
    Volume2, 
    VolumeX, 
    Gift, 
    Stars, 
    Smile, 
    Send, 
    Award, 
    Calendar, 
    Mail, 
    SunMedium, 
    Coffee, 
    Compass, 
    Feather,
    CheckCircle2
} from 'lucide-react';

const AMOLA_COMPLIMENTS = [
    "وجودك في حياتي هو أحلى نعمة وسبب لابتسامتي كل يوم ❤️",
    "ضحكتك قادرة تحلّي أي يوم صعب وتخليه كله نور ✨",
    "طيبة قلبك ونقاء روحك حاجة نادرة ومفيش زيها في الدنيا 🌸",
    "أنتِ مش بس شخص غالي، أنتِ الدنيا كلها والراحة في وسط زحمة العالم 💫",
    "كل ثانية بتكلم فيها معاكي بتبقى أحلى لحظات يومي ⏳",
    "فخور بيكي وبكل تفاصيلك، وممتن جداً لوجودك معايا 👑",
    "ربنا يديمك في حياتي أجمل وأحن شخص ويحفظك من كل شر 🤲",
    "مكانتك في قلبي متتوصفش بكلام، أنتِ الأمان والبيت الدافي 🏡",
    "مهما كانت الأيام مشغولة، أنتِ دائماً أول فكرة بتيجي في بالي 💭",
    "عيونك وضحكتك هما سر السعادة والبهجة في الحياة 🌟"
];

const REASONS = [
    {
        icon: "💖",
        title: "طيبة قلبك ونقاء روحك",
        desc: "قلبك الأبيض اللي ميعرفش غير الخير والاهتمام والصدق في كل تصرف."
    },
    {
        icon: "🌟",
        title: "ضحكتك اللي بتنور الدنيا",
        desc: "أجمل ابتسامة قادرة تمسح أي تعب وترجع للروح فرحتها في ثانية."
    },
    {
        icon: "🤝",
        title: "الأمان والسند الحقيقي",
        desc: "الإحساس بالراحة والطمأنينة اللي مبلقيهوش غير في وجودك وكلامك."
    },
    {
        icon: "🌸",
        title: "تفاصيلك اللي ملهاش مثيل",
        desc: "طريقتك، كلامك، اهتمامك، وحتى أبسط حركاتك اللي بتخطف القلب."
    },
    {
        icon: "🕊️",
        title: "السلام والراحة النفسية",
        desc: "مكانك هو الملاذ الهادي اللي بنسى فيه كل هموم وتعب الدنيا."
    },
    {
        icon: "👑",
        title: "لأنك ببساطة... أمولة",
        desc: "لأنك الشخص الوحيد اللي مفيش في جماله ولا حنيته اتنين في الكون."
    }
];

const LETTERS = [
    {
        id: 1,
        title: "رسالة إلى أغلى شخص 💌",
        subtitle: "عن معنى وجودك في حياتي",
        content: "أمولة الغالية.. حبيت أعملك الموقع ده عشان يفضل شاهد على مكانتك الكبيرة في قلبي. وجودك مش مجرد صدفة حلوة، وجودك هو النور اللي نوّر طريقي وغير معنى الأيام. شكراً لأنك أنتِ، وشكراً على كل ابتسامة رسمتيها على وشي."
    },
    {
        id: 2,
        title: "وعد دائم من القلب 🤝",
        subtitle: "في كل وقت وفي أي ظرف",
        content: "أوعدك إني هفضل دائماً الشخص اللي يفرح لفرحك ويزعل لزعلك، ويحاول دايماً يرسم الضحكة على ملامحك. مكانتك ثابتة متتغيرش مع الأيام، وأغلى ما أملك هو سعادتك وراحتك يا أمولة."
    },
    {
        id: 3,
        title: "دعوة ليكي من أعماق قلبي 🤲",
        subtitle: "لكل يوم وكل خطوة",
        content: "يا رب يسعد قلبك أضعاف ما بتسعدي كل اللي حواليكي، ويبعد عنك أي حزن أو ضيق، ويحققلك كل أحلامك وطموحاتك، وتفضلي دايماً منورة حياتي بأجمل ضحكة وأطيب قلب."
    }
];

export default function AmolaWebsite() {
    const [currentCompliment, setCurrentCompliment] = useState(AMOLA_COMPLIMENTS[0]);
    const [complimentIdx, setComplimentIdx] = useState(0);
    const [isPlayingSound, setIsPlayingSound] = useState(false);
    const [activeLetter, setActiveLetter] = useState(LETTERS[0]);
    const [showHugModal, setShowHugModal] = useState(false);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const [notes, setNotes] = useState([
        { id: 1, sender: "أنا", text: "أنتِ أجمل حاجة حصلت في حياتي يا أمولة ❤️", time: "اليوم" },
        { id: 2, sender: "من القلب", text: "ربنا يحفظك ويديم ضحكتك منورة دايماً ✨", time: "دائماً" }
    ]);
    const [newNote, setNewNote] = useState('');
    const [newSender, setNewSender] = useState('');
    const audioCtxRef = useRef(null);

    // Heart explosion trigger
    const triggerHeartExplosion = () => {
        const hearts = [];
        for (let i = 0; i < 30; i++) {
            hearts.push({
                id: Math.random(),
                x: Math.random() * 90 + 5,
                y: Math.random() * 80 + 10,
                size: Math.random() * 24 + 16,
                duration: Math.random() * 2 + 1.5,
                delay: Math.random() * 0.5
            });
        }
        setFloatingHearts(hearts);
        setShowHugModal(true);
        setTimeout(() => setFloatingHearts([]), 3500);
    };

    // Soft Romantic Chords Synthesizer (Web Audio API)
    const toggleMusic = () => {
        if (isPlayingSound) {
            if (audioCtxRef.current) {
                audioCtxRef.current.close();
                audioCtxRef.current = null;
            }
            setIsPlayingSound(false);
        } else {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const ctx = new AudioContext();
                audioCtxRef.current = ctx;

                // Play gentle arpeggiated dreamy music
                const notesFreq = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C5, E5, G5
                let step = 0;

                const playNote = () => {
                    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();

                    osc.type = 'sine';
                    const freq = notesFreq[step % notesFreq.length];
                    osc.frequency.setValueAtTime(freq, ctx.currentTime);

                    gain.gain.setValueAtTime(0.001, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

                    osc.connect(gain);
                    gain.connect(ctx.destination);

                    osc.start();
                    osc.stop(ctx.currentTime + 2.0);

                    step++;
                    setTimeout(playNote, 450);
                };

                playNote();
                setIsPlayingSound(true);
            } catch (err) {
                console.error("Audio not supported", err);
            }
        }
    };

    const nextCompliment = () => {
        const next = (complimentIdx + 1) % AMOLA_COMPLIMENTS.length;
        setComplimentIdx(next);
        setCurrentCompliment(AMOLA_COMPLIMENTS[next]);
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;
        const noteObj = {
            id: Date.now(),
            sender: newSender.trim() || 'شخص يحبك',
            text: newNote.trim(),
            time: 'الآن'
        };
        setNotes([noteObj, ...notes]);
        setNewNote('');
        setNewSender('');
        triggerHeartExplosion();
    };

    return (
        <div className="min-h-screen bg-[#09030C] text-[#FFF0F5] font-sans antialiased selection:bg-rose-500 selection:text-white relative overflow-hidden" dir="rtl">
            
            {/* AMBIENT BACKGROUND GLOWS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-pink-500/15 rounded-full blur-[160px]"></div>
                <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[130px]"></div>
            </div>

            {/* FLOATING HEARTS OVERLAY */}
            {floatingHearts.map((h) => (
                <div 
                    key={h.id}
                    className="fixed pointer-events-none z-50 text-rose-400 animate-bounce"
                    style={{
                        left: `${h.x}%`,
                        top: `${h.y}%`,
                        fontSize: `${h.size}px`,
                        transition: `all ${h.duration}s ease-out`
                    }}
                >
                    ❤️
                </div>
            ))}

            {/* FLOATING TOP NAVIGATION BAR */}
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#120516]/80 border-b border-rose-500/20 shadow-lg shadow-rose-950/30">
                <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-lg shadow-rose-500/30 flex items-center justify-center">
                            <span className="text-2xl animate-spin" style={{ animationDuration: '8s' }}>👑</span>
                        </div>
                        <div>
                            <div className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                                <span>أمولة | Amola</span>
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-ping" />
                            </div>
                            <div className="text-[11px] font-semibold text-rose-300">
                                لأغلى وأعز شخص في حياتي
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Music button */}
                        <button
                            onClick={toggleMusic}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                                isPlayingSound 
                                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 animate-pulse' 
                                : 'bg-rose-950/40 text-rose-300 border-rose-500/30 hover:bg-rose-900/50'
                            }`}
                        >
                            {isPlayingSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span>{isPlayingSound ? 'موسيقى هادئة شريكة 🎶' : 'تشغيل موسيقى هادئة 🎵'}</span>
                        </button>

                        {/* Quick Hug Button */}
                        <button
                            onClick={triggerHeartExplosion}
                            className="hidden sm:flex px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all items-center gap-1.5"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>مفاجأة لأمولة 🎁</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO DEDICATION SECTION */}
            <section className="relative z-10 pt-16 pb-20 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold shadow-md">
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span>مساحة خاصة ومهداة من كل قلبي</span>
                        <Stars className="w-3.5 h-3.5 text-amber-300" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
                        إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200">أمولة</span> الغالية
                    </h1>

                    <p className="text-lg sm:text-2xl font-medium text-rose-200/90 leading-relaxed">
                        "أنتِ مش بس أغلى شخص في حياتي.. أنتِ النور اللي بيجمّل كل أيامي" ❤️
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        صممت هذا الموقع المخصوص عشان يفضل هدية وتذكار دائم لمكانتك العظيمة، ولكل لحظة حلوة جمعتنا، ولكل ضحكة جميلة بتسعد قلبي.
                    </p>

                    {/* Action CTAs */}
                    <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
                        <button
                            onClick={triggerHeartExplosion}
                            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Gift className="w-5 h-5" />
                            <span>اضغطي هنا لحضن افتراضي دافئ 🤗</span>
                        </button>
                        
                        <a
                            href="#letters"
                            className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/15 flex items-center gap-2 transition-all"
                        >
                            <Mail className="w-5 h-5 text-rose-400" />
                            <span>قراءة رسائلي ليكي 💌</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* DAILY COMPLIMENT / HAPPINESS CAPSULE */}
            <section className="relative z-10 max-w-4xl mx-auto px-4 mb-20">
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1C0A21]/90 to-[#100315]/90 border border-rose-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-3 text-center sm:text-start flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>كبسولة سعادة يومية لأمولة</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-white leading-relaxed">
                                "{currentCompliment}"
                            </div>
                            <div className="text-xs text-rose-300/70">
                                رسائل حب وتقدير متجددة.. اضغطي على الزر لتغيير الرسالة 👇
                            </div>
                        </div>

                        <button
                            onClick={nextCompliment}
                            className="px-6 py-4 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm flex items-center gap-2.5 shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all shrink-0"
                        >
                            <Smile className="w-5 h-5" />
                            <span>رسالة تانية تسعدك 💖</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* 6 REASONS WHY AMOLA IS THE BEST */}
            <section className="relative z-10 max-w-6xl mx-auto px-4 mb-24">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25">
                        أسباب من القلب
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                        ليه أمولة هي أحسن شخص في حياتي؟
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                        كل يوم بيعدي بيثبتلي إنك نعمة نادرة ومفيش زيك في الكون
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REASONS.map((r, i) => (
                        <div 
                            key={i}
                            className="p-6 rounded-3xl bg-[#14061A]/80 border border-rose-500/20 hover:border-rose-400/50 shadow-xl hover:shadow-rose-500/10 transition-all hover:translate-y-[-4px] group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                                {r.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                                {r.title}
                            </h3>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                {r.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECRET LETTERS SECTION */}
            <section id="letters" className="relative z-10 max-w-5xl mx-auto px-4 mb-24">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25">
                        أوراق ورسائل سرية
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                        رسائلي المكتوبة ليكي 📜
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                        اختاري الرسالة وافتحيها لتقرأي ما في قلبي
                    </p>
                </div>

                {/* Letter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {LETTERS.map((letter) => (
                        <button
                            key={letter.id}
                            onClick={() => setActiveLetter(letter)}
                            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all ${
                                activeLetter.id === letter.id
                                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-400 shadow-xl shadow-rose-500/25 scale-105'
                                : 'bg-[#16061D] text-rose-200 border-rose-500/20 hover:border-rose-400/40'
                            }`}
                        >
                            <Feather className="w-4 h-4" />
                            <span>{letter.title}</span>
                        </button>
                    ))}
                </div>

                {/* Active Letter Envelope Display */}
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1E0926] to-[#120317] border-2 border-rose-500/40 shadow-2xl shadow-rose-950/50 relative">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-6 text-2xl mx-auto">
                        💌
                    </div>

                    <h3 className="text-2xl font-black text-white text-center mb-1">
                        {activeLetter.title}
                    </h3>
                    <p className="text-xs text-rose-300 font-semibold text-center mb-6">
                        {activeLetter.subtitle}
                    </p>

                    <div className="max-w-2xl mx-auto bg-black/30 p-6 sm:p-8 rounded-2xl border border-white/10 text-rose-100 text-sm sm:text-base leading-loose font-normal text-center shadow-inner">
                        "{activeLetter.content}"
                    </div>

                    <div className="mt-8 text-center text-xs text-rose-400/80 font-bold flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                        <span>دائماً وأبداً في قلبي يا أمولة</span>
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                    </div>
                </div>
            </section>

            {/* INTERACTIVE WISH & APPRECIATION WALL */}
            <section className="relative z-10 max-w-4xl mx-auto px-4 mb-24">
                <div className="p-8 rounded-3xl bg-[#14061A]/90 border border-rose-500/25 shadow-xl">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                            حائط الكلمات الجميلة
                        </span>
                        <h3 className="text-2xl font-black text-white mt-2">
                            اترك كلمة أو أمنية حلوة لأمولة ✨
                        </h3>
                    </div>

                    {/* Add note form */}
                    <form onSubmit={handleAddNote} className="space-y-4 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="اسمك أو صفتك..."
                                value={newSender}
                                onChange={(e) => setNewSender(e.target.value)}
                                className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-rose-400"
                            />
                            <input
                                type="text"
                                placeholder="اكتب كلمة أو دعوة تفرح قلب أمولة..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                className="sm:col-span-2 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-rose-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all"
                        >
                            <Send className="w-4 h-4" />
                            <span>نشر الرسالة على الحائط ❤️</span>
                        </button>
                    </form>

                    {/* Display notes */}
                    <div className="space-y-3">
                        {notes.map((n) => (
                            <div key={n.id} className="p-4 rounded-2xl bg-black/30 border border-rose-500/15 flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-xs font-extrabold text-rose-300 mb-1">
                                        {n.sender}
                                    </div>
                                    <div className="text-sm text-neutral-200">
                                        {n.text}
                                    </div>
                                </div>
                                <span className="text-[10px] text-neutral-500 shrink-0">
                                    {n.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIRTUAL HUG MODAL */}
            {showHugModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#2A0B36] to-[#14031B] border-2 border-rose-500 shadow-2xl text-center space-y-5">
                        <div className="w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/40 text-4xl flex items-center justify-center mx-auto animate-bounce">
                            🤗
                        </div>
                        <h3 className="text-2xl font-black text-white">
                            حضن دافئ خاص لأمولة! ❤️
                        </h3>
                        <p className="text-sm text-rose-200 leading-relaxed">
                            مهما كانت الدنيا زحمة أو فيها أي تعب، افتكري دايماً إنك الأغلى وإنك تستاهلي كل الفرحة والراحة اللي في الكون. ربنا يديم وجودك ويبعد عنك أي زعل! ✨
                        </p>
                        <button
                            onClick={() => setShowHugModal(false)}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-sm shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            شكراً من كل قلبي 🥰
                        </button>
                    </div>
                </div>
            )}

            {/* LUXURY ROMANTIC FOOTER */}
            <footer className="relative z-10 border-t border-rose-500/20 py-12 text-center text-xs text-neutral-500 space-y-2">
                <div className="flex items-center justify-center gap-2 text-rose-400 font-bold">
                    <span>صُنع بكل حب وتقدير خصيصاً لأمولة</span>
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-ping" />
                </div>
                <div>
                    Amola — The Best Person in My Life © {new Date().getFullYear()}
                </div>
            </footer>
        </div>
    );
}
