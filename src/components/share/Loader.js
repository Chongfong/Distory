import React from 'react';
import styled from 'styled-components';

import loading from '../../img/playingboy.png';

const LoaderDiv = styled.div`
  top: 50%;
  left: 45%;
  position: fixed;
  transform: translateY(-50%);
`;

export const SpinnerDiv = styled.div`
  border: 10px solid #cccccc60;
  border-top: 10px solid #d3b092;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  display: ${(props) => (props.imgLoading ? 'block' : 'none')};

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

export default function Loader() {
  return (
    <LoaderDiv>
      <img src={loading} alt="loading" />
      <p>Loading...</p>
    </LoaderDiv>
  );
}
