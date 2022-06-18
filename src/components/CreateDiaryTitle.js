import React from 'react';
import PropTypes from 'prop-types';

export default function CreateNewDiaryTitle({ titleValue, setTitleValue }) {
  return (
    <input onChange={(e) => setTitleValue(e.target.value)} defaultValue={titleValue} />
  );
}

CreateNewDiaryTitle.propTypes = {
  titleValue: PropTypes.string,
  setTitleValue: PropTypes.func,
};

CreateNewDiaryTitle.defaultProps = {
  titleValue: 'Please enter the title',
  setTitleValue: () => {},
};
