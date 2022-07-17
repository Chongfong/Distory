import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import share from '../img/share.png';

import { InteractiveImage } from '../pages/BlogArticle.style';

export default function Share({ url, title }) {
  const shareData = {
    url: `${url}`,
    title: 'Distory',
    text: `${title}`,
  };

  async function shareDistoryUrl() {
    try {
      await navigator.share(shareData);
    } catch (err) {
      toast('請重新嘗試', {
        autoClose: 3500,
      });
    }
  }

  return (
    <>
      <div
        onClick={() => {
          shareDistoryUrl();
        }}
        onKeyUp={() => {
          shareDistoryUrl();
        }}
        role="button"
        tabIndex={0}

      >
        <InteractiveImage src={share} alt="share" />

      </div>
      {}
    </>
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
