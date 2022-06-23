import React from 'react';
import PropTypes from 'prop-types';

export default function UploadImageInTextEditor({
  loadFromFile, loadFromUrl, imageUrl, setImageUrl, setOpenImageEditor, url, setUrl,
}) {
  const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImageUrl(base64);
  };

  return (
    <>
      {loadFromFile
      && (
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
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
  url: PropTypes.string,
  setUrl: PropTypes.func,
};

UploadImageInTextEditor.defaultProps = {
  loadFromFile: false,
  loadFromUrl: false,
  imageUrl: '',
  setImageUrl: () => {},
  setOpenImageEditor: () => {},
  url: '',
  setUrl: () => {},
};
