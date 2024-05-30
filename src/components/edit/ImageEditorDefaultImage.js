import React, { useState } from 'react';

import PropTypes from 'prop-types';
import {
  ImageEditorDefaultImageContainer, ImageEditorDefaultImageInnerImage,
  ImageEditorDefaultImageInnerImageContainer,
} from './editors/imageEditorTheme';
import { SpinnerDiv } from '../share/Loader';

export const defaultImageStoryUrls = [
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/HMJIhQO3AaVYxd426ZZnu.png?alt=media&token=9cfaa728-49f9-47c0-97f3-48fac9d59fee',
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/KqmKVeiocq_bn4Rc-uqBq.png?alt=media&token=ef2e072e-9c5c-4e9a-b6c3-f16ba8780a7a',
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/SUYgXbTjoIvd1jnSlHWHD.png?alt=media&token=2196d957-5306-45f0-95c8-6ee62a7869ab',
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/viDXwAAZfeQLeqMNRCJcn.png?alt=media&token=4ea9b259-5f0b-4362-a6fc-001e7f8d85b6',
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/T4mBFiUOJI6xANqCfVCai.jpg?alt=media&token=b2e760ae-c58d-40d9-bb8b-7654196918ce',
  'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/mmoV1bEYOKsyvtXcdkX4i.jpg?alt=media&token=bcf6a7a4-a62f-4424-ba8a-27c62a703869',
];

export default function ImageEditorDefaultImage(
  {
    url, setUrl, setImageUrl, insertEditablePhoto, setIsOpen, setOpenImageEditor,
  },
) {
  const [imgLoading, setImgLoading] = useState(
    [true, true, true, true, true, true, true, true],
  );

  const handleOnload = (index) => {
    setImgLoading((prev) => {
      const newImgLoading = [...prev];
      newImgLoading[index] = false;
      return newImgLoading;
    });
  };

  return (
    <ImageEditorDefaultImageContainer>
      {defaultImageStoryUrls.map((eachDefaultImageUrl, index) => (
        (eachDefaultImageUrl === 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/HMJIhQO3AaVYxd426ZZnu.png?alt=media&token=9cfaa728-49f9-47c0-97f3-48fac9d59fee' ? (
          <ImageEditorDefaultImageInnerImageContainer
            key={`default_image-${eachDefaultImageUrl}`}
            onClick={() => { setUrl('https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/mmoV1bEYOKsyvtXcdkX4i.jpg?alt=media&token=bcf6a7a4-a62f-4424-ba8a-27c62a703869'); }}
            selected={url === 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/mmoV1bEYOKsyvtXcdkX4i.jpg?alt=media&token=bcf6a7a4-a62f-4424-ba8a-27c62a703869'}
          >
            <SpinnerDiv imgLoading={imgLoading[index]} />
            <ImageEditorDefaultImageInnerImage
              imgLoading={imgLoading[index]}
              src={eachDefaultImageUrl}
              alt={`default-${index}`}
              onLoad={() => { handleOnload(index); }}
              onDoubleClick={() => {
                setImageUrl(url);
                insertEditablePhoto(url);
                setIsOpen(false);
                setOpenImageEditor(true);
                setUrl();
              }}
            />
          </ImageEditorDefaultImageInnerImageContainer>
        ) : (
          <ImageEditorDefaultImageInnerImageContainer
            key={`default_image-${eachDefaultImageUrl}`}
            onClick={() => { setUrl(eachDefaultImageUrl); }}
            selected={url === eachDefaultImageUrl}
          >
            <SpinnerDiv imgLoading={imgLoading[index]} />
            <ImageEditorDefaultImageInnerImage
              imgLoading={imgLoading[index]}
              src={eachDefaultImageUrl}
              alt={`default-${index}`}
              onLoad={() => {
                handleOnload(index);
              }}
              onDoubleClick={() => {
                setImageUrl(url);
                insertEditablePhoto(url);
                setIsOpen(false);
                setOpenImageEditor(true);
                setUrl();
              }}
            />
          </ImageEditorDefaultImageInnerImageContainer>
        ))
      ))}
    </ImageEditorDefaultImageContainer>
  );
}

ImageEditorDefaultImage.propTypes = {
  url: PropTypes.string,
  setUrl: PropTypes.func,
  setImageUrl: PropTypes.func,
  insertEditablePhoto: PropTypes.func,
  setIsOpen: PropTypes.func,
  setOpenImageEditor: PropTypes.func,
};

ImageEditorDefaultImage.defaultProps = {
  url: '',
  setUrl: () => {},
  setImageUrl: () => {},
  insertEditablePhoto: () => {},
  setIsOpen: () => {},
  setOpenImageEditor: () => {},
};
