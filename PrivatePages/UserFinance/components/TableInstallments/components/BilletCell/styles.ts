import styled, { css } from 'styled-components';
import { TdTextContentStyled } from './types';
import { PAYMENT_STATUS_ENUM } from './constants/paymentStatus';

export const StyledTdContent = styled.div`
  text-align: center;
  font-weight: 600;
`;

export const LoadingContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const TdTextContent = styled.span<TdTextContentStyled>`
  ${({ status }) => css`
    text-decoration: underline;
    cursor: pointer;
    color: black;

    ${status === PAYMENT_STATUS_ENUM.PAID &&
    css`
      color: green;
      cursor: inherit;
      text-decoration: none;
    `};
  `}
`;

export const TdTextLinkContent = styled.a`
  ${() => css`
    text-decoration: underline;
    cursor: pointer;
    color: black;
  `}
`;
