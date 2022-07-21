import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import { previewImagesArray } from './Home';

import {
  HomeBody, DiaryOutContainer, DiarySmallContainer, HomeImageNormal, DiaryInfoBox,
  DiaryTitleInsideBox, DiaryTitle, DiaryPublishTime,
  DiaryImageBoxNormal, DiaryProfileImageBoxNormal, DiaryProfileImg, SearchTitle,
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

  const searchTitleCallBack = useCallback(() => {
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
        toast('施工中，返回首頁', {
          autoClose: 2000,
        });
        navigate('/');
        return e.response;
      } return true;
    }searchTitle();
  }, [navigate, searchkey]);

  useEffect(() => {
    searchTitleCallBack();
  }, [searchTitleCallBack]);

  const [allDiariesAuthorImg, setAllDiariesAuthorImg] = useState([]);

  const getAuthorInfoFuncCallBack = useCallback(() => {
    const getAuthorInfoFunc = async () => {
      if (searchTitleResult) {
        const diaryAuthorsArray = [];
        const diary = await Promise.all(searchTitleResult.map((eachDiary) => {
          async function gettingAuthorInfo() {
            try {
              const usersRef = collection(db, 'users');
              const q = query(usersRef, where('userUID', '==', eachDiary.author));
              const querySnapshot = await getDocs(q);
              return querySnapshot;
            } catch (e) {
              return e.response;
            }
          }
          return gettingAuthorInfo();
        }));
        diary.forEach((querySnapshot) => {
          querySnapshot.forEach((querySnapshotEach) => {
            if (!querySnapshotEach.empty) {
              diaryAuthorsArray.push(querySnapshotEach.data().userImage);
            }
          });
        }); setAllDiariesAuthorImg(diaryAuthorsArray);
      }
    }; getAuthorInfoFunc();
  }, [searchTitleResult]);

  useEffect(() => {
    getAuthorInfoFuncCallBack();
  }, [getAuthorInfoFuncCallBack]);

  return (
    <HomeBody>
      {searchTitleResult
&& (
<DiaryOutContainer>
  <SearchTitle>
    搜尋
    {' '}
    {searchkey}
    {' '}
    的結果
  </SearchTitle>
  <div className="diary" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {(searchTitleResult.map((eachDiary, index) => (

      <DiarySmallContainer>
        <DiaryImageBoxNormal
          role="button"
          tabIndex={0}
          onClick={() => {
            navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
          }}
          onKeyUp={() => {
            navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
          }}
        >
          {eachDiary.showImg ? (<HomeImageNormal src={eachDiary.showImg} alt={`diary-${index}`} />)
            : (<HomeImageNormal src={previewImagesArray[Math.floor(Math.random() * 5)]} alt={`diary-${index}`} />)}
        </DiaryImageBoxNormal>
        <DiaryInfoBox>
          <DiaryTitleInsideBox
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
            }}
            onKeyUp={() => {
              navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
            }}
          >
            <DiaryTitle>{eachDiary.title.slice(0, 60)}</DiaryTitle>
            <DiaryPublishTime>
              {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
            </DiaryPublishTime>
          </DiaryTitleInsideBox>

          <DiaryProfileImageBoxNormal
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate(`/${eachDiary.author}`);
            }}
            onKeyUp={() => {
              navigate(`/${eachDiary.author}`);
            }}
          >
            <DiaryProfileImg
              alt="author"
              src={allDiariesAuthorImg[index]}
            />
          </DiaryProfileImageBoxNormal>
        </DiaryInfoBox>
      </DiarySmallContainer>
    )))}

  </div>
</DiaryOutContainer>
)}
    </HomeBody>
  );
}
