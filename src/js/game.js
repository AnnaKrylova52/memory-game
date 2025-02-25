import { SELECTORS } from "./selectors";
import { STATE } from "./state";
import { EMOJIES } from "./emojis";
import {
  canFlip,
  pickRandom,
  shuffle,
  flip,
  increaseCount,
  checkMatch,
  isSecondCardFlipped,
  endOfTheGame,
  boardSize,
} from "./utils";

/**
 * Генерация игрового поля
 */
export const generateGame = () => {
  const dimensions = SELECTORS?.board?.getAttribute("data-dimension");
  if (dimensions % 2 !== 0)
    throw new Error("Размер игрового поля должен быть четным!");
  const picks = pickRandom(EMOJIES, (dimensions * dimensions) / 2);
      // Берем 8 элементов, дублируем их для создания пары и перемешиваем
      const shuffleAndPickEmoji = shuffle([...picks, ...picks]);
      console.log(shuffleAndPickEmoji);
    
      // Итерация по карточкам
      const cardHTML = shuffleAndPickEmoji
        ?.map((emoji) => {
          return `
        <div class="card">
            <div class="card-back"></div>
            <div class="card-front">${emoji}</div>
        </div>`;
        })
        .join("");
      // Вставка карточек внутрь родителя
      SELECTORS.board.innerHTML = ""; 
      SELECTORS?.board.insertAdjacentHTML("beforeend", cardHTML);
  // Берем 8 элементов, дублируем их для создания пары и перемешиваем
 
 
};

export const startGame = () => {
  //чтобы функция не срабатывала повторно если игра начата
  if (STATE.isGameStarted) return;

  // Устанавливаем флаг о начале игры
  STATE.isGameStarted = true;

  

  SELECTORS?.start?.classList.add("disabled");

  STATE.loop = setInterval(() => {
    STATE.totalTime++;

    // Обновляем информацию о шагах и времени в игре
    SELECTORS.moves.innerHTML = `${STATE?.totalFlips} ходов`;
    SELECTORS.timer.innerHTML = `время ${STATE?.totalTime} сек`;
  }, 1000);
};

/**
 * Функция для действий над карточками
 * @param { HTMLElement } card - Карта для переворачивания
 */

export const cardAction = (card) => {
  // Если можем переворачивать карточку, переворачиваем
  canFlip() && flip(card);

  // Увеличиваем счетчик ходов
  increaseCount();

  // Проверяем совпадение карточек
  isSecondCardFlipped() && checkMatch();
  endOfTheGame();
};
