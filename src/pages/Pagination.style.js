import styled from 'styled-components';

export const DiaryContainerFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 90%;
  height: 150px;
  margin: 25px auto;
  align-items: flex-start;
  position: relative;
  justify-content: ${({ blogContentOrder }) => (blogContentOrder ? '' : 'space-between')};
  flex-direction: ${({ blogContentOrder }) => (blogContentOrder ? 'row' : 'row-reverse')};
`;

export const DiaryImageDefault = styled.img`
  width: 150px;
  height: 150px;
  background-color: #ffead7;
  border: 1px solid #ccc;
  margin-right: 20px;
  cursor:pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const DiaryContentFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 70%;
  cursor:pointer;
  :hover, :active, :focus{
    opacity: 0.5;
  }
  @media (max-width: 912px) {
    max-width: 65%;
}
`;

export const DiaryLikes = styled.p`
  position:absolute;
  bottom: -15px;
  left: ${({ blogContentOrder }) => (blogContentOrder ? '170px' : '10px')};
`;

export const DiaryTitle = styled.p`
  flex: 100%;
  font-size: 1.75rem;
  font-weight: bold;
  text-align: left;
  margin:8px 0px;
`;

export const DiaryContent = styled.p`
  flex: 100%;
  font-size: 1.25rem;
  text-align: left;
  margin:8px 0px;
  overflow:hidden;
  text-overflow: ellipsis;
`;

export const DiaryPageContainer = styled.div`
  text-align: right;
  padding-right: 40px;
`;

export const DiaryPage = styled.div`
  width:15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  display: inline-block;
  transform: scale(1.2,1);
  font-size: 1rem;
  margin: 5px;
  cursor: pointer;
  :hover, :active, :focus{
    border-bottom: 3px solid #ccc;
    color: #ccc;
  }
`;
