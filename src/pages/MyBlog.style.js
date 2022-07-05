import styled from 'styled-components';

export const MyBlogFLexContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 100px;
  flex-direction: ${({ blogLayoutOrder }) => (blogLayoutOrder ? 'row' : 'row-reverse')};
  @media (max-width: 912px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
}
`;

export const MyBlogFLexLeft = styled.div`
  flex-basis: 25%;
  padding-top: 20px;
  min-width: 140px;
  @media (max-width: 912px) {
    flex-basis: 100%;
    width: 100%;
}
`;

export const MyBlogFLexRight = styled.div`
  flex-basis: 75%;
  padding: 20px 0px 100px 40px ;
  max-width: 70%;
  @media (max-width: 912px) {
    flex-basis: 100%;
    max-width: 90%;
    padding-bottom: 20px;
}
`;

export const MyBlogUserName = styled.p`
  font-size: 1.3rem;
  color: #b8b8b8;
  text-align: center;
`;

export const MyBlogComeHomeUsers = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  @media (max-width: 912px) {
    width: 75px;
    height: 75px;
}
`;

export const MyBlogVisitorContainer = styled.div`
  display: flex;
  width: 70%;
  margin: 10px auto;
  flex-wrap: wrap;
  @media (max-width: 912px) {
    width: 100%;
}
`;

export const MyBlogButton = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 10px;
  background-color: #b8b8b8;
  border: 2px solid #b8b8b8;
  font-size: 1rem;
  letter-spacing: 3px;
  color: white;
  cursor: pointer;
  :hover, :active, :focus{
    background-color: white;
    color: #b8b8b8; 
  }
`;

export const MyBlogButtonLight = styled(MyBlogButton)`
  background-color: white;
  color: #b8b8b8;
  margin: 8px 0px;
  :hover, :active, :focus{
    background-color: #b8b8b8;
    color: white; 
  }
`;

export const MyBlogBottomLine = styled.div`
  width: 80%;
  border-bottom: 1px #b8b8b8 solid;
  margin: 20px auto;
  @media (max-width: 912px) {
    width: 100%;
}
`;

export const MyBlogVisitorDiv = styled.div`
  width: 30%;
`;

export const MyBlogProfileSubTitle = styled.p`
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: #b8b8b8;
  text-align: left;
  width: 90%;
  margin: 0px auto;
`;

export const ClickableDiv = styled.div`
  cursor:pointer;
`;
