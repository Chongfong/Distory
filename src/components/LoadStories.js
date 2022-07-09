/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';

import {
  StoryOuterContainer, StoryContainer, StoryImgContainer, StoryAuthorContainer,
  StoryAuthorImg, StoryAuthorName, StoryTimeAgo,
} from './LoadStories.style';

import ShowStoryDetail from './ShowStoryDetail';

import { MyBlogProfileSubTitle } from '../pages/MyBlog.style';

import { timeAgo } from './ShareFunctions';

export default function LoadStories() {
  const [storiesAvailable, setStoriesAvailable] = useState();
  const [storiesImgAvailable, setStoriesImgAvailbale] = useState();
  const [storiesAuthor, setStoriesAuthor] = useState();
  const [storiesTime, setStoriesTime] = useState();
  const [openStory, setOpenStory] = useState(false);
  const [chosedImg, setChosedImg] = useState();
  const [chosedIndex, setChosedIndex] = useState();
  const [storyAuthorsInfo, setStoryAuthorsInfo] = useState();
  const intervalRef = useRef();
  const navigate = useNavigate();

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
        setStoriesAvailable(storiesAll);
        setStoriesImgAvailbale(storiesImgAll);
        setStoriesAuthor(storiesAuthorAll);
        setStoriesTime(storiesTimeAll);
      }
      return false;
    } catch (e) {
      alert('Error querying document: ', e);
      return e.response;
    }
  }

  useEffect(() => {
    searchStoriesAvailable();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setChosedIndex((prev) => prev + 1);
    }, 5000);
  }, []);

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

  return (
    <>
      <MyBlogProfileSubTitle>探索Distory</MyBlogProfileSubTitle>
      <StoryOuterContainer>
        {storiesAvailable
          ? (storiesAvailable.map((eachStory, index) => (
            <StoryContainer>
              {openStory && (
              <ShowStoryDetail
                chosedImg={chosedImg}
                setChosedImg={setChosedImg}
                time={eachStory.publishAt.seconds * 1000}
                setOpenStory={setOpenStory}
                storiesImgAvailable={storiesImgAvailable}
                chosedIndex={chosedIndex}
                setChosedIndex={setChosedIndex}
                intervalRef={intervalRef}
                storiesAuthorAll={storiesAuthor}
                storiesTimeAll={storiesTime}
              />
              )}
              <StoryImgContainer
                storyImgUrl={eachStory.imageUrl}
                onClick={() => {
                  setOpenStory(true);
                  setChosedImg(eachStory.imageUrl);
                  setChosedIndex(index);
                }}
              />
              {storyAuthorsInfo ? (
                <StoryAuthorContainer onClick={() => navigate(`/${eachStory.author}`)}>
                  <StoryAuthorImg src={storyAuthorsInfo[index][0]} alt="story-author" />
                  <div style={{ width: '100%', paddingLeft: '10px' }}>
                    <StoryAuthorName>{storyAuthorsInfo[index][1]}</StoryAuthorName>
                    <StoryTimeAgo>{timeAgo(eachStory.publishAt.seconds * 1000)}</StoryTimeAgo>
                  </div>

                </StoryAuthorContainer>
              ) : ('')}
            </StoryContainer>
          ))) : (<p>No Story</p>)}

      </StoryOuterContainer>

    </>
  );
}
