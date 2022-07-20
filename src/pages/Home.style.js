import styled from 'styled-components/macro';

export const HomeBody = styled.div`
  width: 70%;
  height:70%;
  margin: 0px auto 150px;

  @media (max-width: 912px) {
    width: 100%;
}
`;

export const DiaryOutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height:100%;
`;

export const DiaryAllContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const DiarySmallContainer = styled.div`
  flex: 0 1 40%;
  display: flex;
  flex-wrap: wrap;
  margin: 9px;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #BEB3B4;
  @media (max-width: 912px) {
    flex: 0 1 100%;

}
`;

export const DiaryContainer = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 50px 50px 100px;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  :hover, :active, :focus{
    opacity: 0.7
  }
`;

export const DiaryImageBox = styled.div`
  flex: 0 1 48%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  max-height: 300px;
  outline: 3px solid white;
  outline-offset: -10px;
  vertical-align: middle;
  border-radius: 5px;
  :hover, :active, :focus{
    opacity: 0.7
  }
  @media (max-width: 1482px) {
      outline: none;
}
@media (max-width: 912px) {
    flex: 0 1 100%;
}
`;

export const DiaryInfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 50%;
  text-align: center;
  align-items: flex-start;
`;

export const DiaryIngoBoxFisrt = styled(DiaryInfoBox)`
  @media (max-width: 912px) {
    flex: 100%;
    margin-top: 30px;
}
`;

export const DiaryImageBoxNormal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 240px;
  height: 180px;
  flex: 1;
  :hover, :active, :focus{
    opacity: 0.7
  }
`;

export const DiaryProfileImageBoxNormal = styled.div`
  flex: 100%;
  align-self: flex-end;
  text-align: right;
`;

export const DiaryTitleInsideBox = styled.div`
  flex: 100%;
  display:flex;
  flex-wrap: wrap;
  text-align: left;
  padding-left: 10px;
  :hover, :active, :focus{
    opacity: 0.7
  }
`;

export const DiaryImageInsideBox = styled.div`
  flex: 100%;
`;

export const DiaryTitle = styled.p`
  color: #72677E;
  font-size: 1.3em;
  margin-bottom: 1.5%;
  font-weight: bold;
  line-height: 140%;
  flex: 100%;
  padding: 5px 0 !important;
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; 
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const DiaryTitleFirst = styled(DiaryTitle)`
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  padding: 5px 0 !important;
  
`;

export const DiaryContent = styled.p`
  font-size: 1.3rem;
  line-height: 160%;
  text-align: left;
  padding: 20px 0 !important;
  overflow:hidden;
  text-overflow: ellipsis;
`;

export const DiaryPublishTime = styled.p`
  flex: 100%;
  font-size: 1.2rem;
  padding: 5px 0 !important;
`;

export const DiaryProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;  
  :hover, :active, :focus{
    opacity: 0.7
  }
`;

export const HomeImageFirst = styled.img`
    flex-shrink: 1;
    max-width: 100%;
    max-height: 75%;
    @media (max-width: 1482px) {
      outline: 3px solid white;
      outline-offset: -10px;
      vertical-align: middle;
}
@media (max-width: 912px) {
  outline: none;
}
`;

export const HomeImageNormal = styled.img`
    flex-shrink: 1;
    min-width: 100%;
    min-height: 100%;
    transition: transform 3s;
    :hover{
  transform: scale(1.2)
  }
`;

export const HomeInviteDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #b8b8b8;
  margin-bottom: 120px;
`;

export const HomeInviteTitle = styled.p`
  flex: 100%;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 80px !important; 
  @media (max-width: 912px) {
    font-size: 2rem;
}
`;

export const HomeInviteButtonContainer = styled.div`
  flex: 100%;
  justify-content: center;
  @media (max-width: 912px) {
    flex-wrap: wrap;
}
`;

export const HomeInviteButton = styled.button`
  width: 40%;
  max-width: 250px;
  height: 40px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid #d3b092;
  line-height: 1rem;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #d3b092;
  cursor: pointer;
  margin: 30px 10px 50px 10px;
  :hover, :active, :focus{
    background-color: #d3b092;
    color: white; 
  }
`;

export const HomeAuthorImage = styled.img`

  width: 100px;
  height:100px;
  border-radius: 50%;
    @media (max-width: 912px) {
      width: 50px;
      height:50px;
}
`;

export const HomeWelcomeWords = styled.p`
  font-size: 60px;
  font-weight: bold;
  letter-spacing: 3px;
  top: 50px;
  font-family: 'Beth Ellen';
  color:#72677E;
  line-height: 100px;
  position: relative;
  @media (max-width: 997px) {
    font-size: 50px;
}
@media (max-width: 657px) {
    font-size: 40px;
}
@media (max-width: 526px) {
    font-size: 25px;
}
`;

export const SearchTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 100px;
`;

export const HomeProfileSubTitle = styled.p`
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: #d3b092;
  text-align: left;
  width: 90%;
  margin: 0px auto !important;
`;

export const HomeIntroContainer = styled(HomeInviteDiv)`
  height: 700px;
  justify-content: center;
  @media (max-width: 912px) {
    height: auto;
}
`;

export const HomeIntroWord = styled.p`
  margin: 30px !important;
  font-size: 1.3rem;
`;

export const HomeIntroImgContainer = styled.div`
  max-width: 30%;
  margin: 0px 10px;

  @media (max-width: 912px) {
    max-width: 51%;
    margin: 20px auto;
}
`;

export const HomeIntroImg = styled.img`
  width: 100%;
`;

export const HomeIntroTitle = styled.p`
  font-size: 1.7rem;
  font-weight: bold;
`;

export const HomeIntroDetail = styled.p`
  font-size: 1.2rem;
  margin: 10px auto !important;
`;
