import styled from 'styled-components';

export const PopUpBackDiv = styled.div`
  position: fixed;
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
`;

export const PopUpContainerDiv = styled.div`
  width: 85%;
  height:85%;
  background-color: #fefefe;
  margin: 20px auto;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  
`;

export const PopUpImageContainerDiv = styled(PopUpContainerDiv)`
  width: 35%;
  height: 50%;
  @media (max-width: 912px) {
    width: 70%;
    height: 80%;
}
`;

export const CircleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  background-color: white;
  border: solid 1px #ccc;
  cursor: pointer;
`;
