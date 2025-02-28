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
} from "./utils";

export const generateGame = () => {
  const dimensions = SELECTORS?.board?.getAttribute("data-dimension");
  if (dimensions % 2 !== 0) {
    throw new Error("Размер поля должен быть четным");
  }
  const picks = pickRandom(EMOJIES, (dimensions * dimensions) / 2);
  const shuffleAndPickEmoji = shuffle([...picks, ...picks]);

  const cardHTML = shuffleAndPickEmoji
    ?.map((emoji) => {
      return `
        <div class="card">
            <div class="card-back"></div>
            <div class="card-front">${emoji}</div>
        </div>`;
    })
    .join("");

  SELECTORS?.board.insertAdjacentHTML("beforeend", cardHTML);
};

export const startGame = () => {
  if(STATE.isGameStarted) return;
  
  STATE.isGameStarted = true;

  

  SELECTORS?.start?.classList.add("disabled");

  STATE.loop = setInterval(() => {
    STATE.totalTime++;

      SELECTORS.moves.innerHTML = `${STATE?.totalFlips} ходов`;
      SELECTORS.timer.innerHTML = `время ${STATE?.totalTime} сек`;
    }, 1000);
  
};

export const cardAction = (card) => {
  canFlip() && flip(card);

  // Увеличиваем счетчик ходов
  increaseCount();

  // Проверяем совпадение карточек
  isSecondCardFlipped() && checkMatch();
  endOfTheGame();
};

