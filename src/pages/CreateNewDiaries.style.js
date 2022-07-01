import styled from 'styled-components';
import backgroundImage from '../img/quill.png';

export const CreateDiaryBody = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(${backgroundImage});
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
  font-size: 1.3rem;
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
  right: 20px;
  bottom: 30px;
`;
