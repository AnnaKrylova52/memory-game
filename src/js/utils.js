import { STATE } from "./state";
import { SELECTORS } from "./selectors";
import { startGame } from "./game";
export const shuffle = (array) => {
  const clonedArray = [...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const org = clonedArray[i];

    clonedArray[i] = clonedArray[randomIndex];

    clonedArray[randomIndex] = org;
  }
  return clonedArray;
};

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

export const canFlip = () => STATE.flippedCards <= 2;

export const flip = (card) => card.classList?.add("flipped");

export const increaseCount = () => {
  STATE.flippedCards++;
  STATE.totalFlips++;
};

export const resetFlipCount = () => (STATE.flippedCards = 0);

export const isSecondCardFlipped = () => STATE?.flippedCards === 2;

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

export const marckMatched = (cards) => {
  cards?.forEach((cards) => {
    cards?.classList?.add("matched");
  });
  endOfTheGame();
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
  win.style.display = "block";
  setTimeout(() => {
    win.style.display = "none";
  }, 3000);
};

export const removeMatched = () => {
  const flippedCards = document?.querySelectorAll(".matched");
  flippedCards.forEach((card) => {
    card?.classList.remove("matched");
  });
};
