import React, { useState } from 'react';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firestore/firestore';

export default function UploadImageToFireStorage() {
  const [imgUrl, setImgUrl] = useState(null);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
    if (!file) return;
    if (!imageTypes.includes(file.type)) {
      alert('Please upload the image file');
      return;
    }
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
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
          setImgUrl(downloadURL);
        });
      },
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
        />
        <button type="submit">upload to firebase</button>
      </form>
      {
            imgUrl
            && <img src={imgUrl} alt="uploaded file" height={200} />
          }
    </>
  );
}
