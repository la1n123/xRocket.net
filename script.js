// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;

// Загрузка данных
document.addEventListener('DOMContentLoaded', function() {
    // Здесь можно загрузить данные пользователя
    console.log('Mini App загружен');
});

// Обработка вкладок
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Отправляем вибрацию (только в Telegram)
        tg.HapticFeedback.impactOccurred('light');
        
        // Здесь можно загрузить контент для выбранной вкладки
        const tabName = this.textContent;
        console.log(`Выбрана вкладка: ${tabName}`);
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

// Обработка элементов меню
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const itemName = this.querySelector('span').textContent;
        
        // Отправляем вибрацию
        tg.HapticFeedback.impactOccurred('medium');
        
        // Отправляем действие в зависимости от нажатого пункта
        switch(itemName) {
            case 'Collection':
                tg.showPopup({
                    title: 'Collection',
                    message: 'Ваши коллекции будут здесь',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'Model':
                tg.showPopup({
                    title: 'Model',
                    message: 'Выберите модель для открытия',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'Back':
                tg.HapticFeedback.notificationOccurred('warning');
                tg.showPopup({
                    title: 'Назад',
                    message: 'Вернуться в предыдущее меню?',
                    buttons: [
                        {id: 'back', text: 'Да'},
                        {type: 'cancel', text: 'Нет'}
                    ]
                });
                break;
                
            case 'Store':
                // Открыть магазин
                tg.showPopup({
                    title: 'Store',
                    message: 'Добро пожаловать в магазин!',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'My gifts':
                tg.showPopup({
                    title: 'My Gifts',
                    message: 'У вас 0 подарков. Получите подарки в сезоне!',
                    buttons: [{type: 'ok'}]
                });
                break;
                
            case 'Season':
                tg.showPopup({
                    title: 'Season Spring 2024',
                    message: 'Прогресс: 0%\nДо конца сезона: 15 дней',
                    buttons: [{type: 'ok'}]
                });
                break;
        }
        
        // Отправляем данные в бот (если нужно)
        const data = {
            action: 'menu_click',
            item: itemName,
            userId: user?.id
        };
        
        // Можно отправить в бот
        // tg.sendData(JSON.stringify(data));
    });
});

// Обработка нижней навигации
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        tg.HapticFeedback.selectionChanged();
    });
});

// Обновление баланса (пример)
function updateBalance(amount) {
    document.querySelector('.balance-amount').textContent = amount;
    
    // Отправляем обновление в бот
    const data = {
        action: 'update_balance',
        balance: amount,
        userId: user?.id
    };
    
    tg.sendData(JSON.stringify(data));
}

// Получение подарка (пример)
function receiveGift(giftName) {
    const data = {
        action: 'new_gift',
        gift: giftName,
        userId: user?.id
    };
    
    tg.sendData(JSON.stringify(data));
    
    tg.showPopup({
        title: 'Подарок получен!',
        message: `Вы получили: ${giftName}`,
        buttons: [{type: 'ok'}]
    });
}

// Обработка событий Telegram
tg.onEvent('popupClosed', function(event) {
    if (event.button_id === 'back') {
        // Вернуться назад
        console.log('Возврат назад');
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

console.log('Mini App запущен в стиле OTON!');
