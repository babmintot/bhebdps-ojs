// Задача №1: Усовершенствованный кеширующий декоратор
function cachingDecoratorNew(func) {
    let cache = [];

    function wrapper(...args) {
        const hash = md5(args);
        const objectInCache = cache.find((item) => item.hash === hash);

        if (objectInCache) {
            console.log('Из кеша: ' + objectInCache.value);
            return 'Из кеша: ' + objectInCache.value;
        }

        const result = func(...args);
        cache.push({ hash: hash, value: result });

        if (cache.length > 5) {
            cache.shift();
        }

        console.log('Вычисляем: ' + result);
        return 'Вычисляем: ' + result;
    }

    return wrapper;
}

// Задача №2: Debounce декоратор с моментальным первым вызовом и счётчиками
function debounceDecoratorNew(func, delay) {
    let timeout = null;
    let isFirstCall = true;

    function wrapped(...args) {
        wrapped.allCount = (wrapped.allCount || 0) + 1;

        if (isFirstCall) {
            isFirstCall = false;
            wrapped.count = (wrapped.count || 0) + 1;
            return func(...args);
        }

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            wrapped.count = (wrapped.count || 0) + 1;
            func(...args);
        }, delay);
    }

    wrapped.count = 0;
    wrapped.allCount = 0;

    return wrapped;
}