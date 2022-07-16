/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  HomeBody, DiaryContainer, DiaryImageBox, DiaryInfoBox,
  DiaryTitleInsideBox, DiaryImageInsideBox, HomeImageFirst, HomeImageNormal,
  DiaryPublishTime, DiaryTitle, DiaryOutContainer, DiarySmallContainer,
  HomeInviteDiv, HomeInviteTitle, HomeInviteButton, HomeAuthorImage, HomeInviteButtonContainer,
  HomeWelcomeWords, DiaryContent, DiaryImageBoxNormal, DiaryTitleFirst, DiaryProfileImageBoxNormal,
  DiaryAllContainer, DiaryProfileImg,
} from './Home.style';

import { MyBlogProfileSubTitle, MyBlogProfileSubTitleMargin } from './MyBlog.style';

import { changeHTMLToPureText } from '../components/ShareFunctions';

import LoadStories from '../components/LoadStories';

import Loader from '../components/Loader';

export const previewImagesArray = [
  'https://file.coffee/u/pk6HROQiXzoh8qxIxho0F.jpg',
  'https://file.coffee/u/k9JaFxf5SM95WDSLyEZ8-.jpg',
  'https://file.coffee/u/yDBwlsE2SWC_ABi4wrdfL.jpg',
  'https://file.coffee/u/NeyXW_Jb49mXSdLikJm6S.jpg',
  'https://file.coffee/u/4VidEWw87CJvCU7o7h29i.jpg'];

export default function Home() {
  const fetchDiaries = () => new Promise((resolve) => {
    const diariesCollection = collection(db, 'articles');
    const q = query(diariesCollection, where('status', '==', 'published'), where('password', '==', ''), orderBy('publishAt', 'desc'));
    const querySnapshot = getDocs(q);
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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthorInfoFunc();
  }, [allDiaries]);

  return (
    <>
      {isLoading ? (<Loader />) : (
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
                    <>
                      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                        <HomeWelcomeWords>
                          Discover your story
                        </HomeWelcomeWords>

                      </div>

                      <MyBlogProfileSubTitle>▋&nbsp;網友熱議</MyBlogProfileSubTitle>
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
                              {`${changeHTMLToPureText(eachDiary.content).slice(0, 80)}...`}
                            </DiaryContent>
                          </DiaryTitleInsideBox>

                        </DiaryInfoBox>

                      </DiaryContainer>
                      <HomeInviteDiv>
                        <HomeInviteTitle>
                          加入&nbsp;
                          <span style={{ color: '#b57c4a' }}>Distory</span>
                          &nbsp;的世界
                        </HomeInviteTitle>
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
                    <MyBlogProfileSubTitleMargin>
                      ▋&nbsp;經典好文

                    </MyBlogProfileSubTitleMargin>

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
                    <DiaryImageBoxNormal>
                      {eachDiary.showImg
                        ? (
                          <HomeImageNormal
                            src={eachDiary.showImg}
                            alt={`diary-${index}`}
                          />
                        )
                        : (
                          <HomeImageNormal
                            src={previewImagesArray[(index % 5)]}
                            alt={`diary-${index}`}
                          />
                        )}

                    </DiaryImageBoxNormal>
                    <DiaryInfoBox>
                      <DiaryTitleInsideBox>
                        <DiaryTitle>{eachDiary.title.slice(0, 60)}</DiaryTitle>
                        <DiaryPublishTime>
                          {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                        </DiaryPublishTime>
                      </DiaryTitleInsideBox>

                      <DiaryProfileImageBoxNormal>
                        <DiaryProfileImg
                          alt="author"
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
      )}
      {}
    </>
  );
}
