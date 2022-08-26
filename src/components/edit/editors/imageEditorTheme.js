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
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.4;
  margin: 0 auto;
  cursor: pointer;
  :hover{
    opacity: 0.7;
  }
`;

export const ImageEditorSticker = styled.img`
  max-width: 50px;
  max-height: 50px;
  margin: 5px 10px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

export const ImageEditorStickerContainer = styled.div`
  position: absolute;
  bottom: 112px;
  left: 0;
  width: 100%;
  height: auto;
  background-color: #FCFAF2;
  display: ${({ isOpenSticker }) => (isOpenSticker ? 'block' : 'none')};
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 0px;
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
  position:relative;
  min-height: 250px;
  @media (max-width: 650px) {
    flex: 80%;
}
 :hover{
  outline: 2px solid #ccc;
 }
`;

export const ImageEditorDefaultImageInnerImage = styled.img`
  width: 100%;
  opacity: ${(props) => (props.imgLoading ? '0' : '1')};
  transition: ${(props) => (props.imgLoading ? 'none' : 'opacity 1.5s;')};
`;

export const ImageEditorSubmitButtonsForm = styled.form`
    position: absolute;
    right: 25px;
    bottom: 16px;
    z-index: 3;
    @media (min-height: 912px) {
    bottom: 30px;
  }
`;
