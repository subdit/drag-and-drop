import { useEffect, useRef, useState, useContext } from 'react';
import Spinner from '../icons/Spinner.jsx';
import { setNewOffset, autoGrow, setZIndexCard, bodyParser } from '../utils';
import { db } from '../appwrite/databases.js';
import DeleteButton from './DeleteButton.jsx';
import { NoteContext } from '../context/NoteContext';

const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const { setSelectedNote } = useContext(NoteContext);

  // set body
  const body = bodyParser(note.body);
  const [position, setPosition] = useState(bodyParser(note.position));
  // set mouse position on x and y
  let mouseStartPos = { x: 0, y: 0 };
  // reference the card using useRef
  const cardRef = useRef(null);
  // set color
  const colors = bodyParser(note.colors);

  // set change on textare using useRef
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndexCard(cardRef.current);
  }, []);

  // set mouse postion function

  const mouseDown = e => {
    if (e.target.className === 'card-header') {
      setZIndexCard(cardRef.current);

      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }
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
    saveData('position', newPosition);
  };
  // Save data
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };
  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      saveData('body', textAreaRef.current.value);
    }, 2000);
  };
  return (
    <div
      ref={cardRef}
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}py `
      }}>
      <div
        onMouseDown={mouseDown}
        // onMouseLeave={mouseUp}
        className='card-header'
        style={{ color: colors.colorHeader }}>
        <DeleteButton noteId={note.$id} setNotes={NoteContext} />
        {saving && (
          <div className='card-saving'>
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className='card-body'>
        <textarea
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndexCard(cardRef.current);
            setSelectedNote(note);
          }}></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
