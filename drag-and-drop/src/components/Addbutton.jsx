import PlusIcon from '../icons/PlusIcon';
import colors from '../assets/colors.json';
import { useContext, useRef } from 'react';
import { db } from '../appwrite/databases';
import { NoteContext } from '../context/NoteContext';

const AddButton = () => {
  const { setNotes } = useContext(NoteContext);
  const startingPos = useRef(10);

  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current
      }),
      colors: JSON.stringify(colors[1])
    };
    startingPos.current += 10;

    const response = await db.notes.create(payload);
    setNotes(prevState => [response, ...prevState]);
  };
  return (
    <div id='add-btn' onClick={addNote}>
      <PlusIcon />
    </div>
  );
};

export default AddButton;
