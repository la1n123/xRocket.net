// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Разворачиваем на весь экран
tg.expand();
tg.enableClosingConfirmation();

// Данные пользователя
const user = tg.initDataUnsafe?.user;
let userBalance = {
    total: 3250.00,
    tokens: {
        ETH: { amount: 0.5, price: 3000 },
        USDT: { amount: 1000, price: 1 },
        BNB: { amount: 2.5, price: 300 }
    }
};

// Загрузка данных пользователя
document.addEventListener('DOMContentLoaded', function() {
    if (user) {
        document.getElementById('userName').textContent = 
            user.first_name + (user.last_name ? ' ' + user.last_name : '');
        document.getElementById('userHandle').textContent = 
            user.username ? '@' + user.username : 'нет username';
        
        if (user.photo_url) {
            document.getElementById('userAvatar').src = user.photo_url;
        }
    }
    
    updateBalance();
    loadTokens();
});

// Обновление баланса
function updateBalance() {
    let total = 0;
    for (let [symbol, data] of Object.entries(userBalance.tokens)) {
        total += data.amount * data.price;
    }
    userBalance.total = total;
    document.getElementById('totalBalance').textContent = 
        '$' + total.toFixed(2);
}

// Загрузка токенов
function loadTokens() {
    const tokensList = document.getElementById('tokensList');
    tokensList.innerHTML = '';
    
    for (let [symbol, data] of Object.entries(userBalance.tokens)) {
        const tokenItem = document.createElement('div');
        tokenItem.className = 'token-item';
        
        let icon = '';
        let bgColor = '';
        
        switch(symbol) {
            case 'ETH':
                icon = 'Ξ';
                bgColor = '#627EEA';
                break;
            case 'USDT':
                icon = '₮';
                bgColor = '#26A17E';
                break;
            case 'BNB':
                icon = 'BNB';
                bgColor = '#F3BA2F';
                break;
        }
        
        const usdValue = (data.amount * data.price).toFixed(2);
        
        tokenItem.innerHTML = `
            <div class="token-icon" style="background: ${bgColor};">${icon}</div>
            <div class="token-info">
                <div class="token-name">${getTokenName(symbol)}</div>
                <div class="token-symbol">${symbol}</div>
            </div>
            <div class="token-amount">
                <div class="token-value">${data.amount} ${symbol}</div>
                <div class="token-usd">$${usdValue}</div>
            </div>
        `;
        
        tokensList.appendChild(tokenItem);
    }
}

function getTokenName(symbol) {
    const names = {
        'ETH': 'Ethereum',
        'USDT': 'Tether',
        'BNB': 'Binance Coin'
    };
    return names[symbol] || symbol;
}

// Навигация
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
        
        // Здесь можно добавить логику переключения вкладок
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Копирование адреса
document.getElementById('copyAddress').addEventListener('click', function() {
    const address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    navigator.clipboard.writeText(address);
    tg.showPopup({
        title: 'Успешно',
        message: 'Адрес скопирован!',
        buttons: [{type: 'ok'}]
    });
    tg.HapticFeedback.notificationOccurred('success');
});

// Модальные окна
function showSend() {
    document.getElementById('sendModal').classList.add('show');
    tg.HapticFeedback.impactOccurred('medium');
}

function showReceive() {
    document.getElementById('receiveModal').classList.add('show');
    tg.HapticFeedback.impactOccurred('medium');
}

function showBuy() {
    tg.showPopup({
        title: 'Покупка',
        message: 'Выберите способ пополнения:',
        buttons: [
            {id: 'card', text: 'Банковская карта'},
            {id: 'crypto', text: 'Криптовалюта'},
            {id: 'cancel', text: 'Отмена', type: 'cancel'}
        ]
    });
}

function showSwap() {
    tg.showPopup({
        title: 'Обмен',
        message: 'Функция обмена скоро будет доступна!',
        buttons: [{type: 'ok'}]
    });
}

// Закрытие модальных окон
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('show');
    });
});

// Отправка транзакции
function confirmSend() {
    const address = document.getElementById('sendAddress').value;
    const amount = document.getElementById('sendAmount').value;
    const token = document.getElementById('sendToken').value;
    
    if (!address || !amount) {
        tg.showPopup({
            title: 'Ошибка',
            message: 'Заполните все поля!',
            buttons: [{type: 'ok'}]
        });
        return;
    }
    
    // Отправляем данные в бот
    const data = {
        action: 'send_tokens',
        toAddress: address,
        amount: amount,
        token: token,
        userId: user?.id
    };
    
    tg.sendData(JSON.stringify(data));
    
    tg.showPopup({
        title: 'Отправлено',
        message: `Транзакция на ${amount} ${token} отправлена!`,
        buttons: [{type: 'ok'}]
    });
    
    document.getElementById('sendModal').classList.remove('show');
    tg.HapticFeedback.notificationOccurred('success');
}

// Копирование адреса получения
function copyReceiveAddress() {
    const address = document.getElementById('receiveAddress').textContent;
    navigator.clipboard.writeText(address);
    tg.showPopup({
        title: 'Успешно',
        message: 'Адрес скопирован!',
        buttons: [{type: 'ok'}]
    });
}

// Переключение видимости баланса
let balanceVisible = true;
document.getElementById('toggleBalance').addEventListener('click', function() {
    const balanceEl = document.getElementById('totalBalance');
    if (balanceVisible) {
        balanceEl.textContent = '****';
        this.className = 'fas fa-eye-slash';
    } else {
        updateBalance();
        this.className = 'fas fa-eye';
    }
    balanceVisible = !balanceVisible;
});

// Обработка событий Telegram
tg.onEvent('popupClosed', function(event) {
    console.log('Popup closed', event);
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

// Инициализация главной кнопки
tg.MainButton.text = 'Обновить баланс';
tg.MainButton.onClick(function() {
    updateBalance();
    loadTokens();
    tg.HapticFeedback.impactOccurred('heavy');
});

// Показываем главную кнопку через 2 секунды
setTimeout(() => {
    tg.MainButton.show();
}, 2000);

console.log('Mini App запущен!');