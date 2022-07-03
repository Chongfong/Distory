/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { auth, db } from '../firestore/firestore';

import { BlogArticleTitle, BlogArticleDate, BlogAtricleDetailContainer } from './BlogArticle.style';

export default function BlogArticle() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
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
    ${(`0${t.getMonth()}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  useEffect(() => {
    changeUser();
    loadUserBlogSettings();
    loadLoginUser();
    getUserDiaries();
  }, []);

  return (
    <>
      {currentUser && currentUserData ? (
        <ul>
          {userDiaries.map((eachDiary) => (
            <div className="diary">
              <BlogArticleTitle>{eachDiary.title}</BlogArticleTitle>
              <BlogArticleDate>
                {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
              </BlogArticleDate>
              <BlogAtricleDetailContainer dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(eachDiary.content),
              }}
              />
            </div>
          ))}
        </ul>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
