import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import LoadFromUrl from './LoadFromURL';
import myTheme from './imageEditorTheme';

export default function PhotoEditor({ setImageUrl, diaryContentValue, setDiaryContentValue }) {
  const editorRef = useRef();

  const loadFromUrl = (url) => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.loadImageFromURL(url, 'image');
  };

  const logImageContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();
    setImageUrl(dataURL);
    setDiaryContentValue(`${diaryContentValue} <img src="${dataURL}">`);
  };

  return (
    <>
      <LoadFromUrl onUrlLoadClick={(url) => loadFromUrl(url)} />
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: 'https://i1.wp.com/www.sozailab.jp/db_img/sozai/49644/5d3e6234c3eab5203aad1df111f90f5d.png',
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
      <button type="button" onClick={logImageContent}>Get URL </button>
    </>
  );
}

PhotoEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setImageUrl: PropTypes.func,
  setDiaryContentValue: PropTypes.func,
};

PhotoEditor.defaultProps = {
  diaryContentValue: '',
  setImageUrl: () => {},
  setDiaryContentValue: () => {},
};
