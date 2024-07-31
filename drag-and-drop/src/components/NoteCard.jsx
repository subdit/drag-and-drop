import React, { useEffect, useRef, useState } from 'react';
import Trash from '../icons/Trash';
import { setNewOffset, autoGrow, setZIndexCard, bodyParser } from '../utils';
import { db } from '../appwrite/databases.js';

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(bodyParser(note.position));
  // set mouse position on x and y
  let mouseStartPos = { x: 0, y: 0 };
  // reference the card using useRef
  const cardRef = useRef(null);
  // set color
  const colors = bodyParser(note.colors);
  // set body
  const body = bodyParser(note.body);
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

    setZIndexCard(cardRef.current);
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

    const newPosition = setNewOffset(cardRef.current);
    db.notes.update(note.$id, { position: JSON.stringify(newPosition) });
  };
  // Save data
  const saveData = async value => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id);
    } catch (error) {
      console.log(error);
    }
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
          }}
          onFocus={() => {
            setZIndexCard(cardRef.current);
          }}></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
