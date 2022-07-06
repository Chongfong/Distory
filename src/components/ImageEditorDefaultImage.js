import React from 'react';

import PropTypes from 'prop-types';
import {
  ImageEditorDefaultImageContainer, ImageEditorDefaultImageInnerImage,
  ImageEditorDefaultImageInnerImageContainer,
} from './imageEditorTheme';

export default function ImageEditorDefaultImage({ url, setUrl }) {
  const defaultImageUrls = ['https://file.coffee/u/ABR1uG2qfVID6UCRrX5mS.png',
    'https://file.coffee/u/05c30tTkSadiyONTXjUe0.png',
    'https://file.coffee/u/ramG6l5O2oYF2gHig8sOr.png',
    'https://file.coffee/u/rdguG-Q0_dAy3GWVBw2PY.png',
    'https://file.coffee/u/tf2kZYV2xVgDXNeTJ5OTY.png',
    'https://file.coffee/u/EKzxSaYATl_hn1md5p1UH.png',
    'https://file.coffee/u/YBivlcuf0YifEw8Ed15tZ.png',
    'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png',
  ];

  return (
    <ImageEditorDefaultImageContainer>
      {defaultImageUrls.map((eachDefaultImageUrl, index) => (
        (eachDefaultImageUrl === 'https://file.coffee/u/sZeBwM7pCZmIcdcUYAGvn.png' ? (
          <ImageEditorDefaultImageInnerImageContainer
            onClick={() => { setUrl('https://file.coffee/u/mbfKvcJOiXGmDDKJKZ9wl.png'); }}
            selected={url === 'https://file.coffee/u/mbfKvcJOiXGmDDKJKZ9wl.png'}
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
