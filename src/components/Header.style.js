import styled, { keyframes } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: flex-end;
  text-align: left;
  margin-top: 10px;
`;

const bookmark = keyframes`
  0%   {transform: rotate(10deg);}
  70% {transform: rotate(0deg);}
  100% {transform: rotate(10deg);}
`;

export const HeaderTitleContainer = styled.img`
  width: 70px;
  height: 200px;
  position: fixed;
  transform: translateX(-50%);
  margin-top: -15px;
`;

export const HeaderBackgroundImage = styled.img`
  opacity: 0.3;
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`;

export const HeaderTitle = styled.div`
  width: 140px;
  margin-left: 40px;
  cursor: pointer;
  animation: ${bookmark} 10s ease 0s infinite;
  transform-origin: top center; 
  position: fixed;
  :hover, :active, :focus{
    opacity: 0.5;
  }
  @media (max-width: 912px) {
    margin-left: 0px;
}
`;

export const HeaderTitleWords = styled.p`
  font-size: 2.5rem;
  transform: rotate(270deg);
  position: fixed;
  top: 50px;
  color: black;
`;

export const HeaderSearchBar = styled.input`
border: none;
background-color:transparent;
width: 200px;
border-bottom: 1px solid #ccc;
margin: 10px 20px;
`;

export const HeaderLogin = styled.div`
  width: 100px;
  height:40px;
  border-radius: 20px;
  background-color: white;
  border: 2px solid #b8b8b8;
  line-height:40px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #b8b8b8;
  cursor: pointer;
  margin: 10px;
  text-align: center;
  outline: none;
  :hover, :active, :focus{
    background-color: #b8b8b8;
    color: white; 
  }
`;

export const HeaderSignup = styled.div`
  width: 100px;
  height:40px;
  border-radius: 20px;
  background-color: white;
  border: 2px solid #b8b8b8;
  line-height:40px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #b8b8b8;
  cursor: pointer;
  margin: 10px;
  text-align: center;
  outline: none;
  :hover, :active, :focus{
    background-color: #b8b8b8;
    color: white; 
  }

`;

export const HeaderMember = styled.div`
  width: 50px;
  height:50px;
  margin-right: 20px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.8;
  }
`;
