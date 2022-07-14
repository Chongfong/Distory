import styled from 'styled-components';

export const CreateDiaryBody = styled.div`
  width: 100%;
  height: calc( 100vh + 200px );
  position: relative;
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: bottom 20px right 40px;
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
`;

export const CreateDiaryPublish = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: #BDC0BA 2px solid;
  background-color: white;
  text-align: center;
  font-size: 25px;
  line-height: 50px;
  position: fixed;
  right: 80px;
  bottom: 70px;
  cursor: pointer;
  :hover, :active, :focus{
    background-color: #d3b092;
    color: white;
  }
`;

export const CreateDiaryColored = styled(CreateDiaryPublish)`
  background-color: #d3b092;
  color: white;
  :hover, :active, :focus{
    background-color: #b57c4a;
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
`;

export const CreateDiaryNavButton = styled.div`
  width: 50%;
  font-size: 1.5rem;
  text-align: center;
  border-bottom: ${({ selected }) => (selected ? '4px solid #ccc' : '2px solid #ccc')};
  cursor: pointer;
  :hover, :focus, :active {
    border-bottom: 4px solid #ccc;
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
  :hover {
    opacity: 0.5;
    ::after{
    content:'更換';
    position:absolute;
    top: 40%;
    left: 40%;
    font-size: 1.5rem;
  }
  }
`;
