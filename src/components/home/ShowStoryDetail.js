import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { PopUpBackDiv } from '../edit/editors/ImageEditor.style';
import {
  StoryPopUpContainer, StoryTime, StoryPhotoContainer, StoryCloseButton, StoryDetailArrowButton,
  StoryPhotoStatusBar, StoryImg, StoryDetailArrowButtonLeft,
  StoryProgressLineContainer, StoryProgressLine,
} from './LoadStories.style';

import { transformTimeToDate } from '../../utils/ShareFunctions';

export default function ShowStoryDetail({
  setChosedImg, setOpenStory, storiesImgAvailable, chosedIndex, setChosedIndex,
  storiesTimeAll, imgLoading, setImgLoading,
}) {
  const intervalRef = useRef();

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (loadingPercentage > 5) {
      clearInterval(intervalRef.current);
      setLoadingPercentage(0);
      setChosedIndex((prev) => prev + 1);
    }
  }, [loadingPercentage, setChosedIndex, imgLoading]);

  return (
    <>
      {chosedIndex <= storiesImgAvailable.length - 1 && (
        <PopUpBackDiv>
          <StoryCloseButton onClick={() => { setOpenStory(false); }}>
            ×
          </StoryCloseButton>
          <StoryPopUpContainer>
            <StoryProgressLineContainer />
            {chosedIndex === 0 ? (
              ''
            ) : (
              <StoryDetailArrowButtonLeft
                onClick={() => {
                  setChosedImg(storiesImgAvailable[chosedIndex - 1]);
                  setChosedIndex(chosedIndex - 1);
                  setLoadingPercentage(0);
                  setImgLoading(false);
                  clearInterval(intervalRef.current);
                }}
              >
                &lt;
              </StoryDetailArrowButtonLeft>
            )}
            {chosedIndex === storiesImgAvailable.length - 1 ? (
              ''
            ) : (
              <StoryDetailArrowButton
                onClick={() => {
                  setChosedImg(storiesImgAvailable[chosedIndex + 1]);
                  setChosedIndex(chosedIndex + 1);
                  setLoadingPercentage(0);
                  setImgLoading(false);
                  clearInterval(intervalRef.current);
                }}
              >
                &gt;
              </StoryDetailArrowButton>
            )}
            <StoryPhotoContainer>
              <StoryProgressLine>
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
              </StoryProgressLine>
              {storiesTimeAll && (<StoryTime>{`${transformTimeToDate(storiesTimeAll[chosedIndex].seconds * 1000)}`}</StoryTime>)}
            </StoryPhotoContainer>
          </StoryPopUpContainer>
        </PopUpBackDiv>
      )}
      {}
    </>
  );
}

ShowStoryDetail.propTypes = {
  setChosedImg: PropTypes.func,
  setOpenStory: PropTypes.func,
  storiesImgAvailable: PropTypes.arrayOf(PropTypes.string),
  chosedIndex: PropTypes.number,
  setChosedIndex: PropTypes.func,
  storiesTimeAll: PropTypes.arrayOf(PropTypes.shape()),
  imgLoading: PropTypes.bool,
  setImgLoading: PropTypes.func,
};

ShowStoryDetail.defaultProps = {
  setChosedImg: () => {},
  setOpenStory: () => {},
  storiesImgAvailable: [],
  chosedIndex: 0,
  setChosedIndex: () => {},
  storiesTimeAll: [],
  imgLoading: true,
  setImgLoading: () => {},
};
