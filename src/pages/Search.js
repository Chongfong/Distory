/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  HomeBody, DiaryOutContainer, DiarySmallContainer, HomeImageNormal, DiaryInfoBox,
  DiaryTitleInsideBox, DiaryTitle, DiaryPublishTime,
} from './Home.style';

export default function Search() {
  const [searchTitleResult, setSearchTitleResult] = useState();
  const navigate = useNavigate();

  const { searchkey } = useParams();

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  async function searchTitle() {
    try {
      const urlsRef = collection(db, 'articles');
      const q = query(urlsRef, where('titleText', 'array-contains', [...searchkey][0]));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDiariesAll = [];
        querySnapshot.forEach((eachDiary) => {
          if (eachDiary.data()
            .title
            .includes(searchkey)) { userDiariesAll.push(eachDiary.data()); }
        });
        setSearchTitleResult(userDiariesAll);
        return userDiariesAll;
      }
    } catch (e) {
      alert('Error querying document: ', e);
      return e.response;
    } return true;
  }

  useEffect(() => {
    searchTitle();
  }, []);

  return (
    <HomeBody>
      {searchTitleResult
&& (
<DiaryOutContainer>
  <div className="diary" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {(searchTitleResult.map((eachDiary, index) => (
      <DiarySmallContainer
        role="button"
        tabIndex={0}
        onClick={() => {
          navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
        }}
        onKeyUp={() => {
          navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
        }}
      >
        <HomeImageNormal src="https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/blog_images%2F12230.png?alt=media&token=8a7679cf-1e33-49f9-81dd-73ae6aab9bc8" alt={`diary-${index}`} />
        <DiaryInfoBox>
          <DiaryTitleInsideBox>
            <DiaryTitle>{eachDiary.title}</DiaryTitle>
            <DiaryPublishTime>
              {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
            </DiaryPublishTime>
          </DiaryTitleInsideBox>

          <img
            alt="author"
            style={{ width: '50px', height: '50px' }}
            src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png"
          />
        </DiaryInfoBox>
      </DiarySmallContainer>
    )))}

  </div>
</DiaryOutContainer>
)}
    </HomeBody>
  );
}
