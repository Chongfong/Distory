import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import {
  collection,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import CreateNewDiaryTitle from '../components/CreateDiaryTitle';
import { db } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';
import '../css/loadDiary.css';

export default function EditDiary() {
  const [titleValue, setTitleValue] = useState();
  const [diaryContentValue, setDiaryContentValue] = useState();
  const { diaryID } = useParams();
  const [editingDiary, setEditingDiary] = useState();
  const docRef = doc(db, 'articles', diaryID);

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
  const diarydoc = doc(collection(db, 'articles'));

  const updateDiaryDB = () => {
    const data = {
      title: titleValue,
      content: diaryContentValue,
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
    };
    updateDoc(docRef, { ...data });
    alert('文章已修改');
  };

  return (
    <>
      { editingDiary ? (
        <>
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
          />
          <UploadImageInTextEditor
            loadFromFile={loadFromFile}
            loadFromUrl={loadFromUrl}
            setImageUrl={setImageUrl}
            url={url}
            setUrl={setUrl}
            textEditorRef={textEditorRef}
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
          <Link to="/diaries">
            <div
              onClick={() => {
                updateDiaryDB();
              }}
              onKeyUp={() => {
                updateDiaryDB();
              }}
              role="button"
              tabIndex={0}
            >
              Update
            </div>
          </Link>

        </>
      ) : (
        <div>Now Loading...</div>
      ) }
      <div />
    </>
  );
}
