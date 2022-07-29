import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firestore';

import {
  StoryOuterContainer, StoryContainer, StoryImgContainer, StoryAuthorContainer,
  StoryAuthorImg, StoryAuthorName, StoryTimeAgo, StoryInnerContainer, StoryAuthContainer,
  StoryProfileSubTitle, StoryArrowButtonRight, StoryArrowButtonLeft,
} from './LoadStories.style';

import ShowStoryDetail from './ShowStoryDetail';

import { timeAgo } from '../../utils/ShareFunctions';

export default function LoadStories() {
  const [storiesAvailable, setStoriesAvailable] = useState();
  const [storiesImgAvailable, setStoriesImgAvailbale] = useState();
  const [storiesAuthor, setStoriesAuthor] = useState();
  const [storiesTime, setStoriesTime] = useState();
  const [openStory, setOpenStory] = useState(false);
  const [chosedImg, setChosedImg] = useState();
  const [chosedIndex, setChosedIndex] = useState(0);
  const [storyAuthorsInfo, setStoryAuthorsInfo] = useState();
  const navigate = useNavigate();
  const [chosedStoryIndex, setChosedStoryIndex] = useState(0);

  const searchStoriesAvailableCallBack = useCallback(() => {
    const searchStoriesAvailable = async () => {
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
    };
    searchStoriesAvailable();
  }, [navigate]);

  useEffect(() => {
    searchStoriesAvailableCallBack();
  }, [searchStoriesAvailableCallBack]);
  const [imgLoading, setImgLoading] = useState(true);

  const getAuthorInfoFuncCallBack = useCallback(() => {
    const getAuthorInfoFunc = async () => {
      if (storiesAvailable) {
        const storyAuthorsArray = [];
        const story = await Promise.all(storiesAvailable.map((eachStory) => {
          const gettingAuthorInfo = async () => {
            try {
              const usersRef = collection(db, 'users');
              const q = query(usersRef, where('userUID', '==', eachStory.author));
              const querySnapshot = await getDocs(q);
              return querySnapshot;
            } catch (e) {
              return e.response;
            }
          };
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
    }; getAuthorInfoFunc();
  }, [storiesAvailable]);

  useEffect(() => {
    getAuthorInfoFuncCallBack();
  }, [getAuthorInfoFuncCallBack]);

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
      <StoryProfileSubTitle>▋&nbsp;探索Distory</StoryProfileSubTitle>
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
                  storiesAuthorAll={storiesAuthor}
                  storiesTimeAll={storiesTime}
                  imgLoading={imgLoading}
                  setImgLoading={setImgLoading}
                />
                )}

                {storiesAvailable
                  .map((eachStory, index) => (
                    <StoryContainer key={`story-${Date.now() + index}`}>

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
        {storiesAvailable && (
          (chosedStoryIndex < (storiesAvailable.length - 5) ? (
            <StoryArrowButtonRight
              onClick={() => {
                setChosedStoryIndex(chosedStoryIndex + 5);
                scrollRight();
              }}
            >
              →
            </StoryArrowButtonRight>
          ) : ('')))}
        {chosedStoryIndex >= 5 ? (
          <StoryArrowButtonLeft
            onClick={() => {
              setChosedStoryIndex(chosedStoryIndex - 5);
              scrollLeft();
            }}
          >
            ←
          </StoryArrowButtonLeft>
        ) : ('')}
      </StoryOuterContainer>

    </>
  );
}
