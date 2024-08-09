import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { PaymentStatus } from "../../../../../models/PaymentModels";

const errorLabelStyle = css`
  background-color: #fc2d2d;
    color: #ffffff;
`;

const waitingLabelStyle = css`
  background-color: #f29339;
  color: #ffffff;
`;

const paidLabelStyle = css`
  background-color: #4bb543;
      color: #ffffff;
`;

const notpaidLabelStyle = css`
  background-color: #fc2d2d;
      color: #ffffff;
`;

const refundedLabelStyle = css`
  background-color: #bd39e1;
      color: #ffffff;
`;

const freeLabelStyle = css`
  background-color: #0580f2;
      color: #ffffff;
`;

interface IStatusLabel {
  type: PaymentStatus;
}

const labelStyles: { [key in PaymentStatus]: FlattenSimpleInterpolation } = {
  ERROR: errorLabelStyle,
  FREE: freeLabelStyle,
  WAITING_PAYMENT: waitingLabelStyle,
    WAITING_REPASS: waitingLabelStyle,
  PAID: paidLabelStyle,
    NOTPAID: notpaidLabelStyle,
        CANCELED: notpaidLabelStyle,
      REFUNDED: refundedLabelStyle,
};

export const StatusLabel = styled.label<IStatusLabel>`
  color: white;
  font-size: 10px;
  font-weight: bold;
  border-radius: 10px;
  padding: 6px;
  ${({ type }) => labelStyles[type] ?? ""}
`;
