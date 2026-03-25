'use strict';

// Находим все ссылки в меню
const menuLinks = document.querySelectorAll('.menu__link');

// Регистрируем обработчики для каждой ссылки через цикл
for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];

    link.onclick = function (event) {
        // Ищем вложенное меню рядом со ссылкой
        const submenu = this.parentElement.querySelector('.menu_sub');

        // Если подменю есть — переключаем класс и блокируем переход
        if (submenu !== null) {
            submenu.classList.toggle('menu_active');
            return false; // предотвращаем переход по ссылке
        }

        // Если подменю нет — переход разрешён (ничего не возвращаем)
    };
}