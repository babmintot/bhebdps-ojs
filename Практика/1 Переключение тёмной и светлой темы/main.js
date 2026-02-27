// main.js

// 1. Находим элемент переключателя по id
const themeSwitcher = document.getElementById('checkbox');

// 2. Добавляем обработчик события 'change'
themeSwitcher.addEventListener('change', function () {
    // 3. Логика: если чекбокс включён — добавляем класс, если выключен — убираем
    if (this.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});