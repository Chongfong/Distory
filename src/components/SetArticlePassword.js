import React from 'react';
import PropTypes from 'prop-types';

import { CreateDiaryTitle } from '../pages/CreateNewDiaries.style';

export default function SetArticlePassword(
  {
    articlePassword, setArticlePassword, articlePasswordHint, setArticlePasswordHint,
  },
) {
  return (
    <>
      <div style={{ flex: '100%', display: 'flex', flexWrap: 'no-wrap' }}>
        <p style={{ flex: '30%' }}>設定密碼</p>
        <CreateDiaryTitle
          style={{ flex: '70%' }}
          type="password"
          value={articlePassword}
          onChange={(e) => setArticlePassword(e.target.value)}
        />
      </div>
      <div style={{ flex: '100%', display: 'flex', flexWrap: 'no-wrap' }}>
        <p style={{ flex: '30%' }}>密碼提示</p>
        <CreateDiaryTitle
          style={{ flex: '70%' }}
          type="input"
          value={articlePasswordHint}
          onChange={(e) => setArticlePasswordHint(e.target.value)}
        />
      </div>

    </>
  );
}

SetArticlePassword.propTypes = {
  articlePassword: PropTypes.string,
  setArticlePassword: PropTypes.func,
  articlePasswordHint: PropTypes.string,
  setArticlePasswordHint: PropTypes.func,
};

SetArticlePassword.defaultProps = {
  articlePassword: '',
  setArticlePassword: () => {},
  articlePasswordHint: '',
  setArticlePasswordHint: () => {},
};
