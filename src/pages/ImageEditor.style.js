import styled from 'styled-components/macro';

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
  width: 85%;
  height: 85%;
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
  cursor: pointer;
  border: #7f0019 2px solid;
  background-color: white;
  position: fixed;
  color: #7f0019;
  :hover{
    background-color: #7f0019;
    color: #7f0019;
    ::after{
      color: white;
      content:'完成';
      position: absolute;
      top: -2px;
      left: 5px;
      font-size: 12px;
    }
  }

`;

export const CircleButtonPlus = styled(CircleButton)`
  top: -4px;
  :hover{
    ::after{
      top: 8px;
      left: 5px;
      }
      }
`;

export const CircleButtonCancel = styled(CircleButton)`
  :hover{
    ::after{
      content:'取消';
      }
      }
`;

export const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  line-height: 20px;
  border: rgb(211, 176, 146) 2px solid;
  background-color: white;
  color: rgb(211, 176, 146);
  :hover{
    background-color: rgb(211, 176, 146);
    color: white;
  }
`;

export const EditButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  border: #ccc 1px solid;
  background-color: white;
  position: fixed;
  color: #ccc;
`;
