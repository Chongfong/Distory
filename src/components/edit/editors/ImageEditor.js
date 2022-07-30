import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef } from 'react';
import { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { myTheme, ImageEditorSubmitButtonsForm } from './imageEditorTheme';
import '../../../css/textEditor.css';
import '../../../css/imageEditor.css';
import {
  PopUpBackDiv, PopUpContainerDiv, CircleButtonPlusImgEditor, CircleButtonCancelImgEditor,
} from './ImageEditor.style';

import StickerRow from './ImageEditorSticker';

import { storage } from '../../../utils/firestore';

export default function PhotoEditor({
  setDiaryContentValue,
  imageUrl, setImageUrl, openImageEditor, setOpenImageEditor, setUrl,
  textEditorRef, textEditorCursorIndex, setTextEditorCursorIndex,
}) {
  const editorRef = useRef();
  const BlockEmbed = Quill.import('blots/block/embed');
  const Delta = Quill.import('delta');
  class ImageBlot extends BlockEmbed {
    static create(value) {
      const node = super.create();
      const clickButton = document.createElement('clickButton');
      const customImage = document.createElement('img');

      node.setAttribute('class', value.class);
      node.setAttribute('src', value.url);

      customImage.setAttribute('alt', value.alt);
      customImage.setAttribute('src', value.url);
      customImage.setAttribute('class', 'diary_image');

      clickButton.setAttribute('src', value.url);
      clickButton.setAttribute('class', 'diary_click_button');
      clickButton.addEventListener('click', (e) => {
        e.preventDefault();
        setOpenImageEditor(true);
        setImageUrl(value.url);
        setTextEditorCursorIndex(textEditorRef.current.editor.getSelection().index);
      }, false);

      node.appendChild(customImage);
      node.appendChild(clickButton);
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
  ImageBlot.blotName = 'customImg';
  ImageBlot.tagName = 'div';
  Quill.register(ImageBlot);

  const imageRef = useRef();
  const testURL = useRef();

  imageRef.current = '';

  const addSticker = (path) => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.addImageObject(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let cursorPosition;
    if (textEditorRef.current.editor.getSelection()) {
      cursorPosition = textEditorRef.current.editor.getSelection().index;
    } else {
      cursorPosition = 0;
    }

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
        const storageRef = ref(storage, `files/image${Date.now()}`);
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
              if (textEditorCursorIndex !== 0) {
                textEditorRef.current.editor.updateContents(new Delta()
                  .retain(textEditorCursorIndex - 1)
                  .insert('\n')
                  .insert({
                    image: `${downloadURL}`,
                  })
                  .delete(2)
                  .insert('\n')
                  .retain(textEditorCursorIndex));
              } else {
                textEditorRef.current.editor.updateContents(new Delta()
                  .retain(textEditorCursorIndex)
                  .insert({
                    image: `${downloadURL}`,
                  })
                  .retain(textEditorCursorIndex - 1)
                  .delete(2)
                  .insert('\n'));
              }

              setDiaryContentValue(
                textEditorRef.current.editor.getContents(),
              );
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
              <StickerRow onStickerSelected={(path) => addSticker(path)} />
              <ImageEditorSubmitButtonsForm onSubmit={handleSubmit}>
                <CircleButtonPlusImgEditor type="submit">✓</CircleButtonPlusImgEditor>
                <CircleButtonCancelImgEditor type="button" onClick={() => setOpenImageEditor(false)}>×</CircleButtonCancelImgEditor>
              </ImageEditorSubmitButtonsForm>
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
  setDiaryContentValue: PropTypes.func,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  openImageEditor: PropTypes.bool,
  setOpenImageEditor: PropTypes.func,
  setUrl: PropTypes.func,
  textEditorRef: PropTypes.shape(),
  textEditorCursorIndex: PropTypes.shape(),
  setTextEditorCursorIndex: PropTypes.func,
};

PhotoEditor.defaultProps = {
  setDiaryContentValue: () => {},
  imageUrl: '',
  setImageUrl: () => {},
  openImageEditor: false,
  setOpenImageEditor: () => {},
  setUrl: () => {},
  textEditorRef: {},
  textEditorCursorIndex: {},
  setTextEditorCursorIndex: () => {},
};
