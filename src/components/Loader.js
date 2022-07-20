import React from 'react';
import styled from 'styled-components';

import loading from '../img/playingboy.png';

const LoaderDiv = styled.div`
  top: 50%;
  left: 45%;
  position: fixed;
  transform: translateY(-50%);
`;

export default function Loader() {
  return (
    <LoaderDiv>
      <img src={loading} alt="loading" />
      <p>Loading...</p>
    </LoaderDiv>
  );
}
