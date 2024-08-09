import styled, { css } from 'styled-components';
import Button from '../../../components/Atoms/Button';
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

  svg.close_video {
    display: none;
  }

  @media (max-width: 768px) {
    padding-top: 0;
    display: none;
    margin-bottom: 0;
    height: 0;
    padding: 0;

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

    div[from='course'] {
      height: 80%;
    }
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

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AddNoteWrapper = styled.div`
  position: absolute;

  width: 200px;
  height: auto;

  right: 0;
  top: 0;

  margin-top: -26px;
  z-index: 2;

  @media (max-width: 768px) {
    left: 1rem;
    top: 4rem;
  }
`;

export const StyledButton = styled(Button)`
  width: 160px;
  height: 30px;

  font-size: 12px;
`;

export const NotesWrapper = styled.div`
  display: flex;
  overflow: scroll;
  flex-direction: column;
  padding: 32px 128px;

  width: 100%;

  &::-webkit-scrollbar-thumb {
    background: rgb(254, 212, 74) !important;
  }
`;

export const SaveNoteButton = styled(Button)`
  width: 180px;
  height: 40px;

  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;

  font-family: 'Raleway';
  font-size: 12px;
  font-weight: normal;
`;

export const CloseModalButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;

  margin-top: 8px;
  margin-right: 8px;

  img {
    opacity: 1;
    width: 20px;

    transition: 0.4s;
  }

  &:hover {
    transform: scaleX(1.04) scaleY(1.04);

    img {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export const StyledSeparator = styled(Separator)`
  height: 100% !important;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AudioContainer = styled.div`
  width: 100%;
  img {
    margin-bottom: 20px;
    border-radius: 6px;
  }
`;

export const WrapperAudio = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 90px 150px;
  border-radius: 5px;
`;
