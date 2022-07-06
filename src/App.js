import React, { useState } from 'react';
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
import BlogArticle from './pages/BlogArticle';
import Pagination from './pages/Pagination';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settingid" element={<SettingId />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/:userID" element={<MyBlog />}>
            <Route path=":diaryID" element={<BlogArticle />} />
          </Route>
          <Route path="/:userID/blogedit" element={<EditBlog />} />
          <Route path="/:userID/profile" element={<Profile />} />
          <Route path="/:userID/create" element={<CreateNewDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
          <Route path="/:userID/edit/:diaryID" element={<EditDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
          <Route path="/Diaries" element={<LoadDiaries />} />
          <Route path="/status" element={<StatusBar />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/search/:searchkey" element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
