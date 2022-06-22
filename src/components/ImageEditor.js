import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, {
  useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import myTheme from './imageEditorTheme';

export default function PhotoEditor({
  setImageUrl, diaryContentValue, setDiaryContentValue,
  outputImage, imageUrl, openImageEditor,
}) {
  const editorRef = useRef();
  const imageRef = useRef();

  imageRef.current = '';

  const logImageContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();
    setImageUrl(dataURL);
    setDiaryContentValue(`${diaryContentValue} <img src="${dataURL}">`);
  };

  useEffect(() => {
    imageRef.current = outputImage;
  }, [outputImage]);

  return (
    <>
      {openImageEditor === true
        ? (
          <>
            <ImageEditor
              ref={editorRef}
              includeUI={{
                loadImage: {
                  path: imageUrl,
                  name: 'SampleImage',
                },
                // locale: {
                //   DeleteAll: '全部刪除',
                //   Delete: '刪除',
                //   Text: '文字',
                //   Shape: '形狀',
                //   Load: '讀取檔案',
                //   Download: '下載檔案',
                //   Crop: '裁切',
                //   Undo: '上一步',
                //   Redo: '下一步',
                //   'Text size': '字體大小',
                //   Color: '顏色',
                //   Cancel: '取消',
                //   Rectangle: '矩形',
                //   Triangle: '三角形',
                //   Circle: '圓形',
                // },
                theme: myTheme,
                menu: [
                  'crop',
                  'flip',
                  'rotate',
                  'draw',
                  'shape',
                  'icon',
                  'text',
                  'mask',
                  'filter',
                ],
                initMenu: 'filter',
                uiSize: {
                  width: '1000px',
                  height: '700px',
                },
                menuBarPosition: 'bottom',
                cssMaxWidth: 700,
                cssMaxHeight: 500,
                selectionStyle: {
                  cornerSize: 20,
                  rotatingPointOffset: 70,
                },
                usageStatistics: false,
              }}
            />
            <button type="button" onClick={logImageContent}>完成編輯</button>

          </>
        )
        : (
          <ImageEditor
            ref={editorRef}
            style={{ display: 'none' }}
          />
        ) }
      <button type="button">Click</button>
    </>
  );
}

PhotoEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setImageUrl: PropTypes.func,
  setDiaryContentValue: PropTypes.func,
  outputImage: PropTypes.string,
  imageUrl: PropTypes.string,
  openImageEditor: PropTypes.bool,
};

PhotoEditor.defaultProps = {
  diaryContentValue: '',
  setImageUrl: () => {},
  setDiaryContentValue: () => {},
  outputImage: '',
  imageUrl: '',
  openImageEditor: false,
};
