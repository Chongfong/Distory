import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc, getDoc, getDocs, collection, query, where, deleteDoc,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { auth, db } from '../firestore/firestore';

export default function MyBlog() {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [userDiaries, setUserDiaries] = useState([]);
  onAuthStateChanged(auth, (user) => { setCurrentUser(user); });
  const navigate = useNavigate();
  const { userID } = useParams();

  const docRef = doc(db, 'users', userID);

  function deleteDiary(id) {
    const updatedDiarys = [...userDiaries].filter((diary) => diary.diaryID !== id);
    setUserDiaries(updatedDiarys);
  }

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
          <br />
          <p>{`部落格樣式：${currentUserData.blogLayout}`}</p>
          <p>{`文章樣式：${currentUserData.blogContentLayout}`}</p>
          <p>{`成立於　${new Date(currentUserData.createBlogAt.seconds * 1000).toString()}`}</p>

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
                <button
                  type="button"
                  onClick={() => {
                    navigate(`edit/${eachDiary.diaryID}`);
                  }}
                >
                  💗

                </button>
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
