import React, { Ref } from "react";

import { convertSecondsToHoursMinutesSeconds } from "../../../../../utils/functions";
import Loading from "../../../../../components/Atoms/Loading";

import closeIconGray from "../../../../../assets/icons/closeIcongray.png";

import {
  Container,
  AddContainer,
  AddHeader,
  AddBody,
  CloseModalButton,
  SaveNoteButton,
} from "./styles";

interface AnnotationModalProps {
  isAddingNote?: boolean;
  actualTime: {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
  };
  addNoteInputRef: Ref<HTMLInputElement>;
  setShowAddNote(state: boolean): void;
  setIsPlaying(state: boolean): void;
  handleAddNote(action: string): void;
}

const AnnotationModal: React.FC<AnnotationModalProps> = ({
  isAddingNote,
  actualTime,
  setIsPlaying,
  addNoteInputRef,
  setShowAddNote,
  handleAddNote,
}) => {
  return (
    <Container>
      <AddContainer>
        <AddHeader>
          <p>
            {`${convertSecondsToHoursMinutesSeconds(actualTime.playedSeconds)}`}
          </p>
          <CloseModalButton
            onClick={() => {
              setShowAddNote(false);
              setIsPlaying(true);
            }}
          >
            <img className="edit" src={closeIconGray} alt="closeIcon" />
          </CloseModalButton>
        </AddHeader>
        <AddBody>
          <input type="text" ref={addNoteInputRef} />
          <SaveNoteButton
            customStyle="white"
            onClick={() => handleAddNote("submitNote")}
          >
            {isAddingNote ? (
              <Loading size={2} type="ellipsis" />
            ) : (
              "SALVAR COMENTÁRIO"
            )}
          </SaveNoteButton>
        </AddBody>
      </AddContainer>
    </Container>
  );
};

export default AnnotationModal;
