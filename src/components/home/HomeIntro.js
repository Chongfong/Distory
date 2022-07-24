import React from 'react';

import {
  HomeIntroContainer, HomeInviteTitle, HomeIntroWord, HomeInviteButtonContainer,
  HomeIntroImgContainer, HomeIntroImg, HomeIntroTitle, HomeIntroDetail,
} from './HomeIntro.style';

import markdown from '../../img/markdown.png';
import imgeditor from '../../img/imgeditor.png';
import story from '../../img/story.png';

export default function HomeIntro() {
  return (
    <HomeIntroContainer>
      <HomeInviteTitle>
        <span style={{ color: '#b57c4a' }}>Distory</span>
      &nbsp;的精采世界
      </HomeInviteTitle>
      <HomeIntroWord>
        <span>圖文整合　一次編輯</span>
      &nbsp;保存你的每一個驚喜瞬間

      </HomeIntroWord>
      <HomeInviteButtonContainer>
        <HomeIntroImgContainer>
          <HomeIntroImg src={markdown} alt="markdown" />
          <HomeIntroTitle>文字編輯器</HomeIntroTitle>
          <HomeIntroDetail>精簡多樣化的文字編輯功能</HomeIntroDetail>
        </HomeIntroImgContainer>
        <HomeIntroImgContainer>
          <HomeIntroImg src={imgeditor} alt="imgeditor" />
          <HomeIntroTitle>圖片編輯器</HomeIntroTitle>
          <HomeIntroDetail>繪製出心目中的精美圖片</HomeIntroDetail>
        </HomeIntroImgContainer>
        <HomeIntroImgContainer>
          <HomeIntroImg src={story} alt="story" />
          <HomeIntroTitle>限時動態</HomeIntroTitle>
          <HomeIntroDetail>即時留下您的回憶瞬間</HomeIntroDetail>
        </HomeIntroImgContainer>
      </HomeInviteButtonContainer>
    </HomeIntroContainer>
  );
}
