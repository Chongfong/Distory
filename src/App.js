import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CreateNewDiary from './pages/CreateNewDiary';
import CreateNewStory from './pages/CreateNewStory';
import EditDiary from './pages/EditDiary';
import LoadDiaries from './pages/LoadDiaries';
import EditBlog from './pages/EditBlog';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import SettingId from './pages/SettingId';
import Welcome from './pages/Welcome';
import MyBlog from './pages/MyBlog';
import BlogArticle from './pages/BlogArticle';
import Pagination from './pages/Pagination';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [settingId, setSettingId] = useState();

  return (
    <div className="App">
      <Router>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentUserData={currentUserData}
          isSignUp={isSignUp}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={(
              <SignUp
                setIsSignUp={setIsSignUp}
              />
)}
          />
          <Route
            path="/settingid"
            element={(
              <SettingId
                settingId={settingId}
                setSettingId={setSettingId}
              />
)}
          />
          <Route
            path="/welcome"
            element={(
              <Welcome
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserData={currentUserData}
                setCurrentUserData={setCurrentUserData}
                setIsSignUp={setIsSignUp}
                settingId={settingId}
              />
)}
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/:userID" element={<MyBlog />}>
            <Route path=":diaryID" element={<BlogArticle />} />
          </Route>
          <Route
            path="/:userID/blogedit"
            element={(
              <EditBlog
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserData={currentUserData}
                setCurrentUserData={setCurrentUserData}
              />
)}
          />
          <Route path="/:userID/create" element={<CreateNewDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
          <Route path="/:userID/newstory" element={<CreateNewStory />} />
          <Route path="/:userID/edit/:diaryID" element={<EditDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
          <Route path="/Diaries" element={<LoadDiaries />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/search/:searchkey" element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
