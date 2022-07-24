import React, { useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firestore';
import { AppContext } from '../../context/AppContext';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpInfoWelcome, SignUpFinishIcons,
  SignUpName, SignUpDefaultImg,
} from './SignUp.style';

import Loader from '../../components/share/Loader';

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
            <SignUpDefaultImg
              src="https://file.coffee/u/pb8xZKCszWCEOtM9HC3yH.png"
              alt="default_image"
            />
            <SignUpName>{settingId}</SignUpName>
            <SignUpInfoWelcome>歡迎來到 Distory！</SignUpInfoWelcome>
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
