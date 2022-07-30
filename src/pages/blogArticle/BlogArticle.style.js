import styled from 'styled-components';

export const BlogArticleTitle = styled.h1`
  text-align: left;
`;

export const BlogArticleDate = styled.p`
  text-align: left;
  transform: scale(1,1.1);
  color: #b8b8b8;
  font-size: 1.1rem;
  margin: 10px 5px !important;
`;

export const BlogAtricleDetailContainer = styled.div`
  text-align: left;
  margin: 20px 10px;
`;

export const BlogArticleLikesContainer = styled.div`
  text-align: left;
  cursor: pointer;
  margin-left: 5px;
  margin-bottom: 30px;
`;

export const BlogArticleEditImageContainer = styled.div`
  position: absolute;
  right: 60px;
  top: 10px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.3;
  }
`;

export const BlogArticleDeleteImageContainer = styled(BlogArticleEditImageContainer)`
  right: 10px;
  top: 8px;
`;

export const BlogArticleEditImage = styled.img`
  width: 25px;
  height: 25px;
`;

export const BlogArticleInteractiveContainer = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
`;

export const BlogArticleInteractiveButtonContainer = styled.div`
  flex-basis: 20%;
`;

export const InteractiveImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity:0.5;
  }
`;

export const NonInteractiveImage = styled(InteractiveImage)`
  cursor: not-allowed;
  :hover, :active, :focus{
    opacity:1;
  }
`;

export const BlogArticleInputPassword = styled.input`
  border-radius: 7px;
  border: 1px solid #ccc;
  height: 1.5rem;
  padding: 3px 5px;
`;

export const BlogArticleCircleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 20px 10px 5px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  cursor: pointer;
  border: #7f0019 2px solid;
  background-color: white;
  position: relative;
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

export const BlogArticleBottomLine = styled.div`
  width: 100%;
  border-bottom: 1px #d3b092 solid;
  margin: 20px auto;
  @media (max-width: 912px) {
    width: 100%;
}
`;

export const BlogArticleDeleteContainer = styled.div`
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background-color: rgba(255,255,255,0.95);
    top: 50%;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    border: #d3b092 solid 5px;
    flex: 1;
    flex-wrap: wrap;
    align-content: center;
    z-index: 99;
`;

export const BlogArticleDeleteWord = styled.p`
    flex: 100%;
    font-size: 1.5rem;
`;

export const BlogArticleDeleteButtonContainer = styled.p`
    flex: 100%;
`;

export const BlogArticleDeleteButton = styled.button`
  padding: 5px;
  margin: 10px;
  background-color: white;
  border: 2px solid #d3b092;
  border-radius: 10%;
  font-size: 1.25rem;
  color: #d3b092;
  cursor: pointer;
  :hover{
    color: white;
    background-color: #d3b092;
  }
`;
