import React, { useEffect, useRef, useState } from 'react';
import Trash from '../icons/Trash';
import { setNewOffset, autoGrow } from '../utils';

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  // set mouse position on x and y
  let mouseStartPos = { x: 0, y: 0 };
  // reference the card using useRef
  const cardRef = useRef(null);
  // set color
  const colors = JSON.parse(note.colors);
  // set body
  const body = JSON.parse(note.body);
  // set change on textare using useRef
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  });

  // set mouse postion function
  const mouseDown = e => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  };
  const mouseMove = e => {
    //1-Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY
    };
    //2-Update start position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    //3-Update card top and left position
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };
  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}>
      <div
        onMouseDown={mouseDown}
        // onMouseLeave={mouseUp}
        className='card-header'
        style={{ color: colors.colorHeader }}>
        <Trash />
      </div>
      <div className='card-body'>
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
