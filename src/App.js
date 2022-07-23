import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import Home from './pages/home/Home';
import CreateNewDiary from './pages/createNewDiary/CreateNewDiary';
import CreateNewStory from './pages/createNewStory/CreateNewStory';
import EditDiary from './pages/editDiary/EditDiary';
import EditBlog from './pages/editBlog/EditBlog';
import SignUp from './pages/login/SignUp';
import LogIn from './pages/login/Login';
import SettingId from './pages/login/SettingId';
import Welcome from './pages/login/Welcome';
import MyBlog from './pages/myBlog/MyBlog';
import BlogArticle from './pages/blogArticle/BlogArticle';
import Search from './pages/search/Search';
import Header from './components/share/Header';
import Footer from './components/share/Footer';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from './context/AppContext';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [settingId, setSettingId] = useState();

  return (
    <AppContextProvider>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={3500}
          transition={Slide}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
          <Header
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
                <EditBlog />
)}
            />
            <Route path="/:userID/create" element={<CreateNewDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
            <Route path="/:userID/newstory" element={<CreateNewStory />} />
            <Route path="/:userID/edit/:diaryID" element={<EditDiary isOpen={isOpen} setIsOpen={setIsOpen} />} />
            <Route path="/search/:searchkey" element={<Search />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AppContextProvider>
  );
}

export default App;
