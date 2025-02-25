import {  startGame } from "./game";
import { SELECTORS } from "./selectors";

// your code
import { handleClick } from "./eventHandlers";
import { boardSize } from "./utils";



document?.addEventListener("DOMContentLoaded",()=>{
    boardSize();
    document?.addEventListener("click", handleClick);
    const allCards = document.querySelectorAll('.card');
    const startButton = SELECTORS?.start;
    startButton?.addEventListener("click",startGame);
    allCards?.forEach((el)=>{
        el.addEventListener("click", startGame);
    });

})