import React, { useState } from 'react';

import PropTypes from 'prop-types';

import add from '../img/add.png';
import like from '../img/like.png';
import writing from '../img/writing.png';
import sticker from '../img/sticker.png';

import {
  ImageEditorStickerContainer, ImageEditorStickerOpenContainer,
  ImageEditorStickerButton, ImageEditorSticker,
} from './imageEditorTheme';

export default function StickerRow({ onStickerSelected }) {
  const stickers = [
    add, like, writing,
  ];

  const [isOpenSticker, setIsOpenSticker] = useState(false);

  return (
    <>
      <ImageEditorStickerOpenContainer
        isOpenSticker={isOpenSticker}
        onClick={() => {
          setIsOpenSticker(true);
        }}
        onKeyUp={() => {
          setIsOpenSticker(true);
        }}
        role="button"
        tabIndex={0}
      >
        <ImageEditorStickerButton isOpenSticker={isOpenSticker} src={sticker} alt="sticker" />
      </ImageEditorStickerOpenContainer>
      <ImageEditorStickerContainer isOpenSticker={isOpenSticker} className="sticker-container">
        {stickers.map((path, i) => (
          <ImageEditorSticker
            key={`sticker-${Date.now() + i}`}
            onClick={() => { onStickerSelected(path); setIsOpenSticker(false); }}
            onKeyUp={() => { onStickerSelected(path); setIsOpenSticker(false); }}
            src={path}
            alt="sticker"
          />
        ))}
      </ImageEditorStickerContainer>

    </>
  );
}

StickerRow.propTypes = {
  onStickerSelected: PropTypes.func,
};

StickerRow.defaultProps = {
  onStickerSelected: () => {},
};
