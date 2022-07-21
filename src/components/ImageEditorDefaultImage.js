import React from 'react';

import PropTypes from 'prop-types';
import {
  ImageEditorDefaultImageContainer, ImageEditorDefaultImageInnerImage,
  ImageEditorDefaultImageInnerImageContainer,
} from './imageEditorTheme';

export const defaultImageStoryUrls = [
  'https://file.coffee/u/T4mBFiUOJI6xANqCfVCai.jpg',
  'https://file.coffee/u/mmoV1bEYOKsyvtXcdkX4i.jpg',
  'https://file.coffee/u/HMJIhQO3AaVYxd426ZZnu.png',
  'https://file.coffee/u/viDXwAAZfeQLeqMNRCJcn.png',
  'https://file.coffee/u/SUYgXbTjoIvd1jnSlHWHD.png',
  'https://file.coffee/u/zpu-DF2qmAkhKBvFeRc5k.png',
  'https://file.coffee/u/KqmKVeiocq_bn4Rc-uqBq.png',
  'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png',
];

export default function ImageEditorDefaultImage(
  {
    url, setUrl, setImageUrl, insertEditablePhoto, setIsOpen, setOpenImageEditor,
  },
) {
  return (
    <ImageEditorDefaultImageContainer>
      {defaultImageStoryUrls.map((eachDefaultImageUrl, index) => (
        (eachDefaultImageUrl === 'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png' ? (
          <ImageEditorDefaultImageInnerImageContainer
            key={`default_image-${Date.now() + index}`}
            onClick={() => { setUrl('https://file.coffee/u/1TeilKNgShmshtxryhp5d.png'); }}
            selected={url === 'https://file.coffee/u/1TeilKNgShmshtxryhp5d.png'}
            onDoubleClick={() => {
              setImageUrl(url);
              insertEditablePhoto(url);
              setIsOpen(false);
              setOpenImageEditor(true);
              setUrl();
            }}
          >
            <ImageEditorDefaultImageInnerImage src={eachDefaultImageUrl} alt={`default-${index}`} />
          </ImageEditorDefaultImageInnerImageContainer>
        ) : (
          <ImageEditorDefaultImageInnerImageContainer
            key={`default_image-${Date.now() + index}`}
            onClick={() => { setUrl(eachDefaultImageUrl); }}
            selected={url === eachDefaultImageUrl}
            onDoubleClick={() => {
              setImageUrl(url);
              insertEditablePhoto(url);
              setIsOpen(false);
              setOpenImageEditor(true);
              setUrl();
            }}
          >
            <ImageEditorDefaultImageInnerImage src={eachDefaultImageUrl} alt={`default-${index}`} />
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
