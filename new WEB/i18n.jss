// js/i18n.js
let currentLang = localStorage.getItem('appLang') || 'en';

function t(key) {
    return window.TRANSLATIONS[currentLang][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (window.TRANSLATIONS[currentLang][key]) {
            el.textContent = window.TRANSLATIONS[currentLang][key];
        }
    });
    
    // Update language toggle button text
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'বাংলা' : 'English';
    }
    
    // Dispatch event so other scripts know language changed
    window.dispatchEvent(new Event('languageChanged'));
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    applyTranslations();
}

function toggleLanguage() {
    setLanguage(currentLang === 'en' ? 'bn' : 'en');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});

window.I18N = { t, setLanguage, getLang: () => currentLang };