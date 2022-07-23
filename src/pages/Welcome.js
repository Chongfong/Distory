import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firestore/firestore';
import { AppContext } from '../context/AppContext';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpInfoDetail, SignUpFinishIcons,
  SignUpName,
} from './SignUp.style';

import Loader from '../components/Loader';

export default function Welcome(
  {
    setIsSignUp, settingId,
  },
) {
  const { currentUser, setCurrentUserData } = useContext(AppContext);

  const loadLoginUser = useCallback(() => {
    const fetchLoginUser = () => new Promise((resolve) => {
      if (currentUser) {
        const querySnapshot = getDoc(doc(db, 'users', currentUser.uid));
        resolve(querySnapshot);
      }
    });
    const loadingLoginUser = async () => {
      try {
        const querySnapshot = await fetchLoginUser();
        const nowLoginUser = querySnapshot.data();
        setCurrentUserData(nowLoginUser);
        return (nowLoginUser);
      } catch (e) {
        return e.response;
      }
    };
    loadingLoginUser();
  }, [currentUser, setCurrentUserData]);

  useEffect(() => {
    loadLoginUser();
  }, [currentUser, loadLoginUser]);

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
  setIsSignUp: PropTypes.func,
  settingId: PropTypes.string,
};

Welcome.defaultProps = {
  setIsSignUp: () => {},
  settingId: '',
};
