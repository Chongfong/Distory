import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc, collection, Timestamp, setDoc,
} from 'firebase/firestore';
import { myTheme, ImageEditorSubmitButtonsForm } from './imageEditorTheme';
import '../../../css/textEditor.css';
import '../../../css/imageEditor.css';
import {
  PopUpBackDiv, PopUpContainerDiv, CircleButtonPlusStory, CircleButtonCancelStory,
} from './ImageEditor.style';

import StickerRow from './ImageEditorSticker';

import { storage, db } from '../../../utils/firestore';

import Loader from '../../share/Loader';

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
      toast('已發布限時動態', {
        autoClose: 3000,
      });
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
                    <CircleButtonPlusStory
                      type="button"
                      onClick={() => { handleUploadStory(); }}
                    >
                      ＋

                    </CircleButtonPlusStory>
                    <CircleButtonCancelStory
                      type="button"
                      onClick={() => {
                        setOpenImageEditor(false);
                        setImageUrl();
                      }}
                    >
                      ×

                    </CircleButtonCancelStory>
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
