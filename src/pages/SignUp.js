import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firestore/firestore';

import follow from '../img/add.png';
import like from '../img/like.png';
import write from '../img/writing.png';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle, SignUpIcons, SignUpIconsContainer,
  SignUpInfoTitle, SignUpInfoDetail, SignUpInput, SignUpFlowIconContainer,
} from './SignUp.style';

import { CircleButton } from './ImageEditor.style';

export default function SignUp() {
  const [signUpEmail, setSignUpEmail] = useState();
  const [signUpPassword, setSignUpPassword] = useState();
  const [signupImageUrl] = useState('https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png');

  const navigate = useNavigate();

  const handleSignUp = (email, password, profileImg) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        window.localStorage.setItem('jwtToken', cred.user.accessToken);

        updateProfile(auth.currentUser, {
          photoURL: profileImg,
        }).then(() => {
          navigate('/settingid');
        }).catch((error) => {
          alert(error.message);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <SignUpBody>
      <SignUpContainer>
        <SignUpTitle>Distory</SignUpTitle>
        <SignUpSubTitle>註冊帳號</SignUpSubTitle>
        <p>創立屬於您的 Distory 帳號</p>
        <p>將可使用以下功能</p>
        <SignUpIconsContainer>
          <div>
            <SignUpIcons src={write} />
            <p>撰寫貼文</p>
          </div>
          <div>
            <SignUpIcons src={follow} />
            <p>追蹤</p>
          </div>
          <div>
            <SignUpIcons src={like} />
            <p>按讚</p>
          </div>
        </SignUpIconsContainer>
        <SignUpInfoTitle>Email</SignUpInfoTitle>
        <SignUpInput
          type="text"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
        <SignUpInfoTitle>Password</SignUpInfoTitle>
        <SignUpInput
          type="password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
        />
        <SignUpInfoDetail>※帳號密碼設定後將無法變更</SignUpInfoDetail>

        <SignUpFlowIconContainer>
          <SignUpInfoDetail
            onClick={() => { navigate('/login'); }}
            onKeyUp={() => { navigate('/login'); }}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            Login
          </SignUpInfoDetail>
          <div>
            <CircleButton
              onClick={() => {
                handleSignUp(signUpEmail, signUpPassword, signupImageUrl);
              }}
              onKeyUp={() => { handleSignUp(signUpEmail, signUpPassword, signupImageUrl); }}
              role="button"
              tabIndex={0}
            >
              ➔

            </CircleButton>
            <div>Sign Up</div>
          </div>
        </SignUpFlowIconContainer>

      </SignUpContainer>
    </SignUpBody>
  );
}
