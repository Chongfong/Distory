import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import myTheme from './imageEditorTheme';

import { storage } from '../firestore/firestore';

export default function PhotoEditor({
  diaryContentValue, setDiaryContentValue,
  imageUrl, setImageUrl, openImageEditor, setOpenImageEditor, setUrl,
}) {
  function uuid() {
    let d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 || 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : ((r && 0x3) || 0x8)).toString(16);
    });
  }

  const editorRef = useRef();
  const imageRef = useRef();
  const testURL = useRef();

  imageRef.current = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();

    const metadata = {
      contentType: 'image/jpeg',
    };

    fetch(dataURL)
      .then((res) => res.blob())
      .then((imageBlob) => {
        testURL.current = imageBlob;

        const file = testURL.current;
        const storageRef = ref(storage, `files/${uuid()}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                break;
              case 'storage/canceled':
                break;
              case 'storage/unknown':
                break;
              default:
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setDiaryContentValue(`${diaryContentValue} <img src="${downloadURL}">`);
              setOpenImageEditor(false);
              setImageUrl();
              setUrl();
            });
          },
        );
      });
  };

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
            <form onSubmit={handleSubmit}>
              <button type="submit">完成編輯</button>
            </form>
          </>
        )
        : (
          <ImageEditor
            ref={editorRef}
            style={{ display: 'none' }}
          />
        ) }
      <button type="button">Delete</button>
    </>
  );
}

PhotoEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setDiaryContentValue: PropTypes.func,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  openImageEditor: PropTypes.bool,
  setOpenImageEditor: PropTypes.func,
  setUrl: PropTypes.func,
};

PhotoEditor.defaultProps = {
  diaryContentValue: '',
  setDiaryContentValue: () => {},
  imageUrl: '',
  setImageUrl: () => {},
  openImageEditor: false,
  setOpenImageEditor: () => {},
  setUrl: () => {},
};
