import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firestore/firestore';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpInfoDetail, SignUpFinishIcons,
  SignUpName,
} from './SignUp.style';

import Loader from '../components/Loader';

export default function Welcome() {
  const [currentUser, setCurrentUser] = useState();
  onAuthStateChanged(auth, (user) => { setCurrentUser(user); });

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
            <SignUpName>{currentUser.displayName}</SignUpName>
            <SignUpInfoDetail style={{ textAlign: 'center', color: '#d3b092' }}>歡迎來到 Distory！</SignUpInfoDetail>
            <Link to="/">
              <SignUpFinishIcons type="button">開始使用</SignUpFinishIcons>

            </Link>
            <Link to={`/${currentUser.uid}/blogedit`}>
              <SignUpFinishIcons type="button">編輯設定</SignUpFinishIcons>

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
