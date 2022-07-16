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
  z-index:1;
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
  border: 2px solid #d3b092;
  border-radius:25px;
  background-color:rgba(255,255,255,0.8) ;
  width: 150px;
  padding: 0px 40px 0px 10px;
  height: 30px;
  :active, :focus{
    border: 2px solid rgb(181, 124, 74);
    outline: none;
  }
`;

export const HeaderSearchIconContainer = styled.div`
  position: absolute; 
  right: 10px; 
  bottom: 0px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const HeaderUserContainer = styled.div`
  width: 200px;
  min-width: auto;
  height: auto;
  background-color: rgba(255,255,255,0.8);
  position: relative;
  right: 150px;
  padding: 10px 0px;
  border-radius: 15px;
`;

export const HeaderLogin = styled.div`
  width: 100px;
  height:30px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid #d3b092;
  line-height:30px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #d3b092;
  cursor: pointer;
  margin: 20px 10px;
  text-align: center;
  outline: none;
  :hover, :active, :focus{
    background-color: #d3b092;
    color: white; 
  }
`;

export const HeaderSignup = styled.div`
  width: 100px;
  height:30px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid #d3b092;
  line-height:30px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #d3b092;
  cursor: pointer;
  margin: 20px 10px;
  text-align: center;
  outline: none;
  :hover, :active, :focus{
    background-color: #d3b092;
    color: white; 
  }

`;

export const HeaderMember = styled.div`
  width: 60px;
  height:60px;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  z-index:1;
  ::after{
    content:"▼";
    color: #b57c4a;
    position: absolute;
    top: 12px;
    right: 0;
    font-size: 0.8rem;
  }
  :hover, :active, :focus{
    opacity: 0.8;
  }
`;

export const HeaderMore = styled.div`
  color: white;
  ::after{
    content:"∨"
  }
  
`;

export const HeaderLoginOptions = styled.div`
  width: auto;
  position: relative;
  color: #b57c4a;
  padding: 8px 20px 8px 20px;
  border-radius: 8px;
  font-size: 24px;
  line-height: 24px;
  :hover, :active, :focus{
    background-color: rgba(181, 124, 74, 0.8);
    color: white;
  }
`;

export const HeaderOptionsExplain = styled.div`
  width: 50px;
  font-size: 12px;
  height: 20px;
  background-color: white;
  border: #ccc solid 1px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  padding: 0px 3px;
  right: 0px;
  bottom: -10px;
  color: black;
  display: ${({ isHovered }) => (isHovered ? 'block' : 'none')};
`;
