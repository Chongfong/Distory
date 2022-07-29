import React from 'react';
import tree from '../../img/tree.png';

import { Body, FooterBackgroundImage, FooterWords } from './Footer.style';

export default function Footer() {
  return (
    <Body>
      <FooterWords>2022 Churin</FooterWords>
      <FooterBackgroundImage src={tree} alt="backgroud" />
    </Body>

  );
}
