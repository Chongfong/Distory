/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, doc, updateDoc,
  getDoc,
} from 'firebase/firestore';
import { auth, storage, db } from '../firestore/firestore';

import layoutImage from '../img/layout.png';
import contentLayout from '../img/content-layout.png';
import {
  CreateDiaryInsideBody, CreateDiaryNavTitle, CreateDiaryTitle, CreateDiaryPublish,
} from './CreateNewDiaries.style';
import { EditBlogTitle, EditBlogLayout, EditBlogFlex } from './EditBlog.style';
import { CircleButton } from './ImageEditor.style';

export default function EditBlog() {
  const [blogTitle, setBlogTitle] = useState();
  const [blogIntro, setBlogIntro] = useState();
  const [blogImage, setBlogImage] = useState();
  const [blogImageFile, setBlogImageFile] = useState();
  const [, setBlogImageUrl] = useState();
  const [blogLayout, setBlogLayout] = useState();
  const [blogContentLayout, setBlogContentLayout] = useState();
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState();

  const [currentUser, setCurrentUser] = useState();

  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  };

  const { userID } = useParams();

  const userCollection = collection(db, 'users');

  const saveBlogSettingsDB = (uid, downloadURL) => {
    const userBlogdoc = doc(userCollection, uid);
    let userBlogData = {};
    if (downloadURL) {
      userBlogData = {
        blogTitle,
        blogIntro,
        blogImage: downloadURL,
        blogLayout,
        blogContentLayout,
      };
    } else {
      userBlogData = {
        blogTitle,
        blogIntro,
        blogLayout,
        blogContentLayout,
      };
    }
    updateDoc(userBlogdoc, { ...userBlogData });
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const thisUserRef = doc(db, 'users', userID);

  const fetchUserBlogSettings = () => new Promise((resolve) => {
    const querySnapshot = getDoc(thisUserRef);
    resolve(querySnapshot);
  });

  const loadUserBlogSettings = useCallback(() => {
    const loadingUserBlogSettings = async () => {
      let nowBlogSettings = {};
      fetchUserBlogSettings().then((querySnapshot) => {
        nowBlogSettings = querySnapshot.data();
        setCurrentUserData(querySnapshot.data());
        setBlogTitle(querySnapshot.data().blogTitle);
        setBlogIntro(querySnapshot.data().blogIntro);
        setBlogImage(querySnapshot.data().blogImage);
        setBlogLayout(querySnapshot.data().blogLayout);
        setBlogContentLayout(querySnapshot.data().blogContentLayout);
      });
      return (nowBlogSettings);
    };
    loadingUserBlogSettings();
  }, []);

  const handleSubmit = (imageFile, uid) => {
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) { alert('please try again'); return; }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      alert('Please upload the image file');
      return;
    }
    const storageRef = ref(storage, `files/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setBlogImageUrl(downloadURL);
          saveBlogSettingsDB(uid, downloadURL);
          navigate(`/${currentUser.uid}`);
        });
      },
    );
  };

  useEffect(() => {
    loadUserBlogSettings();
    changeUser();
  }, []);

  return (
    <>
      {currentUserData ? (
        <CreateDiaryInsideBody style={{ textAlign: 'left', padding: '0px 10px 50px 10px' }}>
          <CreateDiaryNavTitle style={{ paddingLeft: '0px' }}>部落格編輯</CreateDiaryNavTitle>
          <EditBlogTitle>部落格標題</EditBlogTitle>
          <CreateDiaryTitle
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <EditBlogTitle>部落格介紹</EditBlogTitle>
          <CreateDiaryTitle
            type="text"
            value={blogIntro}
            onChange={(e) => setBlogIntro(e.target.value)}
          />
          <EditBlogTitle>進版畫面設定</EditBlogTitle>

          <label
            htmlFor="upload-blogImage"
            style={{
              width: '100%',
              height: '70%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-blogImage"
              onChange={(e) => {
                setBlogImage(URL.createObjectURL(e.target.files[0]));
                setBlogImageFile(e.target.files[0]);
              }}
            />
            {blogImageFile ? (
              <CircleButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setBlogImageFile();
                  setBlogImage(currentUserData.blogImage);
                }}
                style={{
                  fontSize: '25px', position: 'absolute', bottom: '10px', right: '20px',
                }}
              >
                ×

              </CircleButton>
            ) : (
              <CircleButton
                style={{
                  fontSize: '25px',
                  position: 'absolute',
                  bottom: '10px',
                  right: '20px',
                  transform: 'scaleX(-1)',
                }}
              >
                ✎

              </CircleButton>
            )}
            <img
              alt="background"
              src={blogImage}
              style={{
                width: '100%', height: '70%', maxHeight: '400px', borderRadius: '25px',
              }}
            />
          </label>

          <EditBlogTitle>基本版面設定</EditBlogTitle>
          <EditBlogFlex>
            <div
              onClick={() => setBlogLayout('A')}
              onKeyUp={() => setBlogLayout('A')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogLayout === 'A'} alt="layout-left" src={layoutImage} />

            </div>
            <div
              onClick={() => setBlogLayout('B')}
              onKeyUp={() => setBlogLayout('B')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogLayout === 'B'} style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={layoutImage} />

            </div>
          </EditBlogFlex>
          <EditBlogTitle>文章版面設定</EditBlogTitle>
          <EditBlogFlex>
            <div
              onClick={() => setBlogContentLayout('A')}
              onKeyUp={() => setBlogContentLayout('A')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogContentLayout === 'A'} alt="layout-left" src={contentLayout} />

            </div>
            <div
              onClick={() => setBlogContentLayout('B')}
              onKeyUp={() => setBlogContentLayout('B')}
              role="button"
              tabIndex={0}

            >
              <EditBlogLayout isToggled={blogContentLayout === 'B'} style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={contentLayout} />
            </div>
          </EditBlogFlex>
          <br />
          {blogImageFile ? (
            <CreateDiaryPublish
              onClick={() => {
                handleSubmit(blogImageFile, currentUser.uid);
              }}
              onKeyUp={() => {
                handleSubmit(blogImageFile, currentUser.uid);
                navigate(`/${currentUser.uid}`);
              }}
              role="button"
              tabIndex={0}
            >
              ✓

            </CreateDiaryPublish>
          ) : (
            <CreateDiaryPublish
              onClick={() => {
                saveBlogSettingsDB(currentUser.uid);
                navigate(`/${currentUser.uid}`);
              }}
              onKeyUp={() => {
                saveBlogSettingsDB(currentUser.uid);
                navigate(`/${currentUser.uid}`);
              }}
              role="button"
              tabIndex={0}
            >
              ✓

            </CreateDiaryPublish>
          ) }

        </CreateDiaryInsideBody>
      ) : (
        <div>Now Loading...</div>
      )}
      <div />
    </>
  );
}
