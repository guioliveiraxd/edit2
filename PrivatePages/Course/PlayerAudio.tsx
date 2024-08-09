import { useEffect, useState } from "react";
import { CourseSeasonMovie } from "../../../models/CourseModels";

import AudioPlayer from "../../../components/Atoms/AudioPlayer";

import * as S from "./styles";

interface Props {
  isAudio: CourseSeasonMovie[];
  isLoading: boolean;
  selectedPosition: number;
}

const PlayerAudio = ({ isAudio, isLoading, selectedPosition }: Props) => {
  const [trackIndex, setTrackIndex] = useState(0);
  // console.log("aqui", isAudio[trackIndex]?.url);

  useEffect(() => {
    setTrackIndex(selectedPosition);
  }, [selectedPosition]);

  return (
    <S.WrapperAudio>
      {isLoading && (
        <S.AudioContainer>
          <img
            src={isAudio.length > 0 ? isAudio[trackIndex].thumb : ""}
            alt={isAudio.length > 0 ? isAudio[trackIndex].movieid : ""}
          />
          <AudioPlayer source={isAudio} trackIndex={trackIndex} />
        </S.AudioContainer>
      )}
    </S.WrapperAudio>
  );
};

export default PlayerAudio;
