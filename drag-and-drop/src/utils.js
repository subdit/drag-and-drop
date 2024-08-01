export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop
  };
};

// autoGrow function to allow the textarea grow with texte
export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = 'auto'; // Reset the height
  current.style.height = textAreaRef.current.scrollHeight + 'px'; // Set the new height
}
export const setZIndexCard = selectedCard => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName('card')).forEach(card => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

export const bodyParser = value => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
