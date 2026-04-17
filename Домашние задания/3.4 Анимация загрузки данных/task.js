'use strict';

const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

const CACHE_KEY = 'currency_data';
const CACHE_TIME_KEY = 'currency_cache_time';
const CACHE_EXPIRY = 3600000;

function createCurrencyItem(charCode, value) {
    const itemCode = document.createElement('div');
    itemCode.className = 'item__code';
    itemCode.textContent = charCode;

    const itemValue = document.createElement('div');
    itemValue.className = 'item__value';
    itemValue.textContent = value.toFixed(2);

    const itemCurrency = document.createElement('div');
    itemCurrency.className = 'item__currency';
    itemCurrency.textContent = 'руб.';

    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'item';
    itemWrapper.appendChild(itemCode);
    itemWrapper.appendChild(itemValue);
    itemWrapper.appendChild(itemCurrency);

    return itemWrapper;
}

function renderCurrencies(valutes) {
    itemsContainer.innerHTML = '';

    for (const key in valutes) {
        const currency = valutes[key];
        const itemElement = createCurrencyItem(currency.CharCode, currency.Value);
        itemsContainer.appendChild(itemElement);
    }
}

function fetchCurrencyData() {
    loader.classList.add('loader_active');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.responseType = 'json';

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = xhr.response;
            const valutes = data.response.Valute;

            localStorage.setItem(CACHE_KEY, JSON.stringify(valutes));
            localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

            renderCurrencies(valutes);
            loader.classList.remove('loader_active');
        }
    };

    xhr.onerror = function () {
        console.error('Ошибка загрузки данных');
        loader.classList.remove('loader_active');

        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            renderCurrencies(JSON.parse(cachedData));
        }
    };

    xhr.send();
}

function checkCache() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedData && cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        if (age < CACHE_EXPIRY) {
            renderCurrencies(JSON.parse(cachedData));
            fetchCurrencyData();
            return true;
        }
    }
    return false;
}

function loadCurrencyData() {
    if (!checkCache()) {
        fetchCurrencyData();
    }
}

document.addEventListener('DOMContentLoaded', loadCurrencyData);