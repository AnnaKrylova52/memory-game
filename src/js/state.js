/**
 * Состояние игры
 * @property { boolean } isGameStarted - Игра началась или нет
 * @property { number } flippedCards - Количество перевернутых карточек
 * @property { number } totalFlips - Общее количество переворачиваний
 * @property { number } totalTime - Общее время нахождения в игре
 * @property { number } loop - Цикличные действия в игре
 */
export const STATE = {
    isGameStarted : false,
    flippedCards : 0,
    totalFlips : 0,
    totalTime : 0,
    loop : null
}