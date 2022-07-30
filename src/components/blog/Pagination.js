import React, { useState, useEffect, useRef } from 'react';
import {
  collection, orderBy, query, getDocs, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firestore';
import {
  DiaryContainerFlex, DiaryImageDefault, DiaryContentFlex, DiaryTitle, DiaryContent, DiaryPage,
  DiaryLikes, DiaryImgContainer, DiaryContentFlexContainer, DiaryPassWord, DiaryPassWordLeft,
} from './Pagination.style';

import { changeHTMLToPureText } from '../../utils/ShareFunctions';
import { previewImagesArray } from '../../pages/home/Home';

export default function Pagination({ userID, currentUserData }) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const totalPages = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        return items;
      } catch (e) {
        return e.response;
      }
    };

    fetchData();
  }, [userID]);

  return (
    <>
      { page !== 0
        ? (list.slice(page * 3, page * 3 + 3).map((doc, index) => (
          <DiaryContainerFlex
            key={`diary-container-${Date.now() + index}`}
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
                  diaryImgUrl={doc.showImg}
                  alt={`preview-diary-${index}`}
                />
              )
              : (
                <DiaryImageDefault
                  diaryImgUrl={previewImagesArray[(index % 5)]}
                  alt={`preview-diary-${index}`}
                />
              )}
            <DiaryContentFlexContainer>
              <DiaryContentFlex>
                <DiaryTitle>{doc.title.slice(0, 50)}</DiaryTitle>
                {doc.password === '' ? (<DiaryContent>{changeHTMLToPureText(doc.content).slice(0, 80)}</DiaryContent>) : (<DiaryPassWord>輸入密碼後方可觀看</DiaryPassWord>)}
              </DiaryContentFlex>
              <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
                💗&nbsp;
                {doc.likeDiary ? doc.likeDiary.length : 0}
              </DiaryLikes>
            </DiaryContentFlexContainer>
          </DiaryContainerFlex>
        ))) : ((list.slice(0, 3).map((doc, index) => (
          <DiaryContainerFlex
            key={`diary-container-${Date.now() + index}`}
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
                    diaryImgUrl={doc.showImg}
                  />
                </DiaryImgContainer>
              )
              : (
                <DiaryImgContainer>
                  <DiaryImageDefault
                    diaryImgUrl={previewImagesArray[(index % 5)]}
                    alt={`preview-diary-${index}`}
                  />
                </DiaryImgContainer>

              )}
            <DiaryContentFlexContainer>
              <DiaryContentFlex>
                <DiaryTitle>{doc.title.slice(0, 50)}</DiaryTitle>
                {doc.password === '' ? (<DiaryContent>{changeHTMLToPureText(doc.content).slice(0, 80)}</DiaryContent>) : (<DiaryPassWordLeft>輸入密碼後方可觀看</DiaryPassWordLeft>)}
              </DiaryContentFlex>
              <DiaryLikes blogContentOrder={currentUserData.blogContentLayout === 'A'}>
                💗&nbsp;
                {doc.likeDiary ? doc.likeDiary.length : 0}
              </DiaryLikes>
            </DiaryContentFlexContainer>
          </DiaryContainerFlex>

        ))))}
      {totalPages ? (Array.from(Array(totalPages.current).keys())).map(
        (eachPage, index) => (
          <DiaryPage
            key={`diary-page-${Date.now() + index}`}
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
  userID: PropTypes.string,
  currentUserData: PropTypes.shape(),
};

Pagination.defaultProps = {
  userID: '',
  currentUserData: {},
};
