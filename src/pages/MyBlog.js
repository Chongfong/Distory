/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where, updateDoc,
  Timestamp,
  setDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firestore/firestore';

import { CreateDiaryInsideBody } from './CreateNewDiaries.style';
import { BlogBackgroundImage } from './EditBlog.style';
import {
  MyBlogFLexContainer, MyBlogFLexLeft, MyBlogFLexRight, ClickableDiv,
  MyBlogVisitorContainer, MyBlogVisitorDiv, MyBlogUserName, MyBlogButton,
  MyBlogBottomLine, MyBlogProfileSubTitle, MyBlogComeHomeUsers, MyBlogButtonLight,
} from './MyBlog.style';

import Pagination from './Pagination';

export default function MyBlog() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [, setUserDiaries] = useState([]);
  const [currentBlogImage, setCurrentBlogImage] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [checkLoadBlogImage, setCheckLoadBlogImage] = useState(false);
  const [checkLoadUserImage, setCheckLoadUserImage] = useState(false);
  const [visitMyHomeAll, setVisitMyHomeAll] = useState();
  const [followingUsers, setFollowingUsers] = useState();
  const [loginUserData, setLoginUserData] = useState();
  const [likeUsers, setLikeUsers] = useState([]);

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
      if (currentUserData.come) {
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
              const visitMyHomeAllSort = [].concat(visitMyHomeUsersObject)
                .sort((a, b) => (b.visitAt.seconds - a.visitAt.seconds));
              setVisitMyHomeAll(visitMyHomeAllSort);
            } catch (e) {
              alert('Error querying document: ', e);
              return e.response;
            } return true;
          }
          gettingUserVisits(eachVisitor);
          return visitMyHomeUsersObject;
        });
      }
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
      if (user) {
        setCurrentUser(user);
        getLoginUserInfo(user);
      }
    });
  };

  const onUserImageClick = () => {
    inputUserImage.current.click();
  };
  const onBlogImageClick = () => {
    inputBlogImage.current.click();
  };

  const docRef = doc(db, 'users', userID);

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
          const diaryLikeUsers = [];
          querySnapshot.forEach((eachDiary) => {
            userDiariesAll.push(eachDiary.data());
            if (eachDiary.data().likeDiary) {
              diaryLikeUsers.push(eachDiary.data().likeDiary);
            } else {
              diaryLikeUsers.push([]);
            }
          });
          setUserDiaries(userDiariesAll);
          setLikeUsers(diaryLikeUsers);
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

  const saveLikerDB = (articleID) => {
    const articlesCollection = collection(db, 'articles');
    const likeDiarydoc = doc(articlesCollection, articleID);
    updateDoc(
      likeDiarydoc,
      {
        likeDiary: arrayUnion(currentUser.uid),
      },
    );
  };

  const saveUnLikerDB = (articleID) => {
    const articlesCollection = collection(db, 'articles');
    const likeDiarydoc = doc(articlesCollection, articleID);
    updateDoc(
      likeDiarydoc,
      {
        likeDiary: arrayRemove(currentUser.uid),
      },
    );
  };

  const likeDiary = (index, articleID) => {
    if (currentUser) {
      const likeUsersCopy = [...likeUsers];
      if (!likeUsersCopy[index].includes(currentUser.uid)) {
        const likeUsersCopyOfIndex = [...likeUsersCopy[index], currentUser.uid];
        likeUsersCopy[index] = likeUsersCopyOfIndex;
        setLikeUsers(likeUsersCopy);
        saveLikerDB(articleID);
      }
    } else if (currentUser.uid === userID) {

    } else {
      alert('請先登入');
    }
  };

  const unlikeDiary = (index, articleID) => {
    if (currentUser) {
      const likeUsersCopy = [...likeUsers];
      if (likeUsersCopy[index].includes(currentUser.uid)) {
        const likeUsersCopyOfIndex = [...likeUsersCopy[index]]
          .filter((eachLikeUser) => eachLikeUser !== currentUser.uid);
        likeUsersCopy[index] = likeUsersCopyOfIndex;
        setLikeUsers(likeUsersCopy);
        saveUnLikerDB(articleID);
      }
    } else { alert('請先登入'); }
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
          <CreateDiaryInsideBody>
            <div
              role="button"
              tabIndex={0}
              onClick={() => { navigate(`/${userID}`); }}
              onKeyUp={() => { navigate(`/${userID}`); }}
              style={{ cursor: 'pointer' }}
            >
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
                    <BlogBackgroundImage
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
                ) : (<BlogBackgroundImage src={currentUserData.blogImage} alt="blogImage" />)}
                <h1>{currentUserData.blogTitle}</h1>
                <p>{currentUserData.blogIntro}</p>
              </div>
            </div>
            <MyBlogBottomLine style={{ width: '100%' }} />
            <MyBlogFLexContainer blogLayoutOrder={currentUserData.blogLayout === 'A'}>
              <MyBlogFLexLeft>
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
                        width: '100px', height: '100px', borderRadius: '50%',
                      }}
                      src={currentUserData.userImage}
                      alt="userImage"
                    />
                  ) }
                </div>
                <MyBlogUserName>{currentUserData.distoryId}</MyBlogUserName>
                <br />
                <p>{`文章樣式：${currentUserData.blogContentLayout}`}</p>
                <p>{`成立於　${new Date(currentUserData.createBlogAt.seconds * 1000).toString()}`}</p>

                {loginUserData ? (
                  loginUserData.userUID !== userID
          && !(loginUserData.following.includes(userID)) ? (
            <MyBlogButton
              type="button"
              onClick={() => {
                followThisUser();
              }}
            >
              關注用戶
            </MyBlogButton>
                    ) : (
                      <>
                        <MyBlogButton
                          type="button"
                          onClick={() => {
                            unFollowThisUser();
                          }}
                        >
                          取消關注
                        </MyBlogButton>
                        <br />

                      </>
                    )) : ('') }
                <MyBlogBottomLine />
                {visitMyHomeAll && (
                <>
                  <MyBlogProfileSubTitle>Visitors</MyBlogProfileSubTitle>
                  <MyBlogVisitorContainer>
                    {visitMyHomeAll
                      .map((eachVisitor) => (
                        <MyBlogVisitorDiv>
                          <ClickableDiv
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              navigate(`/${eachVisitor.visitorID}`);
                              navigate(0);
                            }}
                            onKeyUp={() => {
                              navigate(`/${eachVisitor.visitorID}`, { replace: true });
                              navigate(0);
                            }}
                          >
                            <MyBlogComeHomeUsers
                              src={eachVisitor.visitorImage}
                              alt="visitor"
                            />
                          </ClickableDiv>
                        </MyBlogVisitorDiv>
                      ))}
                  </MyBlogVisitorContainer>
                  <MyBlogBottomLine />
                </>
                )}

                {currentUser.uid === userID ? (
                  <>
                    <MyBlogButtonLight
                      type="button"
                      onClick={() => {
                        navigate('create');
                      }}
                    >
                      發布新文章

                    </MyBlogButtonLight>
                    <MyBlogButtonLight
                      type="button"
                      onClick={() => {
                        navigate('blogedit');
                      }}
                    >
                      編輯設定

                    </MyBlogButtonLight>

                  </>
                ) : ('')}
              </MyBlogFLexLeft>
              <MyBlogFLexRight>
                <MyBlogProfileSubTitle>所有文章</MyBlogProfileSubTitle>
                <Pagination userID={userID} currentUserData={currentUserData} />
              </MyBlogFLexRight>
            </MyBlogFLexContainer>
          </CreateDiaryInsideBody>
        </>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
