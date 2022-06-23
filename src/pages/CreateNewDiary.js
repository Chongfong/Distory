import React, { useState, useRef } from 'react';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import CreateNewDiaryTitle from '../components/CreateDiaryTitle';
import { db } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';

export default function CreateNewDiary() {
  const [titleValue, setTitleValue] = useState('Please enter the title');
  const [diaryContentValue, setDiaryContentValue] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);

  const textEditorRef = useRef();

  const imageRef = useRef();
  const diarydoc = doc(collection(db, 'articles'));

  const saveNewDiaryDB = () => {
    const data = {
      title: titleValue,
      content: diaryContentValue,
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已發布');
  };

  return (
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
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        setOpenImageEditor={setOpenImageEditor}
      />
      <PhotoEditor
        diaryContentValue={diaryContentValue}
        setDiaryContentValue={setDiaryContentValue}
        imageUrl={imageUrl}
        openImageEditor={openImageEditor}
        setOpenImageEditor={setOpenImageEditor}
      />
      <div
        onClick={saveNewDiaryDB}
        onKeyUp={saveNewDiaryDB}
        role="button"
        tabIndex={0}
      >
        Publish

      </div>
    </>
  );
}
