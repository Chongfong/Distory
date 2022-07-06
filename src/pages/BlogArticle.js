/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { auth, db } from '../firestore/firestore';

import {
  BlogArticleTitle, BlogArticleDate, BlogAtricleDetailContainer,
  BlogArticleEditImage, BlogArticleEditImageContainer,
} from './BlogArticle.style';

import { MyBlogBottomLine } from './MyBlog.style';

import Comment from './Comment';
import Like from './Like';
import edit from '../img/edit.png';

export default function BlogArticle() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
  const [commentAll, setCommentAll] = useState();
  const [loginUserDate, setLoginUserData] = useState();
  const [commentAuthor, setCommentAuthor] = useState();

  const { userID, diaryID } = useParams();
  const navigate = useNavigate();

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
            const CommentAllSort = [].concat(eachDiary.data().comments)
              .sort((a, b) => (b.commentTime.seconds - a.commentTime.seconds));
            setCommentAll(CommentAllSort);
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

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
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
        <ul>
          {userDiaries.map((eachDiary) => (
            <>
              <div className="diary" style={{ position: 'relative' }}>
                <BlogArticleTitle>{eachDiary.title}</BlogArticleTitle>
                {userID === currentUser.uid && (
                <BlogArticleEditImageContainer
                  onClick={() => {
                    navigate(`/${userID}/edit/${diaryID}`);
                  }}
                  onKeyUp={() => {
                    navigate(`/${userID}/edit/${diaryID}`);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <BlogArticleEditImage src={edit} alt="edit" />

                </BlogArticleEditImageContainer>
                ) }
                <BlogArticleDate>
                  {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                </BlogArticleDate>
                <BlogAtricleDetailContainer dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(eachDiary.content),
                }}
                />
              </div>
              <Like currentUser={currentUser} nowlikeUsers={eachDiary.likeDiary} />
              <MyBlogBottomLine style={{ width: '97%' }} />
              <Comment
                currentUser={currentUser}
                setCommentAll={setCommentAll}
                commentAuthor={commentAuthor}
                commentAll={commentAll}
                loginUserDate={loginUserDate}
                setCommentAuthor={setCommentAuthor}
              />
            </>
          ))}
        </ul>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
