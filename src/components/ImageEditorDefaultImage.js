import React from 'react';

import PropTypes from 'prop-types';
import {
  ImageEditorDefaultImageContainer, ImageEditorDefaultImageInnerImage,
  ImageEditorDefaultImageInnerImageContainer,
} from './imageEditorTheme';

export const defaultImageStoryUrls = [
  'https://file.coffee/u/fAZ1EjgIozvWAK3dLkK30.jpg',
  'https://file.coffee/u/mmoV1bEYOKsyvtXcdkX4i.jpg',
  'https://file.coffee/u/HMJIhQO3AaVYxd426ZZnu.png',
  'https://file.coffee/u/viDXwAAZfeQLeqMNRCJcn.png',
  'https://file.coffee/u/SUYgXbTjoIvd1jnSlHWHD.png',
  'https://file.coffee/u/zpu-DF2qmAkhKBvFeRc5k.png',
  'https://file.coffee/u/KqmKVeiocq_bn4Rc-uqBq.png',
  'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png',
];

export default function ImageEditorDefaultImage({ url, setUrl }) {
  // const defaultImageUrls = ['https://file.coffee/u/ABR1uG2qfVID6UCRrX5mS.png',
  //   'https://file.coffee/u/05c30tTkSadiyONTXjUe0.png',
  //   'https://file.coffee/u/ramG6l5O2oYF2gHig8sOr.png',
  //   'https://file.coffee/u/rdguG-Q0_dAy3GWVBw2PY.png',
  //   'https://file.coffee/u/tf2kZYV2xVgDXNeTJ5OTY.png',
  //   'https://file.coffee/u/EKzxSaYATl_hn1md5p1UH.png',
  //   'https://file.coffee/u/YBivlcuf0YifEw8Ed15tZ.png',
  //   'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png',
  // ];

  return (
    <ImageEditorDefaultImageContainer>
      {defaultImageStoryUrls.map((eachDefaultImageUrl, index) => (
        (eachDefaultImageUrl === 'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png' ? (
          <ImageEditorDefaultImageInnerImageContainer
            onClick={() => { setUrl('https://file.coffee/u/1TeilKNgShmshtxryhp5d.png'); }}
            selected={url === 'https://file.coffee/u/1TeilKNgShmshtxryhp5d.png'}
          >
            <ImageEditorDefaultImageInnerImage src={eachDefaultImageUrl} alt={`default-${index}`} />
          </ImageEditorDefaultImageInnerImageContainer>
        ) : (
          <ImageEditorDefaultImageInnerImageContainer
            onClick={() => { setUrl(eachDefaultImageUrl); }}
            selected={url === eachDefaultImageUrl}
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
};

ImageEditorDefaultImage.defaultProps = {
  url: '',
  setUrl: () => {},
};
