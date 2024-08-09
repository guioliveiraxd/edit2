import styled, { css } from 'styled-components';
import {
  HeaderColumnItemStyles,
  HeaderColumnWrapperItemStyles,
  HeaderTitleItemStyles,
} from '../../types';

export const Container = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
`;

export const ContainerItem = styled.article`
  display: flex;
  padding: 1.5rem;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  flex-direction: column;
  max-width: 1280px;
`;

export const HeaderItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const HeaderColumnItem = styled.div<HeaderColumnItemStyles>`
  ${({ justify }) => css`
    width: 100%;
    display: flex;
    justify-content: ${justify ? 'flex-' + justify : 'flex-start'};
    gap: 1rem;
  `}
`;

export const HeaderColumnWrapperItem = styled.div<HeaderColumnWrapperItemStyles>`
  ${({ align }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 1rem;
    padding: 0.5rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: ${align ? 'flex-' + align : 'flex-start'};

    @media (max-width: 480px) {
      flex-direction: row;
    }
  `}
`;

export const HeaderImgItem = styled.img`
  width: 150px;
  height: 100px;
  display: flex;
  background-color: red;
`;

export const HeaderTitleItem = styled.p<HeaderTitleItemStyles>`
  font-size: 1.2rem;
  font-weight: 700;

  ${({ total }) =>
    total &&
    css`
      color: green;
    `}
`;

export const HeaderTextItem = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

export const HeaderTextDetailItem = styled.span`
  color: gray;
  text-decoration: underline;
  cursor: pointer;
`;

export const DividerItem = styled.hr`
  margin: 1rem 0;
  width: 100%;
  height: 2px;
  border: none;
  background-color: #dedcdc;
`;

export const CanceledTagItem = styled.div`
  background-color: red;
  padding: 0.5rem;
  border-radius: 20px;

  p {
    color: #fff;
  }
`;
