import styled from "styled-components";

export const AmountText = styled.h1`
  color: #f8f8ff;
`;

export const WalletContainer = styled.article`
  width: 100%;

  display: flex;
  justify-content: space-around;
`;

interface IWalletCard {
  bgColor?: "green" | "orange";
}

export const WalletCard = styled.figure<IWalletCard>`
  width: 180px;
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ bgColor }) =>
    bgColor === "orange" ? "#f29339" : "#4bb543"};
  border-radius: 15px;

  gap: 8px;
`;

export const WalletTitle = styled.h4`
  text-align: center;
  color: #f8f8ff;
`;

export const WalletValue = styled.span`
  display: flex;
  align-items: baseline;
  font-size: 20px;
  color: #f8f8ff;

  & > p {
    font-size: 12px;
    margin-right: 8px;
  }
`;
