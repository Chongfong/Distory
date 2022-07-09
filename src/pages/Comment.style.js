import styled from 'styled-components';

export const CommentDivContainer = styled.div`
  display:flex;
  align-items: center;
  width: 90%;
  margin-top: 15px;
`;

export const CommentDetailDiv = styled.div`
  display:flex;
  align-items: flex-start;
  width: 100%;
`;

export const CommentNickName = styled.p`
  text-align: left;
  font-size: 1rem;
  margin: 3px 3px 3px 10px;
  color: #b8b8b8;
`;

export const CommentNickNameInput = styled.input`
  border: none;
  border-bottom: 1px solid #b8b8b8;
  margin: 3px 3px 3px 10px;
  padding-left: 5px;
  :active, :focus{
    outline: none;
    border-bottom: 3px solid #b8b8b8;
  }

`;

export const CommentTime = styled.p`
  text-align: left;
  transform: scale(1,1.1);
  color: #b8b8b8;
  font-size: 1rem;
  margin: 5px;
`;

export const CommentDetail = styled.p`
  margin: 3px;
`;

export const CommentsContainer = styled.div`
  margin:40px 0px 80px;
`;

export const CommentInput = styled.textarea`
  border-radius: 25px;
  border: solid 2px #ccc;
  flex-basis: 95%;
  min-height: 80px;
  max-height: 200px;
  margin: 10px;
  padding-left: 12px;
  padding-top: 12px;
`;

export const CommentButton = styled.div`
  width: 50px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid #b8b8b8;
  line-height:40px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: #b8b8b8;
  cursor: pointer;
  :hover, :active, :focus{
    background-color: #b8b8b8;
    color: white; 
  }
`;
