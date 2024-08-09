import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { DetailsLive } from ".";
import VimeoComponent from "../../../components/Atoms/VimeoComponent/LiveClassVimeoComponent";
import LiveSideMenu from "../../../components/Mols/SideMenus/LiveSideMenu";
import { useAuth } from "../../../hooks/auth";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { SchoolLevel, SchoolLiveClasses } from "../../../models/SchoolModels";
import * as S from "./styles";

interface Props {
  detailsLiveOptions: DetailsLive[] | undefined;
  couseList: SchoolLiveClasses[] | undefined;
  filter: SchoolLiveClasses[] | undefined;
  handleFilter(item: any): void;
  handleIsMobileModalVideo(): any;
  isMobileModalVideo: boolean;
  isLoading: boolean;
  schoolClass: SchoolLiveClasses[] | undefined;
  schoolLevel: SchoolLevel[] | undefined;
  handleCourseClass: Function;
  handleLevelId: Function;
}

const DefaultView = ({
  detailsLiveOptions,
  couseList,
  filter,
  handleFilter,
  isLoading = false,
  schoolClass,
  schoolLevel,
  handleCourseClass,
  handleLevelId,
  isMobileModalVideo,
  handleIsMobileModalVideo,
}: Props) => {
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [positionVideo, setPositionVideo] = useState(0);
  const { user } = useAuth();

  const filters: string[] = [];
  filter && filter.forEach((filter) => filters.push(filter.filter));

  const path = window.location.pathname;
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    if (user.profileid === "Teacher") {
      setSelectedPosition(0);
      setPositionVideo(0);
    }
  }, [path]);

  return (
    <S.Container>
      <LiveSideMenu
        firstItem={
          detailsLiveOptions && {
            key:
              detailsLiveOptions.length > 0
                ? detailsLiveOptions[0].position.toString()
                : "",
            value:
              detailsLiveOptions.length > 0 ? detailsLiveOptions[0].title : "",
          }
        }
        courseSeasonOptions={
          detailsLiveOptions &&
          detailsLiveOptions.map((option) => ({
            key: option.position.toString(),
            value: option.title,
          }))
        }
        firstFilter={{
          key: Object.keys(filters)[0],
          value: filters[0],
        }}
        filters={filters}
        onFilterChage={handleFilter}
        isLoading={isLoading}
        videos={couseList}
        onVideoChange={(item) => {
          setPositionVideo(parseInt(item.classid));
          setSelectedPosition(parseInt(item.classid));
          handleIsMobileModalVideo();
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
        <S.VideoContainer
          style={
            windowDimensions && windowDimensions.width < 980
              ? {
                  display: isMobileModalVideo ? "flex" : "none",
                }
              : {}
          }
        >
          {filter && filter.length > 0 && (
            <S.OverlayVideoModal>
              <>
                <FaWindowClose
                  className="close_video"
                  onClick={handleIsMobileModalVideo}
                />
                <VimeoComponent url={filter[positionVideo].url} />
              </>
            </S.OverlayVideoModal>
          )}
        </S.VideoContainer>
        <S.AnnotationsContainer hasNotes={true}>
          {filter &&
            filter.length > 0 &&
            filter[positionVideo] &&
            filter[positionVideo]?.urlfiles && (
              <>
                <h3 className="support_material">
                  <a
                    href={filter[positionVideo]?.urlfiles}
                    target="_blank"
                    download
                  >
                    Material de Apoio
                  </a>
                </h3>
              </>
            )}
        </S.AnnotationsContainer>
      </S.Content>
    </S.Container>
  );
};

export default DefaultView;
