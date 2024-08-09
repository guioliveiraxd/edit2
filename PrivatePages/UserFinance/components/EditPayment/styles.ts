import styled, { css } from 'styled-components';

export const Container = styled.article`
  width: 60%;
  min-height: fit-content;

  margin: auto;

  top: 7rem;

  border-radius: 15px;
  background-color: #fff;

  position: relative;

  @media (max-width: 1088px) {
    width: 80%;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background-color: transparent;
  border: none;

  &:hover {
    border: none;
    cursor: pointer;
  }
`;

export const LoadingContainer = styled.figure`
  position: absolute;

  right: 50%;
  margin-left: -20px;
  top: 50%;
`;

interface IRow {
  paddingTop?: number;
}

export const Row = styled.div<IRow>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  padding-top: ${({ paddingTop }) => paddingTop ?? 80}px;

  width: 80%;

  gap: 16px;

  .group-info {
    display: flex;
    width: 75%;
    margin: 8px 0 8px 0;
    align-items: center;
    justify-content: space-between;

    div {
      margin: 0;
      width: 48%;
    }

    @media (max-width: 880px) {
      flex-direction: column;
      gap: 8px;

      div {
        margin: 0;
        width: 100%;
      }
    }
  }

  @media (max-width: 880px) {
    padding-top: 80px;
    flex-direction: column;
  }
`;

export const ProductsList = styled.article`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProductData = styled.span`
  display: flex;
  flex-direction: row;
`;

export const ProductDataTitle = styled.p`
  flex: 1;
  margin: 12px 0;
  font-size: 14px;
`;

export const ProductInfo = styled.section`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const HeaderContainer = styled.figure``;

export const ProductThumb = styled.img`
  flex: 1;

  width: 120px;

  margin-right: 1rem;

  border-radius: 15px;

  box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.6);
`;

export const Title = styled.h2`
  position: absolute;

  color: #808080;

  top: 1.5rem;
  left: 31%;
  text-align: center;

  @media (max-width: 880px) {
    font-size: 1.2rem;
    left: 18%;
    max-width: 200px;
  }
`;

interface ITotalPriceContainer {
  noExtraSpacing?: boolean;
  flexDirection?: 'row' | 'column';
}

export const TotalPriceContainer = styled.span<ITotalPriceContainer>`
  display: flex;
  flex: 1;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: center;
  align-items: center;
  padding-bottom: ${({ noExtraSpacing }) => (noExtraSpacing ? 0 : 16)}px;
`;

export const CouponName = styled.p`
  font-size: 12px;
`;

interface IPrice {
  oldPrice?: boolean;
}

export const Price = styled.p<IPrice>`
  margin: 0 12px;
  font-weight: bold;
  ${({ oldPrice }) =>
    oldPrice &&
    css`
      text-decoration: line-through;
      color: #d3d3d3;
    `}
`;

export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 75%;
  margin: 0 auto;

  button {
    margin-top: 0;
    color: var(--main_white);
    background: var(--primary_cyan_color);
  }

  p {
    font-size: 14px;
    margin: 0.2rem 0.2px 1rem 0.2rem;
    text-align: center;

    & > svg {
      font-size: 1.3rem;
      color: var(--primary_cyan_color);

      cursor: pointer;

      margin: 0 0 0 10px;
      vertical-align: bottom;
    }

    @media (max-width: 880px) {
      margin: 0.5rem 0;
    }
  }
`;

export const FirstColumnChangeCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Roboto Slab', sans-serif;
  color: #363636;
  height: 12%;
  p {
    margin-left: 12px;
    font-size: 14px;
  }
`;
