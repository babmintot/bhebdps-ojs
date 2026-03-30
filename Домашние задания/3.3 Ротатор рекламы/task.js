'use strict';

// Функция инициализации одного ротатора
function initRotator(rotator) {
    const cases = rotator.querySelectorAll('.rotator__case');
    let currentIndex = 0;

    // Функция переключения слайда
    function rotate() {
        // Убираем активный класс у текущего элемента
        cases[currentIndex].classList.remove('rotator__case_active');

        // Вычисляем индекс следующего элемента
        currentIndex = (currentIndex + 1) % cases.length;

        // Получаем следующий элемент
        const nextCase = cases[currentIndex];

        // Добавляем активный класс следующему элементу
        nextCase.classList.add('rotator__case_active');

        // Применяем цвет из data-атрибута (если есть)
        const color = nextCase.dataset.color;
        if (color) {
            nextCase.style.color = color;
        }

        // Получаем скорость из data-атрибута (по умолчанию 1000 мс)
        const speed = parseInt(nextCase.dataset.speed, 10) || 1000;

        // Запускаем следующий цикл
        setTimeout(rotate, speed);
    }

    // Запускаем ротацию
    setTimeout(rotate, 1000);
}

// Инициализация всех ротаторов на странице после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');

    // Проходим по каждому ротатору и инициализируем его
    rotators.forEach(rotator => {
        initRotator(rotator);
    });
});