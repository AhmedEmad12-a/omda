import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import { Bot, Sparkles, TrendingUp, Bell } from 'lucide-react';

const AppLayout = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#070C15',
            color: '#F8FAFC',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <Sidebar />

            <div style={{
                flex: 1,
                marginInlineStart: '260px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
            }}>
                {/* Real Estate Top Market Ticker & Header */}
                <header style={{
                    height: '56px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                    background: 'rgba(13, 21, 36, 0.75)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 900
                }}>
                    {/* Live Egyptian Real Estate Pulse */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        overflowX: 'auto',
                        fontSize: '11px',
                        color: '#94A3B8'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: 700,
                            color: '#E0AA3E',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }}></span>
                            {isRTL ? 'مؤشر السوق المصري:' : 'Egypt Market Pulse:'}
                        </div>

                        <div style={{ display: 'flex', gap: '14px', whiteSpace: 'nowrap' }}>
                            <span>📍 {isRTL ? 'التجمع الخامس:' : 'New Cairo:'} <b style={{ color: '#F1F5F9' }}>~48k ج.م/م²</b></span>
                            <span>📍 {isRTL ? 'الشيخ زايد:' : 'Sheikh Zayed:'} <b style={{ color: '#F1F5F9' }}>~46k ج.م/م²</b></span>
                            <span>📍 {isRTL ? 'العاصمة الإدارية:' : 'New Capital:'} <b style={{ color: '#F1F5F9' }}>~39k ج.م/م²</b></span>
                            <span>🏖️ {isRTL ? 'الساحل ورأس الحكمة:' : 'North Coast:'} <b style={{ color: '#E0AA3E' }}>~85k ج.م/م²</b></span>
                        </div>
                    </div>

                    {/* Right Header Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            onClick={() => navigate('/copilot')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'linear-gradient(135deg, #E0AA3E 0%, #D4AF37 100%)',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(224, 170, 62, 0.3)',
                                transition: 'all 150ms'
                            }}
                        >
                            <Sparkles size={14} />
                            {isRTL ? 'استشارة الذكاء الاصطناعي' : 'Ask AI Agent'}
                        </button>
                    </div>
                </header>

                {/* Main Content View */}
                <main style={{
                    flex: 1,
                    padding: '24px',
                    overflowY: 'auto',
                }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
