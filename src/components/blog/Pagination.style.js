import styled from 'styled-components';

export const DiaryContainerFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 90%;
  height: 150px;
  padding: 25px 0;
  margin: 0 auto;
  align-items: flex-start;
  position: relative;
  justify-content: ${({ blogContentOrder }) => (blogContentOrder ? '' : 'space-between')};
  flex-direction: ${({ blogContentOrder }) => (blogContentOrder ? 'row' : 'row-reverse')};
  border-bottom: 1px solid #ccc;
  @media (max-width: 912px) {
    height: 100%;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
}
`;

export const DiaryImageDefault = styled.div`
  width: 150px;
  height: 150px;
  background-color: #ffead7;
  background-image: ${({ diaryImgUrl }) => (diaryImgUrl
    ? `url(${diaryImgUrl})`
    : 'url(https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/yDBwlsE2SWC_ABi4wrdfL.jpg?alt=media&token=da571ffb-fab6-4430-987a-b2fddf303e4b)')};
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
  margin-right: 20px;
  cursor:pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
  @media (max-width: 912px) {
    width: 100%;
    height: 300px;
    flex: 100%;
}
`;

export const DiaryContentFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-right: 30px;
  cursor:pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
  @media (max-width: 912px) {
    width: 70%;
    flex: 100%;
    margin-left: 5px;
}
`;

export const DiaryLikes = styled.p`
  position:absolute;
  bottom: 15px;
  left: ${({ blogContentOrder }) => (blogContentOrder ? '170px' : '10px')};
  @media (max-width: 912px) {
    position: inherit;
}
  
`;

export const DiaryTitle = styled.p`
  flex: 100%;
  font-size: 1.75rem;
  font-weight: bold;
  text-align: left;
  margin:8px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DiaryContent = styled.p`
  flex: 100%;
  font-size: 1.25rem;
  text-align: left;
  margin:8px 0px;
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; 
  -webkit-box-orient: vertical;
`;

export const DiaryPageContainer = styled.div`
  text-align: right;
  padding-right: 40px;
`;

export const DiaryPage = styled.div`
  width:15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  display: inline-block;
  transform: scale(1.2,1);
  font-size: 1rem;
  margin: 20px 5px 5px;
  cursor: pointer;
  :hover, :active, :focus{
    border: 2px solid #d3b092;
    background-color: #d3b092;
    color: white;
    border-radius: 30%;
  }
`;

export const DiaryImgContainer = styled.div`
  @media (max-width: 912px) {
    flex: 100%;
}
`;

export const DiaryContentFlexContainer = styled.div`
  width: calc( 100% - 172px);
    @media (max-width: 912px) {
      flex: 100%;
      display: flex;
      justify-content: space-between;
      max-width:100%; 
}
`;

export const DiaryPassWord = styled.p`
  color: #b8b8b8;
`;

export const DiaryPassWordLeft = styled(DiaryPassWord)`
  text-align: left;
`;
