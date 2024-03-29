import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import {
  getDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { FiSave } from 'react-icons/fi';
import PhotoEditor from '../../components/edit/editors/ImageEditor';
import TextEditor from '../../components/edit/editors/TextEditor';
import { db, storage } from '../../utils/firestore';
import DropDownButton from '../../components/edit/UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../../components/edit/UploadImageInTextEditor';
import '../../css/loadDiary.css';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryNavTitle, CreateDiaryPublish,
  CreateDiarySave, SetArticleSettingsOuterContainer, SetArticleSettingsContainer,
} from '../createNewDiary/CreateNewDiaries.style';

import SetArticlePassword from '../../components/edit/SetArticlePassword';
import SetArticleShowImg from '../../components/edit/setArticleShowImg';

import CreateNewDiaryTitle from '../../components/edit/CreateDiaryTitle';

import { removeClickButtonsTag } from '../../utils/ShareFunctions';

import Loader from '../../components/share/Loader';

export default function EditDiary({ isOpen, setIsOpen }) {
  const [titleValue, setTitleValue] = useState();
  const [diaryContentValue, setDiaryContentValue] = useState();

  const [articlePassword, setArticlePassword] = useState('');
  const [articlePasswordHint, setArticlePasswordHint] = useState('');
  const [articleShowImg, setArticleShowImg] = useState();
  const [articleShowImgUrl, setArticleShowImgUrl] = useState();
  const [articleShowImgFile, setArticleShowImgFile] = useState();

  const textEditorCursorIndex = useRef();

  const { userID, diaryID } = useParams();
  const [editingDiary, setEditingDiary] = useState();
  const navigate = useNavigate();

  const loadDiary = useCallback(() => {
    const docRef = doc(db, 'articles', diaryID);

    const fetchDiary = () => new Promise((resolve) => {
      const querySnapshot = getDoc(docRef);
      resolve(querySnapshot);
    });

    const loadingDiary = async () => {
      try {
        const querySnapshot = await fetchDiary();
        const nowEditingDiary = querySnapshot.data();
        setEditingDiary(nowEditingDiary);
        setTitleValue(nowEditingDiary.title);
        setDiaryContentValue(nowEditingDiary.content);
        setArticlePassword(nowEditingDiary.password);
        setArticlePasswordHint(nowEditingDiary.passwordHint);
        setArticleShowImg(nowEditingDiary.showImg);
        setArticleShowImgUrl(nowEditingDiary.showImg);
        return (nowEditingDiary);
      } catch (e) {
        return e.response;
      }
    };
    loadingDiary();
  }, [diaryID]);

  useEffect(() => {
    loadDiary();
  }, [loadDiary]);

  const [imageUrl, setImageUrl] = useState();

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();
  const [url, setUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);

  const textEditorRef = useRef();

  const imageRef = useRef();

  const updateDiaryDB = () => {
    const docRef = doc(db, 'articles', diaryID);
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
      updateAt: Timestamp.now().toDate(),
      password: articlePassword,
      passwordHint: articlePasswordHint,
    };
    updateDoc(docRef, { ...data });
    toast('文章已修改', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const updateDiaryImgDB = (imgDownloadURL) => {
    const docRef = doc(db, 'articles', diaryID);
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      updateAt: Timestamp.now().toDate(),
      status: 'published',
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: imgDownloadURL,
    };
    updateDoc(docRef, { ...data });
    toast('文章已修改', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const updateTempDiaryImgDB = (imgDownloadURL) => {
    const docRef = doc(db, 'articles', diaryID);
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      updateAt: Timestamp.now().toDate(),
      status: 'draft',
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: imgDownloadURL,
    };
    updateDoc(docRef, { ...data });
    toast('文章已修改', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const updateTempDiaryDB = () => {
    const docRef = doc(db, 'articles', diaryID);
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
      updateAt: Timestamp.now().toDate(),
      password: articlePassword,
      passwordHint: articlePasswordHint,
      showImg: articleShowImg,
    };
    updateDoc(docRef, { ...data });
    toast('文章已儲存', {
      autoClose: 3500,
    });
    navigate(`/${userID}`);
  };

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleTempSave = (imageFile) => {
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
          updateTempDiaryImgDB(downloadURL);
          navigate(`/${userID}`);
        });
      },
    );
  };

  const handleSubmit = (imageFile) => {
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
          updateDiaryImgDB(downloadURL);
          navigate(`/${userID}`);
        });
      },
    );
  };

  return (
    <>
      { editingDiary ? (
        <CreateDiaryBody>
          <CreateDiaryInsideBody>
            <CreateDiaryNavTitle>編輯貼文</CreateDiaryNavTitle>
            <CreateNewDiaryTitle titleValue={titleValue} setTitleValue={setTitleValue} />
            <TextEditor
              diaryContentValue={diaryContentValue}
              setDiaryContentValue={setDiaryContentValue}
              imageUrl={imageUrl}
              imageRef={imageRef}
              textEditorRef={textEditorRef}
              textEditorCursorIndex={textEditorCursorIndex}
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
            { articleShowImgFile ? (
              <CreateDiarySave
                onClick={() => {
                  handleTempSave(articleShowImgFile);
                }}
                onKeyUp={() => {
                  handleTempSave(articleShowImgFile);
                }}
                role="button"
                tabIndex={0}
              >
                <FiSave style={{ color: '#7f0019' }} />

              </CreateDiarySave>
            ) : (
              <CreateDiarySave
                onClick={() => {
                  updateTempDiaryDB();
                }}
                onKeyUp={() => {
                  updateTempDiaryDB();
                }}
                role="button"
                tabIndex={0}
              >
                <FiSave />

              </CreateDiarySave>
            )}
            { articleShowImgFile ? (
              <CreateDiaryPublish
                style={{
                  zIndex: 1,
                  bottom: '70px',
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

              </CreateDiaryPublish>
            ) : (
              <CreateDiaryPublish
                style={{
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  updateDiaryDB();
                }}
                onKeyUp={() => {
                  updateDiaryDB();
                }}
                role="button"
                tabIndex={0}
              >
                ✓

              </CreateDiaryPublish>
            )}

          </CreateDiaryInsideBody>
        </CreateDiaryBody>
      ) : (
        <Loader />
      ) }
      <div />
    </>
  );
}

EditDiary.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

EditDiary.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};
