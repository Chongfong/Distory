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
