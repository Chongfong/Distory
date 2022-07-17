import styled from 'styled-components';

export const Body = styled.div`
  width: 98vw;
  position: relative;
  height: auto;
  padding-bottom: 30px;
`;

export const FooterBackgroundImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.3;
  z-index: -1;
@media (max-width: 500px) {
  width: 300px;
  height: auto;
  right: 0px;
}
`;

export const FooterWords = styled.div`
  bottom: 20px;
  text-align: center;
  color: #b8b8b8;
  margin: 0px auto 20px;
  `;
