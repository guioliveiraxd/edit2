import styled, { css } from "styled-components";

export const Container = styled.article`
  width: 50%;
  min-height: 40%;

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

export const Row = styled.span<IRow>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  padding-top: ${({ paddingTop }) => paddingTop ?? 60}px;

  width: 80%;

  gap: 16px;
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

  top: 1rem;
  left: 40%;
`;

interface ITotalPriceContainer {
  noExtraSpacing?: boolean;
  flexDirection?: "row" | "column";
}

export const TotalPriceContainer = styled.span<ITotalPriceContainer>`
  display: flex;
  flex: 1;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
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
