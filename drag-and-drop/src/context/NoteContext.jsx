import { createContext, useEffect, useState } from 'react';
import Spinner from '../icons/Spinner';

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const reponse = await db.notes.list();
    setNotes(reponse.documents);
    setLoading(false);
  };

  const contextData = { notes, setNotes };
  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}>
          <Spinner size='100' />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};
export default NoteProvider;
