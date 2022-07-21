import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { PopUpBackDiv } from '../pages/ImageEditor.style';
import {
  StoryPopUpContainer, StoryTime, StoryPhotoContainer, StoryCloseButton, StoryArrowButton,
  StoryPhotoStatusBar, StoryImg, StoryArrowButtonLeft,
} from './LoadStories.style';

import { transformTimeToDate } from './ShareFunctions';

export default function ShowStoryDetail({
  setChosedImg, setOpenStory, storiesImgAvailable, chosedIndex, setChosedIndex,
  storiesTimeAll, imgLoading, setImgLoading,
}) {
  const intervalRef = useRef();

  useEffect(() => {
    clearInterval(intervalRef.current);
  }, [imgLoading]);

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (loadingPercentage < 5) {
        setLoadingPercentage((prev) => prev + 1);
      } else {
        setLoadingPercentage(0);
        clearInterval(intervalRef.current);
        setChosedIndex((prev) => prev + 1);
      }
    }, 1000);
  }, [loadingPercentage, imgLoading, setChosedIndex]);

  return (
    <>
      {chosedIndex <= storiesImgAvailable.length - 1 ? (
        <PopUpBackDiv>
          <StoryCloseButton onClick={() => { setOpenStory(false); }}>
            ×
          </StoryCloseButton>
          <StoryPopUpContainer>
            <div style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '100%',
              height: '10%',
              background: 'linear-gradient(180deg, rgba(203,203,203,1) 0%, rgba(255,255,255,0) 80%)',
              zIndex: '2',
            }}
            />
            {chosedIndex === 0 ? (
              ''
            ) : (
              <StoryArrowButtonLeft
                onClick={() => {
                  setChosedImg(storiesImgAvailable[chosedIndex - 1]);
                  setChosedIndex(chosedIndex - 1);
                  setLoadingPercentage(0);
                  setImgLoading(false);
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    if (loadingPercentage < 5) {
                      setLoadingPercentage((prev) => prev + 1);
                    } else {
                      setLoadingPercentage(0);
                      clearInterval(intervalRef.current);
                      setChosedIndex((prev) => prev + 1);
                    }
                  }, 1000);
                }}
              >
                &lt;
              </StoryArrowButtonLeft>
            )}
            {chosedIndex === storiesImgAvailable.length - 1 ? (
              ''
            ) : (
              <StoryArrowButton
                onClick={() => {
                  setChosedImg(storiesImgAvailable[chosedIndex + 1]);
                  setChosedIndex(chosedIndex + 1);
                  setLoadingPercentage(0);
                  setImgLoading(false);
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    if (loadingPercentage < 5) {
                      setLoadingPercentage((prev) => prev + 1);
                    } else {
                      setLoadingPercentage(0);
                      clearInterval(intervalRef.current);
                      setChosedIndex((prev) => prev + 1);
                    }
                  }, 1000);
                }}
              >
                &gt;
              </StoryArrowButton>
            )}
            <StoryPhotoContainer>
              <div style={{
                width: '100%', position: 'relative', borderTop: '6px solid #ccc',
              }}
              >
                {loadingPercentage >= 0 && (
                <StoryPhotoStatusBar
                  key={storiesImgAvailable[chosedIndex]}
                  loadingPercent={loadingPercentage}
                />
                )}
                <StoryImg
                  src={storiesImgAvailable[chosedIndex]}
                  alt="imageUrl"
                  style={imgLoading[chosedIndex] ? { backgroundColor: 'black', opacity: '0' } : { opacity: '1' }}
                  onLoad={() => {
                    setLoadingPercentage(0);
                    setImgLoading(false);
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(() => {
                      if (loadingPercentage < 5) {
                        setLoadingPercentage((prev) => prev + 1);
                      } else {
                        setLoadingPercentage(0);
                        clearInterval(intervalRef.current);
                        setChosedIndex((prev) => prev + 1);
                      }
                    }, 1000);
                  }}
                />
              </div>
              {storiesTimeAll && (<StoryTime>{`${transformTimeToDate(storiesTimeAll[chosedIndex].seconds * 1000)}`}</StoryTime>)}
            </StoryPhotoContainer>
          </StoryPopUpContainer>
        </PopUpBackDiv>
      ) : ('') }
      {}
    </>
  );
}

ShowStoryDetail.propTypes = {
  setChosedImg: PropTypes.func,
  setOpenStory: PropTypes.func,
  storiesImgAvailable: PropTypes.string,
  chosedIndex: PropTypes.string,
  setChosedIndex: PropTypes.func,
  storiesTimeAll: PropTypes.string,
  imgLoading: PropTypes.string,
  setImgLoading: PropTypes.func,
};

ShowStoryDetail.defaultProps = {
  setChosedImg: () => {},
  setOpenStory: () => {},
  storiesImgAvailable: '',
  chosedIndex: '',
  setChosedIndex: () => {},
  storiesTimeAll: '',
  imgLoading: '',
  setImgLoading: () => {},
};
