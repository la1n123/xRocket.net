// Telegram Web App инициализация
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Функция перемешивания
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
    const TON_TO_USD = 1.4;

    // Состояние кошелька и выбранной валюты
    let walletConnected = localStorage.getItem('walletConnected') === 'true';
    let walletType = localStorage.getItem('walletType') || 'TON'; // 'TON' или 'RUB'
    let currency = localStorage.getItem('currency') || 'TON'; // 'TON' или 'USD'

    // Элементы
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarImg = document.getElementById('avatarImg');
    const walletStatus = document.getElementById('walletStatus');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletTypeTon = document.getElementById('walletTypeTon');
    const walletTypeRub = document.getElementById('walletTypeRub');
    const currencyTon = document.getElementById('currencyTon');
    const currencyUsd = document.getElementById('currencyUsd');
    const buyModal = document.getElementById('buyModal');
    const closeBuyModal = document.getElementById('closeBuyModal');
    const confirmBuyBtn = document.getElementById('confirmBuyBtn');
    const buyModalName = document.getElementById('buyModalName');
    const buyModalPrice = document.getElementById('buyModalPrice');
    const walletWarning = document.getElementById('walletWarning');
    const modalTerm = document.getElementById('modalTerm');
    const modalBackground = document.getElementById('modalBackground');
    const modalModel = document.getElementById('modalModel');
    const modalNumber = document.getElementById('modalNumber');

    // Данные карточек
    let nftItems = [];
    let pricesInTon = {};

    // Базовые имена NFT
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

    // Загрузка цен из JSON
    let prices = {};
    try {
        const response = await fetch('prices.json?' + Date.now());
        if (response.ok) {
            prices = await response.json();
            console.log('✅ Цены загружены');
        }
    } catch (e) {
        console.warn('Ошибка загрузки цен', e);
    }

    for (let i = 1; i <= TOTAL_NFT; i++) {
        const nameIndex = (i - 1) % baseNames.length;
        const displayName = baseNames[nameIndex] + ` #${i}`;
        let priceTon = prices[i] !== undefined ? Number(prices[i]) : Number((Math.random() * 100).toFixed(2));
        pricesInTon[i] = priceTon;
        nftItems.push({ id: i, name: displayName, priceTon: priceTon });
    }

    nftItems = shuffleArray(nftItems);

    function formatPrice(priceTon) {
        if (currency === 'TON') {
            return priceTon.toFixed(2) + ' $';
        } else {
            return (priceTon * TON_TO_USD).toFixed(2) + ' $';
        }
    }

    const nftGrid = document.getElementById('nftGrid');
    function renderNFTs() {
        if (!nftGrid) return;
        nftGrid.innerHTML = '';
        nftItems.forEach(item => {
            const priceDisplay = formatPrice(item.priceTon);
            nftGrid.innerHTML += `
                <div class="nft-card" data-id="${item.id}">
                    <img src="images/${item.id}.jpg" 
                         alt="NFT ${item.id}" 
                         onerror="this.src='https://via.placeholder.com/150/1a1a1a/00ff88?text=NFT+${item.id}'">
                    <div class="nft-name">${item.name}</div>
                    <div class="nft-price">${priceDisplay}</div>
                </div>
            `;
        });
        attachNFTClickHandlers();
    }

    function attachNFTClickHandlers() {
        document.querySelectorAll('.nft-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.querySelector('.nft-name')?.textContent || 'NFT';
                const priceTon = pricesInTon[id];
                openBuyModal(id, name, priceTon);
            });
        });
    }

    function openBuyModal(id, name, priceTon) {
        buyModalName.textContent = name;
        buyModalPrice.textContent = 'Цена: ' + formatPrice(priceTon);

        modalTerm.textContent = 'загрузка...';
        modalBackground.textContent = 'загрузка...';
        modalModel.textContent = 'загрузка...';
        modalNumber.textContent = 'загрузка...';

        setTimeout(() => {
            modalTerm.textContent = '∞ (бессрочно)';
            modalBackground.textContent = 'Космос';
            modalModel.textContent = 'Стандарт';
            modalNumber.textContent = `#${id}`;
        }, 300);

        if (!walletConnected) {
            confirmBuyBtn.disabled = true;
            walletWarning.style.display = 'block';
        } else {
            confirmBuyBtn.disabled = false;
            walletWarning.style.display = 'none';
        }

        confirmBuyBtn.dataset.nftId = id;
        buyModal.style.display = 'flex';
        tg.HapticFeedback?.impactOccurred('medium');
    }

    closeBuyModal.addEventListener('click', () => {
        buyModal.style.display = 'none';
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                buyModal.style.display = 'none';
            }
        });
    });

    confirmBuyBtn.addEventListener('click', () => {
        if (!walletConnected) return;
        const nftId = confirmBuyBtn.dataset.nftId;
        tg.sendData(JSON.stringify({ action: 'buy_nft', id: nftId }));
        tg.HapticFeedback?.notificationOccurred('success');
        tg.showPopup({
            title: 'Покупка совершена',
            message: `Вы купили NFT #${nftId}`,
            buttons: [{type: 'ok'}]
        });
        buyModal.style.display = 'none';
    });

    // ========== ПРИВЯЗКА КОШЕЛЬКА ==========
    function updateWalletUI() {
        if (walletConnected) {
            walletStatus.textContent = `Кошелёк привязан (${walletType}) ✓`;
            walletStatus.classList.add('connected');
            connectWalletBtn.textContent = 'Изменить кошелёк';
        } else {
            walletStatus.textContent = 'Кошелёк не привязан';
            walletStatus.classList.remove('connected');
            connectWalletBtn.textContent = 'Привязать кошелёк';
        }
        if (walletTypeTon && walletTypeRub) {
            walletTypeTon.classList.toggle('active', walletType === 'TON');
            walletTypeRub.classList.toggle('active', walletType === 'RUB');
        }
    }

    if (walletTypeTon) {
        walletTypeTon.addEventListener('click', () => {
            walletType = 'TON';
            localStorage.setItem('walletType', walletType);
            updateWalletUI();
        });
    }
    if (walletTypeRub) {
        walletTypeRub.addEventListener('click', () => {
            walletType = 'RUB';
            localStorage.setItem('walletType', walletType);
            updateWalletUI();
        });
    }

    connectWalletBtn.addEventListener('click', () => {
        walletConnected = true;
        localStorage.setItem('walletConnected', 'true');
        updateWalletUI();
        walletStatus.classList.add('connected-animation');
        setTimeout(() => walletStatus.classList.remove('connected-animation'), 500);
        tg.HapticFeedback?.notificationOccurred('success');
        tg.showPopup({
            title: 'Кошелёк привязан',
            message: `Тип: ${walletType}. Теперь вы можете покупать NFT.`,
            buttons: [{type: 'ok'}]
        });
    });

    // ========== ПЕРЕКЛЮЧЕНИЕ ВАЛЮТЫ ==========
    function setCurrency(newCurrency) {
        currency = newCurrency;
        localStorage.setItem('currency', currency);
        currencyTon.classList.toggle('active', currency === 'TON');
        currencyUsd.classList.toggle('active', currency === 'USD');
        renderNFTs();
        if (buyModal.style.display === 'flex') {
            const id = confirmBuyBtn.dataset.nftId;
            if (id) {
                const priceTon = pricesInTon[id];
                buyModalPrice.textContent = 'Цена: ' + formatPrice(priceTon);
            }
        }
    }

    currencyTon.addEventListener('click', () => setCurrency('TON'));
    currencyUsd.addEventListener('click', () => setCurrency('USD'));

    // ========== ЗАГРУЗКА АВАТАРКИ ПОЛЬЗОВАТЕЛЯ ==========
    if (user && user.photo_url) {
        avatarImg.src = user.photo_url;
    } else {
        // Если нет фото, оставляем заглушку
        avatarImg.src = 'https://via.placeholder.com/40/1a1a1a/00ff88?text=User';
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

    // Клик по аватарке открывает профиль
    if (profileAvatar) {
        profileAvatar.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            const profileNav = document.querySelector('.nav-item[data-page="profile"]');
            if (profileNav) profileNav.classList.add('active');
            showPage('profile');
            tg.HapticFeedback?.impactOccurred('light');
        });
    }

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

    const inviteBtn = document.getElementById('inviteBtn');
    if (inviteBtn) {
        inviteBtn.addEventListener('click', () => {
            const text = 'Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!';
            tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(text)}`);
        });
    }

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tg.HapticFeedback?.impactOccurred('light');
        });
    });

    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action || this.textContent.trim();
            tg.HapticFeedback?.impactOccurred('light');
            tg.sendData(JSON.stringify({ action: action || 'unknown' }));
        });
    });

    document.querySelectorAll('.quick-find').forEach(el => {
        el.addEventListener('click', () => {
            tg.HapticFeedback?.impactOccurred('light');
            tg.sendData(JSON.stringify({ action: 'quick_find' }));
        });
    });

    // Инициализация UI
    renderNFTs();
    updateWalletUI();
    setCurrency(currency);

    if (user) {
        const profileNameElem = document.getElementById('profileName');
        if (profileNameElem) profileNameElem.textContent = user.first_name || 'Jdjsndnxc';
    }

    console.log(`✅ Mini App загружен, ${TOTAL_NFT} NFT`);
});
