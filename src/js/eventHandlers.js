import { cardAction } from "./game";



export const handleClick = (event) => {
    // Получаем целевой элемент и родителя
    const targetEl = event.target;
    const parentEl = targetEl?.parentElement;
  
    // Событие произошло на .card и карточка еще не перевернута
    const isCardAndNotFlipped = parentEl?.classList?.contains("card") && !parentEl?.classList?.contains("flipped");
  
    isCardAndNotFlipped && cardAction(parentEl);
  };
  