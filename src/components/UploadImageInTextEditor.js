import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Quill } from 'react-quill';

export default function UploadImageInTextEditor({
  loadFromFile, loadFromUrl, setImageUrl, url, setUrl,
  textEditorRef,

}) {
  const base64ImageUrl = useRef();
  const insertEditablePhoto = (uploadImageUrl) => {
    let cursorPosition;
    if (textEditorRef.current.editor.getSelection()) {
      cursorPosition = textEditorRef.current.editor.getSelection().index;
    } else {
      cursorPosition = 0;
    }
    textEditorRef.current.editor.insertEmbed(cursorPosition + 1, 'image', {
      alt: `image${Date.now()}`,
      url: uploadImageUrl,
      class: 'diary_image',
    }, Quill.sources.USER);
    textEditorRef.current.editor.insertEmbed(cursorPosition + 1, 'clickButton', {
      url: uploadImageUrl,
      class: 'diary_click_button',
    }, Quill.sources.USER);

    textEditorRef.current.editor.setSelection(cursorPosition);
  };

  const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImageUrl(base64);
    base64ImageUrl.current = base64;
    insertEditablePhoto(base64ImageUrl.current);
  };

  return (
    <>
      {loadFromFile
      && (
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
      </form>
      )}
      {loadFromUrl
      && (
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            setImageUrl(url);
            insertEditablePhoto(url);
          }}
        >
          Load

        </button>
      </form>
      )}
    </>
  );
}

UploadImageInTextEditor.propTypes = {
  loadFromFile: PropTypes.bool,
  loadFromUrl: PropTypes.bool,
  setImageUrl: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  textEditorRef: PropTypes.string,
};

UploadImageInTextEditor.defaultProps = {
  loadFromFile: false,
  loadFromUrl: false,
  setImageUrl: () => {},
  url: '',
  setUrl: () => {},
  textEditorRef: '',
};
