import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  HomeBody, DiaryContainer, DiaryImageBox, DiaryInfoBox,
  DiaryTitleInsideBox, DiaryImageInsideBox, HomeImageFirst, HomeImageNormal,
  DiaryPublishTime, DiaryTitle, DiaryOutContainer, DiarySmallContainer,
  HomeInviteDiv, HomeInviteTitle, HomeInviteButton, HomeAuthorImage, HomeInviteButtonContainer,
  HomeWelcomeWords, DiaryContent, DiaryImageBoxNormal, DiaryTitleFirst, DiaryProfileImageBoxNormal,
} from './Home.style';

import preview1 from '../img/preview-1.jpg';
import preview2 from '../img/preview-2.jpg';
import preview3 from '../img/preview-3.jpg';
import preview4 from '../img/preview-4.jpg';
import preview5 from '../img/preview-5.jpg';

import boy from '../img/boy.png';

import { MyBlogProfileSubTitle } from './MyBlog.style';

import { changeHTMLToPureText } from '../components/ShareFunctions';

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

  return (
    <HomeBody>

      <DiaryOutContainer>
        <div
          className="diary"
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          }}
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
                            src={boy}
                          />
                        </DiaryImageInsideBox>
                        <DiaryTitleInsideBox>
                          <DiaryTitleFirst>{eachDiary.title}</DiaryTitleFirst>
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
                        <DiaryTitle>{eachDiary.title}</DiaryTitle>
                        <DiaryPublishTime>
                          {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                        </DiaryPublishTime>
                      </DiaryTitleInsideBox>

                      <DiaryProfileImageBoxNormal>
                        <img
                          alt="author"
                          style={{ width: '50px', height: '50px' }}
                          src={boy}
                        />
                      </DiaryProfileImageBoxNormal>
                    </DiaryInfoBox>
                  </DiarySmallContainer>
                )
            }
              {}
            </>
          ))}

        </div>
      </DiaryOutContainer>
    </HomeBody>
  );
}
