
/**
 * Селекторы игры
 * @property { HTMLDivElement } boardContainer - Обертка игры
 * @property { HTMLDivElement } board - Игровое поле
 * @property { HTMLDivElement } moves - Кол-во шагов
 * @property { HTMLDivElement } timer - Время нахождения в игре
 * @property { HTMLButtonElement } start - Кнопка старта игры
 * @property { HTMLDivElement } win - Сообщение о прохождении игры
 */


export const SELECTORS = {
    boardContainer : document.querySelector(".board-container"),
    board : document.querySelector(".board"),
    moves : document.querySelector(".moves"),
    timer : document.querySelector(".timer"),
    start : document.querySelector("button"),
    win : document.querySelector(".win"),
    

}