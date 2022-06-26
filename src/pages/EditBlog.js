import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, Link } from 'react-router-dom';

import { storage } from '../firestore/firestore';
import layoutImage from '../img/layout.png';
import contentLayout from '../img/content-layout.png';

export default function EditBlog() {
  const [blogTitle, setBlogTitle] = useState();
  const [blogIntro, setBlogIntro] = useState();
  const [blogImage, setBlogImage] = useState();
  const [, setBlogImageUrl] = useState();
  const [, setLayout] = useState();
  const [, setBlogContentLayout] = useState();
  const navigate = useNavigate();

  const metadata = {
    contentType: 'image/jpeg',
  };

  const imagePreview = (e) => {
    e.preventDefault();
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = (imageFile) => {
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!imageFile) { alert('please try again'); return; }
    if (!imageTypes.includes(imageFile.type.slice(6))) {
      alert('Please upload the image file');
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
          setBlogImageUrl(downloadURL);
        });
      },
    );
  };

  return (
    <>
      <div>部落格標題</div>
      <input
        type="text"
        value={blogTitle}
        onBlur={(e) => setBlogTitle(e.target.value)}
      />

      <div>部落格介紹</div>
      <input
        type="text"
        value={blogIntro}
        onBlur={(e) => setBlogIntro(e.target.value)}
      />

      <div>進版畫面設定</div>
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={imagePreview}
        />
        <img
          src={blogImage ? URL.createObjectURL(blogImage) : null}
          alt={blogImage ? blogImage.name : null}
        />
      </form>
      <div>基本版面設定</div>
      <div
        onClick={() => setLayout('A')}
        onKeyUp={() => setLayout('A')}
        role="button"
        tabIndex={0}
      >
        <img alt="layout-left" src={layoutImage} />

      </div>
      <div
        onClick={() => setLayout('B')}
        onKeyUp={() => setLayout('B')}
        role="button"
        tabIndex={0}
      >
        <img style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={layoutImage} />

      </div>

      <div>文章版面設定</div>
      <div
        onClick={() => setBlogContentLayout('A')}
        onKeyUp={() => setBlogContentLayout('A')}
        role="button"
        tabIndex={0}
      >
        <img alt="layout-left" src={contentLayout} />

      </div>
      <div
        onClick={() => setBlogContentLayout('B')}
        onKeyUp={() => setBlogContentLayout('B')}
        role="button"
        tabIndex={0}
      >
        <img style={{ transform: 'scaleX(-1)' }} alt="layout-left" src={contentLayout} />

      </div>
      <div
        onClick={() => {
          handleSubmit(blogImage);
          navigate('/');
        }}
        onKeyUp={() => {
          handleSubmit(blogImage);
          navigate('/');
        }}
        role="button"
        tabIndex={0}
      >
        完成設定

      </div>

      <Link to="/diaries">
        <button type="button">Diaries</button>

      </Link>
    </>
  );
}
