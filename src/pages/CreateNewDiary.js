/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  doc,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import PhotoEditor from '../components/ImageEditor';
import TextEditor from '../components/TextEditor';
import {
  CreateDiaryBody, CreateDiaryInsideBody, CreateDiaryTitle, CreateDiaryPublish,
  CreateDiarySave, CreateDiaryIconImage, CreateDiaryNavBar, CreateDiaryNavButton,
} from './CreateNewDiaries.style';
import { db } from '../firestore/firestore';
import DropDownButton from './UploadImageInTextEditor.style';
import UploadImageInTextEditor from '../components/UploadImageInTextEditor';
import ChooseEditArtices from '../components/ChooseEditArticles';

import { removeClickButtonsTag } from '../components/ShareFunctions';

import save from '../img/save.png';

export default function CreateNewDiary({ isOpen, setIsOpen }) {
  const [titleValue, setTitleValue] = useState('Please enter the title');
  const [diaryContentValue, setDiaryContentValue] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [loadFromFile, setLoadFromFile] = useState();
  const [loadFromUrl, setLoadFromUrl] = useState();
  const [url, setUrl] = useState();

  const [openImageEditor, setOpenImageEditor] = useState(false);
  const [selectEditMode, setSelectEditMode] = useState();
  const [isChoosing, setIsChoosing] = useState(false);

  const textEditorRef = useRef();

  const imageRef = useRef();
  const navigate = useNavigate();
  const { userID } = useParams();
  const diarydoc = doc(collection(db, 'articles'));

  const saveNewDiaryDB = () => {
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'published',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已發布');
  };

  const saveTempDiaryDB = () => {
    const data = {
      title: titleValue,
      titleText: [...titleValue.replace(' ', '')],
      content: removeClickButtonsTag(diaryContentValue),
      status: 'draft',
      publishAt: Timestamp.now().toDate(),
      diaryID: diarydoc.id,
      author: userID,
    };
    setDoc(diarydoc, { ...data });
    alert('文章已儲存');
  };

  return (
    <CreateDiaryBody>
      <CreateDiaryInsideBody>
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
              />
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
          onClick={() => {
            saveTempDiaryDB();
            navigate(`/${userID}`);
          }}
          onKeyUp={() => {
            saveTempDiaryDB();
            navigate(`/${userID}`);
          }}
          role="button"
          tabIndex={0}
        >
          <CreateDiaryIconImage src={save} alt="save" />

        </CreateDiarySave>
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

CreateNewDiary.propTypes = {
  isOpen: PropTypes.string,
  setIsOpen: PropTypes.func,
};

CreateNewDiary.defaultProps = {
  isOpen: '',
  setIsOpen: () => {},
};
