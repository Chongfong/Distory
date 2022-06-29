/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc,
  Timestamp,
  setDoc,
  arrayUnion,
  arrayRemove,
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
  const [visitMyHomeAll, setVisitMyHomeAll] = useState();
  const [followingUsers, setFollowingUsers] = useState();
  const [loginUserData, setLoginUserData] = useState();

  const navigate = useNavigate();
  const { userID } = useParams();
  const inputUserImage = useRef();
  const inputBlogImage = useRef();

  const userCollection = collection(db, 'users');

  const fetchUserWhoVisited = () => new Promise((resolve) => {
    const docRef = doc(db, 'users', userID);
    const querySnapshot = getDoc(docRef);
    resolve(querySnapshot);
  });

  const loadUserWhoVisited = useCallback((userCamedoc, userCameEditData) => {
    const loadingUserWhoVisited = async () => {
      let nowWhoVisited = {};
      fetchUserWhoVisited().then((querySnapshot) => {
        nowWhoVisited = querySnapshot.data();
        if (nowWhoVisited.come) {
          if (nowWhoVisited.come.userUid) {
            updateDoc(userCamedoc, { ...userCameEditData });
          }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
        }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
      });
      return (nowWhoVisited);
    };
    loadingUserWhoVisited();
  }, []);

  const saveUserCameDB = (userUid) => {
    const userCameDoc = doc(userCollection, userUid);
    const userCameData = { [currentUser.uid]: Timestamp.now().toDate() };
    const userCameEditData = { come: userCameData };
    loadUserWhoVisited(userCameDoc, userCameEditData);
  };

  const visitMyHomeFunc = () => {
    if (currentUserData) {
      const visitMyHomeUsersArray = Object.entries(currentUserData.come);
      const visitMyHomeUsersObject = [];
      visitMyHomeUsersArray.map((eachVisitor) => {
        async function gettingUserVisits(visitorArray) {
          try {
            const urlsRef = collection(db, 'users');
            const q = query(urlsRef, where('userUID', '==', visitorArray[0]));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((querySnapshotEach) => {
              if (!querySnapshotEach.empty) {
                visitMyHomeUsersObject.push({
                  visitorID: querySnapshotEach.data().userUID,
                  visitorImage: querySnapshotEach.data().userImage,
                  visitorNickName: querySnapshotEach.data().distoryId,
                  visitAt: visitorArray[1],
                });
              }
            });
            setVisitMyHomeAll(visitMyHomeUsersObject);
          } catch (e) {
            alert('Error querying document: ', e);
            return e.response;
          } return true;
        }
        gettingUserVisits(eachVisitor);
        return visitMyHomeUsersObject;
      });
    }
  };

  const whoComes = () => {
    if (currentUser) {
      if (currentUser.uid === userID) {
      } else {
        saveUserCameDB(userID);
      }
    }
  };

  const fetchLoginUserInfo = (user) => new Promise((resolve) => {
    const loginUserRef = doc(db, 'users', user.uid);
    const querySnapshot = getDoc(loginUserRef);
    resolve(querySnapshot);
  });

  const getLoginUserInfo = useCallback((user) => {
    const gettingLoginUserInfo = async () => {
      let nowLoginUserInfo = {};
      fetchLoginUserInfo(user).then((querySnapshot) => {
        nowLoginUserInfo = querySnapshot.data();
        setLoginUserData(querySnapshot.data());
        setFollowingUsers(querySnapshot.data().following);
      });
      return (nowLoginUserInfo);
    };
    gettingLoginUserInfo(user);
  }, []);

  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getLoginUserInfo(user);
    });
  };

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

  const saveFollowerDB = () => {
    const userFollowdoc = doc(userCollection, currentUser.uid);
    updateDoc(
      userFollowdoc,
      {
        following: arrayUnion(userID),
      },
    );
    alert('已關注');
  };

  const unFollowerDB = () => {
    const userFollowdoc = doc(userCollection, currentUser.uid);
    updateDoc(
      userFollowdoc,
      {
        following: arrayRemove(userID),
      },
    );
    alert('已取消關注');
  };

  const followThisUser = () => {
    setFollowingUsers(userID);
    saveFollowerDB();
    getLoginUserInfo(currentUser);
  };

  const unFollowThisUser = () => {
    const updatedFollwingUsers = [...followingUsers]
      .filter((eachFollowingUser) => eachFollowingUser !== userID);
    setFollowingUsers(updatedFollwingUsers);
    unFollowerDB();
    getLoginUserInfo(currentUser);
  };

  useEffect(() => {
    loadUserBlogSettings();
    getUserDiaries();
    changeUser();
  }, []);

  useEffect(() => {
    whoComes();
  }, [currentUser]);

  useEffect(() => {
    visitMyHomeFunc();
  }, [currentUserData]);
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
          <p>{currentUserData.blogIntro}</p>
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
                id="user-image"
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

          {loginUserData ? (
            loginUserData.userUID !== userID
          && !(loginUserData.following.includes(userID)) ? (
            <button
              type="button"
              onClick={() => {
                followThisUser();
              }}
            >
              關注用戶
            </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    unFollowThisUser();
                  }}
                >
                  取消關注
                </button>
              )) : ('') }

          {visitMyHomeAll ? (
            visitMyHomeAll.map((eachVisitor) => (
              <>
                <p>{eachVisitor.visitorNickName}</p>
                <img
                  style={{ width: '30px', height: '30px' }}
                  src={eachVisitor.visitorImage}
                  alt="visitor"
                />
                <p>{new Date(eachVisitor.visitAt.seconds * 1000).toString()}</p>
              </>

            ))) : ('')}

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
              <div className="diary" key={Date.now()}>
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
