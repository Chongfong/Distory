import styled from 'styled-components';

export const EditBlogTitle = styled.span`
  margin: 10px 0px;
  font-size: 1.25rem;
`;

export const EditBlogTitleDetail = styled(EditBlogTitle)`
  font-size: 0.8rem;
  color: #bbb;
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

export const EditBlogBasicContainer = styled.div`
  flex: 1;
`;

export const EditBlogBasicContainerProfileImg = styled(EditBlogBasicContainer)`
  position: relative;
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
  cursor: pointer;
    :hover {
    opacity: 0.5;
    }
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

export const BlogEditInnerContainer = styled.div`
  display: flex;
  @media (max-width: 912px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

export const BlogEditPencil = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 25px;
  line-height: 40px;
  border: #ccc 1px solid;
  background-color: white;
  position: absolute;
  color: #ccc;
  bottom: 10px;
  right: 20px;
  transform: scaleX(-1);
`;

export const BlogEditCircleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 25px;
  bottom: 10px;
  right: 20px;
  line-height: 40px;
  cursor: pointer;
  border: #7f0019 2px solid;
  background-color: white;
  position: absolute;
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

export const EditBlogProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const EditBlogInsideBody = styled.div`
  width: 70%;
  height: 70%;
  position: relative;
  margin: 0 auto;
  text-align: left;
  padding: 0px 10px 50px 10px;
`;

export const EditBlogNavTitle = styled.div`
  font-size: 1.5rem;
  padding: 40px 0px 10px 0px;
  text-align: left;
`;

export const EditBlogInputTitle = styled.input`
  margin: 10px auto 10px;
  padding-left: 10px;
  width: 100%;
  height: 2.5rem;
  border: #ccc 1px solid;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.5);
`;

export const EditBlogInputProfileImg = styled(EditBlogTitle)`
  margin: 10px 60px;
`;

export const EditBlogPublish = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: #7f0019 2px solid;
  background-color: white;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 50px;
  position: fixed;
  right: 80px;
  bottom: 70px;
  cursor: pointer;
  color: #7f0019;
  :hover{
    background-color: #7f0019;
    color: #7f0019;
    ::after{
      color: white;
      content:'完成';
      font-weight: normal;
      position: absolute;
      top: -2px;
      left: 8px;
      font-size:18px;
    }
  }
  
  @media (max-width: 912px) {
  width: 35px;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
  right: 40px;
  bottom: 45px;
  :hover{
    ::after{
      top: 0px;
      left: 5px;
      font-size: 12px;
    }
  }
}

`;
