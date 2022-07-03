import styled from 'styled-components';

export const HomeBody = styled.div`
  width: 70%;
  height:70%;
  margin: 0px auto;
`;

export const DiaryOutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-contents: center;
`;

export const DiarySmallContainer = styled.div`
  flex: 0 1 40%;
  display: flex;
  flex-wrap: wrap;
  margin: 9px;
  justify-content: center;
  padding: 20px;
  border-radius: 25px;
  border: 2px solid #ccc;
  cursor: pointer;
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
`;

export const DiaryImageBox = styled.div`
  flex: 0 1 100%;
`;

export const DiaryInfoBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 0 1 100%;
  text-align: left;
  align-items: center;
`;

export const DiaryTitleInsideBox = styled.div`
  flex: 80%;
  display:flex;
  flex-wrap: wrap;
`;

export const DiaryImageInsideBox = styled.div`
  flex: 20%;
`;

export const DiaryTitle = styled.p`
  flex: 100%;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
`;

export const DiaryPublishTime = styled.p`
  flex: 100%;
  font-size: 1rem;
`;

export const HomeImageFirst = styled.img`
  width: 50%;
  height:40%;
  max-width: 350px;
  max-height:280px;
  min-width:200px;
  min-height: 160px;
`;

export const HomeImageNormal = styled.img`
  width: 200px;
  height: 160px;
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
