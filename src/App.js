import React from 'react';
import './App.css';
import CreateNewDiary from './pages/CreateNewDiary';
import PhotoEditor from './components/ImageEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <CreateNewDiary />
        <PhotoEditor />
      </header>
    </div>
  );
}

export default App;
