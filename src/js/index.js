import { generateGame, startGame } from "./game";
import { SELECTORS } from "./selectors";

// your code
import { handleClick } from "./eventHandlers";



document?.addEventListener("DOMContentLoaded",()=>{
    generateGame();
    document?.addEventListener("click", handleClick);
    const allCards = document.querySelector('.card');
    const startButton = SELECTORS?.start;
    startButton?.addEventListener("click",startGame);
    allCards?.addEventListener("click", startGame);

})