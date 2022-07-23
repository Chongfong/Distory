import React, {
  useCallback, useState, useEffect, useContext,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  doc, getDoc, getDocs, collection, query, where,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { db } from '../firestore/firestore';
import { AppContext } from '../context/AppContext';

import {
  BlogArticleTitle, BlogArticleDate, BlogAtricleDetailContainer,
  BlogArticleEditImage, BlogArticleEditImageContainer,
  BlogArticleInteractiveContainer, BlogArticleInteractiveButtonContainer,
  BlogArticleInputPassword,
} from './BlogArticle.style';

import { CircleButton } from './ImageEditor.style';

import { MyBlogBottomLine } from './MyBlog.style';

import Share from '../components/Share';

import Comment from './Comment';
import Like from './Like';
import edit from '../img/edit.png';
import Loader from '../components/Loader';

export default function BlogArticle() {
  const {
    currentUser, currentUserData,
  } = useContext(AppContext);
  const [userDiaries, setUserDiaries] = useState([]);
  const [commentAll, setCommentAll] = useState();
  const [loginUserDate, setLoginUserData] = useState();
  const [commentAuthor, setCommentAuthor] = useState();
  const [isShowDiary, setIsShowDiary] = useState(false);
  const [inputPassword, setInputPassword] = useState();

  const { userID, diaryID } = useParams();
  const navigate = useNavigate();

  const loadUserBlogSettings = useCallback(() => {
    const docRef = doc(db, 'users', userID);

    const fetchUserBlogSettings = () => new Promise((resolve) => {
      const querySnapshot = getDoc(docRef);
      resolve(querySnapshot);
    });
    const loadingUserBlogSettings = async () => {
      try {
        const querySnapshot = await fetchUserBlogSettings();
        const nowBlogSettings = querySnapshot.data();
        return (nowBlogSettings);
      } catch (e) {
        return e.response;
      }
    };
    loadingUserBlogSettings();
  }, [userID]);

  const loadLoginUser = useCallback(() => {
    const fetchLoginUser = () => new Promise((resolve) => {
      if (currentUser) {
        const querySnapshot = getDoc(doc(db, 'users', currentUser.uid));
        resolve(querySnapshot);
      }
    });
    const loadingLoginUser = async () => {
      try {
        const querySnapshot = await fetchLoginUser();
        const nowLoginUser = querySnapshot.data();
        setLoginUserData(nowLoginUser);
        setCommentAuthor(nowLoginUser.distoryId);
        return (nowLoginUser);
      } catch (e) {
        return e.response;
      }
    };
    loadingLoginUser();
  }, [currentUser]);

  const getUserDiaries = useCallback(() => {
    const gettingUserDiaries = async () => {
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
        return false;
      } catch (e) {
        toast('施工中，返回首頁', {
          autoClose: 2000,
        });
        navigate('/');
        return e.response;
      }
    };
    gettingUserDiaries();
  }, [diaryID, navigate]);

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  useEffect(() => {
    loadUserBlogSettings();
    loadLoginUser();
    getUserDiaries();
  }, [getUserDiaries, loadLoginUser, loadUserBlogSettings]);

  const checkArticlePassword = (userInput, correct) => {
    if (userInput === correct.replace(' ', '')) {
      setIsShowDiary(true);
    } else {
      toast('密碼錯誤，請重新輸入', {
        autoClose: 3500,
      });
    }
  };

  return (
    <>
      {currentUserData ? (
        <ul>
          {userDiaries.map((eachDiary) => (
            <>
              {eachDiary.password === '' || isShowDiary ? (
                <>
                  <div className="diary" style={{ position: 'relative' }}>
                    <BlogArticleTitle>{eachDiary.title}</BlogArticleTitle>
                    {currentUser ? (userID === currentUser.uid && (
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
                    )) : ('')}
                    <BlogArticleDate>
                      {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                    </BlogArticleDate>
                    <BlogAtricleDetailContainer dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(eachDiary.content),
                    }}
                    />
                  </div>
                  <BlogArticleInteractiveContainer>
                    <BlogArticleInteractiveButtonContainer>
                      <Like currentUser={currentUser} nowlikeUsers={eachDiary.likeDiary} />
                    </BlogArticleInteractiveButtonContainer>
                    <BlogArticleInteractiveButtonContainer>
                      <Share url={window.location.href} title={eachDiary.title} />
                    </BlogArticleInteractiveButtonContainer>
                  </BlogArticleInteractiveContainer>
                  <MyBlogBottomLine style={{ width: '100%' }} />
                  <Comment
                    currentUser={currentUser}
                    setCommentAll={setCommentAll}
                    commentAuthor={commentAuthor}
                    commentAll={commentAll}
                    loginUserDate={loginUserDate}
                    setCommentAuthor={setCommentAuthor}
                  />

                </>

              ) : (
                <div>
                  本文章需輸入密碼才能觀看
                  <p>
                    密碼提示：
                    {eachDiary.passwordHint}
                  </p>
                  <BlogArticleInputPassword
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="請輸入密碼"
                  />
                  <br />
                  <CircleButton
                    style={{ marginTop: '20px', position: 'relative' }}
                    role="button"
                    tabIndex={0}
                    onClick={() => { checkArticlePassword(inputPassword, eachDiary.password); }}
                    onKeyUp={() => { checkArticlePassword(inputPassword, eachDiary.password); }}
                  >
                    ✓

                  </CircleButton>
                </div>
              )}
              {}

            </>
          ))}
        </ul>
      ) : <Loader />}
      <div />
    </>
  );
}
