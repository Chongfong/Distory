import styled from 'styled-components';

export const CommentDivContainer = styled.div`
  display:flex;
  align-items: flex-start;
  width: 90%;
  margin-top: 15px;
`;

export const CommentInputDivContainer = styled(CommentDivContainer)`
  flex-wrap: wrap;
  width: 100%;
`;

export const CommentDetailDiv = styled.div`
  display:flex;
  align-items: flex-start;
  width: 100%;
`;

export const CommentDetailInputDiv = styled(CommentDetailDiv)`
  align-items: flex-end;
  position: relative;
`;

export const CommentNickName = styled.p`
  text-align: left;
  font-size: 1.2rem;
  margin: 3px 3px 3px 10px;
  color: #b8b8b8;
  max-width: 85px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommentNickNameLogin = styled(CommentNickName)`
  flex-basis: 88%;
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
  margin: 3px 3px 3px 10px;
`;

export const CommentDetail = styled.p`
  padding-left: 5px;
  margin: 3px;
  max-width: calc(100% - 98px);
  word-wrap: break-word;
  text-align: left;
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

export const CommentAuthorImgContainer = styled.div`
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const CommentSubTitle = styled.p`
  padding: 0px 10px 0px;
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: #d3b092;
  text-align: left;
  width: 90%;
  margin-bottom: 40px;
`;

export const CommentAuthorImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding-top: 5px;
`;

export const CommentLoginAuthorImg = styled.img`
  max-width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-basis: 10%;

`;

export const CommentCircleButton = styled.button`
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
  color: #7f0019;
  position: absolute;
  bottom: 15px;
  right: 15px;
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
