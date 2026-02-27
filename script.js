const tg = window.Telegram.WebApp;
tg.expand();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Элементы
const profileBtn = document.getElementById('profileBtn');
const giftBtn = document.getElementById('giftBtn');
const nftBtn = document.getElementById('nftBtn');
const profilePage = document.getElementById('profilePage');
const giftsPage = document.getElementById('giftsPage');
const backFromProfile = document.getElementById('backFromProfile');
const backFromGifts = document.getElementById('backFromGifts');

// Модалки
const replenishModal = document.getElementById('replenishModal');
const withdrawModal = document.getElementById('withdrawModal');
const closeReplenish = document.getElementById('closeReplenish');
const closeWithdraw = document.getElementById('closeWithdraw');
const managerLink = document.getElementById('managerLink');
const submitWithdraw = document.getElementById('submitWithdraw');
const tonWallet = document.getElementById('tonWallet');
const cardNumber = document.getElementById('cardNumber');

// Кнопки на странице My Gift
const addGiftBtn = document.getElementById('addGiftBtn');
const withdrawGiftBtn = document.getElementById('withdrawGiftBtn');
const sellGiftBtn = document.getElementById('sellGiftBtn');
const sendGiftBtn = document.getElementById('sendGiftBtn');
const bundleGiftBtn = document.getElementById('bundleGiftBtn');
const howToAddLink = document.getElementById('howToAddLink');

// Вкладки на странице My Gift
const giftTabs = document.querySelectorAll('.gift-tab');
const giftsTab = document.getElementById('giftsTab');
const offersTab = document.getElementById('offersTab');
const activityTab = document.getElementById('activityTab');

// Дата первого захода на маркет (храним в localStorage)
const marketFirstVisit = localStorage.getItem('marketFirstVisit') || new Date().toLocaleDateString('ru-RU');
localStorage.setItem('marketFirstVisit', marketFirstVisit);

// Устанавливаем имя пользователя в профиле
if (user) {
    document.getElementById('profileName').textContent = user.first_name || 'Jdjsndnxc';
}

// Функция скрыть все страницы и модалки
function hideAllPages() {
    profilePage.style.display = 'none';
    giftsPage.style.display = 'none';
    replenishModal.style.display = 'none';
    withdrawModal.style.display = 'none';
}

// Переход в Profile
profileBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAllPages();
    profilePage.style.display = 'block';
    tg.sendData(JSON.stringify({ action: 'open_profile' }));
});

// Переход в My Gift
giftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('medium');
    hideAllPages();
    giftsPage.style.display = 'block';
    tg.sendData(JSON.stringify({ action: 'open_gifts' }));
});

// NFT (попап)
nftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.showPopup({
        title: 'NFT',
        message: 'У вас 0 NFT',
        buttons: [{ type: 'ok' }]
    });
    tg.sendData(JSON.stringify({ action: 'nft' }));
});

// Назад из Profile
backFromProfile.addEventListener('click', () => {
    profilePage.style.display = 'none';
});

// Назад из My Gift
backFromGifts.addEventListener('click', () => {
    giftsPage.style.display = 'none';
});

// Переключение вкладок в My Gift
giftTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        giftTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.dataset.giftTab;
        giftsTab.style.display = tabId === 'gifts' ? 'block' : 'none';
        offersTab.style.display = tabId === 'offers' ? 'block' : 'none';
        activityTab.style.display = tabId === 'activity' ? 'block' : 'none';
    });
});

// Кнопка Add (пополнение)
addGiftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    replenishModal.style.display = 'block';
    tg.sendData(JSON.stringify({ action: 'open_replenish' }));
});

// Кнопка Withdraw (вывод)
withdrawGiftBtn.addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('heavy');
    withdrawModal.style.display = 'block';
    tg.sendData(JSON.stringify({ action: 'open_withdraw' }));
});

// Кнопки Sell, Send, Bundle (заглушки)
[sellGiftBtn, sendGiftBtn, bundleGiftBtn].forEach(btn => {
    btn.addEventListener('click', function() {
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({
            title: this.textContent.trim(),
            message: 'Функция временно недоступна',
            buttons: [{ type: 'ok' }]
        });
    });
});

// Ссылка "How do I add gifts?"
howToAddLink.addEventListener('click', (e) => {
    e.preventDefault();
    tg.openTelegramLink('https://t.me/xRocketgiftrobot'); // ссылка на бота
});

// Менеджер (пополнение)
managerLink.addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    replenishModal.style.display = 'none';
    tg.sendData(JSON.stringify({ action: 'manager_chat' }));
});

// Закрыть модалку пополнения
closeReplenish.addEventListener('click', () => {
    replenishModal.style.display = 'none';
});

// Закрыть модалку вывода
closeWithdraw.addEventListener('click', () => {
    withdrawModal.style.display = 'none';
});

// Отправка заявки на вывод
submitWithdraw.addEventListener('click', () => {
    const wallet = tonWallet.value.trim();
    const card = cardNumber.value.trim();
    if (!wallet || !card) {
        tg.showPopup({
            title: 'Ошибка',
            message: 'Заполните все поля',
            buttons: [{ type: 'ok' }]
        });
        return;
    }
    tg.HapticFeedback.notificationOccurred('success');
    tg.showPopup({
        title: 'Заявка отправлена',
        message: 'Менеджер свяжется с вами',
        buttons: [{ type: 'ok' }]
    });
    tg.sendData(JSON.stringify({
        action: 'withdraw_request',
        wallet: wallet,
        card: card.slice(-4)
    }));
    withdrawModal.style.display = 'none';
    tonWallet.value = '';
    cardNumber.value = '';
});

// Кнопка Invite friends
document.getElementById('inviteFriendsBtn').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    const inviteText = `Присоединяйся к xRocket! Зарабатывай TON и получай кэшбэк!`;
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/xRocketgiftrobot')}&text=${encodeURIComponent(inviteText)}`);
});

// Обработка кликов по кнопкам главного меню (Collection, Model, Back, Store, My gifts, Season)
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.dataset.action;
        tg.HapticFeedback.impactOccurred('light');
        tg.sendData(JSON.stringify({ action: action }));
        if (action !== 'gifts') {
            tg.showPopup({
                title: this.querySelector('span').textContent,
                message: 'Раздел откроется позже',
                buttons: [{ type: 'ok' }]
            });
        }
    });
});

// Вкладки главного меню
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
        tg.sendData(JSON.stringify({ action: 'tab', tab: this.textContent }));
    });
});

// Quick find
document.querySelector('.quick-find').addEventListener('click', () => {
    tg.HapticFeedback.impactOccurred('light');
    tg.sendData(JSON.stringify({ action: 'quick_find' }));
});

// Дополнительные кнопки в My Gift (Collection, Model, Back, Symbol)
document.querySelectorAll('.extra-item').forEach(item => {
    item.addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('light');
        tg.showPopup({
            title: item.textContent,
            message: 'Раздел откроется позже',
            buttons: [{ type: 'ok' }]
        });
    });
});

// Закрытие модалок по клику на фон
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            replenishModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        }
    });
});
