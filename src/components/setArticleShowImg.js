import React from 'react';
import PropTypes from 'prop-types';

import { CircleButton } from '../pages/ImageEditor.style';

import { EditDiaryShowImageDiv } from '../pages/CreateNewDiaries.style';

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
      <p style={{ margin: '1em 20px' }}>預設圖片</p>
      <EditDiaryShowImageDiv>
        <label
          htmlFor="upload-blogImage"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            borderRadius: '20px',
            cursor: 'pointer',
            position: 'relative',
          }}
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
            <CircleButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setArticleShowImgFile();
                setArticleShowImgUrl(articleShowImg);
              }}
              style={{
                fontSize: '25px', position: 'absolute', bottom: '10px', right: '20px',
              }}
            >
              ×

            </CircleButton>
          ) : (
            <CircleButton
              style={{
                fontSize: '25px',
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                transform: 'scaleX(-1)',
              }}
            >
              ✎

            </CircleButton>
          )}
          <img
            alt="background"
            src={articleShowImgUrl}
            style={{
              width: '100%', maxWidth: '200px', maxHeight: '180px',
            }}
          />
        </label>
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
