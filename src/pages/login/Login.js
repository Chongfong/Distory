import React, {
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firestore';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle,
  SignUpInfoTitle, SignUpInfoDetail, SignUpInput, SignUpFlowIconContainer,
} from './SignUp.style';

import { ArrowButton } from '../../components/edit/editors/ImageEditor.style';

export default function LogIn() {
  const [logInEmail, setLogInEmail] = useState('test@gmail.com');
  const [logInPassword, setlogInPassword] = useState('123456');

  const navigate = useNavigate();

  const handleLogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast('您已登入', {
        autoClose: 3500,
      });
      navigate('/');
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === 'auth/wrong-password') {
        toast('密碼錯誤', {
          autoClose: 3500,
        });
      } else if (errorCode === 'auth/invalid-email') {
        toast('請輸入正確信箱', {
          autoClose: 3500,
        });
      } else {
        toast('錯誤，請重新輸入', {
          autoClose: 3500,
        });
      }
    }
  };

  return (
    <SignUpBody>
      <SignUpContainer>
        <SignUpTitle>Distory</SignUpTitle>
        <SignUpSubTitle>登入</SignUpSubTitle>
        <SignUpInfoTitle>Email</SignUpInfoTitle>
        <SignUpInput
          type="text"
          value={logInEmail}
          onChange={(e) => setLogInEmail(e.target.value)}
        />
        <SignUpInfoTitle>Password</SignUpInfoTitle>
        <SignUpInput
          type="password"
          value={logInPassword}
          onChange={(e) => setlogInPassword(e.target.value)}
        />

        <SignUpFlowIconContainer style={{ marginTop: '220px' }}>
          <SignUpInfoDetail
            onClick={() => { navigate('/signup'); }}
            onKeyUp={() => { navigate('/signup'); }}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer', color: 'rgb(181, 124, 74)' }}
          >
            Signup
          </SignUpInfoDetail>
          <div>
            <ArrowButton
              onClick={() => {
                handleLogIn(logInEmail, logInPassword);
              }}
              onKeyUp={() => {
                handleLogIn(logInEmail, logInPassword);
              }}
              role="button"
              tabIndex={0}
            >
              ➔

            </ArrowButton>
            <div style={{ color: 'rgb(181, 124, 74)' }}>Login</div>
          </div>
        </SignUpFlowIconContainer>

      </SignUpContainer>
    </SignUpBody>
  );
}
