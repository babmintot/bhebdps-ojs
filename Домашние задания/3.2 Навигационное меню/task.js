'use strict';

// Находим все ссылки во всех меню на странице
const menuLinks = document.querySelectorAll('.menu__link');

for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];

    link.onclick = function (event) {
        // Ищем вложенное меню относительно текущей ссылки
        const submenu = this.parentElement.querySelector('.menu_sub');

        if (submenu !== null) {
            // Повышенный уровень: закрываем все другие подменю
            const allSubmenus = document.querySelectorAll('.menu_sub');
            for (let j = 0; j < allSubmenus.length; j++) {
                if (allSubmenus[j] !== submenu) {
                    allSubmenus[j].classList.remove('menu_active');
                }
            }

            // Переключаем текущее меню
            submenu.classList.toggle('menu_active');
            return false; // блокируем переход
        }
        // Если подменю нет — переход разрешён
    };
}