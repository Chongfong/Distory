/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  PopUpBackDiv, PopUpImageContainerDiv, CircleButton, CircleButtonCancel,
} from './ImageEditor.style';
import {
  FlexBox, UploadImageTitle, UploadNavBar, UploadImageNavButtom, UploadImageContainer,
  UploadImageFromUrl, UploadImagePreviewImage,
} from './UploadImageInTextEditor.style';

import ImageEditorDefaultImage from '../components/ImageEditorDefaultImage';
import addUploadImage from '../img/image.png';

import CreateStoryPhotoEditor from './CreateNewStoryImageEditor';

import Loader from '../components/Loader';

export default function CreateNewStory({ currentUser }) {
  const [imageUrl, setImageUrl] = useState();
  const [url, setUrl] = useState();
  const [uploadFromFile, setUploadFromFile] = useState('default');
  const [imageFileUrl, setImageFileUrl] = useState();
  const [imageFile, setImageFile] = useState();
  const [uploadImageMethod] = useState(false);
  const [openImageEditor, setOpenImageEditor] = useState(false);
  const base64ImageUrl = useRef();

  const navigate = useNavigate();
  const { userID } = useParams();

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
    setOpenImageEditor(true);
    setImageFileUrl();
    setImageFile();
  };

  return (
    <>
      { currentUser ? (
        currentUser?.uid === userID
          ? (
            <>
              <PopUpBackDiv>
                <PopUpImageContainerDiv style={{ width: '85%', height: '85%' }}>
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
                            {url ? (
                              <UploadImagePreviewImage
                                alt="previewImageUrl"
                                style={{ maxHeight: '400px' }}
                                src={url}
                              />
                            ) : ('')}
                          </form>
                        ) : (
                          <ImageEditorDefaultImage
                            setImageUrl={setImageUrl}
                            url={url}
                            setUrl={setUrl}
                            setOpenImageEditor={setOpenImageEditor}
                          />
                        )

                        )}
                    </UploadImageContainer>
                    {uploadFromFile === 'file' ? (
                      <>
                        <CircleButton
                          onClick={() => {
                            uploadImage(imageFile);
                          }}
                          style={{ position: 'relative', top: '-60px' }}
                        >
                          ✓

                        </CircleButton>
                        <CircleButtonCancel
                          onClick={() => {
                            setImageFileUrl();
                            setImageFile();
                            navigate(`/${userID}`);
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
                            setOpenImageEditor(true);
                            setUrl();
                          }}
                          style={{ position: 'relative', top: '-60px' }}
                        >
                          ✓
                        </CircleButton>
                        <CircleButtonCancel
                          onClick={() => {
                            setUrl();
                            navigate(`/${userID}`);
                            setImageUrl();
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
              <div />
              <CreateStoryPhotoEditor
                openImageEditor={openImageEditor}
                setOpenImageEditor={setOpenImageEditor}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
              {}

            </>

          ) : (<Navigate to="/" replace />)) : (<Loader />)}
      {}
    </>
  );
}

CreateNewStory.propTypes = {
  currentUser: PropTypes.shape,
};

CreateNewStory.defaultProps = {
  currentUser: {},
};
