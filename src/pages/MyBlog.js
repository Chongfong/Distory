/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firestore/firestore';

export default function MyBlog() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
  const [currentBlogImage, setCurrentBlogImage] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [checkLoadBlogImage, setCheckLoadBlogImage] = useState(false);
  const [checkLoadUserImage, setCheckLoadUserImage] = useState(false);
  const changeUser = () => {
    onAuthStateChanged(auth, (user) => { setCurrentUser(user); });
  };
  const navigate = useNavigate();
  const { userID } = useParams();
  const inputUserImage = useRef();
  const inputBlogImage = useRef();

  const onUserImageClick = () => {
    inputUserImage.current.click();
  };
  const onBlogImageClick = () => {
    inputBlogImage.current.click();
  };

  const docRef = doc(db, 'users', userID);

  function deleteDiary(id) {
    const updatedDiarys = [...userDiaries].filter((diary) => diary.diaryID !== id);
    setUserDiaries(updatedDiarys);
  }

  const userCollection = collection(db, 'users');

  const saveUserSettingsDB = (uid, downloadURL, option) => {
    const userSettingdoc = doc(userCollection, uid);
    let userSettings = {};
    if (option === 'blog') {
      userSettings = {
        blogImage: downloadURL,
      };
    }
    if (option === 'user') {
      userSettings = {
        userImage: downloadURL,
      };
    }
    updateDoc(userSettingdoc, { ...userSettings });
  };

  const handleSubmit = (imageFile, uid, option) => {
    const storageRef = ref(storage, `files/image${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, { contentType: 'image/jpeg' });
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
          if (option === 'blog') {
            setCurrentBlogImage(downloadURL);
            saveUserSettingsDB(uid, downloadURL, 'blog');
          }
          if (option === 'user') {
            setCurrentUserImage(downloadURL);
            saveUserSettingsDB(uid, downloadURL, 'user');
          }
        });
      },
    );
  };

  const renderUploadImage = (imageFile, option) => {
    if (option === 'blog') {
      if (typeof (imageFile) === 'object') {
        return URL.createObjectURL(currentBlogImage);
      } if (typeof (currentBlogImage) === 'string') {
        return imageFile;
      }
      return currentUserData.blogImage;
    }
    if (typeof (imageFile) === 'object') {
      return URL.createObjectURL(currentUserImage);
    } if (typeof (currentUserImage) === 'string') {
      return imageFile;
    }
    return currentUserData.userImage;
  };

  const fetchUserBlogSettings = () => new Promise((resolve) => {
    const querySnapshot = getDoc(docRef);
    resolve(querySnapshot);
  });

  const loadUserBlogSettings = useCallback(() => {
    const loadingUserBlogSettings = async () => {
      let nowBlogSettings = {};
      fetchUserBlogSettings().then((querySnapshot) => {
        nowBlogSettings = querySnapshot.data();
        setCurrentUserData(querySnapshot.data());
      });
      return (nowBlogSettings);
    };
    loadingUserBlogSettings();
  }, []);

  const getUserDiaries = useCallback(() => {
    async function gettingUserDiaries() {
      try {
        const urlsRef = collection(db, 'articles');
        const q = query(urlsRef, where('author', '==', userID));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDiariesAll = [];
          querySnapshot.forEach((eachDiary) => userDiariesAll.push(eachDiary.data()));
          setUserDiaries(userDiariesAll);
          return userDiariesAll;
        }
      } catch (e) {
        alert('Error querying document: ', e);
        return e.response;
      } return true;
    }
    gettingUserDiaries();
  }, []);

  useEffect(() => {
    loadUserBlogSettings();
    getUserDiaries();
    changeUser();
  }, []);

  return (
    <>
      {currentUser && currentUserData ? (
        <>
          <button
            type="button"
            onClick={() => {
              navigate('/');
            }}
          >
            回首頁

          </button>
          <div role="button" tabIndex={0} onClick={() => { navigate(`/${userID}`); }} onKeyUp={() => { navigate(`/${userID}`); }}>
            <h1>{currentUserData.blogTitle}</h1>
          </div>
          <p>{currentUserData.blogInto}</p>
          <div
            onClick={() => {
              onBlogImageClick();
            }}
            onKeyUp={() => {
              onBlogImageClick();
            }}
            role="button"
            tabIndex={0}
          >
            {currentUser.uid === userID ? (
              <input
                type="file"
                accept="image/*"
                id="blog-image"
                ref={inputBlogImage}
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) { setCurrentBlogImage(e.target.files[0]); }
                }}
              />
            ) : ('') }
            {currentBlogImage ? (
              <>
                <img
                  src={renderUploadImage(currentBlogImage, 'blog')}
                  alt={currentBlogImage ? currentBlogImage.name : null}
                />
                {!checkLoadBlogImage ? (
                  <>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSubmit(currentBlogImage, userID, 'blog'); setCheckLoadBlogImage(true); }}>確認</button>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentBlogImage(); }}>取消</button>
                  </>
                ) : ('')}
              </>
            ) : (<img src={currentUserData.blogImage} alt="blogImage" />)}
          </div>

          <div
            onClick={() => {
              onUserImageClick();
            }}
            onKeyUp={() => {
              onUserImageClick();
            }}
            role="button"
            tabIndex={0}
          >
            {currentUser.uid === userID ? (
              <input
                type="file"
                accept="image/*"
                id="blog-image"
                ref={inputUserImage}
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files[0]) { setCurrentUserImage(e.target.files[0]); }
                }}
              />
            ) : ('') }
            {currentUserImage ? (
              <>
                <img
                  style={{
                    width: '100px', height: '100px', borderRadius: '50%', border: 'black solid 2px',
                  }}
                  src={renderUploadImage(currentUserImage, 'user')}
                  alt={currentUserImage ? currentUserImage.name : null}
                />
                {!checkLoadUserImage ? (
                  <>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSubmit(currentUserImage, userID, 'user'); setCheckLoadUserImage(true); }}>確認</button>
                    <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentUserImage(); }}>取消</button>
                  </>
                ) : ('')}
              </>
            ) : (
              <img
                style={{
                  width: '100px', height: '100px', borderRadius: '50%', border: 'black solid 2px',
                }}
                src={currentUserData.userImage}
                alt="userImage"
              />
            ) }
          </div>
          <p>{currentUserData.distoryId}</p>
          <br />
          <p>{`部落格樣式：${currentUserData.blogLayout}`}</p>
          <p>{`文章樣式：${currentUserData.blogContentLayout}`}</p>
          <p>{`成立於　${new Date(currentUserData.createBlogAt.seconds * 1000).toString()}`}</p>

          {currentUser.uid === userID ? (
            <>
              <button
                type="button"
                onClick={() => {
                  navigate('create');
                }}
              >
                發布新文章

              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('blogedit');
                }}
              >
                編輯設定

              </button>

            </>
          ) : ('')}
          <ul>
            {userDiaries.map((eachDiary) => (
              <div className="diary">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    navigate(`${eachDiary.diaryID}`);
                  }}
                  onKeyUp={() => {
                    navigate(`${eachDiary.diaryID}`);
                  }}
                >
                  <h1>{eachDiary.title}</h1>
                </div>
                {currentUser.uid === userID ? (
                  <button
                    type="button"
                    onClick={() => {
                      const eachDiarydocRef = doc(db, 'articles', eachDiary.diaryID);
                      deleteDoc(eachDiarydocRef).then();
                      deleteDiary(eachDiary.diaryID);
                    }}
                  >
                    X

                  </button>
                ) : ('')}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    navigate(`${eachDiary.diaryID}`);
                  }}
                  onKeyUp={() => {
                    navigate(`${eachDiary.diaryID}`);
                  }}
                >
                  <div
                    onDoubleClick={() => {}}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(eachDiary.content),
                    }}
                  />
                </div>
                {currentUser.uid === userID ? (

                  <button
                    type="button"
                    onClick={() => {
                      navigate(`edit/${eachDiary.diaryID}`);
                    }}
                  >
                    💗

                  </button>
                ) : ('')}
                <h5>{new Date(eachDiary.publishAt.seconds * 1000).toString()}</h5>
                <hr />

              </div>
            ))}
          </ul>
        </>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
