import styled from 'styled-components';

export const CreateDiaryBody = styled.div`
  width: 100%;
  height: calc( 100% + 200px );
  position: relative;
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: bottom 20px right 40px;
  margin-bottom: 50px;
`;

export const CreateDiaryInsideBody = styled.div`
  width: 70%;
  height: 70%;
  position: relative;
  margin: 0 auto;
`;

export const CreateDiaryNavTitle = styled.div`
  font-size: 1.5rem;
  padding: 40px 0px 10px 10px;
  text-align: left;
`;

export const CreateDiaryTitle = styled.input`
  margin: 10px auto 10px;
  padding-left: 10px;
  width: 100%;
  height: 2.5rem;
  border: #ccc 1px solid;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.5);
`;

export const CreateDiaryPublish = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: #7f0019 2px solid;
  background-color: white;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
  position: fixed;
  right: 80px;
  bottom: 70px;
  cursor: pointer;
  color: #7f0019;
  :hover{
    background-color: #7f0019;
    color: #7f0019;
    ::after{
      color: white;
      content:'完成';
      font-weight: normal;
      position: absolute;
      top: 0px;
      left: 7px;
      font-size:18px;
    }
  }
  
  @media (max-width: 912px) {
  width: 35px;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
  right: 40px;
  bottom: 45px;
  :hover{
    ::after{
      top: 0px;
      left: 5px;
      font-size: 12px;
    }
  }
}

`;

export const CreateDiarySave = styled(CreateDiaryPublish)`
  bottom: 140px;
  :hover{
    ::after{
      content:'儲存';
      
    }
  }
  @media (max-width: 912px) {
  bottom: 100px;
  :hover{
    ::after{
      top: 0px;
      left: 5px;
      font-size: 12px;
    }
  }
}
`;

export const CreateDiaryColored = styled(CreateDiaryPublish)`
  background-color: white;
  color: #7f0019;
  :hover, :active, :focus{
    background-color: #7f0019;
    color: white;
  }
`;

export const CreateDiaryIconImage = styled.img`
  width: 25px;
  height: 25px;
  line-height: 50px;
  color: #ccc
`;

export const CreateDiaryNavBar = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  @media (max-width: 912px) {
      width: 100%;
  }
`;

export const CreateDiaryNavButton = styled.div`
  width: 50%;
  font-size: 1.5rem;
  text-align: center;
  border-bottom: ${({ selected }) => (selected ? '4px solid #ccc' : '2px solid #ccc')};
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0)')};
  border-radius: 15px 15px 0px 0px;
  :hover, :focus, :active {
    border-bottom: 4px solid #ccc;
  }
  @media (max-width: 912px) {
    font-size: 1.2rem;
  }
`;

export const EditDiaryEachDiaryRow = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-basis: 100%;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  margin: 5px;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const EditDiaryShowImageDiv = styled.div`
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

export const EditDiaryShowImageLabel = styled.label`
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

export const SetArticlePasswordTitle = styled.p`
  flex: 30%;
  @media (max-width: 912px) {
    flex: auto;
    margin: 1rem 20px 1rem 0;
    width: 75px;
  }
`;

export const SetArticleSettingsOuterContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 912px) {
    flex-wrap: wrap;
  }
`;

export const SetArticleSettingsContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0px 10px;
  @media (max-width: 912px) {
    flex: 100%;
  }

`;

export const SetArticleShowImgPhoto = styled.img`
    width: 100%;
    max-width: 200px;
    max-height: 150px;
    @media (max-width: 450px) {
    width: 145px;
  }
`;
