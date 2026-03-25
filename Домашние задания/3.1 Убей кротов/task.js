'use strict';

// Счётчики
let wins = 0;
let losses = 0;

// Функция обновления счёта на странице
function updateScore() {
    document.getElementById('dead').textContent = wins;
    document.getElementById('lost').textContent = losses;
}

// Функция проверки состояния игры
function checkGameState() {
    if (wins >= 10) {
        alert('Поздравляем! Вы победили! 🎉');
        resetGame();
    } else if (losses >= 5) {
        alert('Игра окончена! Вы проиграли. 😞');
        resetGame();
    }
}

// Функция сброса игры
function resetGame() {
    wins = 0;
    losses = 0;
    updateScore();
}

// Регистрация обработчиков для всех 9 лунок
for (let i = 1; i <= 9; i++) {
    const hole = document.getElementById(`hole${i}`);

    hole.onclick = function () {
        if (hole.classList.contains('hole_has-mole')) {
            // Крот есть — победа
            wins++;
            hole.classList.remove('hole_has-mole');
        } else {
            // Крота нет — поражение
            losses++;
        }

        updateScore();
        checkGameState();
    };
}