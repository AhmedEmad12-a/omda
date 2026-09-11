import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
    { code: 'ar', name: 'العربية', short: 'عربي', dir: 'rtl', flag: '🇪🇬' },
    { code: 'en', name: 'English', short: 'EN', dir: 'ltr', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', short: 'FR', dir: 'ltr', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', short: 'DE', dir: 'ltr', flag: '🇩🇪' },
    { code: 'sw', name: 'Kiswahili', short: 'SW', dir: 'ltr', flag: '🇰🇪' }
];

export default function LanguageSwitcher({ direction = 'down', compact = false }) {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

    useEffect(() => {
        document.documentElement.dir = currentLang.dir || 'ltr';
        document.documentElement.lang = i18n.language;

        if (currentLang.dir === 'rtl') {
            document.body.classList.add('rtl');
            document.body.classList.remove('ltr');
        } else {
            document.body.classList.add('ltr');
            document.body.classList.remove('rtl');
        }
    }, [i18n.language, currentLang]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem('language', langCode);
        setIsOpen(false);
    };

    // Quick toggle between Arabic and English
    const toggleQuick = () => {
        const next = i18n.language === 'ar' ? 'en' : 'ar';
        changeLanguage(next);
    };

    if (compact) {
        return (
            <button
                onClick={toggleQuick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-white/10 hover:border-amber-500/40 transition-all shadow-sm"
                title={i18n.language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
        );
    }

    return (
        <div className="relative inline-block text-start" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 border border-white/10 hover:border-amber-500/40 transition-all shadow-sm"
            >
                <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{currentLang.flag} {currentLang.name}</span>
                </div>
                <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`}
                />
            </button>

            {isOpen && (
                <div 
                    className={`absolute z-[2500] min-w-[160px] py-1.5 rounded-2xl bg-[#0D1829] border border-amber-500/30 shadow-2xl shadow-black/80 backdrop-blur-xl ${
                        direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
                    } ${i18n.language === 'ar' ? 'right-0' : 'left-0'}`}
                >
                    <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400/80 border-b border-white/5 mb-1">
                        {i18n.language === 'ar' ? 'اختر اللغة' : 'Select Language'}
                    </div>
                    {languages.map((lang) => {
                        const isSelected = lang.code === i18n.language;
                        return (
                            <button
                                key={lang.code}
                                type="button"
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                                    isSelected 
                                        ? 'bg-amber-500/15 text-amber-300 font-bold' 
                                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
