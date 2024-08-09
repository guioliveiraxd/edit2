import { useEffect, useState } from "react";
import { DetailsLive } from ".";
import VimeoComponent from "../../../components/Atoms/VimeoComponent/LiveClassVimeoComponent";
import LiveSideMenu from "./component/LiveSideMenu";
import { useAuth } from "../../../hooks/auth";
import {
  SchoolLevel,
  SchoolLevelSubject,
  SchoolLiveClasses,
} from "../../../models/SchoolModels";
import * as S from "./styles";

interface Props {
  detailsLiveOptions: DetailsLive[] | undefined;
  filter: SchoolLevelSubject[] | undefined;
  handleFilter(item: any): void;
  isLoading: boolean;
  schoolClass: SchoolLiveClasses[] | undefined;
  schoolLevel: SchoolLevel[] | undefined;
  handleCourseClass: Function;
  handleLevelId: Function;
}

const DefaultView = ({
  detailsLiveOptions,
  filter,
  handleFilter,
  isLoading = false,
  schoolClass,
  schoolLevel,
  handleCourseClass,
  handleLevelId,
}: Props) => {
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [positionVideo, setPositionVideo] = useState(0);
  const { user } = useAuth();

  const filters: string[] = [];
  filter && filter.forEach((filter) => filters.push(filter.title));

  // console.log("filter", detailsLiveOptions); // -> aqui fica o array inicia com item e fica vazio

  const path = window.location.pathname;

  useEffect(() => {
    if (user.profileid === "Teacher") {
      setSelectedPosition(0);
      setPositionVideo(0);
    }
  }, []);

  return (
    <S.Container>
      <LiveSideMenu
        firstItem={
          detailsLiveOptions && {
            key: detailsLiveOptions[0]?.position.toString(),
            value: detailsLiveOptions[0]?.title,
          }
        }
        courseSeasonOptions={detailsLiveOptions}
        firstFilter={{
          key: Object.keys(filters)[0],
          value: filters[0],
        }}
        filters={filters}
        onFilterChage={handleFilter}
        isLoading={isLoading}
        videos={schoolClass}
        onVideoChange={(item) => {
          setPositionVideo(item.position);
          setSelectedPosition(item.position);
        }}
        selectedPosition={selectedPosition}
        schoolClass={schoolClass}
        schoolLevel={schoolLevel}
        onSeasonChange={(item) => {
          setSelectedPosition(0);
          setPositionVideo(0);
          handleCourseClass(item);
        }}
        handleLevelId={handleLevelId}
      />

      <S.StyledSeparator type="vertical" customHeight={100} />

      <S.Content>
        <S.VideoContainer>
          {schoolClass && schoolClass.length > 0 && (
            <>
              <VimeoComponent url={schoolClass[positionVideo].url} />
            </>
          )}
        </S.VideoContainer>
      </S.Content>
    </S.Container>
  );
};

export default DefaultView;
