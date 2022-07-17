import styled from 'styled-components/macro';

export const StoryOuterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: flex-start;
  text-align: left;
  padding: 50px 50px 100px 50px;
  width: 100%;
  height: 450px;
  position: relative;
`;

export const StoryInnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  gap: 0px 20px;
  @media (max-width: 912px) {
   gap: 0px 10px; 
  }
`;

export const StoryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0px;
  max-width: calc( (100% - 80px) / 5);
  height: auto;
  position: relative;

  @media (max-width: 912px) {
    max-width: calc( (100% - 20px) / 3);
}
`;

export const StoryImgContainer = styled.div`
  margin: 10px 0px;
  flex: 100%;
  height: auto;
  background-image: ${({ storyImgUrl }) => (storyImgUrl
    ? `url(${storyImgUrl})`
    : 'url(https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/stories%2F1657118554323?alt=media&token=fc942aeb-82d1-433d-9ed5-e1da398af0b8)')};
  background-size: cover;
  background-position: center,center;
  width:500px;
  border: 1px solid #eee;
  cursor: pointer;
  border-radius: 25px;
  position: relative;
  opacity: 1;
  transition: opacity 1s ease-in;
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
  position:absolute;
  left: 15px;
  top: 15px;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const StoryImg = styled.img`
  width: 100%;
  max-width: 500px;
  max-height: 450px;
  margin: 10px auto;
  box-shadow: -3px -3px 3px 3px #eee;
`;

export const StoryAuthorImg = styled.img`
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  border: 3px solid #ccc
`;

export const StoryAuthorName = styled.p`
  flex: 100%;
  width: 85%;
  font-size: 1.2rem;
  text-shadow:0px 0px 4px #fff;
`;

export const StoryTimeAgo = styled(StoryAuthorName)`
  color: #ccc;
  font-size: 1rem;
`;

export const StoryPopUpContainer = styled.div`
  max-width: 530px;
  height:80%;
  background-color: #fefefe;
  margin: 20px auto;
  padding: 20px;
  position: relative;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 7px;


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
  border-top: 5px solid white;
  width: ${(props) => `${props.loadingPercent * 20}%`};
  background-color: #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top:-6px;
  left:0;
  z-index: 1;
  transition: width 1s linear;
`;

export const StoryCloseButton = styled.div`
  width: 40px;
  height: 40px;
  font-size: 40px;
  position: absolute;
  color: white;
  right: 20px;
  top: 15px;
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
  @media (max-width: 912px) {
    top: 20%;
}

`;
