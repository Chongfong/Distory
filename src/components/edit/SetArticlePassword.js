import React from 'react';
import PropTypes from 'prop-types';
import { SetArticleContainer, SetArticleCreateDiaryTitle, SetArticlePasswordTitle } from './SetArticle.style';

export default function SetArticlePassword(
  {
    articlePassword, setArticlePassword, articlePasswordHint, setArticlePasswordHint,
  },
) {
  return (
    <>
      <SetArticleContainer>
        <SetArticlePasswordTitle>設定密碼</SetArticlePasswordTitle>
        <SetArticleCreateDiaryTitle
          placeholder="選填"
          type="password"
          value={articlePassword}
          onChange={(e) => setArticlePassword(e.target.value)}
        />
      </SetArticleContainer>
      <SetArticleContainer>
        <SetArticlePasswordTitle>密碼提示</SetArticlePasswordTitle>
        <SetArticleCreateDiaryTitle
          placeholder="選填"
          type="input"
          value={articlePasswordHint}
          onChange={(e) => setArticlePasswordHint(e.target.value)}
        />
      </SetArticleContainer>

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
