import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc, collection, Timestamp, setDoc,
} from 'firebase/firestore';
import { myTheme, ImageEditorSubmitButtonsForm } from '../components/imageEditorTheme';
import '../css/textEditor.css';
import '../css/imageEditor.css';
import { PopUpBackDiv, PopUpContainerDiv, CircleButton } from './ImageEditor.style';

import StickerRow from '../components/ImageEditorSticker';

import { storage, db } from '../firestore/firestore';

import Loader from '../components/Loader';

export default function CreateStoryPhotoEditor({
  imageUrl, setImageUrl, openImageEditor, setOpenImageEditor,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useParams();
  const editorRef = useRef();
  const imageRef = useRef();
  const testURL = useRef();
  const navigate = useNavigate();

  imageRef.current = '';

  const addSticker = (path) => {
    const editorInstance = editorRef.current.getInstance();

    editorInstance.addImageObject(path);
  };

  const handleUploadStory = () => {
    setIsLoading(true);
    const storydoc = doc(collection(db, 'stories'));

    const saveStoryDB = (storyImageUrl) => {
      const data = {
        imageUrl: storyImageUrl,
        publishAt: Timestamp.now().toDate(),
        diaryID: storydoc.id,
        author: userID,
      };
      setDoc(storydoc, { ...data });
      alert('已發布限時動態');
    };

    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();

    const metadata = {
      contentType: 'image/jpeg',
    };

    fetch(dataURL)
      .then((res) => res.blob())
      .then((imageBlob) => {
        testURL.current = imageBlob;

        const file = testURL.current;
        const storageRef = ref(storage, `stories/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
              saveStoryDB(downloadURL);
              setOpenImageEditor(false);
              setImageUrl();
              setIsLoading(false);
              navigate('/');
            });
          },
        );
      });
  };

  return (
    <>
      {openImageEditor === true
        ? (
          <PopUpBackDiv>
            <PopUpContainerDiv>
              {isLoading ? (<Loader />) : (
                <>
                  <ImageEditor
                    ref={editorRef}
                    includeUI={{
                      loadImage: {
                        path: imageUrl,
                        name: 'SampleImage',
                      },
                      // locale: {
                      //   DeleteAll: '全部刪除',
                      //   Delete: '刪除',
                      //   Text: '文字',
                      //   Shape: '形狀',
                      //   Load: '讀取檔案',
                      //   Download: '下載檔案',
                      //   Crop: '裁切',
                      //   Undo: '上一步',
                      //   Redo: '下一步',
                      //   'Text size': '字體大小',
                      //   Color: '顏色',
                      //   Cancel: '取消',
                      //   Rectangle: '矩形',
                      //   Triangle: '三角形',
                      //   Circle: '圓形',
                      // },
                      theme: myTheme,
                      menu: [
                        'crop',
                        'flip',
                        'rotate',
                        'draw',
                        'shape',
                        'icon',
                        'text',
                        'mask',
                        'filter',
                      ],
                      uiSize: {
                        width: '100%',
                        height: '95%',
                      },
                      menuBarPosition: 'bottom',
                      cssMaxWidth: 700,
                      cssMaxHeight: 500,
                      selectionStyle: {
                        cornerSize: 20,
                        rotatingPointOffset: 70,
                      },
                      usageStatistics: false,
                    }}
                  />
                  <StickerRow onStickerSelected={(path) => addSticker(path)} />
                  <ImageEditorSubmitButtonsForm>
                    <CircleButton
                      type="button"
                      style={{ lineHeight: '20px', position: 'relative', top: '-4px' }}
                      onClick={() => { handleUploadStory(); }}
                    >
                      ＋

                    </CircleButton>
                    <CircleButton
                      type="button"
                      style={{
                        fontSize: '25px', position: 'relative',
                      }}
                      onClick={() => {
                        setOpenImageEditor(false);
                        setImageUrl();
                      }}
                    >
                      ×

                    </CircleButton>
                  </ImageEditorSubmitButtonsForm>

                </>
              )}
            </PopUpContainerDiv>
          </PopUpBackDiv>
        )
        : (
          <div />
        ) }
      <div />
    </>
  );
}

CreateStoryPhotoEditor.propTypes = {
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  openImageEditor: PropTypes.bool,
  setOpenImageEditor: PropTypes.func,
};

CreateStoryPhotoEditor.defaultProps = {
  imageUrl: '',
  setImageUrl: () => {},
  openImageEditor: false,
  setOpenImageEditor: () => {},
};
