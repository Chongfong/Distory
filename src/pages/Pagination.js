import React, { useState, useEffect, useRef } from 'react';
import {
  collection, orderBy, query, getDocs, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';
import {
  DiaryContainerFlex, DiaryImageDefault, DiaryContentFlex, DiaryTitle, DiaryContent, DiaryPage,
  DiaryLikes, DiaryImgContainer, DiaryContentFlexContainer,
} from './Pagination.style';

import { changeHTMLToPureText } from '../components/ShareFunctions';
import { previewImagesArray } from './Home';

export default function Pagination({ userID, currentUserData }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const totalPages = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const urlsRef = collection(db, 'articles');
      const q = query(urlsRef, where('author', '==', userID), where('status', '==', 'published'), orderBy('publishAt', 'desc'));
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
      totalPages.current = (Math.ceil(items.length / 3));
    };
    fetchData();
  }, [userID]);

  return (
    <>
      { page !== 0
        ? (list.slice(page * 3, page * 3 + 3).map((doc, index) => (
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
            {doc.showImg
              ? (
                <DiaryImageDefault
                  src={doc.showImg}
                  alt={`preview-diary-${index}`}
                />
              )
              : (
                <DiaryImageDefault
                  src={previewImagesArray[(index % 5)]}
                  alt={`preview-diary-${index}`}
                />
              )}
            <DiaryContentFlexContainer>
              <DiaryContentFlex>
                <DiaryTitle>{doc.title.slice(0, 50)}</DiaryTitle>
                {doc.password === '' ? (<DiaryContent>{changeHTMLToPureText(doc.content).slice(0, 80)}</DiaryContent>) : (<p style={{ color: '#b8b8b8' }}>輸入密碼後方可觀看</p>)}
              </DiaryContentFlex>
              <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
                💗&nbsp;
                {doc.likeDiary ? doc.likeDiary.length : 0}
              </DiaryLikes>
            </DiaryContentFlexContainer>
          </DiaryContainerFlex>
        ))) : ((list.slice(0, 3).map((doc, index) => (
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
            {doc.showImg
              ? (
                <DiaryImgContainer>
                  <DiaryImageDefault
                    src={doc.showImg}
                    alt={`preview-diary-${index}`}
                  />
                </DiaryImgContainer>
              )
              : (
                <DiaryImgContainer>
                  <DiaryImageDefault
                    src={previewImagesArray[(index % 5)]}
                    alt={`preview-diary-${index}`}
                  />
                </DiaryImgContainer>

              )}
            <DiaryContentFlexContainer>
              <DiaryContentFlex>
                <DiaryTitle>{doc.title.slice(0, 50)}</DiaryTitle>
                {doc.password === '' ? (<DiaryContent>{changeHTMLToPureText(doc.content).slice(0, 80)}</DiaryContent>) : (<p style={{ color: '#b8b8b8', textAlign: 'left' }}>輸入密碼後方可觀看</p>)}
              </DiaryContentFlex>
              <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
                💗&nbsp;
                {doc.likeDiary ? doc.likeDiary.length : 0}
              </DiaryLikes>
            </DiaryContentFlexContainer>
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
