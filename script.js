// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Загрузка данных
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mini App загружен с кошельком в углу');
    
    // Если есть данные пользователя, можно их отобразить
    if (user) {
        console.log('Пользователь:', user);
    }
});

// Обработка клика по кошельку
document.querySelector('.wallet-corner').addEventListener('click', function() {
    tg.HapticFeedback.impactOccurred('light');
    
    tg.showPopup({
        title: 'Кошелек',
        message: 'Ваш баланс: 0 OTON\nПополните кошелек в сезоне!',
        buttons: [
            {id: 'replenish', text: 'Пополнить'},
            {type: 'cancel', text: 'Закрыть'}
        ]
    });
    
    // Отправляем данные в бот
    const data = {
        action: 'wallet_click',
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
});

// Обработка вкладок (All items, Collections, Bundles)
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        tg.HapticFeedback.impactOccurred('light');
        
        const tabName = this.textContent;
        console.log(`Выбрана вкладка: ${tabName}`);
        
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

// Обработка нижней навигации (NFT, My gift, Profile)
document.querySelectorAll('.nav-item').forEach(item => {
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
        
        switch(navAction) {
            case 'nft':
                tg.showPopup({
                    title: 'NFT',
                    message: 'Ваши NFT коллекции появятся здесь',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'gift':
                tg.showPopup({
                    title: 'My Gift',
                    message: 'У вас 0 подарков. Получите подарки в сезоне!',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'profile':
                const userInfo = user ? 
                    `${user.first_name} ${user.last_name || ''}\nID: ${user.id}\nБаланс: 0 OTON` : 
                    'Информация загружается...';
                
                tg.showPopup({
                    title: 'Profile',
                    message: userInfo,
                    buttons: [{type: 'ok'}]
                });
                break;
        }
    });
});

// Функция обновления баланса
function updateBalance(amount) {
    document.querySelector('.wallet-balance').textContent = amount;
    
    const data = {
        action: 'update_balance',
        balance: amount,
        userId: user?.id
    };
    tg.sendData(JSON.stringify(data));
}

// Обработка закрытия попапов
tg.onEvent('popupClosed', function(event) {
    if (event.button_id === 'replenish') {
        tg.showPopup({
            title: 'Пополнение',
            message: 'Функция пополнения скоро появится!',
            buttons: [{type: 'ok'}]
        });
    }
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

console.log('Mini App загружен: только нужные кнопки + кошелек в углу');
