import NotesPage from './pages/NotesPage';
import NoteProvider from './context/NoteContext';

function App() {
  return (
    <>
      <div id='app'>
        <h1 className='h1'>Drag & Drop Sticky Note</h1>
        <NoteProvider>
          <NotesPage />
        </NoteProvider>
      </div>
    </>
  );
}

export default App;
