import styled from 'styled-components';

export const EditBlogTitle = styled.div`
  margin: 10px 0px;
  font-size: 1.25rem;
`;

export const EditBlogLayout = styled.img`
  max-width: 85%;
  max-height: 85%;
  cursor: pointer;
  margin: 5px 7px 7px 0px;
  box-shadow: ${({ isToggled }) => (isToggled ? '0 0 0 5px #ccc' : 'none')};
  :hover {
    box-shadow: 0 0 0 5px #ccc
  }
`;

export const EditBlogFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
`;

export const BlogBackgroundImage = styled.img`
  width: 100%;
  height: 70%;
  max-height: 400px;
  border-radius: 25px;
`;

export const BlogUserImageDiv = styled.div`
    margin: 0px auto;
    text-align: center;
    width: 200px;
    cursor: pointer;
    :hover {
    opacity: 0.5;
    ::after{
    content:'更換';
    position:absolute;
    top: 50%;
    left: 47%;
    font-size: 1.25rem;
  }
  }
`;

export const BlogBackgroundImageLabel = styled.label`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  :hover {
    opacity: 0.5;
    ::after{
    content:'點擊更換圖片';
    position:absolute;
    margin: 0px auto;
    top: 50%;
    font-size: 1.5rem;
  }
  }
`;
