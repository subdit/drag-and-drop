export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop
  };
};

// autoGrow function to allow the textarea grow with texte
export const autoGrow = textAreaRef => {
  const { current } = textAreaRef;
  current.style.height = 'auto'; // reset the height
  current.style.height = current.scrollHeight + 'px';
};
export const setZIndexCard = selectedCard => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName('card')).forEach(card => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};
