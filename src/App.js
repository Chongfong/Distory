import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CreateNewDiary from './pages/CreateNewDiary';
import EditDiary from './pages/EditDiary';
import LoadDiaries from './pages/LoadDiaries';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Diaries" element={<LoadDiaries />} />
          <Route path="/create" element={<CreateNewDiary />} />
          <Route path="/edit/:diaryID" element={<EditDiary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
