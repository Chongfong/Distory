import styled, { keyframes } from 'styled-components/macro';

const storyStatus = keyframes`
  0%   {width: 0%;}
  100% {width: 100%;}
`;

export const StoryOuterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: flex-start;
  text-align: left;
  padding: 50px 0px 100px;
  width: 100%;
  overflow-y: auto;
  height: 10%;

  ::-webkit-scrollbar {
  height: 6px;
  width: 0px;
  }
  ::-webkit-scrollbar-thumb {
  background: #cabeba;
  border-radius: 10px;
}
`;

export const StoryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0px;
  width: 33.3%;
  height: 100%;

  @media (max-width: 912px) {
      width: 48%;
}
`;

export const StoryImgContainer = styled.div`
  margin: 10px;
  flex: 100%;
  height: 80%;
  background-image: ${({ storyImgUrl }) => (storyImgUrl
    ? `url(${storyImgUrl})`
    : 'url(https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/stories%2F1657118554323?alt=media&token=fc942aeb-82d1-433d-9ed5-e1da398af0b8)')};
  background-size: cover;
  background-position: center,center;
  width:500px;
  border: 1px solid #eee;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const StoryAuthorContainer = styled.div`
  flex: 100%;
  display: flex;
  flex-wrap: no-wrap;
  width: 100%;
  margin: 10px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const StoryImg = styled.img`
  width: 100%;
  margin: 10px auto;
  box-shadow: -1px -1px 3px 0px #eee;
`;

export const StoryAuthorImg = styled.img`
  width: 15%;
`;

export const StoryAuthorName = styled.p`
  flex: 100%;
  width: 85%;
  font-size: 1.2rem;
`;

export const StoryTimeAgo = styled(StoryAuthorName)`
  color: #ccc;
  font-size: 1rem;
`;

export const StoryPopUpContainer = styled.div`
  width: 50%;
  height:80%;
  background-color: #fefefe;
  margin: 20px auto;
  padding: 20px;
  position: relative;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

`;

export const StoryTime = styled.p`
  font-family: 'Beth Ellen';
  font-size: 3rem;
  color: #aaa;
  transform: rotate(352deg);
  text-align: end;
  position: absolute;
  bottom: -50px;
`;

export const StoryPhotoContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
  margin: 0px 15px;
  position: relative;
  
`;

export const StoryPhotoStatusBar = styled.div`
  animation: ${storyStatus} 5s linear 0s infinite;
  border-top: 5px solid white;
  width:100%;
  background-color: #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top:-6px;
  left:0;
  z-index: 1;
`;

export const StoryCloseButton = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  color: white;
  right: 20px;
  top: 20px;
  cursor: pointer;
  :hover :active :focus{
    opacity: 0.5;
  }
`;

export const StoryArrowButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: #BDC0BA 2px solid;
  background-color: white;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
  cursor: pointer;
  opacity: 0.2;
  position: absolute;
  top: 50%;
  right: -70px;
  :hover, :active, :focus{
    opacity: 1;
  }

`;
