import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryNavTitle, CreateDiaryTitle, CreateDiaryPublish,
} from './CreateNewDiaries.style';
import { db } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';

export default function CreateNewDiary() {
  const [titleValue, setTitleValue] = useState('Please enter the title');
  const [diaryContentValue, setDiaryContentValue] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();
  const [url, setUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);

  const textEditorRef = useRef();

  const imageRef = useRef();
  const navigate = useNavigate();
  const { userID } = useParams();
  const diarydoc = doc(collection(db, 'articles'));

  const saveNewDiaryDB = () => {
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: diaryContentValue,
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已發布');
  };

  return (
    <CreateDiaryBody>
      <CreateDiaryInsideBody>
        <CreateDiaryNavTitle>發表新文章</CreateDiaryNavTitle>
        <CreateDiaryTitle titleValue={titleValue} onChange={(e) => { setTitleValue(e.target.value); }} setTitleValue={setTitleValue} placeholder="請輸入標題" />
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
        <CreateDiaryPublish
          onClick={() => {
            saveNewDiaryDB();
            navigate(`/${userID}`);
          }}
          onKeyUp={() => {
            saveNewDiaryDB();
            navigate(`/${userID}`);
          }}
          role="button"
          tabIndex={0}
        >
          ✓

        </CreateDiaryPublish>
      </CreateDiaryInsideBody>
    </CreateDiaryBody>
  );
}
