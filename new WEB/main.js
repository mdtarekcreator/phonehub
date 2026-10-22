// js/main.js
function renderPhoneGrid() {
    const container = document.getElementById('phone-container');
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    if (!window.PHONES || !Array.isArray(window.PHONES)) return;

    window.PHONES.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'phone-card';
        
        const name = phone.name || 'Unknown Phone';
        const brand = phone.brand || 'Unknown';
        const usd = phone.priceUsd ? phone.priceUsd.toLocaleString() : 'N/A';
        const bdt = phone.priceBdt ? phone.priceBdt.toLocaleString() : 'N/A';
        const imgSrc = phone.image || 'https://via.placeholder.com/200x300?text=No+Image';

        card.innerHTML = `
            <img src="${imgSrc}" alt="${name}">
            <h3>${name}</h3>
            <p><strong>${brand}</strong></p>
            <p>${usd} ${window.I18N.t('price.usd')} | ${bdt} ${window.I18N.t('price.bdt')}</p>
        `;
        
        container.appendChild(card);
    });
}

// Listen for language changes to re-render (since prices use translations)
window.addEventListener('languageChanged', () => {
    renderPhoneGrid();
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderPhoneGrid();
});
// Phase 2: Dark/Light Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');

// চেক করুন ইউজার আগে কোনো থিম সিলেক্ট করেছিল কিনা
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggleBtn) {
    themeToggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });
}