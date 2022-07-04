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
  HomeWelcomeWords,
} from './Home.style';

import { MyBlogProfileSubTitle } from './MyBlog.style';

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
    ${(`0${t.getMonth()}+1`).slice(-2)}.
    ${(`0${t.getDate()}`).slice(-2)}`;
    return formatted;
  };

  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  return (
    <HomeBody>

      <DiaryOutContainer>
        <div className="diary" style={{ display: 'flex', flexWrap: 'wrap' }}>
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
                      <DiaryImageBox><HomeImageFirst src="https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/blog_images%2F12230.png?alt=media&token=8a7679cf-1e33-49f9-81dd-73ae6aab9bc8" alt={`diary-${index}`} /></DiaryImageBox>
                      <DiaryInfoBox>
                        <DiaryTitleInsideBox>
                          <DiaryTitle>{eachDiary.title}</DiaryTitle>
                          <DiaryPublishTime>
                            {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
                          </DiaryPublishTime>
                        </DiaryTitleInsideBox>
                        <DiaryImageInsideBox>
                          <HomeAuthorImage
                            alt="author"
                            src="https://3.bp.blogspot.com/-dTyV6hN6QN4/Viio5AlSBnI/AAAAAAAAzqg/HNtoJT4ecTc/s800/book_inu_yomu.png"
                          />
                        </DiaryImageInsideBox>
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
