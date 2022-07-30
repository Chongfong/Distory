import styled from 'styled-components/macro';

export const HomeInviteButtonContainer = styled.div`
  display: flex;
  flex: 100%;
  justify-content: center;
  @media (max-width: 912px) {
    flex-wrap: wrap;
}
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

export const HomeIntroContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #b8b8b8;
  margin-bottom: 120px;
  justify-content: center;
  @media (max-width: 912px) {
    margin-bottom: 80px;
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
