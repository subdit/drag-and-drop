import { useState, useEffect, useContext } from 'react';
// import { fakeData as notes } from '../assets/fakeData.js';
// import { db } from '../appwrite/databases';
// import { databases } from '../appwrite/config';
import NoteCard from '../components/NoteCard';
import { NoteContext } from '../context/NoteContext';

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};
export default NotesPage;
