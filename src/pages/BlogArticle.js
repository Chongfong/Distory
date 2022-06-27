import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { auth, db } from '../firestore/firestore';

export default function BlogArticle() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
  onAuthStateChanged(auth, (user) => { setCurrentUser(user); });
  const navigate = useNavigate();
  const { userID, diaryID } = useParams();

  const docRef = doc(db, 'users', userID);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDiaries = useCallback(() => {
    async function gettingUserDiaries() {
      try {
        const urlsRef = collection(db, 'articles');
        const q = query(urlsRef, where('diaryID', '==', diaryID));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUserBlogSettings();
    getUserDiaries();
  }, [getUserDiaries, loadUserBlogSettings]);

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
              </div>
            ))}
          </ul>
        </>
      ) : <div>Now Loading...</div>}
      <div />
    </>
  );
}
