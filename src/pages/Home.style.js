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
`;

export const DiaryAllContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  :hover, :active, :focus{
    opacity: 0.7
  }
  @media (max-width: 912px) {
    flex: 0 1 100%;

}
`;

export const DiaryContainer = styled.div`
  flex: 0 1 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 50px 50px 25px;
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
  width: 400px;
  height: 300px;
  outline: 3px solid white;
  outline-offset: -10px;
  vertical-align: middle;
  border-radius: 5px;
  @media (max-width: 1482px) {
      outline: none;
}
`;

export const DiaryInfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 50%;
  text-align: center;
  align-items: flex-start;
`;

export const DiaryImageBoxNormal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 240px;
  height: 180px;
  flex: 0 1 48%;
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

export const HomeImageFirst = styled.img`
    flex-shrink: 1;
    min-width: 100%;
    min-height: 75%;
    @media (max-width: 1482px) {
      outline: 3px solid white;
      outline-offset: -10px;
      vertical-align: middle;
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
`;

export const HomeInviteTitle = styled.p`
  flex: 100%;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 30px !important; 
  @media (max-width: 912px) {
    font-size: 2rem;
}
`;

export const HomeInviteButtonContainer = styled.div`
  flex: 100%;
`;

export const HomeInviteButton = styled.button`
  width: 40%;
  max-width: 250px;
  height: 40px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid #b8b8b8;
  line-height:40px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #b8b8b8;
  cursor: pointer;
  margin: 30px 10px 50px 10px;
  :hover, :active, :focus{
    background-color: #b8b8b8;
    color: white; 
  }
`;

export const HomeAuthorImage = styled.img`

  width: 100px;
  height:100px;
    @media (max-width: 912px) {
      width: 50px;
      height:50px;
}
`;

export const HomeWelcomeWords = styled.p`
  font-size: 25px;
  font-weight: bold;
  top: 50px;
  line-height: 200px;
`;
