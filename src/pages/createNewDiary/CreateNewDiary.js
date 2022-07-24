import React, { useState, useRef, useContext } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

import PhotoEditor from '../../components/edit/editors/ImageEditor';
import TextEditor from '../../components/edit/editors/TextEditor';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryTitle, CreateDiaryPublish,
  CreateDiaryNavBar, CreateDiaryNavButton, CreateDiarySave,
  SetArticleSettingsContainer, SetArticleSettingsOuterContainer,
} from './CreateNewDiaries.style';
import { db, storage } from '../../utils/firestore';
import DropDownButton from '../../components/edit/UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../../components/edit/UploadImageInTextEditor';
import ChooseEditArtices from '../../components/edit/ChooseEditArticles';

import { removeClickButtonsTag } from '../../utils/ShareFunctions';

import SetArticlePassword from '../../components/edit/SetArticlePassword';
import SetArticleShowImg from '../../components/edit/setArticleShowImg';

import { previewImagesArray } from '../home/Home';

import Loader from '../../components/share/Loader';

export default function CreateNewDiary({ isOpen, setIsOpen }) {
  const { currentUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const [titleValue, setTitleValue] = useState('');
  const [diaryContentValue, setDiaryContentValue] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();
  const [url, setUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);
  const [selectEditMode, setSelectEditMode] = useState('new');
  const [isChoosing, setIsChoosing] = useState(false);
  const [articlePassword, setArticlePassword] = useState('');
  const [articlePasswordHint, setArticlePasswordHint] = useState('');
  const [articleShowImg, setArticleShowImg] = useState(
    previewImagesArray[Math.floor(Math.random() * 5)],
  );
  const [articleShowImgUrl, setArticleShowImgUrl] = useState(articleShowImg);
  const [articleShowImgFile, setArticleShowImgFile] = useState();
  const [textEditorCursorIndex, setTextEditorCursorIndex] = useState();

  const textEditorRef = useRef();

  const imageRef = useRef();
  const navigate = useNavigate();
  const { userID } = useParams();
  const diarydoc = doc(collection(db, 'articles'));

  const saveNewDiaryDB = () => {
    if (titleValue === '') {
      toast('請輸入標題', {
        autoClose: 3500,
      });
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
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
    toast('文章已發布', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const saveNewDiaryImgDB = (imgDownloadURL) => {
    if (titleValue === '') {
      toast('請輸入標題', {
        autoClose: 3500,
      });
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
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
    toast('文章已發布', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const saveTempDiaryDB = () => {
    if (titleValue === '') {
      toast('請輸入標題', {
        autoClose: 3500,
      });
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
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
    toast('文章已儲存', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const saveTempDiaryImgDB = (imgDownloadURL) => {
    if (titleValue === '') {
      toast('請輸入標題', {
        autoClose: 3500,
      });
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
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
    toast('文章已儲存', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleTempSubmit = (imageFile) => {
    if (titleValue === '') {
      toast('請輸入標題', {
        autoClose: 3500,
      });
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
      return;
    }
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) {
      toast('請重新上傳', {
        autoClose: 3500,
      }); return;
    }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      toast('請上傳圖片檔', {
        autoClose: 3500,
      });
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
      toast('請輸入標題', {
        autoClose: 3500,
      });
      setIsLoading(false);
      return;
    }
    if (diaryContentValue === '') {
      toast('請輸入內文', {
        autoClose: 3500,
      });
      setIsLoading(false);
      return;
    }
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) {
      toast('請重新上傳', {
        autoClose: 3500,
      });
      setIsLoading(false);
      return;
    }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      toast('請上傳圖片檔', {
        autoClose: 3500,
      });
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

  const renderCreateDiary = () => {
    if (isChoosing === false) {
      return (
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
            setEditorCursorIndex={setTextEditorCursorIndex}
          />
          <SetArticleSettingsOuterContainer>
            <SetArticleSettingsContainer>
              <SetArticlePassword
                articlePassword={articlePassword}
                setArticlePassword={setArticlePassword}
                articlePasswordHint={articlePasswordHint}
                setArticlePasswordHint={setArticlePasswordHint}
              />
            </SetArticleSettingsContainer>
            <SetArticleSettingsContainer>
              <SetArticleShowImg
                articleShowImg={articleShowImg}
                setArticleShowImg={setArticleShowImg}
                articleShowImgUrl={articleShowImgUrl}
                setArticleShowImgUrl={setArticleShowImgUrl}
                articleShowImgFile={articleShowImgFile}
                setArticleShowImgFile={setArticleShowImgFile}
              />
            </SetArticleSettingsContainer>
          </SetArticleSettingsOuterContainer>
        </>
      );
    } if (selectEditMode === 'edit') {
      return (
        selectEditMode === 'edit' && (
        <ChooseEditArtices
          setTitleValue={setTitleValue}
          setDiaryContentValue={setDiaryContentValue}
          isChoosing={isChoosing}
          setIsChoosing={setIsChoosing}
        />
        )
      );
    } return null;
  };

  const renderSaveButton = () => {
    if (articleShowImgFile) {
      return (
        <>
          <CreateDiarySave
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

          </CreateDiarySave>
          <CreateDiaryPublish
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

          </CreateDiaryPublish>
        </>
      );
    }
    return (
      <>
        <CreateDiarySave
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

        </CreateDiarySave>
        <CreateDiaryPublish
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

        </CreateDiaryPublish>
      </>
    );
  };

  const renderCreateDiaryInnerSpace = () => {
    if (isLoading) {
      return (<Loader />);
    }
    return (
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
          {renderCreateDiary()}

        </div>
        <br />
        {(selectEditMode !== 'edit') && (
        <DropDownButton
          setLoadFromFile={setLoadFromFile}
          setLoadFromUrl={setLoadFromUrl}
          setImageUrl={setImageUrl}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          textEditorCursorIndex={textEditorCursorIndex}
          setTextEditorCursorIndex={setTextEditorCursorIndex}
        />
        )}
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
          setTextEditorCursorIndex={setTextEditorCursorIndex}
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
          setTextEditorCursorIndex={setTextEditorCursorIndex}
        />
        {renderSaveButton()}
      </>
    );
  };

  const renderCreateDiaryOuterSpace = () => {
    if (currentUser.uid === userID) {
      return (
        <CreateDiaryInsideBody>
          {renderCreateDiaryInnerSpace()}
        </CreateDiaryInsideBody>
      );
    }
    return (
      <Navigate to="/" replace />
    );
  };

  return (
    <CreateDiaryBody>
      { currentUser ? (
        renderCreateDiaryOuterSpace()) : (<Loader />)}
    </CreateDiaryBody>
  );
}

CreateNewDiary.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

CreateNewDiary.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};
