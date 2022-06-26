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

export default function SettingId() {
  const [settingId, setSettingId] = useState();
  const [settingImageUrl] = useState('https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png');
  const [settingName, setSettingName] = useState('主人翁');

  const navigate = useNavigate();
  const userdoc = doc(collection(db, 'users'));

  const saveNewUserDB = (uid) => {
    const userData = {
      distoryId: settingId,
      userImage: settingImageUrl,
      createAt: Timestamp.now().toDate(),
      userUID: uid,
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
        handleSettingIdName(settingId, settingName);
        navigate('/welcome');
        return true;
      }
      alert('此ID已有人使用');
      return false;
    } catch (e) {
      console.error('Error querying document: ', e);
      return e.response;
    }
  }

  return (
    <>
      <img
        style={{ width: '100px', height: '100px' }}
        src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png"
        alt="default_image"
      />

      <div>Distory ID</div>
      <p>此ID無法更改，將顯示在部落格中</p>
      <input
        type="text"
        value={settingId}
        onChange={(e) => setSettingId(e.target.value)}
      />

      <div>暱稱</div>
      <input
        type="text"
        value={settingName}
        onChange={(e) => setSettingName(e.target.value)}
      />

      <div
        onClick={() => {
          checkDuplicateIdAndSaveDB();
        }}
        onKeyUp={() => {
          checkDuplicateIdAndSaveDB();
        }}
        role="button"
        tabIndex={0}
      >
        下一步

      </div>

    </>
  );
}
