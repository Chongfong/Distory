/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Quill } from 'react-quill';
import { PopUpBackDiv, PopUpImageContainerDiv, CircleButton } from '../pages/ImageEditor.style';
import {
  FlexBox, UploadImageTitle, UploadNavBar, UploadImageNavButtom, UploadImageContainer,
  UploadImageFromUrl, UploadImagePreviewImage,
} from '../pages/UploadImageInTextEditor.style';

import ImageEditorDefaultImage from './ImageEditorDefaultImage';
import addUploadImage from '../img/image.png';

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
  const base64ImageUrl = useRef();
  const insertEditablePhoto = (uploadImageUrl) => {
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
                      {imageFileUrl ? (
                        <img
                          src={imageFileUrl}
                          alt="nowImage"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
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
                      )}
                    </label>

                  </form>
                )
                : (uploadFromFile === 'url' ? (
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
                ) : (
                  <ImageEditorDefaultImage url={url} setUrl={setUrl} />
                )

                )}
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
                <CircleButton
                  onClick={() => {
                    setImageFileUrl();
                    setImageFile();
                    setIsOpen(false);
                  }}
                  style={{ fontSize: '25px', position: 'relative', top: '-60px' }}
                >
                  ×

                </CircleButton>
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
                <CircleButton
                  onClick={() => {
                    setIsOpen(false);
                    setUrl();
                  }}
                  style={{ fontSize: '25px', position: 'relative', top: '-60px' }}
                >
                  ×

                </CircleButton>
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
