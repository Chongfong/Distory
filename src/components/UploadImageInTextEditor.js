import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Quill } from 'react-quill';
import { PopUpBackDiv, PopUpImageContainerDiv, CircleButton } from '../pages/ImageEditor.style';
import {
  FlexBox, UploadImageTitle, UploadNavBar, UploadImageNavButtom, UploadImageContainer,
  UploadImageFromUrl, UploadImagePreviewImage,
} from '../pages/UploadImageInTextEditor.style';
import addUploadImage from '../img/image.png';

export default function UploadImageInTextEditor({
  setImageUrl, url, setUrl,
  textEditorRef,
  isOpen,
  setIsOpen,

}) {
  const [uploadFromFile, setUploadFromFile] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState();
  const [imageFile, setImageFile] = useState();
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
      { isOpen && (
      <PopUpBackDiv>
        <PopUpImageContainerDiv>
          <FlexBox>
            <UploadImageTitle>
              插入圖片
            </UploadImageTitle>
            <UploadNavBar>
              <UploadImageNavButtom onClick={() => {
                setUploadFromFile(true);
              }}
              >
                上傳

              </UploadImageNavButtom>
              <UploadImageNavButtom onClick={() => {
                setUploadFromFile(false);
              }}
              >
                網址

              </UploadImageNavButtom>
            </UploadNavBar>
            <UploadImageContainer>
              {uploadFromFile
                ? (
                  <form>
                    <label
                      htmlFor="upload-image"
                      style={{
                        width: '100%',
                        height: '270px',
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
                : (
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
                )}
            </UploadImageContainer>
            {uploadFromFile ? (
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
};

UploadImageInTextEditor.defaultProps = {
  setImageUrl: () => {},
  url: '',
  setUrl: () => {},
  textEditorRef: '',
  isOpen: false,
  setIsOpen: () => {},
};
