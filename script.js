// Telegram Web App инициализация
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Функция перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener('DOMContentLoaded', async function() {
    const user = tg.initDataUnsafe?.user;
    const TOTAL_NFT = 115;

    // Базовые имена (можно расширить или повторять)
    const baseNames = [
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

    // ========== ЗАГРУЗКА ЦЕН ИЗ JSON ==========
    let prices = {};
    try {
        const response = await fetch('prices.json?' + Date.now());
        if (response.ok) {
            prices = await response.json();
            console.log('✅ Цены загружены');
        } else {
            console.warn('⚠️ prices.json не найден, случайные цены');
        }
    } catch (e) {
        console.warn('⚠️ Ошибка загрузки цен', e);
    }

    // ========== СОЗДАЁМ МАССИВ ВСЕХ КАРТОЧЕК ==========
    let nftItems = [];
    for (let i = 1; i <= TOTAL_NFT; i++) {
        const nameIndex = (i - 1) % baseNames.length;
        // Уникальное имя (можно добавить номер, чтобы различать)
        const displayName = baseNames[nameIndex] + ` #${i}`;
        
        // Цена из JSON или случайная
        let price = prices[i];
        if (price === undefined) {
            price = (Math.random() * 100).toFixed(2);
        } else {
            price = Number(price).toFixed(2);
        }
        
        nftItems.push({
            id: i,
            name: displayName,
            price: price
        });
    }

    // ========== ПЕРЕМЕШИВАЕМ МАССИВ ==========
    nftItems = shuffleArray(nftItems);

    // ========== ОТРИСОВЫВАЕМ КАРТОЧКИ В СЛУЧАЙНОМ ПОРЯДКЕ ==========
    const nftGrid = document.getElementById('nftGrid');
    if (nftGrid) {
        nftGrid.innerHTML = ''; // очищаем
        nftItems.forEach(item => {
            nftGrid.innerHTML += `
                <div class="nft-card" data-id="${item.id}">
                    <img src="images/${item.id}.jpg" 
                         alt="NFT ${item.id}" 
                         onerror="this.src='https://via.placeholder.com/150/1a1a1a/00ff88?text=NFT+${item.id}'">
                    <div class="nft-name">${item.name}</div>
                    <div class="nft-price">${item.price} 🏆</div>
                </div>
            `;
        });
    }

    // ========== ОСТАЛЬНАЯ ЧАСТЬ КОДА (НАВИГАЦИЯ, МОДАЛКИ И Т.Д.) ==========
    // Вставь сюда весь остальной код из предыдущего скрипта, 
    // начиная с "= ПРОФИЛЬ =" и до конца.
    // Чтобы не дублировать 500 строк, я покажу кратко – но ты должен скопировать 
    // остальную часть из своего рабочего скрипта.
    // Например, вот так:

    // ========== ПРОФИЛЬ ==========
    if (user) {
        const profileNameElem = document.getElementById('profileName');
        if (profileNameElem) profileNameElem.textContent = user.first_name || 'Jdjsndnxc';
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
        storePage?.classList.remove('active');
        giftsPage?.classList.remove('active');
        profilePage?.classList.remove('active');
        seasonPage?.classList.remove('active');
        if (page === 'store') storePage?.classList.add('active');
        if (page === 'gifts') giftsPage?.classList.add('active');
        if (page === 'profile') profilePage?.classList.add('active');
        if (page === 'season') seasonPage?.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            const page = item.dataset.page;
            showPage(page);
            tg.HapticFeedback?.impactOccurred('light');
        });
    });

    if (backFromProfile) {
        backFromProfile.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            const storeNav = document.querySelector('[data-page="store"]');
            if (storeNav) storeNav.classList.add('active');
            showPage('store');
        });
    }

    if (backFromSeason) {
        backFromSeason.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            const storeNav = document.querySelector('[data-page="store"]');
            if (storeNav) storeNav.classList.add('active');
            showPage('store');
        });
    }

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
            if (giftsTab) giftsTab.style.display = tabName === 'gifts' ? 'block' : 'none';
            if (offersTab) offersTab.style.display = tabName === 'offers' ? 'block' : 'none';
            if (activityTab) activityTab.style.display = tabName === 'activity' ? 'block' : 'none';
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

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (replenishModal) replenishModal.style.display = 'flex';
            tg.HapticFeedback?.impactOccurred('heavy');
        });
    }

    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', () => {
            if (withdrawModal) withdrawModal.style.display = 'flex';
            tg.HapticFeedback?.impactOccurred('heavy');
        });
    }

    [sellBtn, sendBtn, bundleBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                tg.HapticFeedback?.impactOccurred('light');
                tg.showPopup({
                    title: btn.textContent.trim(),
                    message: 'Функция временно недоступна',
                    buttons: [{type: 'ok'}]
                });
            });
        }
    });

    if (howToAddLink) {
        howToAddLink.addEventListener('click', (e) => {
            e.preventDefault();
            tg.openTelegramLink('https://t.me/xRocketgiftrobot');
        });
    }

    // ========== МОДАЛКИ ==========
    if (closeReplenish) {
        closeReplenish.addEventListener('click', () => {
            if (replenishModal) replenishModal.style.display = 'none';
        });
    }
    if (closeWithdraw) {
        closeWithdraw.addEventListener('click', () => {
            if (withdrawModal) withdrawModal.style.display = 'none';
        });
    }

    if (managerLink) {
        managerLink.addEventListener('click', () => {
            tg.openTelegramLink('https://t.me/ManagerKupiKod');
            if (replenishModal) replenishModal.style.display = 'none';
        });
    }

    if (submitWithdraw) {
        submitWithdraw.addEventListener('click', () => {
            const wallet = document.getElementById('tonWallet')?.value.trim();
            const card = document.getElementById('cardNumber')?.value.trim();
            if (!wallet || !card) {
                tg.showPopup({ title: 'Ошибка', message: 'Заполните все поля', buttons: [{type: 'ok'}] });
                return;
            }
            tg.HapticFeedback?.notificationOccurred('success');
            tg.showPopup({ title: 'Заявка отправлена', message: 'Менеджер свяжется с вами', buttons: [{type: 'ok'}] });
            if (withdrawModal) withdrawModal.style.display = 'none';
            if (document.getElementById('tonWallet')) document.getElementById('tonWallet').value = '';
            if (document.getElementById('cardNumber')) document.getElementById('cardNumber').value = '';
        });
    }

    // ========== INVITE FRIENDS ==========
    const inviteBtn = document.getElementById('inviteBtn');
    if (inviteBtn) {
        inviteBtn.addEventListener('click', () => {
            const text = 'Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!';
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(text)}`);
        });
    }

    // ========== ВКЛАДКИ STORE ==========
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tg.HapticFeedback?.impactOccurred('light');
        });
    });

    // ========== КЛИК ПО NFT ==========
    document.querySelectorAll('.nft-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.querySelector('.nft-name')?.textContent || 'NFT';
            const price = this.querySelector('.nft-price')?.textContent || '0';
            tg.HapticFeedback?.impactOccurred('medium');
            tg.sendData(JSON.stringify({ 
                action: 'nft_click', 
                id, 
                name,
                price: price.replace('🏆', '').trim()
            }));
        });
    });

    // ========== ЗАКРЫТИЕ МОДАЛОК ПО КЛИКУ НА ФОН ==========
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                if (replenishModal) replenishModal.style.display = 'none';
                if (withdrawModal) withdrawModal.style.display = 'none';
            }
        });
    });

    // ========== ОБРАБОТКА КНОПОК COLLECTION, MODEL, BACK, SYMBOL ==========
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action || this.textContent.trim();
            tg.HapticFeedback?.impactOccurred('light');
            tg.sendData(JSON.stringify({ action: action || 'unknown' }));
        });
    });

    // ========== QUICK FIND ==========
    document.querySelectorAll('.quick-find').forEach(el => {
        el.addEventListener('click', () => {
            tg.HapticFeedback?.impactOccurred('light');
            tg.sendData(JSON.stringify({ action: 'quick_find' }));
        });
    });

    console.log(`✅ Mini App загружен, ${TOTAL_NFT} NFT, порядок случайный`);
});
