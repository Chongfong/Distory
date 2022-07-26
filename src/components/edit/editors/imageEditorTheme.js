import styled from 'styled-components/macro';

export const myTheme = {

  'common.bisize.width': '0',
  'common.bisize.height': '0',
  'common.backgroundColor': '#FCFAF2',

  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  'loadButton.display': 'none',
  'downloadButton.display': 'none',

};

export const ImageEditorStickerButton = styled.img`
  width: 25px;
  height: 22px;
  display: ${({ isOpenSticker }) => (isOpenSticker ? 'none' : 'block')};
  filter: brightness(0) invert(1);
  opacity: 0.4;
  margin: 0 auto;
  cursor: pointer;
`;

export const ImageEditorSticker = styled.img`
  margin: 5px 10px;
`;

export const ImageEditorStickerContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #FCFAF2;
  display: ${({ isOpenSticker }) => (isOpenSticker ? 'block' : 'none')};

`;

export const ImageEditorStickerOpenContainer = styled.div`
  width: 100%;
  height: 40px;
  margin: 0px auto;
  background-color: #151515;
  
`;

export const ImageEditorDefaultImageContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
`;

export const ImageEditorDefaultImageInnerImageContainer = styled.div`
  flex: 0 1 30%;
  margin: 5px;
  cursor: pointer;
  outline: ${({ selected }) => (selected ? '2px solid #ccc' : 'none')};
  @media (max-width: 650px) {
    flex: 80%;
}
 :hover{
  outline: 2px solid #ccc;
 }
`;

export const ImageEditorDefaultImageInnerImage = styled.img`
  width: 100%;
`;

export const ImageEditorSubmitButtonsForm = styled.form`
    position: absolute;
    right: 25px;
    bottom: 16px;
    z-index: 3;
`;
