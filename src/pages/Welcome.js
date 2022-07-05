import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firestore/firestore';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpInfoDetail, SignUpFinishIcons,
  SignUpName,
} from './SignUp.style';

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
              src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png"
              alt="default_image"
            />
            <SignUpName>{currentUser.displayName}</SignUpName>
            <SignUpInfoDetail style={{ textAlign: 'center' }}>歡迎來到 Distory！</SignUpInfoDetail>
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
          <div>Now Loading...</div>
        )}
      <div />

    </>
  );
}
