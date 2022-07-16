/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firestore/firestore';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpInfoDetail, SignUpFinishIcons,
  SignUpName,
} from './SignUp.style';

import Loader from '../components/Loader';

export default function Welcome(
  {
    currentUser, setCurrentUser, setCurrentUserData, setIsSignUp, settingId,
  },
) {
  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
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
        setCurrentUserData(querySnapshot.data());
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
      {currentUser ? (
        <SignUpBody>
          <SignUpContainer>
            <SignUpTitle>Distory</SignUpTitle>
            <SignUpSubTitle>完成</SignUpSubTitle>
            <img
              style={{ width: '100px', height: '100px' }}
              src="https://file.coffee/u/pb8xZKCszWCEOtM9HC3yH.png"
              alt="default_image"
            />
            <SignUpName>{settingId}</SignUpName>
            <SignUpInfoDetail style={{ textAlign: 'center', color: '#d3b092' }}>歡迎來到 Distory！</SignUpInfoDetail>
            <Link to="/">
              <SignUpFinishIcons type="button" onClick={() => { setIsSignUp(false); }}>開始使用</SignUpFinishIcons>

            </Link>
            <Link to={`/${currentUser.uid}/blogedit`}>
              <SignUpFinishIcons type="button" onClick={() => { setIsSignUp(false); }}>編輯設定</SignUpFinishIcons>

            </Link>
          </SignUpContainer>
        </SignUpBody>
      )
        : (
          <Loader />
        )}
      <div />

    </>
  );
}

Welcome.propTypes = {
  currentUser: PropTypes.string,
  setCurrentUser: PropTypes.func,
  setCurrentUserData: PropTypes.func,
  setIsSignUp: PropTypes.func,
  settingId: PropTypes.string,
};

Welcome.defaultProps = {
  currentUser: '',
  setCurrentUser: () => {},
  setCurrentUserData: () => {},
  setIsSignUp: () => {},
  settingId: '',
};
