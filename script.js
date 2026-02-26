// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Элементы страницы
const mainHeader = document.getElementById('mainHeader');
const mainMenu = document.getElementById('mainMenu');
const giftPage = document.getElementById('giftPage');
const profilePage = document.getElementById('profilePage');
const giftNavButton = document.getElementById('giftNavButton');
const profileNavButton = document.getElementById('profileNavButton');
const backFromGift = document.getElementById('backFromGift');
const backFromProfile = document.getElementById('backFromProfile');
const replenishBtn = document.getElementById('replenishBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const replenishModal = document.getElementById('replenishModal');
const closeModal = document.getElementById('closeModal');
const chatWithManager = document.getElementById('chatWithManager');

// Данные пользователя (в реальном проекте получать с сервера)
const userData = {
    nftCount: 5,
    totalNFT: 12,
    collections: 3,
    gifts: 2,
    regDate: '12.03.2024',
    transactions: [
        { type: 'receive', title: 'Получено NFT', date: 'Сегодня, 14:30', amount: '+1 NFT' },
        { type: 'gift', title: 'Подарок от @friend', date: 'Вчера, 18:20', amount: '+1 Gift' },
        { type: 'replenish', title: 'Пополнение', date: '12.03.2024', amount: '+100 OTON' }
    ]
};

// Загрузка данных пользователя
document.addEventListener('DOMContentLoaded', function() {
    if (user) {
        document.getElementById('userName').textContent = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        document.getElementById('userUsername').textContent = user.username ? '@' + user.username : '@username';
        if (user.photo_url) {
            document.getElementById('userAvatar').src = user.photo_url;
        }
    }
    
    // Загрузка статистики
    document.getElementById('nftCount').textContent = userData.nftCount;
    document.getElementById('collectionsCount').textContent = userData.collections;
    document.getElementById('giftsCount').textContent = userData.gifts;
    document.getElementById('regDate').textContent = userData.regDate;
    document.getElementById('totalNFT').textContent = userData.totalNFT;
    
    // Загрузка транзакций
    loadTransactions();
});

// Загрузка транзакций
function loadTransactions() {
    const transactionsList = document.getElementById('transactionsList');
    transactionsList.innerHTML = '';
    
    userData.transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        let icon = 'fa-arrow-down';
        if (transaction.type === 'gift') icon = 'fa-gift';
        if (transaction.type === 'replenish') icon = 'fa-plus-circle';
        
        transactionItem.innerHTML = `
            <div class="transaction-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="transaction-info">
                <div class="transaction-title">${transaction.title}</div>
                <div class="transaction-date">${transaction.date}</div>
            </div>
            <div class="transaction-amount">${transaction.amount}</div>
        `;
        
        transactionsList.appendChild(transactionItem);
    });
}

// Переход на страницу My Gift
giftNavButton.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    // Скрываем шапку и главное меню, показываем страницу подарков
    mainHeader.style.display = 'none';
    mainMenu.style.display = 'none';
    giftPage.style.display = 'block';
    profilePage.style.display = 'none';
    
    const data = {
        action: 'open_gift_page',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Переход на страницу Profile
profileNavButton.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    // Скрываем шапку и главное меню, показываем страницу профиля
    mainHeader.style.display = 'none';
    mainMenu.style.display = 'none';
    giftPage.style.display = 'none';
    profilePage.style.display = 'block';
    
    const data = {
        action: 'open_profile_page',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Возврат в главное меню из My Gift
backFromGift.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('light');
    
    mainHeader.style.display = 'block';
    mainMenu.style.display = 'block';
    giftPage.style.display = 'none';
    profilePage.style.display = 'none';
});

// Возврат в главное меню из Profile
backFromProfile.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('light');
    
    mainHeader.style.display = 'block';
    mainMenu.style.display = 'block';
    giftPage.style.display = 'none';
    profilePage.style.display = 'none';
});

// Обработка кнопки Пополнить
replenishBtn.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('heavy');
    replenishModal.style.display = 'flex';
    
    const data = {
        action: 'open_replenish',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Обработка кнопки Вывести
withdrawBtn.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    tg.showPopup({
        title: 'Вывод средств',
        message: 'Функция вывода временно недоступна. Скоро откроется!',
        buttons: [{type: 'ok'}]
    });
    
    const data = {
        action: 'withdraw_click',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Открытие чата с менеджером
chatWithManager.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    // Открываем чат с менеджером
    tg.openTelegramLink('https://t.me/ManagerKupiKod');
    
    const data = {
        action: 'open_manager_chat',
        manager: '@ManagerKupiKod',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
    
    // Закрываем модальное окно
    replenishModal.style.display = 'none';
});

// Закрытие модального окна
closeModal.addEventListener('click', function() {
    replenishModal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
replenishModal.addEventListener('click', function(e) {
    if (e.target === replenishModal) {
        replenishModal.style.display = 'none';
    }
});

// Обработка вкладок
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        tg.HapticFeedback.impactOccurred('light');
        
        const data = {
            action: 'tab_click',
            tab: this.textContent,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка Quick find
document.querySelector('.quick-find').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    const data = {
        action: 'quick_find',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Обработка основных кнопок
document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const name = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        const data = {
            action: action,
            button: name,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка NFT (пока просто заглушка)
document.querySelector('.nav-item[data-nav="nft"]').addEventListener('click', function() {
    tg.HapticFeedback.selectionChanged();
    
    tg.showPopup({
        title: 'NFT',
        message: `У вас ${userData.nftCount} NFT\nВсего получено: ${userData.totalNFT}`,
        buttons: [{type: 'ok'}]
    });
    
    const data = {
        action: 'nav_click',
        section: 'nft',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Отправка данных при закрытии
window.addEventListener('beforeunload', function() {
    const data = {
        action: 'close_app',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

console.log('Portals Clone загружен с профилем и историей');
