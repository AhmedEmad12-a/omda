import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import {
    Home, Bot, Building2, Coins, MapPin, 
    BarChart3, Settings, LogOut, Search, Sparkles
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [userData] = useState(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                return {
                    name: user.displayName || user.name || 'مستثمر عقاري',
                    role: user.role || 'عضو مميز'
                };
            } catch (e) {
                console.error(e);
            }
        }
        return {
            name: 'مستثمر عقاري',
            role: 'عضو مميز'
        };
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { 
            id: 'home', 
            label: isRTL ? 'الرئيسية وسوق العقارات' : 'Home & Market Hub', 
            path: '/', 
            icon: Home, 
            badge: null 
        },
        { 
            id: 'copilot', 
            label: isRTL ? 'المستشار الذكي (أمولة AI)' : 'Amola AI Copilot', 
            path: '/copilot', 
            icon: Bot, 
            badge: isRTL ? 'مباشر' : 'Live' 
        },
        { 
            id: 'valuation', 
            label: isRTL ? 'مُقَيِّم الأسعار والصفقات' : 'Fair Price Valuator', 
            path: '/valuation', 
            icon: Building2, 
            badge: null 
        },
        { 
            id: 'payment-plans', 
            label: isRTL ? 'حاسبة أنظمة السداد (NPV)' : 'Payment Plan & NPV', 
            path: '/payment-plans', 
            icon: Coins, 
            badge: null 
        },
        { 
            id: 'market', 
            label: isRTL ? 'مستكشف المناطق والكمبوندات' : 'Zones & Compounds Map', 
            path: '/market', 
            icon: MapPin, 
            badge: null 
        },
        { 
            id: 'dashboards', 
            label: isRTL ? 'تحليلات السوق والمؤشرات' : 'Market Analytics', 
            path: '/analytics/dashboards', 
            icon: BarChart3, 
            badge: null 
        }
    ];

    const filteredItems = searchQuery.trim()
        ? navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const handleNavigation = (path) => {
        navigate(path);
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    return (
        <aside className="sidebar" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    🏢
                </div>
                <div className="sidebar-branding">
                    <div className="brand-name">أمولة للعقارات</div>
                    <div className="product-name">Amola Real Estate AI</div>
                </div>
            </div>

            {/* Quick Search */}
            <div className="sidebar-search-container">
                <div className="sidebar-search-wrapper">
                    <Search className="search-icon" size={15} />
                    <input
                        type="text"
                        className="sidebar-search-input"
                        placeholder={isRTL ? 'انتقال سريع للأدوات...' : 'Jump to tool...'}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsSearchOpen(e.target.value.length > 0);
                        }}
                    />
                </div>

                {isSearchOpen && filteredItems.length > 0 && (
                    <div className="search-dropdown">
                        {filteredItems.map(item => (
                            <button
                                key={item.id}
                                className="search-result-item"
                                onClick={() => handleNavigation(item.path)}
                            >
                                <item.icon size={15} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Nav Menu */}
            <nav className="sidebar-nav">
                <div className="section-label">
                    {isRTL ? 'الأدوات والخدمات العقارية' : 'PropTech Services'}
                </div>

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${active ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <Icon size={17} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                            {item.badge && <span className="nav-badge">{item.badge}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                {/* Language Switcher */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LanguageSwitcher />
                </div>

                {/* User Profile Bar */}
                <div className="user-profile-badge">
                    <div className="user-avatar">
                        {userData.name.charAt(0)}
                    </div>
                    <div className="user-info">
                        <div className="user-name">{userData.name}</div>
                        <div className="user-role">{userData.role}</div>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="logout-btn" 
                        title={isRTL ? 'تسجيل الخروج' : 'Log out'}
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
