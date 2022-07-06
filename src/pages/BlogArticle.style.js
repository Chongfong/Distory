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
  right: 10px;
  top: 10px;
  cursor: pointer;
  :hover, :active, :focus{
    opacity: 0.3;
  }
`;

export const BlogArticleEditImage = styled.img`
  width: 25px;
  height: 25px;
`;
