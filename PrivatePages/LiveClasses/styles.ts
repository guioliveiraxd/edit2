import styled, { css } from 'styled-components';
import Separator from '../../../components/Atoms/Separator';

interface AnnotationsContainerProps {
  hasNotes: boolean;
}

export const Container = styled.div`
  display: flex;

  align-items: center;
  margin-top: 20px;

  height: 88vh;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    margin-top: 1rem;
  }

  @media (max-width: 425px) {
    height: 88vh;
    width: 100%;
  }

  @media (max-height: 580px) {
    margin-top: 110px;
  }
`;

export const StyledSeparator = styled(Separator)`
  height: 100% !important;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 0 10px;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 24px;

  margin-bottom: auto;

  svg.close_video {
    display: none;
  }

  @media (max-width: 768px) {
    padding-top: 0;

    svg.close_video {
      z-index: 7;
      display: block;

      color: #fff;
      fill: #fff;
      font-size: 2rem;

      position: fixed;
      top: 1rem;
      right: 1rem;
    }
  }

  @media (max-width: 425px) {
    padding: 0;
  }
`;

export const OverlayVideoModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  margin: 0 auto;

  @media (max-width: 768px) {
    background-color: var(--main_black_color);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 6;
    padding: 0.5rem;
  }
`;

export const AnnotationsContainer = styled.div<AnnotationsContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 40%;

  ${props =>
    !props.hasNotes &&
    css`
      height: 30%;
    `}

  background: rgba(0,0,0,0.0);

  &::-webkit-scrollbar-thumb {
    background: rgb(254, 212, 74) !important;
  }

  h2 {
    margin-left: 1rem;
    color: #fff;
  }

  h3.support_material {
    margin-left: 1rem;
    margin-top: 1rem;
    color: #fff;

    a {
      margin-left: 0.5rem;
      color: rgb(254, 212, 74);
    }
  }
`;
