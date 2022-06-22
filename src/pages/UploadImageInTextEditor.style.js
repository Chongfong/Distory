import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownContainer = styled('div')`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled('div')`
  margin-bottom: 0em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
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
  { setLoadFromFile, setLoadFromUrl, setImgUrl },
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const uploadFromFile = () => {
    setImgUrl();
    setSelectedOption('上傳圖片');
    setLoadFromUrl(false);
    setLoadFromFile(true);
    setIsOpen(false);
  };

  const uploadFromUrl = () => {
    setImgUrl();
    setSelectedOption('圖片網址');
    setLoadFromFile(false);
    setLoadFromUrl(true);
    setIsOpen(false);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>
        {selectedOption || '插入圖片'}
      </DropDownHeader>
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
    </DropDownContainer>
  );
}

DropDownButton.propTypes = {
  setLoadFromFile: PropTypes.func,
  setLoadFromUrl: PropTypes.func,
  setImgUrl: PropTypes.func,
};

DropDownButton.defaultProps = {
  setLoadFromFile: () => {},
  setLoadFromUrl: () => {},
  setImgUrl: () => {},
};
