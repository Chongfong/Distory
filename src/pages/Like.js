/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  collection, doc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { db } from '../firestore/firestore';
import { BlogArticleLikesContainer, InteractiveImage, NonInteractiveImage } from './BlogArticle.style';

import heart from '../img/heart.png';
import heartPink from '../img/heart-pink.png';

export default function Like({ currentUser, nowlikeUsers }) {
  const [likeUsers, setLikeUsers] = useState(nowlikeUsers);
  const { userID, diaryID } = useParams();

  const saveLikerDB = (articleID) => {
    const articlesCollection = collection(db, 'articles');
    const likeDiarydoc = doc(articlesCollection, articleID);
    updateDoc(
      likeDiarydoc,
      {
        likeDiary: arrayUnion(currentUser.uid),
      },
    );
  };

  const saveUnLikerDB = (articleID) => {
    const articlesCollection = collection(db, 'articles');
    const likeDiarydoc = doc(articlesCollection, articleID);
    updateDoc(
      likeDiarydoc,
      {
        likeDiary: arrayRemove(currentUser.uid),
      },
    );
  };

  const likeDiary = (articleID) => {
    if (currentUser) {
      let likeUsersCopy = [...likeUsers];
      if (!likeUsersCopy.includes(currentUser.uid)) {
        const likeUsersCopyOfIndex = [...likeUsersCopy, currentUser.uid];
        likeUsersCopy = likeUsersCopyOfIndex;
        setLikeUsers(likeUsersCopy);
        saveLikerDB(articleID);
      }
    } else if (currentUser.uid === userID) {

    } else {
      alert('請先登入');
    }
  };

  const unlikeDiary = (articleID) => {
    if (currentUser) {
      let likeUsersCopy = [...likeUsers];
      if (likeUsersCopy.includes(currentUser.uid)) {
        const likeUsersCopyOfIndex = [...likeUsersCopy]
          .filter((eachLikeUser) => eachLikeUser !== currentUser.uid);
        likeUsersCopy = likeUsersCopyOfIndex;
        setLikeUsers(likeUsersCopy);
        saveUnLikerDB(articleID);
      }
    } else { alert('請先登入'); }
  };
  return (
    <>

      { likeUsers
    && likeUsers.includes(currentUser.uid) ? (
      <BlogArticleLikesContainer
        onClick={() => { unlikeDiary(diaryID); }}
        onKeyUp={() => { unlikeDiary(diaryID); }}
        role="button"
        tabIndex={0}
      >
        <InteractiveImage src={heartPink} alt="heart-pink" />
&nbsp;
        {likeUsers.length}
      </BlogArticleLikesContainer>
        ) : (currentUser.uid === userID ? (
          <BlogArticleLikesContainer>
            <NonInteractiveImage src={heartPink} alt="heart-pink" />
&nbsp;
            {likeUsers.length}
          </BlogArticleLikesContainer>
        ) : (
          <BlogArticleLikesContainer
            onClick={() => { likeDiary(diaryID); }}
            onKeyUp={() => { likeDiary(diaryID); }}
            role="button"
            tabIndex={0}
          >
            <InteractiveImage src={heart} alt="heart" />
&nbsp;
            {likeUsers.length}
          </BlogArticleLikesContainer>
        )

        )}
      <div />
    </>
  );
}

Like.propTypes = {
  currentUser: PropTypes.string,
  nowlikeUsers: PropTypes.string,
};

Like.defaultProps = {
  currentUser: '',
  nowlikeUsers: '',
};
