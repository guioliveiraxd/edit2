import styled, { css } from "styled-components";
import Separator from "../../../../../components/Atoms/Separator";
import Skeleton from "../../../../../components/Skeleton";

interface ContainerProps {
  customType?: string;
}

interface HorizontalSelectContainerProps {
  isLoading: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  /* background: ${(props) =>
    props.customType === "recordedClasses" ? "rgba(0,0,0,0.00)" : "#242a39"}; */
  background: rgba(0, 0, 0, 0.01);

  font-family: "Raleway";
  color: #e7eaf2;

  min-width: 408px !important;
  height: 100%;

  padding: 0 4px 0 20px;

  h3 {
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;

    margin-bottom: 4px;
    margin-right: auto;
    padding: 4px 12px;

    svg {
      margin-right: 12px;
      transition: color 0.4s;
      &:hover {
        color: rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }
    }
  }
`;

export const LinkButton = styled.a`
  text-decoration: none;
  font-size: 12px;
  text-align: center;
`;

export const ButtonLive = styled.button`
  background: rgb(254, 212, 74);
  border-radius: 30px;
  height: 33px;
  border: 0px;
  padding: 0px 16px;
  font-family: Raleway, sans-serif;
  color: rgb(53, 53, 54);
  box-shadow: none;
  font-weight: bolder !important;
  text-transform: uppercase;

  display: flex;
  align-items: center;

  transition: 0.2s ease 0s;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  .iconLive {
    margin-left: 4px;
    font-size: 1.3rem;
  }
`;

export const ClassesArea = styled.div`
  max-width: 384px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: auto;

  min-height: 80px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    display: unset;
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(171, 177, 197);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #161a21;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #303236;
    width: 1px;
  }
`;

export const Header = styled.header`
  display: flex;
  color: rgb(255, 255, 255);
  margin-left: 2px;
  p {
    font-size: 22px;
    font-family: Roboto;
    margin-left: 12px;
  }
  .IconHeader {
    font-size: 1.8rem;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  font-family: "Raleway", sans-serif;
  color: #fff;

  img {
    width: 340px;
    height: 160px;
    object-fit: cover;
    margin-bottom: 12px;
  }

  p {
    width: 340px;
    /* text-align: center; */
    margin-bottom: 8px;
  }
`;

export const ContentHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  -webkit-box-align: center;
  width: 100%;
  height: 79px;
  margin-bottom: 20px;
  margin-top: 12px;
  border: 2px solid rgb(122, 128, 149);
  border-radius: 10px;
  padding: 0px 15px 0px;
  transition: all 0.4s ease 0s;
`;

export const ContentTextHeading = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-left: 20px;
    margin-top: 6px;
    color: rgb(255, 211, 92);
    max-width: 240px;
    font-family: Roboto;
    font-size: 14px;
  }
`;

export const WrappetTextTitle = styled.div`
  display: flex;

  p {
    margin: 2px 12px 0px 0px;
    color: rgb(255, 255, 255);
    font-family: Roboto;
    font-size: 14px;
    width: 10px;
  }
  h4 {
    color: rgb(255, 255, 255);
    font-weight: normal;
  }
`;

export const HorizontalSelectContainer = styled.div<HorizontalSelectContainerProps>`
  width: 100%;

  ${(props) =>
    props.isLoading &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 4px;

  width: 96%;
  height: 100%;

  overflow: scroll;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  > p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    margin-left: 9px;
  }

  .subject-select {
    display: flex;
    justify-content: flex-start;
    width: auto;
    margin-top: 8px;
  }

  .class-select {
    display: flex;
    width: auto;
    margin-left: 8px;

    margin-top: 10px;
    margin-bottom: 12px;
  }
`;

export const VideosScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  padding: 0 4px 32px 0;
`;

export const ShimmerMovieBanner = styled(Skeleton)`
  width: 320px;
  height: 160px;
  margin-bottom: 12px;
`;

export const ShimmerMovieTitle = styled(Skeleton)`
  width: 100px;
  height: 20px;
  margin-top: 12px;
`;

export const StyledSeparator = styled(Separator)`
  height: 100% !important;

  @media (max-width: 768px) {
    display: none;
  }
`;
