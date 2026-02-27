const tg = window.Telegram.WebApp;
tg.expand();

// ========== ДАННЫЕ ==========
const user = tg.initDataUnsafe?.user;
const TOTAL_NFT = 41; // 41 фото

// Имена NFT (можно заменить на свои)
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

// ========== ЗАГРУЗКА NFT ==========
const nftGrid = document.getElementById('nftGrid');
if (nftGrid) {
    for (let i = 1; i <= TOTAL_NFT; i++) {
        const nameIndex = (i - 1) % nftNames.length;
        const price = (Math.random() * 100).toFixed(2);
        nftGrid.innerHTML += `
            <div class="nft-card" data-id="${i}">
                <img src="images/${i}.jpg" alt="NFT ${i}" onerror="this.src='https://via.placeholder.com/150/1a1a1a/00ff88?text=NFT+${i}'">
                <div class="nft-name">${nftNames[nameIndex]}</div>
                <div class="nft-price">${price} 🏆</div>
            </div>
        `;
    }
}

// ========== ПРОФИЛЬ ==========
if (user) {
    document.getElementById('profileName').textContent = user.first_name || 'Jdjsndnxc';
}

// ========== НАВИГАЦИЯ ==========
const storePage = document.getElementById('storePage');
const giftsPage = document.getElementById('giftsPage');
const profilePage = document.getElementById('profilePage');
const seasonPage = document.getElementById('seasonPage');

const navItems = document.querySelectorAll('.nav-item');
const backFromProfile = document.getElementById('backFromProfile');
const backFromSeason = document.getElementById('backFromSeason');

function showPage(page) {
    storePage.classList.remove('active');
    giftsPage.classList.remove('active');
    profilePage.classList.remove('active');
    seasonPage.classList.remove('active');
    if (page === 'store') storePage.classList.add('active');
    if (page === 'gifts') giftsPage.classList.add('active');
    if (page === 'profile') profilePage.classList.add('active');
    if (page === 'season') seasonPage.classList.add('active');
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        const page = item.dataset.page;
        showPage(page);
        tg.HapticFeedback.impactOccurred('light');
    });
});

backFromProfile.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector('[data-page="store"]').classList.add('active');
    showPage('store');
});

backFromSeason.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector('[data-page="store"]').classList.add('active');
    showPage('store');
});

// ========== MY GIFTS: ВКЛАДКИ ==========
const giftTabs = document.querySelectorAll('.gift-tab');
const giftsTab = document.getElementById('giftsTabContent');
const offersTab = document.getElementById('offersTabContent');
const activityTab = document.getElementById('activityTabContent');

giftTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        giftTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tabName = this.dataset.tab;
        giftsTab.style.display = tabName === 'gifts' ? 'block' : 'none';
        offersTab.style.display = tabName === 'offers' ? 'block' : 'none';
        activityTab.style.display = tabName === 'activity' ? 'block' : 'none';
    });
});

// ========== КНОПКИ В MY GIFTS ==========
const addBtn = document.getElementById('addBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const sellBtn = document.getElementById('sellBtn');
const sendBtn = document.getElementById('sendBtn');
const bundleBtn = document.getElementById('bundleBtn');
const howToAddLink = document.getElementById('howToAddLink');

const replenishModal = document.getElementById('replenishModal');
const withdrawModal = document.getElementById('withdrawModal');
const closeReplenish = document.getElementById('closeReplenish');
const closeWithdraw = document.getElementById('closeWithdraw');
const managerLink = document.getElementById('managerLink');
const submitWithdraw = document.getElementById('submitWithdraw');

addBtn.addEventListener('click', () => {
    replenishModal.style.display = 'flex';
    tg.HapticFeedback.impactOccurred('heavy');
});

withdrawBtn.addEventListener('click', () => {
    withdrawModal.style.display = 'flex';
    tg.HapticFeedback.impactOccurred('heavy');
});

[sellBtn, sendBtn, bundleBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({
            title: btn.textContent.trim(),
            message: 'Функция временно недоступна',
            buttons: [{type: 'ok'}]
        });
    });
});

howToAddLink.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/xRocketgiftrobot');
});

// ========== МОДАЛКИ ==========
closeReplenish.addEventListener('click', () => replenishModal.style.display = 'none');
closeWithdraw.addEventListener('click', () => withdrawModal.style.display = 'none');

managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    replenishModal.style.display = 'none';
});

submitWithdraw.addEventListener('click', () => {
    const wallet = document.getElementById('tonWallet').value.trim();
    const card = document.getElementById('cardNumber').value.trim();
    if (!wallet || !card) {
        tg.showPopup({ title: 'Ошибка', message: 'Заполните все поля', buttons: [{type: 'ok'}] });
        return;
    }
    tg.HapticFeedback.notificationOccurred('success');
    tg.showPopup({ title: 'Заявка отправлена', message: 'Менеджер свяжется с вами', buttons: [{type: 'ok'}] });
    withdrawModal.style.display = 'none';
    document.getElementById('tonWallet').value = '';
    document.getElementById('cardNumber').value = '';
});

// ========== INVITE FRIENDS ==========
document.getElementById('inviteBtn').addEventListener('click', () => {
    const text = 'Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!';
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(text)}`);
});

// ========== ВКЛАДКИ STORE ==========
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ========== КЛИК ПО NFT ==========
document.querySelectorAll('.nft-card').forEach(card => {
    card.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.querySelector('.nft-name').textContent;
        tg.HapticFeedback.impactOccurred('medium');
        tg.sendData(JSON.stringify({ action: 'nft_click', id, name }));
    });
});

// ========== ЗАКРЫТИЕ МОДАЛОК ПО КЛИКУ НА ФОН ==========
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            replenishModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        }
    });
});

console.log(`✅ Mini App загружен, ${TOTAL_NFT} NFT`);
