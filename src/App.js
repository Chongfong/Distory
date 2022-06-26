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
import SettingId from './pages/SettingId';
import Welcome from './pages/Welcome';
import MyBlog from './pages/MyBlog';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settingid" element={<SettingId />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/:userID" element={<MyBlog />} />
          <Route path="/:userID/blogedit" element={<EditBlog />} />
          <Route path="/:userID/profile" element={<Profile />} />
          <Route path="/:userID/create" element={<CreateNewDiary />} />
          <Route path="/:userID/edit/:diaryID" element={<EditDiary />} />
          <Route path="/Diaries" element={<LoadDiaries />} />
          <Route path="/status" element={<StatusBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
