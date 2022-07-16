/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryTitle, CreateDiaryPublish,
  CreateDiaryNavBar, CreateDiaryNavButton, CreateDiaryColored,
} from './CreateNewDiaries.style';
import { db, storage } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';
import ChooseEditArtices from '../components/ChooseEditArticles';

import { removeClickButtonsTag } from '../components/ShareFunctions';

import SetArticlePassword from '../components/SetArticlePassword';
import SetArticleShowImg from '../components/setArticleShowImg';

import { previewImagesArray } from './Home';

import loading from '../img/playingboy.png';

export default function CreateNewDiary({ isOpen, setIsOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [diaryContentValue, setDiaryContentValue] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();
  const [url, setUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);
  const [selectEditMode, setSelectEditMode] = useState();
  const [isChoosing, setIsChoosing] = useState(false);
  const [articlePassword, setArticlePassword] = useState('');
  const [articlePasswordHint, setArticlePasswordHint] = useState('');
  const [articleShowImg, setArticleShowImg] = useState(
    previewImagesArray[Math.floor(Math.random() * 5)],
  );
  const [articleShowImgUrl, setArticleShowImgUrl] = useState(articleShowImg);
  const [articleShowImgFile, setArticleShowImgFile] = useState();

  const textEditorRef = useRef();

  const textEditorCursorIndex = useRef();

  const imageRef = useRef();
  const navigate = useNavigate();
  const { userID } = useParams();
  const diarydoc = doc(collection(db, 'articles'));

  const saveNewDiaryDB = () => {
    if (titleValue === '') {
      alert('請輸入標題');
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      return;
    }
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: articleShowImg,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已發布');
    navigate(`/${userID}`);
  };

  const saveNewDiaryImgDB = (imgDownloadURL) => {
    if (titleValue === '') {
      alert('請輸入標題');
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      return;
    }
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: imgDownloadURL,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已發布');
    navigate(`/${userID}`);
  };

  const saveTempDiaryDB = () => {
    if (titleValue === '') {
      alert('請輸入標題');
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      return;
    }
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'draft',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: articleShowImg,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已儲存');
    navigate(`/${userID}`);
  };

  const saveTempDiaryImgDB = (imgDownloadURL) => {
    if (titleValue === '') {
      alert('請輸入標題');
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      return;
    }
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'draft',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: imgDownloadURL,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已儲存');
    navigate(`/${userID}`);
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleTempSubmit = (imageFile) => {
    if (titleValue === '') {
      alert('請輸入標題');
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      return;
    }
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) { alert('please try again'); return; }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      alert('Please upload the image file');
      return;
    }
    const storageRef = ref(storage, `files/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
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
          saveTempDiaryImgDB(downloadURL);
          navigate(`/${userID}`);
        });
      },
    );
  };

  const handleSubmit = (imageFile) => {
    setIsLoading(true);
    if (titleValue === '') {
      alert('請輸入標題');
      setIsLoading(false);
      return;
    }
    if (diaryContentValue === '') {
      alert('請輸入內文');
      setIsLoading(false);
      return;
    }
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) {
      alert('please try again');
      setIsLoading(false);
      return;
    }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      alert('Please upload the image file');
      setIsLoading(false);
      return;
    }
    const storageRef = ref(storage, `files/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);
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
          saveNewDiaryImgDB(downloadURL);
          setIsLoading(false);
          navigate(`/${userID}`);
        });
      },
    );
  };

  return (
    <CreateDiaryBody>
      <CreateDiaryInsideBody>
        {isLoading ? (<img src={loading} alt="loading" />) : (
          <>
            <CreateDiaryNavBar>
              <CreateDiaryNavButton
                selected={selectEditMode === 'new'}
                onClick={() => {
                  setSelectEditMode('new');
                  setIsChoosing(false);
                }}
              >
                發表新文章

              </CreateDiaryNavButton>
              <CreateDiaryNavButton
                selected={selectEditMode === 'edit'}
                onClick={() => {
                  setSelectEditMode('edit');
                  setIsChoosing(true);
                }}
              >
                編輯草稿

              </CreateDiaryNavButton>
            </CreateDiaryNavBar>
            <div style={{ height: '100%' }}>
              {isChoosing === false ? (
                <>
                  <CreateDiaryTitle
                    value={titleValue}
                    onChange={(e) => { setTitleValue(e.target.value); }}
                    placeholder={titleValue}
                  />
                  <TextEditor
                    diaryContentValue={diaryContentValue}
                    setDiaryContentValue={setDiaryContentValue}
                    imageUrl={imageUrl}
                    imageRef={imageRef}
                    textEditorRef={textEditorRef}
                    textEditorCursorIndex={textEditorCursorIndex}
                  />
                  <div style={{ display: 'flex', width: '100%', marginTop: '100px' }}>
                    <div style={{
                      flex: '1', width: '100%', display: 'flex', flexWrap: 'wrap',
                    }}
                    >
                      <SetArticlePassword
                        articlePassword={articlePassword}
                        setArticlePassword={setArticlePassword}
                        articlePasswordHint={articlePasswordHint}
                        setArticlePasswordHint={setArticlePasswordHint}
                      />
                    </div>
                    <div style={{ flex: '1', width: '100%' }}>
                      <SetArticleShowImg
                        articleShowImg={articleShowImg}
                        setArticleShowImg={setArticleShowImg}
                        articleShowImgUrl={articleShowImgUrl}
                        setArticleShowImgUrl={setArticleShowImgUrl}
                        articleShowImgFile={articleShowImgFile}
                        setArticleShowImgFile={setArticleShowImgFile}
                      />
                    </div>
                  </div>
                </>
              )
                : (
                  selectEditMode === 'edit' ? (
                    <ChooseEditArtices
                      setTitleValue={setTitleValue}
                      setDiaryContentValue={setDiaryContentValue}
                      isChoosing={isChoosing}
                      setIsChoosing={setIsChoosing}
                    />
                  ) : ('')
                )}

            </div>
            <br />
            <DropDownButton
              setLoadFromFile={setLoadFromFile}
              setLoadFromUrl={setLoadFromUrl}
              setImageUrl={setImageUrl}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              textEditorCursorIndex={textEditorCursorIndex}
            />
            <UploadImageInTextEditor
              loadFromFile={loadFromFile}
              loadFromUrl={loadFromUrl}
              setImageUrl={setImageUrl}
              url={url}
              setUrl={setUrl}
              textEditorRef={textEditorRef}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              textEditorCursorIndex={textEditorCursorIndex}
            />
            <PhotoEditor
              diaryContentValue={diaryContentValue}
              setDiaryContentValue={setDiaryContentValue}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              openImageEditor={openImageEditor}
              setOpenImageEditor={setOpenImageEditor}
              url={url}
              setUrl={setUrl}
              textEditorRef={textEditorRef}
              textEditorCursorIndex={textEditorCursorIndex}
            />

            {articleShowImgFile ? (
              <CreateDiaryPublish
                style={{ bottom: '140px' }}
                onClick={() => {
                  handleTempSubmit(articleShowImgFile);
                }}
                onKeyUp={() => {
                  handleTempSubmit(articleShowImgFile);
                }}
                role="button"
                tabIndex={0}
              >
                <FiSave style={{ color: '#7f0019' }} />

              </CreateDiaryPublish>
            ) : (
              <CreateDiaryPublish
                style={{ bottom: '140px' }}
                onClick={() => {
                  saveTempDiaryDB();
                }}
                onKeyUp={() => {
                  saveTempDiaryDB();
                }}
                role="button"
                tabIndex={0}
              >
                <FiSave />

              </CreateDiaryPublish>
            )}
            {articleShowImgFile ? (
              <CreateDiaryColored
                style={{
                  zIndex: 1,
                  bottom: '70px',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  handleSubmit(articleShowImgFile);
                }}
                onKeyUp={() => {
                  handleSubmit(articleShowImgFile);
                }}
                role="button"
                tabIndex={0}
              >
                ✓

              </CreateDiaryColored>
            ) : (
              <CreateDiaryColored
                style={{
                  bottom: '70px',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  saveNewDiaryDB();
                }}
                onKeyUp={() => {
                  saveNewDiaryDB();
                }}
                role="button"
                tabIndex={0}
              >
                ✓

              </CreateDiaryColored>
            )}
          </>
        )}
      </CreateDiaryInsideBody>
    </CreateDiaryBody>
  );
}

CreateNewDiary.propTypes = {
  isOpen: PropTypes.string,
  setIsOpen: PropTypes.func,
};

CreateNewDiary.defaultProps = {
  isOpen: '',
  setIsOpen: () => {},
};
