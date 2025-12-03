// Функция для отображения метаданных
function displayAppMetadata() {
    // Проверяем, запущено ли в Electron
    if (typeof window.electronAPI !== 'undefined') {
        // Получаем метаданные через API
        const metadata = window.electronAPI.getMetadata();
        showAppInfo(metadata);
    } else {
        // Пробуем получить из URL (если передавали через хэш)
        checkURLForMetadata();
    }
}

function showAppInfo(data) {
    const panel = document.getElementById('appInfoPanel');
    
    if (!data || !panel) return;
    
    // Заполняем данные
    document.getElementById('appName').textContent = data.name || 'Неизвестно';
    document.getElementById('appVersion').textContent = data.version || '1.0.0';
    document.getElementById('appAuthor').textContent = data.author || 'Неизвестен';
    
    // Платформа с иконкой
    const platform = data.platform || 'unknown';
    const platformIcon = document.getElementById('platformIcon');
    platformIcon.className = platform;
    document.getElementById('appPlatform').textContent = formatPlatform(platform);
    
    // Информация о сборке
    const buildInfo = `Electron ${data.electron || '?'} / Node ${data.node || '?'}`;
    document.getElementById('buildInfo').textContent = buildInfo;
    
    // Время запуска
    if (data.launchTime) {
        const time = new Date(data.launchTime);
        document.getElementById('launchTime').textContent = 
            time.toLocaleTimeString() + ' ' + time.toLocaleDateString();
    }
    
    // Показываем панель
    panel.style.display = 'block';
    
    // Добавляем класс к body для кастомизации
    document.body.classList.add('electron-app');
    document.body.dataset.platform = platform;
    document.body.dataset.version = data.version;
    
    // Обновляем title страницы
    document.title = `${data.name} v${data.version} | ${data.description || ''}`;
    
    // Отправляем в консоль для отладки
    console.log('📦 Метаданные приложения:', data);
}

// Проверка URL на наличие метаданных
function checkURLForMetadata() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        try {
            const params = new URLSearchParams(hash);
            if (params.has('electron')) {
                const data = JSON.parse(atob(params.get('electron')));
                showAppInfo(data);
            }
        } catch (e) {
            console.warn('Не удалось прочитать метаданные из URL');
        }
    }
}

// Форматирование названия платформы
function formatPlatform(platform) {
    const platforms = {
        'win32': 'Windows',
        'darwin': 'macOS',
        'linux': 'Linux',
        'freebsd': 'FreeBSD',
        'openbsd': 'OpenBSD'
    };
    return platforms[platform] || platform;
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Ждем немного чтобы Electron успел инициализировать API
    setTimeout(displayAppMetadata, 100);
    
    // Также слушаем сообщения от Electron (если используется postMessage)
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'app-metadata') {
            showAppInfo(event.data.data);
        }
    });
});

// Экспортируем для отладки
window.showAppMetadata = displayAppMetadata;