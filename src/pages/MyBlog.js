/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useState, useEffect,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import {
  doc, getDoc, getDocs, collection, query, where, updateDoc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firestore/firestore';

import { BlogBackgroundImage } from './EditBlog.style';
import {
  MyBlogFLexContainer, MyBlogFLexLeft, MyBlogFLexRight, ClickableDiv,
  MyBlogVisitorContainer, MyBlogVisitorDiv, MyBlogUserName,
  MyBlogBottomLine, MyBlogProfileSubTitle, MyBlogComeHomeUsers, MyBlogButtonLight,
  MyBlogProfileImg, MyBlogDiaryInsideBody,
} from './MyBlog.style';

import BlogArticle from './BlogArticle';
import Pagination from './Pagination';

import Loader from '../components/Loader';

export default function MyBlog() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [, setUserDiaries] = useState([]);
  const [visitMyHomeAll, setVisitMyHomeAll] = useState();
  const [, setLoginUserData] = useState();
  const [, setLikeUsers] = useState([]);

  const navigate = useNavigate();
  const { userID, diaryID } = useParams();

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
        if (nowWhoVisited) {
          if (nowWhoVisited.come) {
            if (nowWhoVisited.come.userUid) {
              updateDoc(userCamedoc, { ...userCameEditData });
            }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
          }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
        }
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
              toast('施工中，返回首頁', {
                autoClose: 2000,
              });
              navigate('/');
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

  const docRef = doc(db, 'users', userID);

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
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

  const fetchCurrentBlogSettings = (visitorUid) => new Promise((resolve) => {
    const visitRef = doc(db, 'users', visitorUid);
    const querySnapshot = getDoc(visitRef);
    resolve(querySnapshot);
  });

  const loadCurrentBlogSettings = useCallback((currentUserID) => {
    const loadingUserBlogSettings = async (currentVisitUserID) => {
      let nowBlogSettings = {};
      fetchCurrentBlogSettings(currentVisitUserID).then((querySnapshot) => {
        nowBlogSettings = querySnapshot.data();
        setCurrentUserData(querySnapshot.data());
        navigate(`/${currentUserID}`);
      });
      return (nowBlogSettings);
    };
    loadingUserBlogSettings(currentUserID);
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
        toast('施工中，返回首頁', {
          autoClose: 2000,
        });
        navigate('/');
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

  useEffect(() => {
    whoComes();
  }, [currentUser]);

  useEffect(() => {
    visitMyHomeFunc();
  }, [currentUserData]);

  return (
    <>
      {currentUserData ? (
        <MyBlogDiaryInsideBody>
          <div
            role="button"
            tabIndex={0}
            onClick={() => { navigate(`/${userID}`); }}
            onKeyUp={() => { navigate(`/${userID}`); }}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <BlogBackgroundImage src={currentUserData.blogImage} alt="blogImage" />
              <h1>{currentUserData.blogTitle}</h1>
              <p>{currentUserData.blogIntro}</p>
            </div>
          </div>
          <MyBlogBottomLine style={{ width: '100%' }} />
          <MyBlogFLexContainer blogLayoutOrder={currentUserData.blogLayout === 'A'}>
            <MyBlogFLexLeft>
              <div
                onClick={() => {
                  navigate(`/${userID}`);
                }}
                onKeyUp={() => {
                  navigate(`/${userID}`);
                }}
                role="button"
                tabIndex={0}
              >
                <MyBlogProfileImg
                  src={currentUserData.userImage}
                  alt="userImage"
                />
              </div>
              <MyBlogUserName>{currentUserData.distoryId}</MyBlogUserName>
              <p>{`Since　${transformTimeToDate(currentUserData.createBlogAt.seconds * 1000).toString()}`}</p>

              <MyBlogBottomLine />
              {visitMyHomeAll && (
                <>
                  <MyBlogProfileSubTitle style={{ width: '80%' }}>Visitors</MyBlogProfileSubTitle>
                  <MyBlogVisitorContainer>
                    {visitMyHomeAll
                      .map((eachVisitor) => (
                        <MyBlogVisitorDiv>
                          <ClickableDiv
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              loadCurrentBlogSettings(eachVisitor.visitorID);
                            }}
                            onKeyUp={() => {
                              loadCurrentBlogSettings(eachVisitor.visitorID);
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

              {currentUser ? (currentUser.uid === userID ? (
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
                      navigate('newstory');
                    }}
                  >
                    發布限時動態

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
              ) : ('')) : ('')}
            </MyBlogFLexLeft>
            <MyBlogFLexRight>
              {diaryID ? (<BlogArticle />) : (
                <>
                  <MyBlogProfileSubTitle>▋&nbsp;所有文章</MyBlogProfileSubTitle>
                  <Pagination userID={userID} currentUserData={currentUserData} />
                </>
              )}

            </MyBlogFLexRight>
          </MyBlogFLexContainer>
        </MyBlogDiaryInsideBody>
      ) : <Loader />}
      <div />
    </>
  );
}
