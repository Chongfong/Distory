import React from 'react';
import PropTypes from 'prop-types';

import { CreateDiaryTitle } from '../pages/CreateNewDiaries.style';

export default function CreateNewDiaryTitle({ titleValue, setTitleValue }) {
  return (
    <CreateDiaryTitle
      onChange={(e) => setTitleValue(e.target.value)}
      placeholder={titleValue}
    />
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
