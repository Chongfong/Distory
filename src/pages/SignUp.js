import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firestore/firestore';

export default function SignUp() {
  const [signUpEmail, setSignUpEmail] = useState();
  const [signUpPassword, setSignUpPassword] = useState();
  const [signupImageUrl] = useState('https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png');
  const [signUpName, setSignUpName] = useState('主人翁');

  const navigate = useNavigate();

  const handleSignUp = (email, password, nickName, profileImg) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        window.localStorage.setItem('jwtToken', cred.user.accessToken);

        updateProfile(auth.currentUser, {
          displayName: nickName, photoURL: profileImg,
        }).then(() => {
          alert('You are signed up');
          navigate('/diaries');
        }).catch((error) => {
          alert(error.message);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <img
        style={{ width: '100px', height: '100px' }}
        src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png"
        alt="default_image"
      />
      <br />
      <div>Email</div>
      <input
        type="text"
        value={signUpEmail}
        onChange={(e) => setSignUpEmail(e.target.value)}
      />

      <div>Password</div>
      <input
        type="password"
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
      />

      <div>暱稱</div>
      <input
        type="text"
        value={signUpName}
        onChange={(e) => setSignUpName(e.target.value)}
      />

      <div
        onClick={() => {
          handleSignUp(signUpEmail, signUpPassword, signUpName, signupImageUrl);
        }}
        onKeyUp={() => handleSignUp(signUpEmail, signUpPassword)}
        role="button"
        tabIndex={0}
      >
        Signup

      </div>

    </>
  );
}
