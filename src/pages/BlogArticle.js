/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where,
  updateDoc, arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { auth, db } from '../firestore/firestore';

export default function BlogArticle() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
  const [commentAuthor, setCommentAuthor] = useState();
  const [commentContent, setCommentContent] = useState();
  const [commentAll, setCommentAll] = useState();
  const [loginUserDate, setLoginUserData] = useState();
  const navigate = useNavigate();
  const { userID, diaryID } = useParams();

  const docRef = doc(db, 'users', userID);

  const changeUser = () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
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

  const fetchLoginUser = () => new Promise((resolve) => {
    if (currentUser) {
      const querySnapshot = getDoc(doc(db, 'users', currentUser.uid));
      resolve(querySnapshot);
    }
  });

  const loadLoginUser = useCallback(() => {
    const loadingLoginUser = async () => {
      let nowLoginUser = {};
      fetchLoginUser().then((querySnapshot) => {
        nowLoginUser = querySnapshot.data();
        setLoginUserData(querySnapshot.data());
        setCommentAuthor(querySnapshot.data().distoryId);
      });
      return (nowLoginUser);
    };
    loadingLoginUser();
  }, [currentUser]);

  const getUserDiaries = useCallback(() => {
    async function gettingUserDiaries() {
      try {
        const urlsRef = collection(db, 'articles');
        const q = query(urlsRef, where('diaryID', '==', diaryID));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDiariesAll = [];
          querySnapshot.forEach((eachDiary) => {
            userDiariesAll.push(eachDiary.data());
            setCommentAll(eachDiary.data().comments);
          });
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

  const diaryRef = doc(db, 'articles', diaryID);
  const fetchDiaryComments = () => new Promise((resolve) => {
    const querySnapshot = getDoc(diaryRef);
    resolve(querySnapshot);
  });

  const loadDiaryComments = useCallback(() => {
    const loadingDiaryComments = async () => {
      let nowDiaryComments = {};
      fetchDiaryComments().then((querySnapshot) => {
        nowDiaryComments = querySnapshot.data();
        setCommentAll(querySnapshot.data().comments);
      });
      return (nowDiaryComments);
    };
    loadingDiaryComments();
  }, []);

  const postCommentDB = () => {
    const articlesCollection = collection(db, 'articles');
    const commentDiarydoc = doc(articlesCollection, diaryID);
    const commentDetail = {
      commentAuthorID: (currentUser ? currentUser.uid : ''),
      commentAuthor,
      commentContent,
      commentTime: Timestamp.now().toDate(),
    };
    updateDoc(
      commentDiarydoc,
      {
        comments: arrayUnion(commentDetail),
      },
    );
    loadDiaryComments();
  };

  useEffect(() => {
    changeUser();
    loadUserBlogSettings();
    loadLoginUser();
    getUserDiaries();
  }, [currentUser]);

  return (
    <>
      {currentUser && currentUserData ? (
        <>
          <div role="button" tabIndex={0} onClick={() => { navigate(`/${userID}`); }} onKeyUp={() => { navigate(`/${userID}`); }}>
            <h1>{currentUserData.blogTitle}</h1>
          </div>
          <p>{currentUserData.blogInto}</p>
          <img src={currentUserData.blogImage} alt="blogImage" />
          <div role="button" tabIndex={0} onClick={() => { navigate(`/${userID}`); }} onKeyUp={() => { navigate(`/${userID}`); }}>

            <img
              style={{
                width: '100px', height: '100px', borderRadius: '50%', border: 'black solid 2px',
              }}
              src={currentUserData.userImage}
              alt="blogImage"
            />
            <p>{currentUserData.distoryId}</p>
          </div>

          <ul>
            {userDiaries.map((eachDiary) => (
              <div className="diary">
                <h1>{eachDiary.title}</h1>
                <div dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(eachDiary.content),
                }}
                />
                <h5>{new Date(eachDiary.publishAt.seconds * 1000).toString()}</h5>
                <hr />
                {commentAll ? (
                  commentAll.map((eachComment) => (
                    <>
                      {currentUser.uid === userID ? (<button type="button">X</button>) : ('')}
                      {currentUser.uid === userID ? (<button type="button">X</button>) : ('')}

                      <p>{eachComment.commentAuthor}</p>
                      <p>{eachComment.commentContent}</p>
                      <p>{new Date(eachComment.commentTime.seconds * 1000).toString()}</p>
                    </>
                  ))
                ) : ('')}
                {loginUserDate ? (
                  <>
                    <img src={loginUserDate.userImage} alt="loginUser" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <p>{loginUserDate.distoryId}</p>
                  </>
                ) : (
                  <>
                    <p>暱稱</p>
                    <input
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                    />
                  </>
                )}

                <p>內文</p>
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => { postCommentDB(); }}
                  onKeyUp={() => { postCommentDB(); }}
                >
                  送出留言

                </div>
              </div>
            ))}
          </ul>
        </>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
