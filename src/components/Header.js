/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import {
  HeaderContainer, HeaderTitle, HeaderSearchBar, HeaderLogin, HeaderSignup,
  HeaderMember, HeaderTitleContainer,
  HeaderBackgroundImage, HeaderSearchIconContainer,
} from './Header.style';

import { db, auth } from '../firestore/firestore';

import sky from '../img/sora.png';
import logo from '../img/Distory Logo.png';
import search from '../img/search.png';

export default function Header() {
  const [currentUser, setCurrentUser] = useState();
  const [searchkey, setSearchKey] = useState();
  const [headerLoginUserData, setHeaderLoginUserData] = useState();
  const [toggleLoginUser, setToggleLoginUser] = useState(false);

  const navigate = useNavigate();

  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search/${searchkey}`);
    }
  };

  useEffect(() => {
    changeUser();
  }, []);

  const fetchLoginUser = () => new Promise((resolve) => {
    if (currentUser) {
      const querySnapshot = getDoc(doc(db, 'users', currentUser.uid));
      resolve(querySnapshot);
    }
  });

  const loadLoginUser = useCallback(() => {
    const loadingLoginUser = async () => {
      let nowLoginUser = {};
      fetchLoginUser().then((querySnapshot) => {
        nowLoginUser = querySnapshot.data();
        setHeaderLoginUserData(querySnapshot.data());
      });
      return (nowLoginUser);
    };
    loadingLoginUser();
  }, [currentUser]);

  useEffect(() => {
    loadLoginUser();
  }, [currentUser]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert('You are logged out');
      });
  };

  return (
    <>
      <HeaderBackgroundImage src={sky} alt="sky" />
      <Link to="/">
        <HeaderTitle>
          <HeaderTitleContainer src={logo} alt="title" />
        </HeaderTitle>
      </Link>
      <HeaderContainer>
        <div style={{ position: 'relative', margin: '15px 20px' }}>
          <HeaderSearchBar
            type="text"
            value={searchkey}
            placeholder="Search"
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <HeaderSearchIconContainer
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/search/${searchkey}`)}
            onKeyUp={() => navigate(`/search/${searchkey}`)}
          >
            <img
              src={search}
              alt="search"
              style={{ width: '25px' }}
            />
          </HeaderSearchIconContainer>

        </div>
        {currentUser ? (
          <HeaderMember type="button" onClick={() => { setToggleLoginUser((prev) => !prev); }}>
            <img src={headerLoginUserData?.userImage} alt="loginUser" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
            {toggleLoginUser ? (
              <>
                <Link to={`${currentUser.uid}/create`}><div style={{ width: '80px', position: 'relative', left: '-20px' }}>發布文章</div></Link>
                <Link to={`${currentUser.uid}/newstory`}><div style={{ width: '80px', position: 'relative', left: '-20px' }}>發布動態</div></Link>
                <Link to={`${currentUser.uid}`}><div style={{ width: '80px', position: 'relative', left: '-20px' }}>我的部落格</div></Link>
                <Link to={`${currentUser.uid}/blogedit`}><div style={{ width: '80px', position: 'relative', left: '-20px' }}>編輯設定</div></Link>
                <div
                  style={{ width: '80px' }}
                  role="button"
                  tabIndex={0}
                  onClick={handleLogOut}
                  onKeyUp={handleLogOut}
                >
                  登出

                </div>
              </>
            ) : ('')}

          </HeaderMember>
        ) : (
          <>
            <Link to="/signup">
              <HeaderSignup>Signup</HeaderSignup>
            </Link>
            <Link to="/login">
              <HeaderLogin>Login</HeaderLogin>
            </Link>
          </>
        )}

      </HeaderContainer>

    </>

  );
}
