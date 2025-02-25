import { STATE } from "./state";
import { SELECTORS } from "./selectors";

/**
 * Перемешивает элементы массива.
 * @param {Array} array - Массив для перемешивания.
 * @returns {Array} - Перемешанный массив.
 */
export const shuffle = (array) => {
  const clonedArray = [...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
    /*
        Math.random() генерирует случайное число в интервале от 0 до 1 (не включительно).
        Умножив его на (index + 1), получаем случайное число в интервале от 0 до index + 1.
        Math.floor округляет это число вниз до ближайшего целого, создавая целочисленный индекс от 0 до index.
          */
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Сохраняем значение текущего элемента в переменной original.
    const org = clonedArray[i];
    // Заменяем текущий элемент на случайно выбранный элемент.
    clonedArray[i] = clonedArray[randomIndex];

    // Заменяем случайно выбранный элемент на оригинальный элемент.
    clonedArray[randomIndex] = org;
  }
  // Возвращаем перемешанный массив.
  return clonedArray;
};

/**
 * Выбирает случайные элементы из массива.
 * @param {Array} array - Исходный массив.
 * @param {number} items - Количество элементов для выбора.
 * @returns {Array} - Массив случайно выбранных элементов.
 */
export const pickRandom = (array, items) => {
  const clonedArray = [...array];
  const randomPicks = [];
  for (let i = 0; i < items; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return randomPicks;
};

/**
 * Проверяет, можно перевернуть карту или нет.
 * @returns {boolean} - Да/нет.
 */
export const canFlip = () => STATE.flippedCards <= 2;

/**
 * Переворачивает карту.
 * @param {HTMLElement} card - Карта для переворачивания.
 */
export const flip = (card) => card.classList?.add("flipped");

/**
 * Увеличивает счетчик перевернутых карт и общий счетчик ходов
 */
export const increaseCount = () => {
  STATE.flippedCards++;
  STATE.totalFlips++;
};

/**
 * Сбрасывает счетчик перевернутых карточек
 */
export const resetFlipCount = () => (STATE.flippedCards = 0);

/**
 * Проверяет перевернута вторая карточка или нет
 */
export const isSecondCardFlipped = () => STATE?.flippedCards === 2;

/**
 * Проверяет совпадение перевернутых карточек
 */
export const checkMatch = () => {
  const flippedCards = document?.querySelectorAll(".flipped:not(.matched)");
  if (flippedCards[0].innerText === flippedCards[1].innerText) {
    marckMatched(flippedCards);
  } else {
    setTimeout(() => {
      flipBack();
    }, 1000);
  }
};

/**
 * Отмечает перевернутые совпавшие карточки как match
 */
export const marckMatched = (cards) => {
  cards?.forEach((cards) => {
    cards?.classList?.add("matched");
  });

  STATE?.flippedCards === 2 && resetFlipCount();
};

export const flipBack = () => {
  const unmatchedCards = document?.querySelectorAll(".flipped:not(.matched)");
  unmatchedCards?.forEach((card) => {
    card?.classList?.remove("flipped");
  });

  STATE.flippedCards = 0;
};

export const flipAllCardsBack = () => {
  const flippedCards = document?.querySelectorAll(".flipped");
  flippedCards?.forEach((card) => {
    card?.classList?.remove("flipped");
  });
};
export const endOfTheGame = () => {
  const flippedCards = document?.querySelectorAll(".matched");
  const dimensions = SELECTORS?.board?.getAttribute("data-dimension");
  if (flippedCards.length === dimensions * dimensions) {
    setTimeout(() => {
      flipAllCardsBack();
      SELECTORS?.start?.classList.remove("disabled");
    }, 2000);
    win();
    stopTimer();
    removeMatched();
  }
};

export const stopTimer = () => {
  STATE.isGameStarted = false; // Измените состояние игры на "не начата"
  clearInterval(STATE.loop);
  STATE.totalTime = 0;
  SELECTORS.moves.innerHTML = `0 ходов`;
  SELECTORS.timer.innerHTML = `время 0 сек`;
  STATE.totalFlips = 0;
};

export const win = () => {
  const win = document?.querySelector(".win");

  win.insertAdjacentHTML(
    "beforeend",
    `<div><h1>YOU WON!</h1><h1>YOUR FLIP SCORE: ${STATE.totalFlips}</h1>YOUR TIME: ${STATE.totalTime}<h1></h1></div>`
  );
  win?.classList?.add("win-text");
  win?.classList?.add("highlight");
  setTimeout(() => {
    win.style.display = "block";
  }, 1000);

  setTimeout(() => {
    win.style.display = "none";
  }, 5000);
};

export const removeMatched = () => {
  const flippedCards = document?.querySelectorAll(".matched");
  flippedCards.forEach((card) => {
    card?.classList.remove("matched");
  });
};
