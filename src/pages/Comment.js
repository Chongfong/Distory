/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  arrayUnion, collection, doc, getDoc, Timestamp, updateDoc,
} from 'firebase/firestore';
import { db } from '../firestore/firestore';

import {
  CommentsContainer, CommentNickName, CommentTime, CommentDivContainer, CommentDetailDiv,
  CommentDetail, CommentInput, CommentNickNameInput,
} from './Comment.style';

import { MyBlogProfileSubTitle } from './MyBlog.style';
import { CircleButton } from './ImageEditor.style';

export default function Comment({
  currentUser, setCommentAll, commentAuthor,
  commentAll, loginUserDate, setCommentAuthor,
}) {
  const [commentContent, setCommentContent] = useState();

  const { userID, diaryID } = useParams();

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
        const CommentAllSort = [].concat(querySnapshot.data().comments)
          .sort((a, b) => (b.commentTime.seconds - a.commentTime.seconds));
        setCommentAll(CommentAllSort);
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

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  return (

    <>
      {commentAll ? (
        <CommentsContainer>
          {commentAll.map((eachComment) => (
            <>
              {currentUser.uid === userID ? (<button type="button">X</button>) : ('')}
              <CommentDivContainer>
                <img src={loginUserDate.userImage} alt="loginUser" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <CommentDetailDiv>
                  <div>
                    <CommentNickName>{eachComment.commentAuthor}</CommentNickName>
                    <CommentTime>
                      {transformTimeToDate(eachComment.commentTime.seconds * 1000)}
                    </CommentTime>
                  </div>
                  <CommentDetail>{eachComment.commentContent}</CommentDetail>
                </CommentDetailDiv>
              </CommentDivContainer>
            </>
          ))}

        </CommentsContainer>
      )
        : ('')}
      <MyBlogProfileSubTitle style={{ marginBottom: '40px' }}>發表留言</MyBlogProfileSubTitle>
      <CommentDivContainer style={{ flexWrap: 'wrap' }}>
        {loginUserDate ? (
          <>
            <img
              src={loginUserDate.userImage}
              alt="loginUser"
              style={{
                width: '50px', height: '50px', borderRadius: '50%', flexBasis: '10%',
              }}
            />
            <CommentNickName style={{ flexBasis: '88%' }}>
              {loginUserDate.distoryId}

            </CommentNickName>
          </>
        ) : (
          <>
            <CommentNickName>暱稱</CommentNickName>
            <CommentNickNameInput
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
          </>
        )}
        <CommentDetailDiv style={{ alignItems: 'flex-end' }}>
          <CommentInput
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <CircleButton
            role="button"
            tabIndex={0}
            onClick={() => { postCommentDB(); }}
            onKeyUp={() => { postCommentDB(); }}
          >
            ✓

          </CircleButton>
        </CommentDetailDiv>
      </CommentDivContainer>
    </>
  );
}

Comment.propTypes = {
  currentUser: PropTypes.string,
  setCommentAll: PropTypes.string,
  commentAuthor: PropTypes.string,
  commentAll: PropTypes.string,
  loginUserDate: PropTypes.string,
  setCommentAuthor: PropTypes.string,
};

Comment.defaultProps = {
  currentUser: '',
  setCommentAll: '',
  commentAuthor: '',
  commentAll: '',
  loginUserDate: '',
  setCommentAuthor: '',
};
