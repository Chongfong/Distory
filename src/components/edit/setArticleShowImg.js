import React from 'react';
import PropTypes from 'prop-types';

import { EditButton } from './editors/ImageEditor.style';

import {
  EditDiaryShowImageDiv, EditDiaryShowImageLabel,
  SetArticlePasswordTitle, SetArticleShowImgPhoto,
} from '../../pages/createNewDiary/CreateNewDiaries.style';

export default function SetArticleShowImg(
  {
    articleShowImg, articleShowImgUrl, setArticleShowImgUrl,
    articleShowImgFile, setArticleShowImgFile,
  },
) {
  return (
    <div style={{
      flex: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
    }}
    >
      <SetArticlePasswordTitle>預設圖片</SetArticlePasswordTitle>
      <EditDiaryShowImageDiv>
        <EditDiaryShowImageLabel
          htmlFor="upload-blogImage"
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-blogImage"
            onChange={(e) => {
              setArticleShowImgUrl(URL.createObjectURL(e.target.files[0]));
              setArticleShowImgFile(e.target.files[0]);
            }}
          />
          {articleShowImgFile ? (
            <EditButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setArticleShowImgFile();
                setArticleShowImgUrl(articleShowImg);
              }}
              style={{
                fontSize: '25px', position: 'absolute', bottom: '10px', left: '0px',
              }}
            >
              ×

            </EditButton>
          ) : (
            <EditButton
              style={{
                fontSize: '25px',
                position: 'absolute',
                bottom: '0px',
                left: '0px',
                transform: 'scaleX(-1)',
              }}
            >
              ✎

            </EditButton>
          )}
          <SetArticleShowImgPhoto
            alt="background"
            src={articleShowImgUrl}
          />
        </EditDiaryShowImageLabel>
      </EditDiaryShowImageDiv>
    </div>
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
