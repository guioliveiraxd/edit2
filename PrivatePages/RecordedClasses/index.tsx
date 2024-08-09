import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/auth";
import {
  SchoolLevel,
  SchoolLevelSubject,
  SchoolLiveClasses,
} from "../../../models/SchoolModels";
import api from "../../../services/api";
import DefaultView from "./DefaultView";

export interface DetailsLive {
  description: string;
  levelid: string;
  position: number;
  profileid: string;
  schoolid: string;
  subjectid: string;
  title: string;
  visibility: string;
}

const LiveClasses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<DetailsLive[]>();
  const [liveClaVimeo, setLiveClaVimeo] = useState<SchoolLevelSubject[]>();
  const [schoolClass, setSchoolClass] = useState<SchoolLiveClasses[]>();
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel[]>();

  const [newLevelId, setNewLevelId] = useState<string>();

  const { user } = useAuth();

  let history = useHistory();

  async function getInformationRequest(item: string) {
    setIsLoading(true);
    const response1 = await api.get(
      // retorna informações pro primeiro select --- ok
      `/school/level/subject?schoolid=${user.schoolid}&levelid=${item}`
    );

    const response3 = await api.get(
      // retorna os videos e informações para o segundo select --- ok
      // `/school/live/level/subject/class?schoolid=${user.schoolid}&levelid=${item}&subjectid=Reuni%C3%B5es&userid=${user.userid}`
      `/school/level/subject/season?schoolid=${user.schoolid}&levelid=${item}&subjectid=${response1.data[0].subjectid}`
    );
    const response2 = await api.get(
      // retorna informações da turma --- ok
      `/school/level/subject/season/class?schoolid=${user.schoolid}&levelid=${item}&subjectid=${response1.data[0].subjectid}&seasonid=${response3.data[0].seasonid}&userid=${user.userid}`
    );
    const response4 = await api.get(
      // retorna os elementos pra selecionar a turma --- ok
      `/school/level?schoolid=${user.schoolid}`
    );

    setCategory(response1.data);
    setSchoolClass(response2.data);
    setLiveClaVimeo(response3.data);
    setSchoolLevel(response4.data);
    setIsLoading(false);
  }

  useEffect(() => {
    const paramter = user.levelid !== " " ? user.levelid : "2Ano";
    getInformationRequest(paramter);
    setNewLevelId(paramter);
  }, []);

  const handleCourseClass = async (item: any) => {
    setLiveClaVimeo([]);
    setSchoolClass([]);

    const response3 = await api.get(
      `/school/level/subject/season?schoolid=${user.schoolid}&levelid=${newLevelId}&subjectid=${item.value}`
    );

    if (response3.data.length > 0) {
      const response2 = await api.get(
        `/school/level/subject/season/class?schoolid=${user.schoolid}&levelid=${newLevelId}&subjectid=${item.value}&seasonid=${response3.data[0].seasonid}&userid=${user.userid}`
      );

      setSchoolClass(response2.data);
      setLiveClaVimeo(response3.data);
    } else {
      setLiveClaVimeo([]);
      setSchoolClass([]);
    }
  };

  const handleLevelId = async (item: SchoolLevel) => {
    setCategory([]);
    setLiveClaVimeo([]);
    setSchoolClass([]);

    setNewLevelId(item.levelid);

    const response1 = await api.get(
      // retorna informações pro primeiro select --- ok
      `/school/level/subject?schoolid=${user.schoolid}&levelid=${item.levelid}`
    );

    const response3 = await api.get(
      // retorna os videos e informações para o segundo select --- ok
      `/school/level/subject/season?schoolid=${user.schoolid}&levelid=${item.levelid}&subjectid=${response1.data[0].subjectid}`
    );
    const response2 = await api.get(
      // retorna informações da turma --- ok
      `/school/level/subject/season/class?schoolid=${user.schoolid}&levelid=${item.levelid}&subjectid=${response1.data[0].subjectid}&seasonid=${response3.data[0].seasonid}&userid=${user.userid}`
    );

    setCategory(response1.data);
    setSchoolClass(response2.data);
    setLiveClaVimeo(response3.data);
  };

  const handleFilter = async (item: any) => {
    const seasonid =
      liveClaVimeo &&
      liveClaVimeo.filter((seasonid) => {
        if (seasonid.title === item.value) {
          return seasonid;
        }
      });

    if (seasonid && seasonid.length > 0) {
      setSchoolClass([]);
      const response2 = await api.get(
        // retorna informações da turma --- ok
        `/school/level/subject/season/class?schoolid=${user.schoolid}&levelid=${newLevelId}&subjectid=${seasonid[0].subjectid}&seasonid=${seasonid[0].seasonid}&userid=${user.userid}`
      );
      setSchoolClass(response2.data);
    }
  };

  return (
    <>
      <DefaultView
        detailsLiveOptions={category}
        filter={liveClaVimeo}
        handleFilter={handleFilter}
        isLoading={isLoading}
        schoolClass={schoolClass}
        schoolLevel={schoolLevel}
        handleCourseClass={handleCourseClass}
        handleLevelId={handleLevelId}
      />
    </>
  );
};

export default LiveClasses;
