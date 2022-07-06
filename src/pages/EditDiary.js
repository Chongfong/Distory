import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import {
  getDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import { db } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';
import '../css/loadDiary.css';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryNavTitle, CreateDiaryPublish,
  CreateDiarySave,
} from './CreateNewDiaries.style';

import CreateNewDiaryTitle from '../components/CreateDiaryTitle';

export default function EditDiary({ isOpen, setIsOpen }) {
  const [titleValue, setTitleValue] = useState();
  const [diaryContentValue, setDiaryContentValue] = useState();
  const { userID, diaryID } = useParams();
  const [editingDiary, setEditingDiary] = useState();
  const docRef = doc(db, 'articles', diaryID);

  const navigate = useNavigate();

  const fetchDiary = () => new Promise((resolve) => {
    const querySnapshot = getDoc(docRef);
    resolve(querySnapshot);
  });

  const loadDiary = useCallback(() => {
    const loadingDiary = async () => {
      let nowEditingDiary = '';
      fetchDiary().then((querySnapshot) => {
        nowEditingDiary = querySnapshot.data();
        setEditingDiary(querySnapshot.data());
        setTitleValue(querySnapshot.data().title);
        setDiaryContentValue(querySnapshot.data().content);
      });
      return (nowEditingDiary);
    };
    loadingDiary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const data = {
      title: titleValue,
      content: diaryContentValue,
      status: 'published',
      updateAt: Timestamp.now().toDate(),
    };
    updateDoc(docRef, { ...data });
    alert('文章已修改');
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
            />
            <br />
            <DropDownButton
              setLoadFromFile={setLoadFromFile}
              setLoadFromUrl={setLoadFromUrl}
              setImageUrl={setImageUrl}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
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
            />
            <CreateDiarySave
              style={{ fontSize: '30px' }}
              onClick={() => {
                navigate(`/${userID}`);
              }}
              onKeyUp={() => {
                navigate(`/${userID}`);
              }}
            >
              ×
            </CreateDiarySave>
            <CreateDiaryPublish
              onClick={() => {
                updateDiaryDB();
                navigate(`/${userID}`);
              }}
              onKeyUp={() => {
                updateDiaryDB();
                navigate(`/${userID}`);
              }}
              role="button"
              tabIndex={0}
            >
              ✓
            </CreateDiaryPublish>

          </CreateDiaryInsideBody>
        </CreateDiaryBody>
      ) : (
        <div>Now Loading...</div>
      ) }
      <div />
    </>
  );
}

EditDiary.propTypes = {
  isOpen: PropTypes.string,
  setIsOpen: PropTypes.func,
};

EditDiary.defaultProps = {
  isOpen: '',
  setIsOpen: () => {},
};
