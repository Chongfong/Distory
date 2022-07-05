/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  collection, orderBy, query, getDocs, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';
import {
  DiaryContainerFlex, DiaryImageDefault, DiaryContentFlex, DiaryTitle, DiaryContent, DiaryPage,
  DiaryLikes,
} from './Pagination.style';

import postImage from '../img/post2.png';

export default function Pagination({ userID, currentUserData }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const totalPages = useRef();
  const navigate = useNavigate();

  const urlsRef = collection(db, 'articles');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(urlsRef, where('author', '==', userID), orderBy('publishAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().contentLike) {
          items.push({
            title: doc.data().title,
            content: doc.data().content,
            publishAt: doc.data().publishAt,
            likes: doc.data().contentLike.length,
            ...doc.data(),
          });
        } else {
          items.push({
            title: doc.data().title,
            content: doc.data().content,
            publishAt: doc.data().publishAt,
            likes: 0,
            ...doc.data(),
          });
        }
      });
      setList(items);
      totalPages.current = (Math.ceil(items.length / 2));
    };
    fetchData();
  }, []);
  return (
    <>
      { page !== 0
        ? (list.slice(page * 2, page * 2 + 2).map((doc) => (
          <DiaryContainerFlex
            blogContentOrder={currentUserData.blogContentLayout === 'A'}
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate(`${doc.diaryID}`);
            }}
            onKeyUp={() => {
              navigate(`${doc.diaryID}`);
            }}
          >
            <DiaryImageDefault src={postImage} alt="preview-diary" />
            <DiaryContentFlex>
              <DiaryTitle>{doc.title}</DiaryTitle>
              <DiaryContent>{doc.content.slice(0, 80)}</DiaryContent>
            </DiaryContentFlex>
            <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
              💗&nbsp;
              {doc.likeDiary ? doc.likeDiary.length : 0}
            </DiaryLikes>
          </DiaryContainerFlex>
        ))) : ((list.slice(0, 2).map((doc) => (
          <DiaryContainerFlex
            blogContentOrder={currentUserData.blogContentLayout === 'A'}
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate(`${doc.diaryID}`);
            }}
            onKeyUp={() => {
              navigate(`${doc.diaryID}`);
            }}
          >
            <DiaryImageDefault src={postImage} alt="preview-diary" />
            <DiaryContentFlex>
              <DiaryTitle>{doc.title}</DiaryTitle>
              <DiaryContent>{doc.content.slice(0, 80)}</DiaryContent>
            </DiaryContentFlex>
            <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
              💗&nbsp;
              {doc.likeDiary ? doc.likeDiary.length : 0}
            </DiaryLikes>
          </DiaryContainerFlex>
        ))))}
      {totalPages ? (Array.from(Array(totalPages.current).keys())).map(
        (eachPage) => (
          <DiaryPage
            onClick={() => setPage(eachPage)}
            onKeyUp={() => setPage(eachPage)}
            role="button"
            tabIndex={0}
          >
            {eachPage + 1}
          </DiaryPage>
        ),
      ) : ('')}

    </>
  );
}

Pagination.propTypes = {
  userID: PropTypes.objectOf(PropTypes.string),
  currentUserData: PropTypes.string,
};

Pagination.defaultProps = {
  userID: {},
  currentUserData: '',
};
