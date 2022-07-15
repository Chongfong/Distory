/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { auth } from '../firestore/firestore';

import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle,
  SignUpInfoTitle, SignUpInfoDetail, SignUpInput, SignUpFlowIconContainer,
} from './SignUp.style';

import { CircleButton } from './ImageEditor.style';

export default function LogIn({ setCurrentUser }) {
  const [logInEmail, setLogInEmail] = useState();
  const [logInPassword, setlogInPassword] = useState();
  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  };
  const navigate = useNavigate();

  const handleLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('You are logging in');
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    changeUser();
  }, []);
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
            style={{ cursor: 'pointer' }}
          >
            Signup
          </SignUpInfoDetail>
          <div>
            <CircleButton
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

            </CircleButton>
            <div>Login</div>
          </div>
        </SignUpFlowIconContainer>

      </SignUpContainer>
    </SignUpBody>
  );
}

LogIn.propTypes = {
  setCurrentUser: PropTypes.func,
};

LogIn.defaultProps = {
  setCurrentUser: () => {},
};
