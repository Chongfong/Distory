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
import EditBlog from './pages/EditBlog';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import StatusBar from './pages/StatusBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Diaries" element={<LoadDiaries />} />
          <Route path="/create" element={<CreateNewDiary />} />
          <Route path="/edit/:diaryID" element={<EditDiary />} />
          <Route path="/blogedit" element={<EditBlog />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/status" element={<StatusBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
