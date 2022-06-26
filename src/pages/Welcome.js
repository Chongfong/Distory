import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firestore/firestore';

export default function Welcome() {
  const [currentUser, setCurrentUser] = useState();
  onAuthStateChanged(auth, (user) => { setCurrentUser(user); });

  return (
    <>
      {currentUser ? (
        <>
          <div>您已完成登錄</div>
          <Link to="/">
            <button type="button">開始使用</button>

          </Link>
          <Link to={`/${currentUser.uid}/blogedit`}>
            <button type="button">編輯設定</button>

          </Link>
        </>
      )
        : (
          <div>Now Loading...</div>
        )}
      <div />

    </>
  );
}
