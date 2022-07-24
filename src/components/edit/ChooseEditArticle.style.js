import styled from 'styled-components/macro';

export const ChooseEditOuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: calc( 90vh - 200px);
  align-content: flex-start;
`;

export const ChooseEditTitleContainer = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-basis: 100%;
`;

export const ChooseEditTitleDate = styled.p`
  flex-basis: auto;
`;

export const ChooseEditTitle = styled.p`
  flex-basis: 80%;
`;

export const ChooseEditEachDiaryRow = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-basis: 100%;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  margin: 5px;
  :hover, :active, :focus{
    opacity: 0.5;
  }
`;

export const ChooseEditTime = styled.p`
  flex-basis: 10%;
`;

export const ChooseEditDiaryTitle = styled.p`
  flex-basis: 80%;
  text-align: left;
  padding: 0px 20px;
`;

export const ChooseEditDiaryPencilContainer = styled.div`
  flex-basis: 5%;
`;

export const ChooseEditEditImage = styled.img`
  width: 25px;
  height: 25px;
`;
