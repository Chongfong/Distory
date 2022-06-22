import React, { useState } from 'react';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import PropTypes from 'prop-types';
import { storage } from '../firestore/firestore';

export default function UploadImageInTextEditor({
  loadFromFile, loadFromUrl, imageUrl, setImageUrl, setOpenImageEditor,
}) {
  const [url, setUrl] = useState();

  const metadata = {
    contentType: 'image/jpeg',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    const imageTypes = ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'svg'];
    if (!file) return;
    if (!imageTypes.includes(file.type.slice(6))) {
      alert('Please upload the image file');
      return;
    }
    const storageRef = ref(storage, `files/${file.name}`);
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
          setImageUrl(downloadURL);
        });
      },
    );
  };
  return (
    <>
      {loadFromFile
      && (
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
        />
        <button type="submit">upload to firebase</button>
      </form>
      )}
      {loadFromUrl
      && (
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            setImageUrl(url);
          }}
        >
          Load

        </button>
      </form>
      )}
      {
        imageUrl
            && (
            <>
              <img src={imageUrl} alt="uploaded file" height={200} />
              <button type="button" onClick={() => { setOpenImageEditor(true); }}>編輯</button>
            </>
            )
          }
    </>
  );
}

UploadImageInTextEditor.propTypes = {
  loadFromFile: PropTypes.bool,
  loadFromUrl: PropTypes.bool,
  imageUrl: PropTypes.string,
  setImageUrl: PropTypes.func,
  setOpenImageEditor: PropTypes.func,
};

UploadImageInTextEditor.defaultProps = {
  loadFromFile: false,
  loadFromUrl: false,
  imageUrl: '',
  setImageUrl: () => {},
  setOpenImageEditor: () => {},
};
