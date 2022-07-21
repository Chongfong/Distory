/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  collection, doc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
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
      if (currentUser.uid === userID) {} else {
        let likeUsersCopy = [...likeUsers];
        if (!likeUsersCopy.includes(currentUser.uid)) {
          const likeUsersCopyOfIndex = [...likeUsersCopy, currentUser.uid];
          likeUsersCopy = likeUsersCopyOfIndex;
          setLikeUsers(likeUsersCopy);
          saveLikerDB(articleID);
        }
      }
    } else {
      toast('登入後即可按讚', {
        autoClose: 3500,
      });
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
    } else {
      toast('請先登入', {
        autoClose: 3500,
      });
    }
  };

  const renderHeartPink = () => {
    if (currentUser) {
      if (currentUser.uid === userID) {
        return (
          <BlogArticleLikesContainer>
            <NonInteractiveImage src={heartPink} alt="heart-pink" />
              &nbsp;
            {likeUsers.length}
          </BlogArticleLikesContainer>
        );
      }

      return (
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
      );
    } return null;
  };

  return (
    <>
      { currentUser ? (likeUsers
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
        ) : renderHeartPink()) : (
          <BlogArticleLikesContainer
            onClick={() => { likeDiary(diaryID); }}
            onKeyUp={() => { likeDiary(diaryID); }}
            role="button"
            tabIndex={0}
          >
            <InteractiveImage src={heartPink} alt="heart-pink" />
&nbsp;
            {likeUsers.length}
          </BlogArticleLikesContainer>
      )}
      {}
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
