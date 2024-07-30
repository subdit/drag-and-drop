import { useState, useEffect } from 'react';
// import { fakeData as notes } from '../assets/fakeData.js';
import { databases } from '../appwrite/config';
import NoteCard from '../components/NoteCard';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    init();
  }, []);
  // set empty array not to call more than once.
  const init = async () => {
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_NOTES_ID
    );
    console.log(response);
  };

  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};
export default NotesPage;
