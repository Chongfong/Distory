import React from 'react';
import PropTypes from 'prop-types';

import {
  SetArticleShowImageDiv, SetArticleShowImageLabel,
  SetArticlePasswordTitle, SetArticleShowImgPhoto, SetArticleShowImgContainer,
  SetArticleShowImgInput, SetArticleButtonCancel, SetArticleButtonPencil,
} from './SetArticle.style';

export default function SetArticleShowImg(
  {
    articleShowImg, articleShowImgUrl, setArticleShowImgUrl,
    articleShowImgFile, setArticleShowImgFile,
  },
) {
  return (
    <SetArticleShowImgContainer>
      <SetArticlePasswordTitle>預設圖片</SetArticlePasswordTitle>
      <SetArticleShowImageDiv>
        <SetArticleShowImageLabel
          htmlFor="upload-blogImage"
        >
          <SetArticleShowImgInput
            type="file"
            accept="image/*"
            id="upload-blogImage"
            onChange={(e) => {
              setArticleShowImgUrl(URL.createObjectURL(e.target.files[0]));
              setArticleShowImgFile(e.target.files[0]);
            }}
          />
          {articleShowImgFile ? (
            <SetArticleButtonCancel
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setArticleShowImgFile();
                setArticleShowImgUrl(articleShowImg);
              }}
            >
              ×

            </SetArticleButtonCancel>
          ) : (
            <SetArticleButtonPencil>
              ✎
            </SetArticleButtonPencil>
          )}
          <SetArticleShowImgPhoto
            alt="background"
            src={articleShowImgUrl}
          />
        </SetArticleShowImageLabel>
      </SetArticleShowImageDiv>
    </SetArticleShowImgContainer>
  );
}

SetArticleShowImg.propTypes = {
  articleShowImg: PropTypes.string,
  articleShowImgUrl: PropTypes.string,
  setArticleShowImgUrl: PropTypes.func,
  articleShowImgFile: PropTypes.string,
  setArticleShowImgFile: PropTypes.func,
};

SetArticleShowImg.defaultProps = {
  articleShowImg: '',
  articleShowImgUrl: '',
  setArticleShowImgUrl: () => {},
  articleShowImgFile: '',
  setArticleShowImgFile: () => {},
};
