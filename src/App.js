import React from 'react';
import './App.css';
import CreateNewDiary from './pages/CreateNewDiary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>發布新文章</h1>
        <CreateNewDiary />
      </header>
    </div>
  );
}

export default App;
