const tg = window.Telegram.WebApp;
tg.expand();

// ========== НАСТРОЙКА: 41 ФОТОГРАФИЯ ==========
const TOTAL_NFT = 41; // <--- ТОЧНО 41 ФОТО

// Названия для NFT (41 штука - как на скриншотах)
const nftNames = [
    "Whip Cupcake #133069",
    "Stellar Rocket #37166",
    "Stellar Rocket #117704",
    "Diamond Hands #007",
    "To The Moon #420",
    "Alien Artifact #999",
    "Dragon Egg #001",
    "Magic Sword #123",
    "Ancient Shield #456",
    "Cyber Punk #777",
    "Neon City #888",
    "Samurai #999",
    "Golden Coin #111",
    "Silver Ring #222",
    "Bronze Medal #333",
    "Crystal Ball #444",
    "Magic Hat #555",
    "Flying Carpet #666",
    "Treasure Chest #777",
    "Legendary Sword #888",
    "Phoenix Feather #001",
    "Thunder Hammer #002",
    "Ice Wand #003",
    "Fire Blade #004",
    "Shadow Cloak #005",
    "Light Shield #006",
    "Dark Helm #007",
    "Royal Crown #008",
    "Ancient Tome #009",
    "Mystic Orb #010",
    "Elven Bow #011",
    "Dwarven Axe #012",
    "Goblin Dagger #013",
    "Dragon Scale #014",
    "Unicorn Horn #015",
    "Pegasus Wing #016",
    "Griffin Claw #017",
    "Sphinx Eye #018",
    "Phoenix Ash #019",
    "Dragon Heart #020",
    "Star Dust #021"
];

// Функция для генерации цены (случайная от 1 до 100)
function getRandomPrice() {
    return (Math.random() * 99 + 1).toFixed(2);
}

// ========== СОЗДАЕМ СЕТКУ NFT ==========
const nftGrid = document.getElementById('nftGrid');
if (nftGrid) {
    nftGrid.innerHTML = ''; // Очищаем
    
    for (let i = 1; i <= TOTAL_NFT; i++) {
        const nameIndex = (i - 1) % nftNames.length;
        const price = getRandomPrice();
        
        nftGrid.innerHTML += `
            <div class="nft-card" data-id="${i}">
                <img src="images/${i}.jpg" 
                     alt="NFT ${i}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/150/1a1a1a/00ff88?text=NFT+${i}'">
                <div class="nft-name">${nftNames[nameIndex]}</div>
                <div class="nft-price">${price} 🏆</div>
            </div>
        `;
    }
}

// ========== КЛИК ПО NFT ==========
document.querySelectorAll('.nft-card').forEach(card => {
    card.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.querySelector('.nft-name').textContent;
        const price = this.querySelector('.nft-price').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        tg.sendData(JSON.stringify({
            action: 'nft_click',
            id: id,
            name: name,
            price: price
        }));
        
        tg.showPopup({
            title: `NFT #${id}`,
            message: `${name}\nЦена: ${price}`,
            buttons: [{type: 'ok'}]
        });
    });
});

// ========== НАВИГАЦИЯ ==========
const pages = {
    store: document.getElementById('storePage'),
    gifts: document.getElementById('giftsPage'),
    profile: document.getElementById('profilePage'),
    season: document.getElementById('seasonPage')
};

const navItems = document.querySelectorAll('.nav-item');
const profileIcon = document.getElementById('profileIcon');

// Переключение по нижнему меню
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        Object.values(pages).forEach(p => {
            if (p) p.classList.remove('active');
        });
        if (pages[page]) pages[page].classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Открыть профиль по иконке
if (profileIcon) {
    profileIcon.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        Object.values(pages).forEach(p => {
            if (p) p.classList.remove('active');
        });
        if (pages.profile) pages.profile.classList.add('active');
        tg.HapticFeedback.impactOccurred('medium');
    });
}

// Кнопки назад
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        navItems.forEach(n => n.classList.remove('active'));
        const storeNav = document.querySelector('.nav-item[data-page="store"]');
        if (storeNav) storeNav.classList.add('active');
        Object.values(pages).forEach(p => {
            if (p) p.classList.remove('active');
        });
        if (pages.store) pages.store.classList.add('active');
    });
});

// ========== ВКЛАДКИ ==========
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});

// ========== КНОПКИ (Collection, Model, Back, Symbol, Quick find) ==========
document.querySelectorAll('.icon-btn, .quick-find').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.replace(/[📂🛒⬅🏷🔍]/g, '').trim();
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({
            title: text || 'Раздел',
            message: 'В разработке',
            buttons: [{type: 'ok'}]
        });
    });
});

// ========== MY GIFTS ==========
const addBtn = document.getElementById('addBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const managerModal = document.getElementById('managerModal');
const withdrawModal = document.getElementById('withdrawModal');

if (addBtn) {
    addBtn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('heavy');
        if (managerModal) managerModal.style.display = 'flex';
    });
}

if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('heavy');
        if (withdrawModal) withdrawModal.style.display = 'flex';
    });
}

// Sell, Send, Bundle - заглушки
['sellBtn', 'sendBtn', 'bundleBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            tg.HapticFeedback.impactOccurred('light');
            tg.showPopup({
                title: btn.textContent.trim(),
                message: 'Функция временно недоступна',
                buttons: [{type: 'ok'}]
            });
        });
    }
});

// Вкладки в My Gifts
const giftTabs = document.querySelectorAll('.gift-tab');
const giftsTab = document.getElementById('giftsTabContent');
const offersTab = document.getElementById('offersTabContent');
const activityTab = document.getElementById('activityTabContent');

giftTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        giftTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const target = this.dataset.gift;
        if (giftsTab) giftsTab.style.display = target === 'gifts' ? 'block' : 'none';
        if (offersTab) offersTab.style.display = target === 'offers' ? 'block' : 'none';
        if (activityTab) activityTab.style.display = target === 'activity' ? 'block' : 'none';
    });
});

// ========== МОДАЛКИ ==========
// Закрытие по крестику
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) modal.style.display = 'none';
    });
});

// Клик по менеджеру
const managerLink = document.getElementById('managerLink');
if (managerLink) {
    managerLink.addEventListener('click', () => {
        tg.openTelegramLink('https://t.me/ManagerKupiKod');
        if (managerModal) managerModal.style.display = 'none';
    });
}

// Отправка вывода
const submitWithdraw = document.getElementById('submitWithdraw');
if (submitWithdraw) {
    submitWithdraw.addEventListener('click', () => {
        const wallet = document.getElementById('tonWallet')?.value.trim();
        const card = document.getElementById('cardNumber')?.value.trim();
        
        if (!wallet || !card) {
            tg.showPopup({
                title: 'Ошибка',
                message: 'Заполните все поля',
                buttons: [{type: 'ok'}]
            });
            return;
        }
        
        tg.HapticFeedback.notificationOccurred('success');
        tg.showPopup({
            title: 'Заявка отправлена',
            message: 'Менеджер свяжется с вами',
            buttons: [{type: 'ok'}]
        });
        
        if (withdrawModal) withdrawModal.style.display = 'none';
        if (document.getElementById('tonWallet')) document.getElementById('tonWallet').value = '';
        if (document.getElementById('cardNumber')) document.getElementById('cardNumber').value = '';
    });
}

// Закрытие модалок по клику на фон
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        }
    });
});

// ========== INVITE FRIENDS ==========
const inviteBtn = document.getElementById('inviteBtn');
if (inviteBtn) {
    inviteBtn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('light');
        const text = 'Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!';
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(text)}`);
    });
}

// ========== HOW TO ADD GIFTS ==========
const howToAddLink = document.getElementById('howToAddLink');
if (howToAddLink) {
    howToAddLink.addEventListener('click', (e) => {
        e.preventDefault();
        tg.openTelegramLink('https://t.me/xRocketgiftrobot');
    });
}

console.log(`✅ Mini App загружен с ${TOTAL_NFT} NFT`);
