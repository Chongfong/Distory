import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import addImageIcon from '../img/add-image.png';

const CreateDiaryUploadImage = styled('div')`
  width: 50px;
  height: 50px; 
  position: absolute;
  right: 20px;
  bottom: 90px;
  border-radius: 50%;
  border: #BDC0BA 2px solid;
  background-color: white;
  text-align: center;
  font-size: 25px;
  line-height: 50px;
`;

const CreateDiaryUploadImageIcon = styled.img`
  width: 25px;
  height: 25px;
  line-height: 50px;
  color: #ccc
`;

const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 100;
  width: 10.5em;
`;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
  &:hover {
    color: #fd9e46;
  }
`;

export default function DropDownButton(
  { setLoadFromFile, setLoadFromUrl, setImageUrl },
) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const uploadFromFile = () => {
    setImageUrl();
    setSelectedOption('上傳圖片');
    setLoadFromUrl(false);
    setLoadFromFile(true);
    setIsOpen(false);
  };

  const uploadFromUrl = () => {
    setImageUrl();
    setSelectedOption('圖片網址');
    setLoadFromFile(false);
    setLoadFromUrl(true);
    setIsOpen(false);
  };

  return (
    <>
      <CreateDiaryUploadImage onClick={toggling} onKeyUp={toggling} role="button" tabIndex={0}>
        <CreateDiaryUploadImageIcon src={addImageIcon} alt="addImageIcon" />
      </CreateDiaryUploadImage>
      {isOpen && (
      <DropDownListContainer>
        <DropDownList>
          <ListItem onClick={uploadFromFile} key={Math.random()}>
            上傳圖片
          </ListItem>
          <ListItem onClick={uploadFromUrl} key={Math.random()}>
            圖片網址
          </ListItem>
        </DropDownList>
      </DropDownListContainer>
      )}
    </>
  );
}

DropDownButton.propTypes = {
  setLoadFromFile: PropTypes.func,
  setLoadFromUrl: PropTypes.func,
  setImageUrl: PropTypes.func,
};

DropDownButton.defaultProps = {
  setLoadFromFile: () => {},
  setLoadFromUrl: () => {},
  setImageUrl: () => {},
};
