import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export const CreateDiaryTitle = styled.input`
  margin: 10px auto 10px;
  padding-left: 10px;
  width: 100%;
  height: 2.5rem;
  border: #ccc 1px solid;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.5);
`;

export default function CreateNewDiaryTitle({ titleValue, setTitleValue }) {
  return (
    <CreateDiaryTitle
      onChange={(e) => setTitleValue(e.target.value)}
      value={titleValue}
    />
  );
}

CreateNewDiaryTitle.propTypes = {
  titleValue: PropTypes.string,
  setTitleValue: PropTypes.func,
};

CreateNewDiaryTitle.defaultProps = {
  titleValue: '',
  setTitleValue: () => {},
};
