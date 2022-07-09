/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  HomeBody, DiaryContainer, DiaryImageBox, DiaryInfoBox,
  DiaryTitleInsideBox, DiaryImageInsideBox, HomeImageFirst, HomeImageNormal,
  DiaryPublishTime, DiaryTitle, DiaryOutContainer, DiarySmallContainer,
  HomeInviteDiv, HomeInviteTitle, HomeInviteButton, HomeAuthorImage, HomeInviteButtonContainer,
  HomeWelcomeWords, DiaryContent, DiaryImageBoxNormal, DiaryTitleFirst, DiaryProfileImageBoxNormal,
  DiaryAllContainer,
} from './Home.style';

import preview1 from '../img/preview-1.jpg';
import preview2 from '../img/preview-2.jpg';
import preview3 from '../img/preview-3.jpg';
import preview4 from '../img/preview-4.jpg';
import preview5 from '../img/preview-5.jpg';

import { MyBlogProfileSubTitle } from './MyBlog.style';

import { changeHTMLToPureText } from '../components/ShareFunctions';

import LoadStories from '../components/LoadStories';

const previewImagesArray = [preview1, preview2, preview3, preview4, preview5];

export default function Home() {
  const fetchDiaries = () => new Promise((resolve) => {
    const querySnapshot = getDocs(collection(db, 'articles'));
    resolve(querySnapshot);
  });
  const navigate = useNavigate();

  const [allDiaries, setAllDiaries] = useState([]);

  const loadDiaries = useCallback(() => {
    const loadingDiaries = async () => {
      const output = [];
      fetchDiaries().then((querySnapshot) => {
        querySnapshot.forEach((querySnapshotdoc) => {
          output.push(querySnapshotdoc.data());
        });
        setAllDiaries([...output]);
      });

      return (output);
    };
    loadingDiaries();
  }, []);

  const [allDiariesAuthorImg, setAllDiariesAuthorImg] = useState([]);

  const transformTimeToDate = (seconds) => {
    const t = new Date(seconds);
    const formatted = `${t.getFullYear()}.
    ${(`0${t.getMonth() + 1}`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  const getAuthorInfoFunc = async () => {
    if (allDiaries) {
      const diaryAuthorsArray = [];
      const diary = await Promise.all(allDiaries.map((eachDiary) => {
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
  };

  useEffect(() => {
    getAuthorInfoFunc();
  }, [allDiaries]);

  return (
    <HomeBody>

      <DiaryOutContainer>
        <DiaryAllContainer
          className="diary"
        >
          {allDiaries.map((eachDiary, index) => (
            <>
              {
              index === 0
                ? (
                  <>
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                      <HomeWelcomeWords>
                        「　寫下你的專屬故事　」
                      </HomeWelcomeWords>

                    </div>

                    <MyBlogProfileSubTitle>網友熱議</MyBlogProfileSubTitle>
                    <DiaryContainer
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
                      }}
                      onKeyUp={() => {
                        navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
                      }}
                    >
                      <DiaryImageBox><HomeImageFirst src={previewImagesArray[0]} alt={`diary-${index}`} /></DiaryImageBox>
                      <DiaryInfoBox>
                        <DiaryImageInsideBox>
                          <HomeAuthorImage
                            alt="author"
                            src={allDiariesAuthorImg[index]}
                          />
                        </DiaryImageInsideBox>
                        <DiaryTitleInsideBox style={{ textAlign: 'center' }}>
                          <DiaryTitleFirst>{eachDiary.title.slice(0, 20)}</DiaryTitleFirst>
                          <DiaryPublishTime>
                            {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                          </DiaryPublishTime>
                          <DiaryContent>
                            {changeHTMLToPureText(eachDiary.content).slice(0, 80)}
                          </DiaryContent>
                        </DiaryTitleInsideBox>

                      </DiaryInfoBox>

                    </DiaryContainer>
                    <HomeInviteDiv>
                      <HomeInviteTitle>加入 Distory 的世界</HomeInviteTitle>
                      <HomeInviteButtonContainer>
                        <Link to="/signup">
                          <HomeInviteButton>免費註冊</HomeInviteButton>
                        </Link>
                        <Link to="/login">
                          <HomeInviteButton>立即登入</HomeInviteButton>
                        </Link>
                      </HomeInviteButtonContainer>
                    </HomeInviteDiv>
                    <LoadStories />

                  </>
                )
                : (

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
                    <DiaryImageBoxNormal><HomeImageNormal src={previewImagesArray[(index % 5)]} alt={`diary-${index}`} /></DiaryImageBoxNormal>
                    <DiaryInfoBox>
                      <DiaryTitleInsideBox>
                        <DiaryTitle>{eachDiary.title.slice(0, 60)}</DiaryTitle>
                        <DiaryPublishTime>
                          {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                        </DiaryPublishTime>
                      </DiaryTitleInsideBox>

                      <DiaryProfileImageBoxNormal>
                        <img
                          alt="author"
                          style={{ width: '50px', height: '50px' }}
                          src={allDiariesAuthorImg[index]}
                        />
                      </DiaryProfileImageBoxNormal>
                    </DiaryInfoBox>
                  </DiarySmallContainer>
                )
            }
              {}
            </>
          ))}

        </DiaryAllContainer>
      </DiaryOutContainer>
    </HomeBody>
  );
}
