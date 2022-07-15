/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { MdCreate } from 'react-icons/md';
import { GiQuill } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { TbLogout } from 'react-icons/tb';

import {
  HeaderContainer, HeaderTitle, HeaderSearchBar, HeaderLogin, HeaderSignup,
  HeaderMember, HeaderTitleContainer,
  HeaderBackgroundImage, HeaderSearchIconContainer, HeaderUserContainer,
  HeaderLoginOptions,
} from './Header.style';

import { db, auth } from '../firestore/firestore';

import sky from '../img/sora.png';
import logo from '../img/Distory Logo.png';
import search from '../img/search.png';

export default function Header({
  currentUser, setCurrentUser, currentUserData,
}) {
  const [searchkey, setSearchKey] = useState('');
  const [headerLoginUserData, setHeaderLoginUserData] = useState();
  const [toggleLoginUser, setToggleLoginUser] = useState(false);

  const navigate = useNavigate();

  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchkey !== '') {
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
  }, [currentUser, currentUserData]);

  useEffect(() => {
    loadLoginUser();
  }, [currentUser, currentUserData]);

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
          { searchkey !== '' ? (
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
          ) : (
            <HeaderSearchIconContainer>
              <img
                src={search}
                alt="search"
                style={{ width: '25px' }}
              />
            </HeaderSearchIconContainer>
          )}

        </div>
        {currentUser ? (
          <HeaderMember type="button" onClick={() => { setToggleLoginUser((prev) => !prev); }}>
            <img src={headerLoginUserData?.userImage} alt="loginUser" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
            {toggleLoginUser ? (
              <HeaderUserContainer>
                <Link to={`${currentUser.uid}/create`}>
                  <HeaderLoginOptions>
                    <MdCreate />
                    &nbsp;
                    發布文章
                  </HeaderLoginOptions>

                </Link>
                <Link to={`${currentUser.uid}/newstory`}>
                  <HeaderLoginOptions>
                    <GiQuill />
                    &nbsp;
                    發布動態
                  </HeaderLoginOptions>
                </Link>
                <Link to={`${currentUser.uid}`}>
                  <HeaderLoginOptions>
                    <FaHome />
                    &nbsp;
                    我的部落格
                  </HeaderLoginOptions>
                </Link>
                <Link to={`${currentUser.uid}/blogedit`}>
                  <HeaderLoginOptions>
                    <GoGear />
                    &nbsp;
                    編輯設定
                  </HeaderLoginOptions>
                </Link>
                <HeaderLoginOptions
                  style={{
                    width: 'auto',
                    textAlign: 'center',
                    paddingLeft: '0px',
                    marginTop: '10px',
                    backgroundColor: '#e2e2e2',
                    color: '#464646',
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={handleLogOut}
                  onKeyUp={handleLogOut}
                >
                  <TbLogout />
                  &nbsp;
                  登出

                </HeaderLoginOptions>
              </HeaderUserContainer>
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

Header.propTypes = {
  currentUser: PropTypes.string,
  setCurrentUser: PropTypes.func,
  currentUserData: PropTypes.string,

};

Header.defaultProps = {
  currentUser: '',
  setCurrentUser: () => {},
  currentUserData: '',
};
