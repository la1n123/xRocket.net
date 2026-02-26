* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
    background: #0a0a0a;
    color: #ffffff;
}

.app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background: #0a0a0a;
    padding: 20px;
    position: relative;
}

/* Маленький кошелек в правом верхнем углу */
.wallet-corner {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    padding: 8px 15px;
    border-radius: 30px;
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s;
    z-index: 100;
}

.wallet-corner:hover {
    transform: translateY(-2px);
    border-color: #00ff88;
    box-shadow: 0 5px 15px rgba(0,255,136,0.2);
}

.wallet-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00ff88;
    font-size: 16px;
}

.wallet-info {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.wallet-balance {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
}

.wallet-currency {
    font-size: 12px;
    color: #808080;
}

/* Основное меню */
.main-menu {
    margin-top: 80px; /* Отступ чтобы не перекрывалось с кошельком */
}

/* Вкладки */
.tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    background: #1a1a1a;
    padding: 5px;
    border-radius: 30px;
}

.tab {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: none;
    color: #808080;
    font-size: 14px;
    font-weight: 600;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
}

.tab.active {
    background: #00ff88;
    color: #000000;
}

/* Быстрый поиск */
.quick-find {
    background: #1a1a1a;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #808080;
    border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
    transition: all 0.3s;
}

.quick-find:hover {
    background: #2a2a2a;
    border-color: #00ff88;
}

.quick-find i {
    color: #00ff88;
}

/* Сетка для Collection и Model */
.items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 40px;
}

.menu-item {
    background: #1a1a1a;
    border-radius: 15px;
    padding: 25px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255,255,255,0.1);
}

.menu-item:hover {
    transform: translateY(-2px);
    border-color: #00ff88;
    box-shadow: 0 5px 15px rgba(0,255,136,0.2);
}

.item-icon {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
}

.collection-item .item-icon {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
}

.model-item .item-icon {
    background: rgba(0, 255, 136, 0.2);
    color: #00ff88;
}

.menu-item span {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
}

/* Нижняя навигация (только NFT, My gift, Profile) */
.bottom-nav {
    display: flex;
    justify-content: space-around;
    background: #1a1a1a;
    padding: 20px;
    border-radius: 30px;
    margin-top: 20px;
    border: 1px solid rgba(255,255,255,0.1);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: #808080;
    transition: all 0.3s;
    flex: 1;
}

.nav-item:hover {
    color: #00ff88;
    transform: translateY(-2px);
}

.nav-item i {
    font-size: 24px;
}

.nav-item span {
    font-size: 13px;
    font-weight: 500;
}

/* Анимации */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.menu-item:active, .nav-item:active, .wallet-corner:active {
    animation: pulse 0.2s;
}

/* Адаптация под темную тему Telegram */
@media (prefers-color-scheme: dark) {
    body {
        background: #0a0a0a;
    }
}

/* Адаптация под Telegram */
.tg-theme {
    background: var(--tg-theme-bg-color, #0a0a0a);
    color: var(--tg-theme-text-color, #ffffff);
}
