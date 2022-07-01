/* eslint-disable max-classes-per-file */
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef } from 'react';
import { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import myTheme from './imageEditorTheme';
import '../css/textEditor.css';
import '../css/imageEditor.css';
import { PopUpBackDiv, PopUpContainerDiv, CircleButton } from '../pages/ImageEditor.style';

import { storage } from '../firestore/firestore';

export default function PhotoEditor({
  diaryContentValue, setDiaryContentValue,
  imageUrl, setImageUrl, openImageEditor, setOpenImageEditor, setUrl,
  textEditorRef,
}) {
  const editorRef = useRef();
  const BlockEmbed = Quill.import('blots/block/embed');
  const Block = Quill.import('blots/block');

  class ClickButtonBlot extends Block {
    static create(value) {
      const node = super.create();
      node.setAttribute('src', value.url);
      node.setAttribute('class', value.class);
      node.addEventListener('click', (e) => {
        e.preventDefault();
        setOpenImageEditor(true);
        setImageUrl(value.url);
      }, false);
      return node;
    }

    static value(node) {
      return {
        url: node.getAttribute('src'),
        class: node.getAttribute('class'),
      };
    }
  }
  class ImageBlot extends BlockEmbed {
    static create(value) {
      const node = super.create();
      node.setAttribute('alt', value.alt);
      node.setAttribute('src', value.url);
      node.setAttribute('class', value.class);
      return node;
    }

    static value(node) {
      return {
        alt: node.getAttribute('alt'),
        url: node.getAttribute('src'),
        class: node.getAttribute('class'),

      };
    }
  }
  ImageBlot.blotName = 'image';
  ImageBlot.tagName = 'img';
  ClickButtonBlot.blotName = 'clickButton';
  ClickButtonBlot.tagName = 'clickButton';
  Quill.register(ImageBlot);
  Quill.register(ClickButtonBlot);

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

  const imageRef = useRef();
  const testURL = useRef();

  imageRef.current = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    let cursorPosition;
    if (textEditorRef.current.editor.getSelection()) {
      cursorPosition = textEditorRef.current.editor.getSelection().index;
    } else {
      cursorPosition = 0;
    }
    textEditorRef.current.editor.deleteText(cursorPosition - 1, 4);
    textEditorRef.current.editor.setSelection(cursorPosition - 1);

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
          <PopUpBackDiv>
            <PopUpContainerDiv>
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
                  initMenu: 'draw',
                  uiSize: {
                    width: '100%',
                    height: '95%',
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
                <CircleButton type="submit">✓</CircleButton>
                <CircleButton type="button" style={{ fontSize: '25px' }} onClick={() => setOpenImageEditor(false)}>×</CircleButton>
              </form>
            </PopUpContainerDiv>
          </PopUpBackDiv>
        )
        : (
          <div />
        ) }
      <div />
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
  textEditorRef: PropTypes.string,
};

PhotoEditor.defaultProps = {
  diaryContentValue: '',
  setDiaryContentValue: () => {},
  imageUrl: '',
  setImageUrl: () => {},
  openImageEditor: false,
  setOpenImageEditor: () => {},
  setUrl: () => {},
  textEditorRef: '',
};
