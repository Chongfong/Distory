import styled from 'styled-components';

export const SignUpBody = styled.div`
  width: 320px;
  margin: 50px auto 100px;
`;

export const SignUpContainer = styled.div`
  width: 100%
`;

export const SignUpTitle = styled.p`
  font-size: 2.5rem;
  letter-spacing: 2px;
  margin: 0px;
`;

export const SignUpSubTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px auto 20px;
`;

export const SignUpName = styled(SignUpSubTitle)`
  font-weight: normal;
  margin: 10px auto 10px;
`;

export const SignUpIconsContainer = styled.div`
  weight:100%;
  display:flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

export const SignUpIcons = styled.img`
  weight: 50px;
  height: 50px;
  margin: 10px 20px 0px 20px;
`;

export const SignUpIconsStory = styled.div`
  weight: 50px;
  height: 50px;
  margin: 5px 20px 25px 20px;
  font-size: 55px;
`;

export const SignUpInfoTitle = styled.p`
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8b8b8;
  margin: 10px;
`;

export const SignUpInfoDetail = styled(SignUpInfoTitle)`
  font-size: 1rem;
  font-weight: normal;
`;

export const SignUpInfoWelcome = styled(SignUpInfoDetail)`
  text-align: center;
  color: #d3b092;
`;

export const LoginInfoDetail = styled(SignUpInfoDetail)`
  cursor: pointer;
  color: rgb(181, 124, 74)
`;

export const SignUpInput = styled.input`
  margin: 10px auto 10px;
  padding-left: 10px;
  width: 300px;
  height: 2.5rem;
  border: #ccc 1px solid;
  border-radius: 10px;
`;

export const SignUpFlowIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
`;

export const SignUpFinishIcons = styled.button`
  width: 300px;
  height: 40px;
  border-radius: 15px;
  background-color: white;
  border: 2px solid #d3b092;
  line-height:40px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #d3b092;
  cursor: pointer;
  margin: 10px;
  :hover, :active, :focus{
    background-color: #d3b092;
    color: white; 
  }
`;

export const SignUpDefaultImg = styled.img`
  width: 100px;
  height: 100px
`;
