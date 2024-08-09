import styled from 'styled-components';
import Separator from '../../../components/Atoms/Separator';

export const Container = styled.div`
  display: flex;

  align-items: center;
  margin-top: 20px;

  height: 88vh;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    max-width: 100%;
    overflow-x: hidden;

    margin-top: 10px;
  }

  @media (max-height: 580px) {
    margin-top: 110px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 0 10px;
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 24px;

  margin-bottom: auto;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

export const StyledSeparator = styled(Separator)`
  height: 100% !important;

  @media (max-width: 768px) {
    display: none;
  }
`;
