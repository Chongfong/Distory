import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firestore/firestore';
import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle,
  SignUpInfoTitle, SignUpInput, SignUpInfoDetail, SignUpFlowIconContainer,
} from './SignUp.style';

import { CircleButton } from './ImageEditor.style';

export default function SettingId() {
  const [settingId, setSettingId] = useState();
  const [settingImageUrl] = useState('https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png');

  const navigate = useNavigate();
  const userCollection = collection(db, 'users');

  const saveNewUserDB = (uid) => {
    const userdoc = doc(userCollection, uid);
    const userData = {
      distoryId: settingId,
      userImage: settingImageUrl,
      createAt: Timestamp.now().toDate(),
      userUID: uid,
      blogImage: 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/background%2Fbeach.png?alt=media&token=58223990-f103-4a62-92d9-67a7ed83ca8a',
      blogTitle: `${settingId}的部落格`,
      blogIntro: `Hello I'm ${settingId}`,
      blogLayout: 'A',
      blogContentLayout: 'A',
      createBlogAt: Timestamp.now().toDate(),
    };
    setDoc(userdoc, { ...userData });
  };

  const handleSettingIdName = (nickName) => {
    onAuthStateChanged(auth, (loggingInUser) => {
      updateProfile(loggingInUser, {
        displayName: nickName,
      }).then(() => {
        saveNewUserDB(loggingInUser.uid);
      }).catch((error) => {
        alert(error.message);
      });
    });
  };

  async function checkDuplicateIdAndSaveDB() {
    try {
      const urlsRef = collection(db, 'users');
      const q = query(urlsRef, where('distoryId', '==', settingId));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        handleSettingIdName(settingId);
        navigate('/welcome');
        return true;
      }
      alert('此ID已有人使用');
      return false;
    } catch (e) {
      alert('Error querying document: ', e);
      return e.response;
    }
  }

  return (

    <SignUpBody>
      <SignUpContainer>
        <SignUpTitle>Distory</SignUpTitle>
        <SignUpSubTitle>設定使用者名稱</SignUpSubTitle>
        <SignUpInfoTitle>Distory ID</SignUpInfoTitle>

        <SignUpInput
          type="text"
          value={settingId}
          onChange={(e) => setSettingId(e.target.value)}
        />
        <SignUpInfoDetail>此ID無法更改　將顯示在部落格中</SignUpInfoDetail>
        <SignUpFlowIconContainer style={{ justifyContent: 'flex-end' }}>
          <div>
            <CircleButton
              onClick={() => {
                checkDuplicateIdAndSaveDB();
              }}
              onKeyUp={() => {
                checkDuplicateIdAndSaveDB();
              }}
              role="button"
              tabIndex={0}
            >
              ➔

            </CircleButton>
            <div>完成</div>
          </div>
        </SignUpFlowIconContainer>

      </SignUpContainer>
    </SignUpBody>
  );
}
