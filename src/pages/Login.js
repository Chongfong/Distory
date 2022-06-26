import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firestore/firestore';

export default function LogIn() {
  const [logInEmail, setLogInEmail] = useState();
  const [logInPassword, setlogInPassword] = useState();

  const handleLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('You are logging in');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        alert('You are logged out');
      });
  };
  return (
    <>
      <div>Email</div>
      <input
        type="text"
        value={logInEmail}
        onChange={(e) => setLogInEmail(e.target.value)}
      />

      <div>Password</div>
      <input
        type="password"
        value={logInPassword}
        onChange={(e) => setlogInPassword(e.target.value)}
      />

      <Link to="/diaries">
        <div
          onClick={() => {
            handleLogIn(logInEmail, logInPassword);
          }}
          onKeyUp={() => {
            handleLogIn(logInEmail, logInPassword);
          }}
          role="button"
          tabIndex={0}
        >
          LogIn

        </div>
      </Link>

      <Link to="/diaries">
        <div
          onClick={() => {
            handleLogOut();
          }}
          onKeyUp={() => {
            handleLogOut();
          }}
          role="button"
          tabIndex={0}
        >
          LogOut

        </div>
      </Link>

    </>
  );
}
