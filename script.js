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
    
    // Обновляем активное состояние навигации
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    giftNavButton.classList.add('active');
    
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
    
    // Возвращаем активное состояние на кнопку подарков
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    giftNavButton.classList.add('active');
    
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
    
    // Копируем в буфер обмена
    navigator.clipboard.writeText(managerText).then(() => {
        tg.HapticFeedback.notificationOccurred('success');
        
        // Меняем текст кнопки временно
        const originalText = copyManager.innerHTML;
        copyManager.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
        
        setTimeout(() => {
            copyManager.innerHTML = originalText;
        }, 2000);
        
        // Показываем уведомление
        tg.showPopup({
            title: 'Скопировано!',
            message: `Username ${managerText} скопирован в буфер обмена`,
            buttons: [{type: 'ok'}]
        });
        
        // Отправляем в бот
        const data = {
            action: 'copy_manager',
            manager: managerText,
            userId: user?.id
        };
        tg.sendData(JSON.stringify(data));
    }).catch(() => {
        tg.HapticFeedback.notificationOccurred('error');
        
        // Если не получается скопировать, показываем алерт
        tg.showPopup({
            title: 'Ошибка',
            message: `Скопируйте вручную: ${managerText}`,
            buttons: [{type: 'ok'}]
        });
    });
});

// Закрытие модального окна при клике вне его
replenishModal.addEventListener('click', function(e) {
    if (e.target === replenishModal) {
        replenishModal.style.display = 'none';
    }
});

// Обработка клика по кошельку
document.getElementById('walletButton').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('light');
    
    tg.showPopup({
        title: 'Кошелек',
        message: 'Ваш баланс: 0 OTON\nПополните кошелек через My Gift!',
        buttons: [
            {id: 'go_to_gift', text: 'Перейти к подаркам'},
            {type: 'cancel', text: 'Закрыть'}
        ]
    });
    
    const data = {
        action: 'wallet_click',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Обработка закрытия попапов
tg.onEvent('popupClosed', function(event) {
    if (event.button_id === 'go_to_gift') {
        // Переходим на страницу подарков
        giftNavButton.click();
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
        
        tg.showPopup({
            title: tabName,
            message: `Раздел "${tabName}" откроется в следующем обновлении!`,
            buttons: [{type: 'ok'}]
        });
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
        
        tg.showPopup({
            title: itemName,
            message: `Раздел "${itemName}" откроется в следующем обновлении!`,
            buttons: [{type: 'ok'}]
        });
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
        
        if (navAction === 'nft') {
            tg.showPopup({
                title: 'NFT',
                message: 'Ваши NFT коллекции появятся здесь',
                buttons: [{type: 'ok'}]
            });
        } else if (navAction === 'profile') {
            const userInfo = user ? 
                `${user.first_name} ${user.last_name || ''}\nID: ${user.id}\nБаланс: 0 OTON` : 
                'Информация загружается...';
            
            tg.showPopup({
                title: 'Profile',
                message: userInfo,
                buttons: [{type: 'ok'}]
            });
        }
    });
});

// Функция обновления баланса
function updateBalance(amount) {
    document.querySelectorAll('.wallet-balance').forEach(el => {
        el.textContent = amount;
    });
    
    const data = {
        action: 'update_balance',
        balance: amount,
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
}

// Отправка данных при закрытии
window.addEventListener('beforeunload', function() {
    const data = {
        action: 'close_app',
        userId: user?.id,
        timestamp: new Date().toISOString()
    };
    tg.sendData(JSON.stringify(data));
});

console.log('Mini App загружен с страницей My Gift');
