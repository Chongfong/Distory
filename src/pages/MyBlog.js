import React, {
  useCallback, useState, useEffect, useContext,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  doc, getDoc, getDocs, collection, query, where, updateDoc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { AppContext } from '../context/AppContext';
import { db } from '../firestore/firestore';

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
  const {
    currentUser, currentUserData, setCurrentUserData,
  } = useContext(AppContext);
  const [, setUserDiaries] = useState([]);
  const [visitMyHomeAll, setVisitMyHomeAll] = useState();
  const [, setLikeUsers] = useState([]);

  const navigate = useNavigate();
  const { userID, diaryID } = useParams();

  const loadUserWhoVisited = useCallback((userCamedoc, userCameEditData) => {
    const fetchUserWhoVisited = () => new Promise((resolve) => {
      const docRef = doc(db, 'users', userID);
      const querySnapshot = getDoc(docRef);
      resolve(querySnapshot);
    });
    const loadingUserWhoVisited = async () => {
      try {
        const querySnapshot = await fetchUserWhoVisited();
        const nowWhoVisited = querySnapshot.data();
        if (nowWhoVisited) {
          if (nowWhoVisited.come) {
            if (nowWhoVisited.come.userUid) {
              updateDoc(userCamedoc, { ...userCameEditData });
            }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
          }setDoc(userCamedoc, { ...userCameEditData }, { merge: true });
        }
        return (nowWhoVisited);
      } catch (e) {
        return e.response;
      }
    };
    loadingUserWhoVisited();
  }, [userID]);

  const saveUserCameDBCallBack = useCallback(() => {
    if (currentUser.uid) {
      const saveUserCameDB = (userUid) => {
        const userCollection = collection(db, 'users');
        const userCameDoc = doc(userCollection, userUid);
        const userCameData = { [currentUser.uid]: Timestamp.now().toDate() };
        const userCameEditData = { come: userCameData };
        loadUserWhoVisited(userCameDoc, userCameEditData);
      }; saveUserCameDB(userID);
    }
  }, [currentUser?.uid, loadUserWhoVisited, userID]);

  const visitMyHomeFuncCallBack = useCallback(() => {
    const visitMyHomeFunc = () => {
      if (currentUserData?.come) {
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
    }; visitMyHomeFunc();
  }, [currentUserData?.come, navigate]);

  const whoComesCallBack = useCallback(() => {
    const whoComes = () => {
      if (currentUser) {
        if (currentUser.uid === userID) {
        } else {
          saveUserCameDBCallBack(userID);
        }
      }
    }; whoComes();
  }, [currentUser, saveUserCameDBCallBack, userID]);

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  const loadUserBlogSettings = useCallback(() => {
    const fetchUserBlogSettings = () => new Promise((resolve) => {
      const docRef = doc(db, 'users', userID);
      const querySnapshot = getDoc(docRef);
      resolve(querySnapshot);
    });
    const loadingUserBlogSettings = async () => {
      try {
        const querySnapshot = await fetchUserBlogSettings();
        const nowBlogSettings = querySnapshot.data();
        setCurrentUserData(nowBlogSettings);
        return (nowBlogSettings);
      } catch (e) {
        return e.response;
      }
    };
    loadingUserBlogSettings();
  }, [setCurrentUserData, userID]);

  const loadCurrentBlogSettings = useCallback((currentUserID) => {
    const fetchCurrentBlogSettings = (visitorUid) => new Promise((resolve) => {
      const visitRef = doc(db, 'users', visitorUid);
      const querySnapshot = getDoc(visitRef);
      resolve(querySnapshot);
    });
    const loadingUserBlogSettings = async (currentVisitUserID) => {
      try {
        const querySnapshot = await fetchCurrentBlogSettings(currentVisitUserID);
        const nowBlogSettings = querySnapshot.data();
        setCurrentUserData(nowBlogSettings);
        navigate(`/${currentUserID}`);
        return (nowBlogSettings);
      } catch (e) {
        return e.response;
      }
    };
    loadingUserBlogSettings(currentUserID);
  }, [navigate, setCurrentUserData]);

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
  }, [navigate, userID]);

  useEffect(() => {
    loadUserBlogSettings();
    getUserDiaries();
  }, [getUserDiaries, loadUserBlogSettings]);

  useEffect(() => {
    whoComesCallBack();
  }, [whoComesCallBack]);

  useEffect(() => {
    visitMyHomeFuncCallBack();
  }, [visitMyHomeFuncCallBack]);

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
              {currentUserData && <p>{`Since　${transformTimeToDate(currentUserData.createBlogAt.seconds * 1000).toString()}`}</p>}

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

              {currentUser && (currentUser.uid === userID ? (
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
              ) : (''))}
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
