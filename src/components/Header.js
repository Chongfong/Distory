import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  HeaderContainer, HeaderTitle, HeaderSearchBar, HeaderLogin, HeaderSignup,
  HeaderMember, HeaderTitleContainer, HeaderTitleWords, HeaderBackgroundImage,
} from './Header.style';

import { auth } from '../firestore/firestore';

import TitleImage from '../img/shiori.png';
import sky from '../img/sora.png';

export default function Header() {
  const [currentUser, setCurrentUser] = useState();
  const [searchkey, setSearchKey] = useState();

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

  return (
    <>
      <HeaderBackgroundImage src={sky} alt="sky" />
      <Link to="/">
        <HeaderTitle>
          <HeaderTitleContainer src={TitleImage} alt="title" />
          <HeaderTitleWords>Distory</HeaderTitleWords>
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
            <HeaderMember><img src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png" alt="loginUser" style={{ width: '45px', height: '45px', borderRadius: '50%' }} /></HeaderMember>
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
