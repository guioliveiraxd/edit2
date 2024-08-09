import { SchoolLevel, SchoolLiveClasses } from '../../../../../models/SchoolModels';
import { Course } from '../../../../../models/CourseModels';

import VideoCard from '../../../../../components/Atoms/VideoCard/LiveClassVideoCard';

import ShimmerVideoCard from '../../../../../components/Atoms/Shimmer/VideoCard';

import Dropdown from '../../../../../components/Atoms/Dropdown';

import Separator from '../../../../../components/Atoms/Separator';
import * as S from './styles';
import { IoVideocamOutline } from 'react-icons/io5';
import Button from '../../../../../components/Atoms/Button';
import { DetailsLive } from '../../../LiveClasses';

interface SelectItems {
  key: string;
  value: string;
}

interface CourseSideMenuProps {
  courseDetails?: Course;
  courseSeasonOptions?: DetailsLive[] | undefined;
  filters?: Array<string>;
  firstFilter?: { key: string; value: string };
  firstItem?: SelectItems;
  isLoading?: boolean;
  isLoadingInfo?: boolean;
  videos?: SchoolLiveClasses[];
  selectedPosition?: number;
  onSeasonChange?(item: any): void;
  onVideoChange(video: SchoolLiveClasses): void | undefined;
  onFilterChage(item: any): void;
  schoolClass: SchoolLiveClasses[] | undefined;
  schoolLevel: SchoolLevel[] | undefined;
  handleLevelId: Function;
}

const LiveSideMenu = ({
  courseDetails,
  courseSeasonOptions,
  filters,
  firstFilter = { key: '', value: '' },
  firstItem = { key: '', value: '' },
  isLoading = false,
  isLoadingInfo = false,
  selectedPosition = 0,
  videos = [],
  onSeasonChange,
  onVideoChange,
  onFilterChage,
  schoolClass,
  schoolLevel,
  handleLevelId,
}: CourseSideMenuProps) => {
  return (
    <S.Container customType="">
      <S.Header>
        <IoVideocamOutline className="IconHeader" />
        <p>Ao Vivo</p>
      </S.Header>

      <S.ClassesArea>
        {schoolLevel &&
          schoolLevel.map((item, key) => (
            <div style={{ marginRight: '22px' }} key={key}>
              <Button
                loading={isLoading}
                bolder={true}
                contrast={true}
                noShaddow={true}
                onClick={() => handleLevelId(item)}
                customStyle={
                  schoolClass ? (schoolClass[0]?.levelid === item.levelid ? 'selected' : '') : ''
                }
              >
                {item.title}
              </Button>

              {/* <Button
                loading={isLoading}
                bolder={true}
                contrast={true}
                noShaddow={true}
                customStyle={
                  changeSelectedSchool === item.levelid ? "selected" : ""
                }
                onClick={() => {
                  handleLevelId(item);
                }}
              >
                {item.title}
              </Button> */}
            </div>
          ))}
      </S.ClassesArea>

      <Separator type="horizontal" />

      <S.Content>
        <S.FilterContainer>
          <>
            <p>Escolha</p>
            <div className="subject-select">
              {courseSeasonOptions && courseSeasonOptions[0] && (
                <Dropdown
                  arrowColor="#ffd35c"
                  textColor="#ffd35c"
                  title="Selecionar aula"
                  items={
                    courseSeasonOptions &&
                    courseSeasonOptions.map(option => ({
                      key: option.position.toString(),
                      value: option.title,
                    }))
                  }
                  defaultValue={isLoading ? { key: '', value: '' } : firstItem}
                  isLoading={isLoading}
                  onChange={onSeasonChange}
                  customFontSize={21}
                  size="small"
                />
              )}
            </div>
            {filters && filters[0] && filters[0] !== '' && filters[0] !== ' ' && (
              <div className="class-select">
                <Dropdown
                  title="Escolha a aula"
                  arrowColor="#ffff"
                  textColor="#ffff"
                  backgroundCollor="#171a21"
                  customRadius={30}
                  customHeight={30}
                  customFontSize={11}
                  items={
                    filters
                      ? filters.map((filter, key) => ({
                          key: key.toString(),
                          value: filter,
                        }))
                      : [{ key: '1', value: '1' }]
                  }
                  defaultValue={firstFilter}
                  isLoading={false}
                  size="small"
                  onChange={item => onFilterChage(item)}
                />
              </div>
            )}
          </>
        </S.FilterContainer>
        <S.VideosScrollContainer className="hasVerticalScroll">
          {videos.length > 0 &&
            !isLoading &&
            videos.map((video, index) => (
              <VideoCard
                key={video.position}
                index={index + 1}
                video={video}
                isWatching={video.position === selectedPosition}
                onSelect={onVideoChange}
                exercisePreviewActive={false}
              />
            ))}
          {isLoading && videos.length < 1 && (
            <>
              <ShimmerVideoCard type="small" />
              <ShimmerVideoCard type="small" />
              <ShimmerVideoCard type="small" />
              <ShimmerVideoCard type="small" />
              <ShimmerVideoCard type="small" />
            </>
          )}
        </S.VideosScrollContainer>
      </S.Content>
    </S.Container>
  );
};

export default LiveSideMenu;
