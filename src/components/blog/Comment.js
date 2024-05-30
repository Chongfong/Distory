import React, {
  useState, useCallback, useEffect, useContext,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  arrayUnion, collection, doc, getDoc, Timestamp, updateDoc, query, getDocs, where,
} from 'firebase/firestore';
import { db } from '../../utils/firestore';
import { AppContext } from '../../context/AppContext';

import {
  CommentsContainer, CommentNickName, CommentTime, CommentDivContainer, CommentDetailDiv,
  CommentDetail, CommentInput, CommentNickNameInput, CommentAuthorImgContainer, CommentSubTitle,
  CommentAuthorImg, CommentLoginAuthorImg, CommentInputDivContainer, CommentDetailInputDiv,
  CommentNickNameLogin, CommentCircleButton,
} from './Comment.style';

export default function Comment({
  setCommentAll,
  commentAll, loginUserDate,
}) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const { currentUser } = useContext(AppContext);
  const [commentContent, setCommentContent] = useState();
  const [commentAuthorsInfo, setCommentAuthorsInfo] = useState();
  const navigate = useNavigate();

  const { diaryID } = useParams();

  const diaryRef = doc(db, 'articles', diaryID);

  const loadDiaryComments = useCallback(() => {
    const fetchDiaryComments = () => new Promise((resolve) => {
      const querySnapshot = getDoc(diaryRef);
      resolve(querySnapshot);
    });

    const loadingDiaryComments = async () => {
      try {
        const querySnapshot = await fetchDiaryComments();
        const nowDiaryComments = querySnapshot.data();
        const CommentAllSort = [].concat(nowDiaryComments.comments)
          .sort((a, b) => (b.commentTime.seconds - a.commentTime.seconds));
        setCommentAll(CommentAllSort);
        return (nowDiaryComments);
      } catch (e) {
        return e.response;
      }
    };
    loadingDiaryComments();
  }, [diaryRef, setCommentAll]);

  const postCommentDB = async () => {
    const articlesCollection = collection(db, 'articles');
    const commentDiarydoc = doc(articlesCollection, diaryID);
    const commentDetail = {
      commentAuthorID: (currentUser ? currentUser.uid : ''),
      commentAuthor: (commentAuthor || loginUserDate.distoryId),
      commentContent,
      commentTime: Timestamp.now().toDate(),
    };
    await updateDoc(
      commentDiarydoc,
      {
        comments: arrayUnion(commentDetail),
      },
    );
    loadDiaryComments();
  };

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  const getCommentAuthorInfoFuncCallBack = useCallback(() => {
    const getCommentAuthorInfoFunc = async () => {
      if (commentAll) {
        const storyAuthorsArray = [];
        const story = await Promise.all(commentAll.map((eachComment) => {
          const gettingAuthorInfo = async () => {
            try {
              const usersRef = collection(db, 'users');
              const q = query(usersRef, where('userUID', '==', eachComment.commentAuthorID));
              const querySnapshot = await getDocs(q);
              return querySnapshot;
            } catch {
              return [];
            }
          };
          return gettingAuthorInfo();
        }));
        story.forEach((querySnapshot) => {
          if (querySnapshot.empty) {
            storyAuthorsArray.push('https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/pb8xZKCszWCEOtM9HC3yH.png?alt=media&token=5347c34d-a1f0-492c-a33f-96f3874fa494');
          } else {
            querySnapshot.forEach((querySnapshotEach) => {
              if (!querySnapshotEach.empty) {
                storyAuthorsArray.push(
                  querySnapshotEach.data().userImage,
                );
              }
            });
          }
        }); setCommentAuthorsInfo(storyAuthorsArray);
      }
    };
    getCommentAuthorInfoFunc();
  }, [commentAll]);

  useEffect(() => {
    getCommentAuthorInfoFuncCallBack();
  }, [getCommentAuthorInfoFuncCallBack]);

  return (

    <>
      {commentAll ? (
        <CommentsContainer>
          {commentAll.map((eachComment, index) => (
            <React.Fragment
              key={`comment-container-${Date.now() + index}`}
            >
              {eachComment && (
                <CommentDivContainer>
                  {commentAuthorsInfo
                    && (eachComment.commentAuthorID ? ((
                      <CommentAuthorImgContainer
                        onClick={() => { navigate(`/${eachComment.commentAuthorID}`); }}
                        onKeyUp={() => { navigate(`/${eachComment.commentAuthorID}`); }}
                        role="button"
                        tabIndex={0}
                      >
                        <CommentAuthorImg src={commentAuthorsInfo[index]} alt="loginUser" />
                      </CommentAuthorImgContainer>
                    )) : ((<div><CommentAuthorImg src={commentAuthorsInfo[index]} alt="loginUser" /></div>
                    )))}
                  <CommentDetailDiv>
                    <div>
                      <CommentNickName>{eachComment?.commentAuthor}</CommentNickName>
                      <CommentTime>
                        {transformTimeToDate(eachComment.commentTime.seconds * 1000)}
                      </CommentTime>
                    </div>
                    <CommentDetail>{eachComment?.commentContent}</CommentDetail>
                  </CommentDetailDiv>
                </CommentDivContainer>
              ) }
              {}
            </React.Fragment>
          ))}

        </CommentsContainer>
      )
        : ('')}
      <CommentSubTitle>▋&nbsp;發表留言</CommentSubTitle>
      <CommentInputDivContainer>
        {Object.keys(loginUserDate).length !== 0 ? (
          <>
            <CommentLoginAuthorImg
              src={loginUserDate.userImage}
              alt="loginUser"
            />
            <CommentNickNameLogin>
              {loginUserDate.distoryId}

            </CommentNickNameLogin>
          </>
        ) : (
          <>
            <CommentNickName>暱稱</CommentNickName>
            <CommentNickNameInput
              type="text"
              value={commentAuthor}
              onChange={(e) => { setCommentAuthor(e.target.value); }}
            />
          </>
        )}
        <CommentDetailInputDiv>
          <CommentInput
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <CommentCircleButton
            role="button"
            tabIndex={0}
            onClick={(e) => { postCommentDB(e); setCommentContent(''); }}
            onKeyUp={(e) => { postCommentDB(e); setCommentContent(''); }}
          >
            ✓

          </CommentCircleButton>
        </CommentDetailInputDiv>
      </CommentInputDivContainer>
    </>
  );
}

Comment.propTypes = {
  setCommentAll: PropTypes.func,
  commentAll: PropTypes.arrayOf(PropTypes.shape()),
  loginUserDate: PropTypes.shape(),
};

Comment.defaultProps = {
  setCommentAll: () => {},
  commentAll: [],
  loginUserDate: {},
};
