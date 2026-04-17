'use strict';

// Находим все карточки товаров
const products = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');
const cart = document.querySelector('.cart');

// Функция обновления видимости корзины
function updateCartVisibility() {
    const hasItems = cartProducts.querySelector('.cart__product');
    if (hasItems) {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}

// Функция добавления/обновления товара в корзине
function addProductToCart(productId, productImage, quantity) {
    let cartProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

    if (cartProduct) {
        // Товар уже есть — увеличиваем количество
        const countElement = cartProduct.querySelector('.cart__product-count');
        const currentCount = parseInt(countElement.textContent, 10);
        countElement.textContent = currentCount + quantity;
    } else {
        // Создаём новый элемент корзины
        const cartProductElement = document.createElement('div');
        cartProductElement.className = 'cart__product';
        cartProductElement.dataset.id = productId;

        const imageElement = document.createElement('img');
        imageElement.className = 'cart__product-image';
        imageElement.src = productImage;

        const countElement = document.createElement('div');
        countElement.className = 'cart__product-count';
        countElement.textContent = quantity;

        // Кнопка удаления товара (повышенный уровень #1)
        const removeButton = document.createElement('div');
        removeButton.className = 'cart__product-remove';
        removeButton.textContent = '×';
        removeButton.onclick = function () {
            cartProductElement.remove();
            updateCartVisibility();
        };

        cartProductElement.appendChild(imageElement);
        cartProductElement.appendChild(countElement);
        cartProductElement.appendChild(removeButton);
        cartProducts.appendChild(cartProductElement);
    }

    updateCartVisibility();
}

// Обработчики для каждой карточки товара
products.forEach(product => {
    const decButton = product.querySelector('.product__quantity-control_dec');
    const incButton = product.querySelector('.product__quantity-control_inc');
    const quantityValue = product.querySelector('.product__quantity-value');
    const addButton = product.querySelector('.product__add');

    // Уменьшение количества
    if (decButton) {
        decButton.onclick = function () {
            let value = parseInt(quantityValue.textContent, 10);
            if (value > 1) {
                quantityValue.textContent = value - 1;
            }
        };
    }

    // Увеличение количества
    if (incButton) {
        incButton.onclick = function () {
            let value = parseInt(quantityValue.textContent, 10);
            quantityValue.textContent = value + 1;
        };
    }

    // Добавление в корзину
    if (addButton) {
        addButton.onclick = function () {
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image').src;
            const quantity = parseInt(quantityValue.textContent, 10);

            addProductToCart(productId, productImage, quantity);
            quantityValue.textContent = '1';
        };
    }
});

// Инициализация при загрузке страницы
updateCartVisibility();