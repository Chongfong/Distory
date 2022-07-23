import React, {
  useState, useCallback, useEffect, useRef, useContext,
} from 'react';
import { toast } from 'react-toastify';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import {
  collection, doc, updateDoc,
  getDoc,
} from 'firebase/firestore';
import { AppContext } from '../context/AppContext';
import { storage, db } from '../firestore/firestore';

import layoutImage from '../img/layout.png';
import contentLayout from '../img/content-layout.png';
import {
  CreateDiaryInsideBody, CreateDiaryNavTitle, CreateDiaryTitle, CreateDiaryPublish,
} from './CreateNewDiaries.style';
import {
  EditBlogTitle, EditBlogLayout, EditBlogFlex, BlogBackgroundImage, BlogBackgroundImageLabel,
  BlogUserImageDiv, BlogEditInnerContainer,
} from './EditBlog.style';
import { EditButton, CircleButton } from './ImageEditor.style';

import Loader from '../components/Loader';

export default function EditBlog() {
  const { currentUser, currentUserData, setCurrentUserData } = useContext(AppContext);
  const [blogTitle, setBlogTitle] = useState();
  const [blogIntro, setBlogIntro] = useState();
  const [blogImage, setBlogImage] = useState();
  const [blogImageFile, setBlogImageFile] = useState();
  const [, setBlogImageUrl] = useState();
  const [blogLayout, setBlogLayout] = useState();
  const [blogContentLayout, setBlogContentLayout] = useState();
  const navigate = useNavigate();

  const [currentUserImage, setCurrentUserImage] = useState();

  const inputUserImage = useRef();

  const { userID } = useParams();

  const userCollection = collection(db, 'users');

  const saveUserImgDB = (uid, downloadURL) => {
    const userBlogdoc = doc(userCollection, uid);
    let userBlogData = {};
    userBlogData = {
      userImage: downloadURL,
    };
    updateDoc(userBlogdoc, { ...userBlogData });
  };

  const submitUserImgDB = (imageFile, uid) => {
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
    const storageRef = ref(storage, `files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, { contentType: 'image/jpeg' });
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
          setCurrentUserImage(downloadURL);
          saveUserImgDB(uid, downloadURL);
        });
      },
    );
  };

  const saveBlogSettingsDB = (uid, downloadURL) => {
    const userBlogdoc = doc(userCollection, uid);
    let userBlogData = {};
    if (downloadURL) {
      userBlogData = {
        blogTitle,
        blogIntro,
        blogImage: downloadURL,
        blogLayout,
        blogContentLayout,
      };
    } else {
      userBlogData = {
        blogTitle,
        blogIntro,
        blogLayout,
        blogContentLayout,
      };
    }
    updateDoc(userBlogdoc, { ...userBlogData });
  };

  const loadUserBlogSettings = useCallback(() => {
    const thisUserRef = doc(db, 'users', userID);
    const fetchUserBlogSettings = () => new Promise((resolve) => {
      const querySnapshot = getDoc(thisUserRef);
      resolve(querySnapshot);
    });
    const loadingUserBlogSettings = async () => {
      try {
        const querySnapshot = await fetchUserBlogSettings();
        const nowBlogSettings = querySnapshot.data();
        setCurrentUserData(nowBlogSettings);
        setBlogTitle(nowBlogSettings.blogTitle);
        setBlogIntro(nowBlogSettings.blogIntro);
        setBlogImage(nowBlogSettings.blogImage);
        setBlogLayout(nowBlogSettings.blogLayout);
        setBlogContentLayout(nowBlogSettings.blogContentLayout);
        return (nowBlogSettings);
      } catch (e) {
        return e.response;
      }
    };
    loadingUserBlogSettings();
  }, [setCurrentUserData, userID]);

  const handleSubmit = (imageFile, uid) => {
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
    const storageRef = ref(storage, `files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, { contentType: 'image/jpeg' });
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
          setBlogImageUrl(downloadURL);
          saveBlogSettingsDB(uid, downloadURL);
          navigate(`/${currentUser.uid}`);
        });
      },
    );
  };

  useEffect(() => {
    loadUserBlogSettings();
  }, [currentUser, currentUserImage, loadUserBlogSettings]);

  const onUserImageClick = () => {
    inputUserImage.current.click();
  };

  const renderUploadImage = (imageFile) => {
    if (typeof (imageFile) === 'object') {
      return URL.createObjectURL(currentUserImage);
    } if (typeof (currentUserImage) === 'string') {
      return imageFile;
    }
    return currentUserData.userImage;
  };

  const [checkLoadUserImage, setCheckLoadUserImage] = useState(false);

  const renderImageEditButton = () => {
    if (blogImageFile) {
      return (
        <CircleButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBlogImageFile();
            setBlogImage(currentUserData.blogImage);
          }}
          style={{
            fontSize: '25px', position: 'absolute', bottom: '10px', right: '20px',
          }}
        >
          ×

        </CircleButton>
      );
    }
    return (
      <EditButton
        style={{
          fontSize: '25px',
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          transform: 'scaleX(-1)',
        }}
      >
        ✎

      </EditButton>
    );
  };

  const renderShowProfileImg = () => {
    if (currentUserImage) {
      return (
        <>
          <img
            style={{
              width: '200px', height: '200px', borderRadius: '50%', border: '#ccc solid 2px',
            }}
            src={renderUploadImage(currentUserImage, 'user')}
            alt={currentUserImage ? currentUserImage.name : null}
          />
          {!checkLoadUserImage && (
          <>
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); submitUserImgDB(currentUserImage, userID); setCheckLoadUserImage(true); }}>確認</button>
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentUserImage(); }}>取消</button>
          </>
          )}
        </>
      );
    }
    return (
      <img
        style={{
          width: '200px', height: '200px', borderRadius: '50%',
        }}
        src={currentUserData.userImage}
        alt="userImage"
      />
    );
  };

  const renderChangeBlogImg = () => {
    if (blogImageFile) {
      return (
        <CreateDiaryPublish
          onClick={() => {
            handleSubmit(blogImageFile, currentUser.uid);
          }}
          onKeyUp={() => {
            handleSubmit(blogImageFile, currentUser.uid);
            navigate(`/${currentUser.uid}`);
          }}
          role="button"
          tabIndex={0}
        >
          ✓

        </CreateDiaryPublish>
      );
    }
    return (
      <CreateDiaryPublish
        onClick={() => {
          saveBlogSettingsDB(currentUser.uid);
          navigate(`/${currentUser.uid}`);
        }}
        onKeyUp={() => {
          saveBlogSettingsDB(currentUser.uid);
          navigate(`/${currentUser.uid}`);
        }}
        role="button"
        tabIndex={0}
      >
        ✓

      </CreateDiaryPublish>
    );
  };

  const renderEditBlogSpace = () => {
    if (currentUserData) {
      return (
        <CreateDiaryInsideBody style={{ textAlign: 'left', padding: '0px 10px 50px 10px' }}>
          <CreateDiaryNavTitle style={{ paddingLeft: '0px' }}>部落格編輯</CreateDiaryNavTitle>
          <BlogEditInnerContainer>
            <div style={{ flex: '1' }}>
              <EditBlogTitle>部落格標題</EditBlogTitle>
              <CreateDiaryTitle
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              <EditBlogTitle>部落格介紹</EditBlogTitle>
              <CreateDiaryTitle
                type="text"
                value={blogIntro}
                onChange={(e) => setBlogIntro(e.target.value)}
              />

            </div>
            <div style={{ flex: '1', position: 'relative' }}>
              <EditBlogTitle style={{ margin: '10px 60px' }}>編輯大頭貼</EditBlogTitle>
              <BlogUserImageDiv
                onClick={() => {
                  onUserImageClick();
                }}
                onKeyUp={() => {
                  onUserImageClick();
                }}
                role="button"
                tabIndex={0}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="user-image"
                  ref={inputUserImage}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files[0]) { setCurrentUserImage(e.target.files[0]); }
                  }}
                />
                {renderShowProfileImg()}
              </BlogUserImageDiv>
            </div>

          </BlogEditInnerContainer>

          <EditBlogTitle>進版畫面設定</EditBlogTitle>

          <BlogBackgroundImageLabel
            htmlFor="upload-blogImage"
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-blogImage"
              onChange={(e) => {
                setBlogImage(URL.createObjectURL(e.target.files[0]));
                setBlogImageFile(e.target.files[0]);
              }}
            />
            {renderImageEditButton()}
            <BlogBackgroundImage
              alt="background"
              src={blogImage}
            />
          </BlogBackgroundImageLabel>

          <EditBlogTitle>基本版面設定</EditBlogTitle>
          <EditBlogFlex>
            <div
              onClick={() => setBlogLayout('A')}
              onKeyUp={() => setBlogLayout('A')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogLayout === 'A'} alt="layout-left" src={layoutImage} />

            </div>
            <div
              onClick={() => setBlogLayout('B')}
              onKeyUp={() => setBlogLayout('B')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogLayout === 'B'} style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={layoutImage} />

            </div>
          </EditBlogFlex>
          <EditBlogTitle>文章版面設定</EditBlogTitle>
          <EditBlogFlex>
            <div
              onClick={() => setBlogContentLayout('A')}
              onKeyUp={() => setBlogContentLayout('A')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogContentLayout === 'A'} alt="layout-left" src={contentLayout} />

            </div>
            <div
              onClick={() => setBlogContentLayout('B')}
              onKeyUp={() => setBlogContentLayout('B')}
              role="button"
              tabIndex={0}
            >
              <EditBlogLayout isToggled={blogContentLayout === 'B'} style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={contentLayout} />
            </div>
          </EditBlogFlex>
          <br />
          {renderChangeBlogImg()}

        </CreateDiaryInsideBody>
      );
    }
    return (<Loader />);
  };

  const renderEditBlogOuterSpace = () => {
    if (currentUser.uid === userID) {
      return (
        renderEditBlogSpace()
      );
    }
    return (<Navigate to="/" replace />);
  };

  return (
    <>
      { currentUser ? renderEditBlogOuterSpace() : (<Loader />)}
      {}
    </>
  );
}
