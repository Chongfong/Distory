import React, { useState } from 'react';

import PropTypes from 'prop-types';

import sticker from '../../../img/sticker.png';

import {
  ImageEditorStickerContainer, ImageEditorStickerOpenContainer,
  ImageEditorStickerButton, ImageEditorSticker,
} from './imageEditorTheme';

export default function StickerRow({ onStickerSelected }) {
  const stickers = [
    'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/1d0kSRp_b6QspWRuS6Rzs.png?alt=media&token=9c619b05-873a-4f47-878a-4140c9c7b53f', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/w_4nQNut9N-wsmIx43oa2.png?alt=media&token=500c94e9-d2a0-4c62-be57-17ce4dacf920', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/mj_FcRySjA5hBf3FaJ_yb.png?alt=media&token=08be2d59-9f01-425e-bc47-b37bd1491378',
    'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/moLE89RIvCycBNLkOJGlD.png?alt=media&token=58c9ff3a-8787-4314-a8e1-c9823bee02d0', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/RJrNY0m1f-X3b0_9ovFW4.png?alt=media&token=210c3e4b-c385-461d-a516-faba325f7e6d', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/NCx4Eox5JruIh2AK_JXzz.png?alt=media&token=8e6b387d-f562-4e69-8f51-f4bafcda3172',
    'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/8gGOXPLtxzmTnypcojR7L.png?alt=media&token=cc7ac23c-c806-46f0-827d-06a6e8239d57', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/bHOOUb_hDjwMiWRF_xAX6.png?alt=media&token=aebeaf76-2b50-41f6-850c-110c28356127', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/R5nPJIstfX_FEXP_N9U52.png?alt=media&token=0fa6294b-025f-42fe-a284-cd8af1942a00', 'https://firebasestorage.googleapis.com/v0/b/distory-1b7a6.appspot.com/o/DKTQTd3ddXH5czkSl1-er.png?alt=media&token=2ec49994-bb08-4ca1-bf0b-743087510aad',
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
