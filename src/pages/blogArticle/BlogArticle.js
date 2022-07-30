import React, {
  useCallback, useState, useEffect, useContext,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  doc, getDoc, getDocs, collection, query, where, deleteDoc,
} from 'firebase/firestore';
import { MdDelete } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { db } from '../../utils/firestore';
import { AppContext } from '../../context/AppContext';
import '../../css/loadDiary.css';

import {
  BlogArticleTitle, BlogArticleDate, BlogAtricleDetailContainer,
  BlogArticleEditImage, BlogArticleEditImageContainer, BlogArticleDeleteImageContainer,
  BlogArticleInteractiveContainer, BlogArticleInteractiveButtonContainer,
  BlogArticleInputPassword, BlogArticleCircleButton, BlogArticleBottomLine,
  BlogArticleDeleteContainer, BlogArticleDeleteWord, BlogArticleDeleteButtonContainer,
  BlogArticleDeleteButton,
} from './BlogArticle.style';

import Share from '../../components/blog/Share';

import Comment from '../../components/blog/Comment';
import Like from '../../components/blog/Like';
import edit from '../../img/edit.png';
import Loader from '../../components/share/Loader';

export default function BlogArticle() {
  const {
    currentUser, currentUserData,
  } = useContext(AppContext);
  const [userDiaries, setUserDiaries] = useState([]);
  const [commentAll, setCommentAll] = useState();
  const [loginUserDate, setLoginUserData] = useState();
  const [isShowDiary, setIsShowDiary] = useState(false);
  const [inputPassword, setInputPassword] = useState();
  const [deleteArticle, setDeleteArticle] = useState(false);

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
          {userDiaries.map((eachDiary, index) => (
            <React.Fragment
              key={`article-detail-container-${Date.now() + index}`}
            >
              {eachDiary.password === '' || isShowDiary ? (
                <>
                  <div className="diary" style={{ position: 'relative' }}>
                    <BlogArticleTitle>{eachDiary.title}</BlogArticleTitle>
                    {currentUser ? (userID === currentUser.uid && (
                      <>
                        {deleteArticle && (
                        <BlogArticleDeleteContainer>
                          <BlogArticleDeleteWord>確定要刪除嗎？</BlogArticleDeleteWord>
                          <BlogArticleDeleteButtonContainer>
                            <BlogArticleDeleteButton
                              type="button"
                              onClick={() => {
                                setDeleteArticle(false);
                                const eachDiarydocRef = doc(db, 'articles', diaryID);
                                deleteDoc(eachDiarydocRef).then(
                                  toast('文章已刪除', {
                                    autoClose: 3500,
                                  }),
                                  navigate(`/${userID}/`),
                                );
                              }}
                            >
                              確定

                            </BlogArticleDeleteButton>
                            <BlogArticleDeleteButton type="button" onClick={() => setDeleteArticle(false)}>取消</BlogArticleDeleteButton>
                          </BlogArticleDeleteButtonContainer>
                        </BlogArticleDeleteContainer>
                        )}
                        <BlogArticleDeleteImageContainer
                          onClick={(() => { setDeleteArticle(true); })}
                          onKeyUp={() => {
                            navigate(`/${userID}/edit/${diaryID}`);
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <MdDelete style={{ fontSize: '30px' }} />

                        </BlogArticleDeleteImageContainer>
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

                      </>
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
                      <Like nowlikeUsers={eachDiary.likeDiary} />
                    </BlogArticleInteractiveButtonContainer>
                    <BlogArticleInteractiveButtonContainer>
                      <Share url={window.location.href} title={eachDiary.title} />
                    </BlogArticleInteractiveButtonContainer>
                  </BlogArticleInteractiveContainer>
                  <BlogArticleBottomLine />
                  <Comment
                    setCommentAll={setCommentAll}
                    commentAll={commentAll}
                    loginUserDate={loginUserDate}
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
                  <BlogArticleCircleButton
                    role="button"
                    tabIndex={0}
                    onClick={() => { checkArticlePassword(inputPassword, eachDiary.password); }}
                    onKeyUp={() => { checkArticlePassword(inputPassword, eachDiary.password); }}
                  >
                    ✓

                  </BlogArticleCircleButton>
                </div>
              )}
              {}

            </React.Fragment>
          ))}
        </ul>
      ) : <Loader />}
      <div />
    </>
  );
}
