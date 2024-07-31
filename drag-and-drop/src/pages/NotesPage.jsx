import Controls from '../components/Controls';
import NoteCard from '../components/NoteCard';
import { NoteContext } from '../context/NoteContext';
import { useContext } from 'react';

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  );
};
export default NotesPage;
