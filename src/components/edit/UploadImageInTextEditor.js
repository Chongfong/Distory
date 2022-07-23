import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Quill } from 'react-quill';
import Resizer from 'react-image-file-resizer';
import {
  PopUpBackDiv, PopUpImageContainerDiv, CircleButton, CircleButtonCancel,
} from './editors/ImageEditor.style';
import {
  FlexBox, UploadImageTitle, UploadNavBar, UploadImageNavButtom, UploadImageContainer,
  UploadImageFromUrl, UploadImagePreviewImage,
} from './UploadImageInTextEditor.style';

import ImageEditorDefaultImage from './ImageEditorDefaultImage';
import addUploadImage from '../../img/image.png';

export default function UploadImageInTextEditor({
  setImageUrl, url, setUrl,
  textEditorRef,
  isOpen,
  setIsOpen,
  textEditorCursorIndex,
}) {
  const [uploadFromFile, setUploadFromFile] = useState('default');
  const [imageFileUrl, setImageFileUrl] = useState();
  const [imageFile, setImageFile] = useState();
  const [uploadImageMethod] = useState(false);

  const resizeFile = (file) => new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      'PNG',
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });

  const insertEditablePhoto = async (upload) => {
    let uploadImageUrl;
    if (upload.type) {
      uploadImageUrl = await resizeFile(upload);
    } else {
      uploadImageUrl = upload;
    }
    const cursorPosition = textEditorRef.current.editor.selection.savedRange.index;
    textEditorRef.current.editor.insertEmbed(cursorPosition, 'image', {
      alt: `image${Date.now()}`,
      url: uploadImageUrl,
      class: 'diary_image',
    }, Quill.sources.USER);

    const Delta = Quill.import('delta');

    textEditorRef.current.editor.insertEmbed(cursorPosition, 'clickButton', {
      url: uploadImageUrl,
      class: 'diary_click_button',
    }, Quill.sources.USER);
    if (textEditorCursorIndex.current !== 0) {
      textEditorRef.current.editor.updateContents(new Delta()
        .retain(textEditorCursorIndex.current + 2)
        .delete(1));
    }

    textEditorRef.current.editor.setSelection(cursorPosition);
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    insertEditablePhoto(file);
  };

  function renderimageFileUrl() {
    if (imageFileUrl) {
      return (
        <img
          src={imageFileUrl}
          alt="nowImage"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      );
    }
    return (
      <>
        <p style={{ opacity: '0.5' }}>請上傳圖片　</p>
        <img src={addUploadImage} alt="defaultImage" style={{ opacity: '0.5' }} />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          onChange={(e) => {
            setImageFileUrl(URL.createObjectURL(e.target.files[0]));
            setImageFile(e);
          }}
        />
      </>
    );
  }

  function renderUploadFromUrl() {
    if (uploadFromFile === 'url') {
      return (
        <form>
          <UploadImageFromUrl
            type="text"
            value={url}
            placeholder="請新增網址"
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          {url.length !== 0 ? (<UploadImagePreviewImage alt="previewImageUrl" src={url} />) : ('')}
        </form>
      );
    }
    return (
      <ImageEditorDefaultImage
        setImageUrl={setImageUrl}
        insertEditablePhoto={insertEditablePhoto}
        setIsOpen={setIsOpen}
        url={url}
        setUrl={setUrl}
      />
    );
  }

  return (
    <>
      { isOpen && (
      <PopUpBackDiv>
        <PopUpImageContainerDiv>
          <FlexBox>
            <UploadImageTitle>
              插入圖片
            </UploadImageTitle>
            <UploadNavBar>
              <UploadImageNavButtom
                selected={uploadFromFile === 'file'}
                uploadImageMethod={uploadImageMethod}
                onClick={() => {
                  setUploadFromFile('file');
                }}
              >
                上傳

              </UploadImageNavButtom>
              <UploadImageNavButtom
                selected={uploadFromFile === 'url'}
                uploadImageMethod={uploadImageMethod}
                onClick={() => {
                  setUploadFromFile('url');
                }}
              >
                網址

              </UploadImageNavButtom>
              <UploadImageNavButtom
                selected={uploadFromFile === 'default'}
                uploadImageMethod={uploadImageMethod}
                onClick={() => {
                  setUploadFromFile('default');
                }}
              >
                預設圖片

              </UploadImageNavButtom>
            </UploadNavBar>
            <UploadImageContainer style={{ height: '84%' }}>
              {uploadFromFile === 'file'
                ? (
                  <form style={{ height: '100%' }}>
                    <label
                      htmlFor="upload-image"
                      style={{
                        width: '100%',
                        height: '90%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        cursor: 'pointer',
                      }}
                    >
                      {renderimageFileUrl()}
                    </label>

                  </form>
                )
                : (renderUploadFromUrl()) }
            </UploadImageContainer>
            {uploadFromFile === 'file' ? (
              <>
                <CircleButton
                  onClick={() => {
                    uploadImage(imageFile);
                    setImageFileUrl();
                    setImageFile();
                    setIsOpen(false);
                  }}
                  style={{ position: 'relative', top: '-60px' }}
                >
                  ✓

                </CircleButton>
                <CircleButtonCancel
                  onClick={() => {
                    setImageFileUrl();
                    setImageFile();
                    setIsOpen(false);
                  }}
                  style={{ fontSize: '25px', position: 'relative', top: '-60px' }}
                >
                  ×

                </CircleButtonCancel>
              </>
            ) : (
              <>
                <CircleButton
                  onClick={() => {
                    setImageUrl(url);
                    insertEditablePhoto(url);
                    setIsOpen(false);
                    setUrl();
                  }}
                  style={{ position: 'relative', top: '-60px' }}
                >
                  ✓
                </CircleButton>
                <CircleButtonCancel
                  onClick={() => {
                    setIsOpen(false);
                    setUrl();
                  }}
                  style={{ fontSize: '25px', position: 'relative', top: '-60px' }}
                >
                  ×

                </CircleButtonCancel>
              </>
            )}
          </FlexBox>
        </PopUpImageContainerDiv>
      </PopUpBackDiv>
      )}
      <div />
    </>
  );
}

UploadImageInTextEditor.propTypes = {
  setImageUrl: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  textEditorRef: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  textEditorCursorIndex: PropTypes.string,
};

UploadImageInTextEditor.defaultProps = {
  setImageUrl: () => {},
  url: '',
  setUrl: () => {},
  textEditorRef: '',
  isOpen: false,
  setIsOpen: () => {},
  textEditorCursorIndex: '',
};
