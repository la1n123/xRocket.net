// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Элементы страницы
const mainMenu = document.getElementById('mainMenu');
const giftPage = document.getElementById('giftPage');
const giftNavButton = document.getElementById('giftNavButton');
const backFromGift = document.getElementById('backFromGift');
const replenishBtn = document.getElementById('replenishBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const replenishModal = document.getElementById('replenishModal');
const closeModal = document.getElementById('closeModal');
const copyManager = document.getElementById('copyManager');
const managerUsername = document.getElementById('managerUsername');

// Загрузка данных
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mini App загружен');
    
    if (user) {
        console.log('Пользователь:', user);
    }
});

// Переход на страницу My Gift
giftNavButton.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    
    // Показываем страницу подарков, скрываем главное меню
    mainMenu.style.display = 'none';
    giftPage.style.display = 'block';
    
    // Отправляем данные в бот
    const data = {
        action: 'open_gift_page',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Возврат в главное меню
backFromGift.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('light');
    
    // Скрываем страницу подарков, показываем главное меню
    giftPage.style.display = 'none';
    mainMenu.style.display = 'block';
});

// Обработка кнопки Пополнить
replenishBtn.addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('heavy');
    
    // Показываем модальное окно
    replenishModal.style.display = 'flex';
    
    // Отправляем в бот
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

// Закрытие модального окна
closeModal.addEventListener('click', function() {
    replenishModal.style.display = 'none';
});

// Копирование username менеджера
copyManager.addEventListener('click', function() {
    const managerText = managerUsername.textContent;
    
    navigator.clipboard.writeText(managerText).then(() => {
        tg.HapticFeedback.notificationOccurred('success');
        
        const originalText = copyManager.innerHTML;
        copyManager.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
        
        setTimeout(() => {
            copyManager.innerHTML = originalText;
        }, 2000);
        
        tg.showPopup({
            title: 'Скопировано!',
            message: `Username ${managerText} скопирован в буфер обмена`,
            buttons: [{type: 'ok'}]
        });
        
        const data = {
            action: 'copy_manager',
            manager: managerText,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
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
        
        const tabName = this.textContent;
        
        const data = {
            action: 'tab_click',
            tab: tabName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка поиска
document.querySelector('.quick-find').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('medium');
    tg.showPopup({
        title: 'Quick Find',
        message: 'Введите название предмета или коллекции',
        buttons: [
            {id: 'search', text: 'Поиск'},
            {type: 'cancel', text: 'Отмена'}
        ]
    });
});

// Обработка Collection и Model
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const action = this.dataset.action;
        const itemName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        const data = {
            action: action,
            item: itemName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка Back, Store, Season
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const btnName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.impactOccurred('medium');
        
        const data = {
            action: action,
            button: btnName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Обработка NFT и Profile
document.querySelectorAll('.nav-item[data-nav="nft"], .nav-item[data-nav="profile"]').forEach(item => {
    item.addEventListener('click', function() {
        const navAction = this.dataset.nav;
        const navName = this.querySelector('span').textContent;
        
        tg.HapticFeedback.selectionChanged();
        
        const data = {
            action: 'nav_click',
            section: navAction,
            name: navName,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    });
});

// Отправка данных при закрытии
window.addEventListener('beforeunload', function() {
    const data = {
        action: 'close_app',
        userId: user?.id,
        timestamp: new Date().toISOString()
    };
    tg.sendData(JSON.stringify(data));
});

console.log('Mini App загружен с дизайном как было раньше');
