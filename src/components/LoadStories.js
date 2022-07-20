/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  StoryOuterContainer, StoryContainer, StoryImgContainer, StoryAuthorContainer,
  StoryAuthorImg, StoryAuthorName, StoryTimeAgo, StoryInnerContainer, StoryAuthContainer,
} from './LoadStories.style';

import { HomeProfileSubTitle } from '../pages/Home.style';

import ShowStoryDetail from './ShowStoryDetail';

import { timeAgo } from './ShareFunctions';

import { ArrowButton } from '../pages/ImageEditor.style';

export default function LoadStories() {
  const [storiesAvailable, setStoriesAvailable] = useState();
  const [storiesImgAvailable, setStoriesImgAvailbale] = useState();
  const [storiesAuthor, setStoriesAuthor] = useState();
  const [storiesTime, setStoriesTime] = useState();
  const [openStory, setOpenStory] = useState(false);
  const [chosedImg, setChosedImg] = useState();
  const [chosedIndex, setChosedIndex] = useState(0);
  const [storyAuthorsInfo, setStoryAuthorsInfo] = useState();
  const intervalRef = useRef();
  const navigate = useNavigate();
  const [chosedStoryIndex, setChosedStoryIndex] = useState(0);

  async function searchStoriesAvailable() {
    try {
      const urlsRef = collection(db, 'stories');
      const showBefore = new Date(Date.now() - 100000000000);

      const q = query(urlsRef, where('publishAt', '>=', showBefore));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const storiesAll = [];
        const storiesImgAll = [];
        const storiesAuthorAll = [];
        const storiesTimeAll = [];
        querySnapshot.forEach((eachDiary) => {
          storiesAll.push(eachDiary.data());
          storiesImgAll.push(eachDiary.data().imageUrl);
          storiesAuthorAll.push(eachDiary.data().author);
          storiesTimeAll.push(eachDiary.data().publishAt);
        });
        const reverseStories = storiesAll.reverse();
        const reverseStoriesImg = storiesImgAll.reverse();
        const reverseStoriesAuthor = storiesAuthorAll.reverse();
        const reverseStoriesTime = storiesTimeAll.reverse();
        setStoriesAvailable(reverseStories);
        setStoriesImgAvailbale(reverseStoriesImg);
        setStoriesAuthor(reverseStoriesAuthor);
        setStoriesTime(reverseStoriesTime);
      }
      return false;
    } catch (e) {
      toast('施工中，返回首頁', {
        autoClose: 2000,
      });
      navigate('/');
      return e.response;
    }
  }

  useEffect(() => {
    searchStoriesAvailable();
  }, []);
  const [imgLoading, setImgLoading] = useState(true);

  const getAuthorInfoFunc = async () => {
    if (storiesAvailable) {
      const storyAuthorsArray = [];
      const story = await Promise.all(storiesAvailable.map((eachStory) => {
        async function gettingAuthorInfo() {
          try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('userUID', '==', eachStory.author));
            const querySnapshot = await getDocs(q);
            return querySnapshot;
          } catch (e) {
            return e.response;
          }
        }
        return gettingAuthorInfo();
      }));
      story.forEach((querySnapshot) => {
        querySnapshot.forEach((querySnapshotEach) => {
          if (!querySnapshotEach.empty) {
            storyAuthorsArray.push(
              [querySnapshotEach.data().userImage,
                querySnapshotEach.data().distoryId],
            );
          }
        });
      }); setStoryAuthorsInfo(storyAuthorsArray);
    }
  };

  useEffect(() => {
    getAuthorInfoFunc();
  }, [storiesAvailable]);

  const scrollable = useRef(null);

  const scrollRight = () => {
    const scrollWidth = scrollable.current.offsetWidth + 20;
    scrollable.current.scrollBy({ left: scrollWidth, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    const scrollWidth = scrollable.current.offsetWidth + 20;
    scrollable.current.scrollBy({ left: -scrollWidth, behavior: 'smooth' });
  };

  return (
    <>
      <HomeProfileSubTitle>▋&nbsp;探索Distory</HomeProfileSubTitle>
      <StoryOuterContainer style={{ overflow: 'hidden' }}>
        <StoryInnerContainer
          ref={scrollable}
        >
          {storiesAvailable
            ? (
              <>
                {(openStory && chosedIndex <= storiesAvailable.length - 1) && (
                <ShowStoryDetail
                  chosedImg={chosedImg}
                  setChosedImg={setChosedImg}
                  time={storiesAvailable[chosedIndex].publishAt.seconds * 1000}
                  setOpenStory={setOpenStory}
                  storiesImgAvailable={storiesImgAvailable}
                  chosedIndex={chosedIndex}
                  setChosedIndex={setChosedIndex}
                  intervalRef={intervalRef}
                  storiesAuthorAll={storiesAuthor}
                  storiesTimeAll={storiesTime}
                  imgLoading={imgLoading}
                  setImgLoading={setImgLoading}
                />
                )}

                {storiesAvailable
                  .map((eachStory, index) => (
                    <StoryContainer>

                      {storyAuthorsInfo ? (
                        <>
                          <StoryImgContainer
                            storyImgUrl={eachStory.imageUrl}
                            onClick={() => {
                              setOpenStory(true);
                              setChosedImg(eachStory.imageUrl);
                              setChosedIndex(index);
                            }}
                          >
                            <StoryAuthContainer>
                              <StoryAuthorName>
                                {storyAuthorsInfo[index][1]}
                              </StoryAuthorName>
                              <StoryTimeAgo>
                                {timeAgo(eachStory
                                  .publishAt.seconds * 1000)}

                              </StoryTimeAgo>
                            </StoryAuthContainer>
                          </StoryImgContainer>
                          <StoryAuthorContainer onClick={() => navigate(`/${eachStory.author}`)}>
                            <StoryAuthorImg
                              src={storyAuthorsInfo[index][0]}
                              alt="story-author"
                            />
                          </StoryAuthorContainer>

                        </>
                      ) : ('')}
                    </StoryContainer>
                  ))}
              </>
            ) : (<p>目前未有動態</p>)}
        </StoryInnerContainer>
        {storiesAvailable ? (
          (chosedStoryIndex < (storiesAvailable.length - 5) ? (
            <ArrowButton
              style={{
                position: 'absolute', top: '40%', right: '0px', lineHeight: '0px',
              }}
              onClick={() => {
                setChosedStoryIndex(chosedStoryIndex + 5);
                scrollRight();
              }}
            >
              →
            </ArrowButton>
          ) : (''))) : ('')}
        {chosedStoryIndex >= 5 ? (
          <ArrowButton
            style={{
              position: 'absolute', top: '40%', left: '0px', lineHeight: '0px',
            }}
            onClick={() => {
              setChosedStoryIndex(chosedStoryIndex - 5);
              scrollLeft();
            }}
          >
            ←
          </ArrowButton>
        ) : ('')}
      </StoryOuterContainer>

    </>
  );
}
