import React, { useState } from 'react';

import PropTypes from 'prop-types';

import sticker from '../../../img/sticker.png';

import {
  ImageEditorStickerContainer, ImageEditorStickerOpenContainer,
  ImageEditorStickerButton, ImageEditorSticker,
} from './imageEditorTheme';

export default function StickerRow({ onStickerSelected }) {
  const stickers = [
    'https://file.coffee/u/1d0kSRp_b6QspWRuS6Rzs.png', 'https://file.coffee/u/w_4nQNut9N-wsmIx43oa2.png', 'https://file.coffee/u/mj_FcRySjA5hBf3FaJ_yb.png',
    'https://file.coffee/u/moLE89RIvCycBNLkOJGlD.png', 'https://file.coffee/u/RJrNY0m1f-X3b0_9ovFW4.png', 'https://file.coffee/u/NCx4Eox5JruIh2AK_JXzz.png',
    'https://file.coffee/u/8gGOXPLtxzmTnypcojR7L.png', 'https://file.coffee/u/bHOOUb_hDjwMiWRF_xAX6.png', 'https://file.coffee/u/R5nPJIstfX_FEXP_N9U52.png', 'https://file.coffee/u/DKTQTd3ddXH5czkSl1-er.png',
  ];

  const [isOpenSticker, setIsOpenSticker] = useState(false);

  return (
    <>
      <ImageEditorStickerOpenContainer
        isOpenSticker={isOpenSticker}
        onClick={() => {
          setIsOpenSticker((prevState) => !prevState);
        }}
        onKeyUp={() => {
          setIsOpenSticker((prevState) => !prevState);
        }}
        role="button"
        tabIndex={0}
      >
        <ImageEditorStickerButton src={sticker} alt="sticker" />
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
