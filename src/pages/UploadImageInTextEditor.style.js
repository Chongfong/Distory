import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';

export const CreateDiaryUploadImage = styled('div')`
  width: 50px;
  height: 50px; 
  position: fixed;
  right: 80px;
  bottom: 210px;
  border-radius: 50%;
  border: #7f0019 2px solid;
  background-color: white;
  text-align: center;
  font-size: 25px;
  line-height: 50px;
  cursor: pointer;
  color: #7f0019;
  :hover{
    background-color: #7f0019;
    color: #7f0019;
    ::after{
      color: white;
      content:'加圖';
      position: absolute;
      top: -2px;
      left: 8px;
      font-size: 18px;
    }
  }

  @media (max-width: 912px) {
  width: 35px;
  height: 35px;
  font-size: 18px;
  line-height: 35px;
  right: 40px;
  bottom: 155px;
  :hover{
    ::after{
      top: 0px;
      left: 5px;
      font-size: 12px;
    }
}}
`;

export const CreateDiaryUploadImageIcon = styled.img`
  width: 25px;
  height: 25px;
  line-height: 50px;
  color: #ccc
`;

export const UploadImageTitle = styled.div`
  font-size: 1.2rem;
  text-align: left;
  margin-bottom: 20px;
  flex-basis: 100%;
`;

export const UploadNavBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

export const UploadImageNavButtom = styled.div`
  width: 50%;
  text-align: center;
  border-bottom: ${({ selected }) => (selected ? '4px solid #ccc' : '2px solid #ccc')};
  cursor: pointer;
  :hover, :focus, :active {
    border-bottom: 4px solid #ccc;
  }
`;

export const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content:flex-start;
  justify-content: flex-end;
`;

export const UploadImageContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  height: 73%;
  border: solid 1px #ccc;
  border-radius: 20px;
  overflow-y: auto;
  ::-webkit-scrollbar {
  height: 3px;
  width: 7px;
  }
  ::-webkit-scrollbar-thumb {
  background: #cabeba;
  border-radius: 10px;
}
`;

export const UploadImageFromUrl = styled.input`
  width: 80%;
  height: 25px;
  border:none;
  border-bottom: solid 1px #ccc;
  margin-top: 30px;
`;

export const UploadImagePreviewImage = styled.img`
  max-width: 80%;
  max-height: 160px;
  margin-top: 10px;
`;

export default function DropDownButton(
  {
    isOpen, setIsOpen,
  },
) {
  const toggling = () => setIsOpen(!isOpen);

  return (
    <CreateDiaryUploadImage onClick={toggling} onKeyUp={toggling} role="button" tabIndex={0}>
      <RiImageAddLine />
    </CreateDiaryUploadImage>
  );
}

DropDownButton.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

DropDownButton.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};
