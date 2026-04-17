'use strict';

// Находим все элементы с подсказками
const tooltipLinks = document.querySelectorAll('.has-tooltip');

// Функция создания или получения элемента подсказки
function getOrCreateTooltip() {
    let tooltip = document.querySelector('.tooltip');

    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }

    return tooltip;
}

// Функция позиционирования подсказки с поддержкой data-position
function positionTooltip(tooltip, link) {
    const linkRect = link.getBoundingClientRect();
    const position = link.dataset.position || 'bottom';

    // Сбрасываем все позиционные стили
    tooltip.style.top = '';
    tooltip.style.left = '';
    tooltip.style.bottom = '';
    tooltip.style.right = '';

    switch (position) {
        case 'top':
            tooltip.style.top = (linkRect.top + window.scrollY - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.left = (linkRect.left + window.scrollX) + 'px';
            break;
        case 'left':
            tooltip.style.top = (linkRect.top + window.scrollY) + 'px';
            tooltip.style.left = (linkRect.left + window.scrollX - tooltip.offsetWidth - 5) + 'px';
            break;
        case 'right':
            tooltip.style.top = (linkRect.top + window.scrollY) + 'px';
            tooltip.style.left = (linkRect.right + window.scrollX + 5) + 'px';
            break;
        case 'bottom':
        default:
            tooltip.style.top = (linkRect.bottom + window.scrollY + 5) + 'px';
            tooltip.style.left = (linkRect.left + window.scrollX) + 'px';
            break;
    }
}

// Регистрируем обработчики для всех ссылок с подсказками
for (let i = 0; i < tooltipLinks.length; i++) {
    const link = tooltipLinks[i];

    link.onclick = function (event) {
        event.preventDefault();

        // Получаем текст подсказки из атрибута title
        const tooltipText = this.getAttribute('title');

        // Получаем или создаём элемент подсказки
        const tooltip = getOrCreateTooltip();

        // Повышенный уровень #1: скрываем другие подсказки (только одна активна)
        tooltip.classList.remove('tooltip_active');

        // Устанавливаем текст и позиционируем
        tooltip.textContent = tooltipText;
        positionTooltip(tooltip, this);

        // Показываем подсказку
        tooltip.classList.add('tooltip_active');

        // Предотвращаем переход по ссылке
        return false;
    };
}

// Скрываем подсказку при клике вне её и вне ссылок с подсказками
document.addEventListener('click', function (event) {
    const tooltip = document.querySelector('.tooltip');
    const isTooltip = event.target.classList.contains('tooltip');
    const isLink = event.target.closest('.has-tooltip');

    if (tooltip && !isTooltip && !isLink) {
        tooltip.classList.remove('tooltip_active');
    }
});