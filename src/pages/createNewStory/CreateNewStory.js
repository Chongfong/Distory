import React, { useRef, useState, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  PopUpBackDiv, PopUpImageContainerDiv,
} from '../../components/edit/editors/ImageEditor.style';
import {
  FlexBox, UploadImageTitle, UploadNavBar, UploadImageNavButtom, UploadImageContainer,
  UploadImageFromUrl, UploadImagePreviewImage, UploadImageFileUrl, UploadImageWord,
  UploadImageImg, UplaodImageInput, UploadImageForm, UploadImageLabel,
} from '../../components/edit/UploadImageInTextEditor.style';

import { AppContext } from '../../context/AppContext';

import ImageEditorDefaultImage from '../../components/edit/ImageEditorDefaultImage';
import addUploadImage from '../../img/image.png';

import CreateStoryPhotoEditor from '../../components/edit/editors/CreateNewStoryImageEditor';

import Loader from '../../components/share/Loader';

const CreateStoryCircleButtonCheck = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 5px 10px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  cursor: pointer;
  border: #7f0019 2px solid;
  background-color: white;
  position: relative;
  top: -60px;
  color: #7f0019;
  :hover{
    background-color: #7f0019;
    color: #7f0019;
    ::after{
      color: white;
      content:'完成';
      position: absolute;
      top: -2px;
      left: 5px;
      font-size: 12px;
    }
  }

`;

const CreateStoryCircleButtonCancel = styled(CreateStoryCircleButtonCheck)`
  font-size: 25px;
  :hover{
    ::after{
      content:'取消';
    }
  }
`;

export default function CreateNewStory() {
  const { currentUser } = useContext(AppContext);
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
    try {
      const file = event.target.files[0];
      const base64 = await convertBase64(file);
      setImageUrl(base64);
      base64ImageUrl.current = base64;
      setOpenImageEditor(true);
      setImageFileUrl();
      setImageFile();
      return (false);
    } catch (e) {
      return e.response;
    }
  };

  const renderUploadImg = () => {
    if (imageFileUrl) {
      return (
        <UploadImageFileUrl
          src={imageFileUrl}
          alt="nowImage"
        />
      );
    }
    return (
      <>
        <UploadImageWord>請上傳圖片　</UploadImageWord>
        <UploadImageImg src={addUploadImage} alt="defaultImage" />
        <UplaodImageInput
          type="file"
          accept="image/*"
          id="upload-image"
          onChange={(e) => {
            setImageFileUrl(URL.createObjectURL(e.target.files[0]));
            setImageFile(e);
          }}
        />
      </>
    );
  };

  const renderUploadUrl = () => {
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
          {url && (
          <UploadImagePreviewImage
            alt="previewImageUrl"
            style={{ maxHeight: '400px' }}
            src={url}
          />
          )}
        </form>
      );
    }
    return (
      <ImageEditorDefaultImage
        setImageUrl={setImageUrl}
        url={url}
        setUrl={setUrl}
        setOpenImageEditor={setOpenImageEditor}
      />
    );
  };

  const renderFinishCancelButtons = () => {
    if (uploadFromFile === 'file') {
      return (
        <>
          <CreateStoryCircleButtonCheck
            onClick={() => {
              uploadImage(imageFile);
            }}
          >
            ✓

          </CreateStoryCircleButtonCheck>
          <CreateStoryCircleButtonCancel
            onClick={() => {
              setImageFileUrl();
              setImageFile();
              navigate(`/${userID}`);
            }}
          >
            ×

          </CreateStoryCircleButtonCancel>
        </>
      );
    }
    return (
      <>
        <CreateStoryCircleButtonCheck
          onClick={() => {
            setImageUrl(url);
            setOpenImageEditor(true);
            setUrl();
          }}
        >
          ✓
        </CreateStoryCircleButtonCheck>
        <CreateStoryCircleButtonCancel
          onClick={() => {
            setUrl();
            navigate(`/${userID}`);
            setImageUrl();
          }}
        >
          ×

        </CreateStoryCircleButtonCancel>
      </>
    );
  };

  const renderUploadFromFile = () => {
    if (uploadFromFile === 'file') {
      return (
        <UploadImageForm>
          <UploadImageLabel
            htmlFor="upload-image"
          >
            {renderUploadImg()}
          </UploadImageLabel>

        </UploadImageForm>
      );
    }
    return (renderUploadUrl());
  };

  const renderCreateStorySpace = () => {
    if (currentUser.uid === userID) {
      return (
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
                <UploadImageContainer>
                  {renderUploadFromFile()}
                </UploadImageContainer>
                {renderFinishCancelButtons()}
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

      );
    }
    return (<Navigate to="/" replace />);
  };

  return (
    <>
      { currentUser ? (
        renderCreateStorySpace()) : (<Loader />)}
      {}
    </>
  );
}
