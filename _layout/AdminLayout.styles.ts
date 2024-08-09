import styled from 'styled-components';
import * as RTable from 'react-super-responsive-table';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px 40px 40px;
  gap: 16px;

  @media (max-width: 660px) {
    padding: 0;
  }

  transition: margin-left 0.5s;
`;

export const TitleContainer = styled.article`
  display: flex;
  flex-direction: row;
  gap: 120px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: #f8f8ff;
`;

export const ListContainer = styled.article`
  width: 100%;
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`;

export const Table = styled(RTable.Table)`
  color: white;
  border-collapse: separate;
  border-spacing: 12px 30px;
`;

interface ITr {
  withInteraction?: boolean;
  alignAtEnd?: boolean;
}

export const Tbody = styled(RTable.Tbody)``;

export const Tr = styled(RTable.Tr)<ITr>`
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  transition: 0.5s ease-in-out;
  margin-top: 8px;

  @media screen and (max-width: 40em) {
    &:hover {
      transform: scale(1.02);
    }

    @media screen and (max-width: 40em) {
      border-color: #e3e3e3 !important;
    }
  }
`;

export const Th = styled(RTable.Th)`
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  user-select: none;
  position: relative;
`;

export const Td = styled(RTable.Td)`
  color: #f8f8ff;
  text-align: center;

  @media screen and (max-width: 40em) {
    margin: 0 0 12px 0 !important;
  }
`;

export const PageCount = styled.p`
  color: white;

  @media screen and (max-width: 40em) {
    margin-left: 16px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const HeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const IconsContainer = styled.div`
  position: absolute;
  right: 8px;
  cursor: pointer;
`;

export const FilterInput = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
`;
