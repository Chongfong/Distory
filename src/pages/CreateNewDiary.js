import React, { useState } from 'react';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import TextEditor from '../components/TextEditor';
import CreateNewDiaryTitle from '../components/CreateDiaryTitle';
import { db } from '../firestore/firestore';

export default function CreateNewDiary() {
  const [titleValue, setTitleValue] = useState('Please enter the title');
  const [diaryContentValue, setDiaryContentValue] = useState();
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
      />
      <br />
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
