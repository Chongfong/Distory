import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import share from '../../img/share.png';

import { InteractiveImage } from '../../pages/blogArticle/BlogArticle.style';

const ShareDiv = styled.div`
  text-align: right;
  margin-right: 10px;
`;

export default function Share({ url, title }) {
  const shareData = {
    url: `${url}`,
    title: 'Distory',
    text: `${title}`,
  };

  const shareDistoryUrl = async (e) => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast('請重新嘗試', {
          autoClose: 3500,
        });
      }
    } else {
      e.clipboardData.setData('text/plain', `${url}`);
      toast('已複製網址至剪貼簿', {
        autoClose: 3500,
      });
    }
  };

  return (
    <ShareDiv
      onClick={(e) => {
        shareDistoryUrl(e);
      }}
      onKeyUp={(e) => {
        shareDistoryUrl(e);
      }}
      role="button"
      tabIndex={0}
    >
      <InteractiveImage src={share} alt="share" />

    </ShareDiv>
  );
}

Share.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

Share.defaultProps = {
  url: '',
  title: '',
};
