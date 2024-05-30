import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { toast } from 'react-toastify';
import { db, auth } from '../../utils/firestore';
import {
  SignUpBody, SignUpContainer, SignUpTitle, SignUpSubTitle,
  SignUpInfoTitle, SignUpInput, SignUpInfoDetail, SignUpFlowIconContainer,
} from './SignUp.style';

import { ArrowButton } from '../../components/edit/editors/ImageEditor.style';

export default function SettingId({ settingId, setSettingId }) {
  const [settingImageUrl] = useState('https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/pb8xZKCszWCEOtM9HC3yH.png?alt=media&token=5347c34d-a1f0-492c-a33f-96f3874fa494');

  const navigate = useNavigate();
  const userCollection = collection(db, 'users');

  const saveNewUserDB = (uid) => {
    const userdoc = doc(userCollection, uid);
    const userData = {
      distoryId: settingId,
      userImage: settingImageUrl,
      createAt: Timestamp.now().toDate(),
      userUID: uid,
      blogImage: 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/5hzGTlSZl34G_c1HMtTuI.png?alt=media&token=9801b809-5a88-43fc-81fb-14f1a9446f91',
      blogTitle: `${settingId}的部落格`,
      blogIntro: `Hello I'm ${settingId}`,
      blogLayout: 'A',
      blogContentLayout: 'A',
      createBlogAt: Timestamp.now().toDate(),
    };
    setDoc(userdoc, { ...userData });
  };

  const handleSettingIdName = async (nickName) => {
    onAuthStateChanged(auth, (loggingInUser) => {
      updateProfile(loggingInUser, {
        displayName: nickName,
      }).then(() => {
        saveNewUserDB(loggingInUser.uid);
      }).catch(() => {
        toast('請重新嘗試', {
          autoClose: 2000,
        });
      });
    });
  };

  const checkDuplicateIdAndSaveDB = async () => {
    try {
      const urlsRef = collection(db, 'users');
      const q = query(urlsRef, where('distoryId', '==', settingId));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        handleSettingIdName(settingId);
        navigate('/welcome');
        return true;
      }
      toast('此ID已有人使用', {
        autoClose: 3500,
      });
      return false;
    } catch (e) {
      toast('發生錯誤', {
        autoClose: 2000,
      });
      return e.response;
    }
  };

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
            <ArrowButton
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

            </ArrowButton>
            <div style={{ color: '#d3b092' }}>完成</div>
          </div>
        </SignUpFlowIconContainer>

      </SignUpContainer>
    </SignUpBody>
  );
}

SettingId.propTypes = {
  settingId: PropTypes.string,
  setSettingId: PropTypes.func,
};

SettingId.defaultProps = {
  settingId: '',
  setSettingId: () => {},
};
