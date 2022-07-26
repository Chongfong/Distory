import styled from 'styled-components/macro';

export const SetArticleContainer = styled.div`
  flex: 100%;
  display: flex;
  flex-wrap: no-wrap;
`;

export const SetArticleCreateDiaryTitle = styled.input`
  flex: 70%;
  margin: 10px auto 10px;
  padding-left: 10px;
  width: 100%;
  height: 2.5rem;
  border: #ccc 1px solid;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.5);
`;

export const SetArticlePasswordTitle = styled.p`
  flex: 30%;
  @media (max-width: 912px) {
    flex: auto;
    margin: 1rem 20px 1rem 0;
    width: 75px;
  }
`;

export const SetArticleShowImageDiv = styled.div`
  cursor: pointer;
  position: relative;
  flex: 70%;
  :hover {
    opacity: 0.5;
    ::after{
    content:'更換';
    position:absolute;
    top: 40%;
    left: 20%;
    font-size: 1.5rem;
    }
}
  @media (max-width: 912px) {
  flex: 70%;
  :hover {
    ::after{
    left: 20%;
    }
}}
`;

export const SetArticleShowImageLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  @media (max-width: 912px) {
  align-items: baseline;
}
`;

export const SetArticleShowImgPhoto = styled.img`
    width: 100%;
    max-width: 200px;
    max-height: 180px;
    @media (max-width: 450px) {
    width: 145px;
  }
`;

export const SetArticleShowImgContainer = styled.div`
  flex: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SetArticleShowImgInput = styled.input`
  display: none;
`;

export const SetArticleButtonCancel = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 25px;
  line-height: 40px;
  border: #ccc 1px solid;
  background-color: white;
  position: absolute;
  color: #ccc;
  bottom: 10px;
  left: 0px;
`;

export const SetArticleButtonPencil = styled(SetArticleButtonCancel)`
  font-size: 25px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  transform: scaleX(-1);
`;
