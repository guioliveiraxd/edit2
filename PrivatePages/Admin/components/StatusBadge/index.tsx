import { PaymentStatus } from "../../../../../models/PaymentModels";

import * as S from "./styles";

interface IStatusBadge {
  type: PaymentStatus;
    paid_installments: number;
      installments: number;
      payment_method:string;
}

const StatusBadge: React.FC<IStatusBadge> = ({ type, paid_installments, installments, payment_method }) => {
  const labelStyles: { [key in PaymentStatus]: string } = {
    ERROR: "Erro",
    FREE: "Grátis",
    WAITING_PAYMENT: "Aguardando Pagamento",
        WAITING_REPASS: "Aguardando Repasse",
        PAID: "Pago",
        NOTPAID: "Não Pago (vencido)",
                CANCELED: "Cancelado",
        REFUNDED: "Estornado",
  };
  return <S.StatusLabel type={type}>{labelStyles[type]} { labelStyles[type] == "Estornado" ? (""): (labelStyles[type] == "Aguardando Pagamento" ? (payment_method=="boleto_parcelado"||payment_method=="boleto_subscription" ? `(${installments}x)` : ""):(installments>0 ? (payment_method=="credit_card"||payment_method=="credit_card_subscription" ? `${paid_installments+1} de ${installments}`:`${paid_installments} de ${installments}`) : ""))} </S.StatusLabel>;
};

export default StatusBadge;
