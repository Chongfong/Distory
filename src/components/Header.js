/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import {
  HeaderContainer, HeaderTitle, HeaderSearchBar, HeaderLogin, HeaderSignup,
  HeaderMember, HeaderTitleContainer,
  HeaderBackgroundImage,
} from './Header.style';

import { db, auth } from '../firestore/firestore';

import sky from '../img/sora.png';
import logo from '../img/Distory Logo.png';

export default function Header() {
  const [currentUser, setCurrentUser] = useState();
  const [searchkey, setSearchKey] = useState();
  const [headerLoginUserData, setHeaderLoginUserData] = useState();

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

  return (
    <>
      <HeaderBackgroundImage src={sky} alt="sky" />
      <Link to="/">
        <HeaderTitle>
          <HeaderTitleContainer src={logo} alt="title" />
        </HeaderTitle>
      </Link>
      <HeaderContainer>
        <HeaderSearchBar
          type="text"
          value={searchkey}
          placeholder="Search"
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {currentUser ? (
          <Link to={`${currentUser.uid}`} style={{ alignSelf: 'center' }}>
            <HeaderMember><img src={headerLoginUserData?.userImage} alt="loginUser" style={{ width: '45px', height: '45px', borderRadius: '50%' }} /></HeaderMember>
          </Link>
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
