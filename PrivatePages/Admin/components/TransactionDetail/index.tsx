import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Loading from "../../../../../components/Atoms/Loading";
import { OrderHistory } from "../../../../../models/OrderHistory";
import { useAdminApi } from "../../hooks/useAdminApi";
import { methodLabel } from "../PaymentsTable";
import StatusBadge from "../StatusBadge";

import * as S from "./styles";

interface ITransactionDetail {
  cartid?: string;
  transactionid?: string;
  onClose: () => void;
}

const TransactionDetail: React.FC<ITransactionDetail> = ({
  cartid = "",
  transactionid = "",
  onClose,
}) => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory>();
  const [loading, setIsLoading] = useState(true);

  const { fetchOrderhistory } = useAdminApi();

  useEffect(() => {
    const fetchDetail = async () => {
      const result = await fetchOrderhistory({ cartid, transactionid });

      setOrderHistory(result.data);
      setIsLoading(false);
    };

    fetchDetail();
  }, [cartid, transactionid]);

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title>Detalhes</S.Title>
        {/*  <S.HeaderImage src={data?.product_info?.thumburl} /> */}
      </S.HeaderContainer>

      {loading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <>
          <S.Row>
            <p>{orderHistory?.payment.user_info.fullname}</p>
            <p>{orderHistory?.payment.user_info.email}</p>
          </S.Row>
          <S.Row paddingTop={20}>
            <p>{methodLabel[orderHistory?.payment.method!]}</p>
            <StatusBadge type={orderHistory?.payment.status!} paid_installments={orderHistory?.payment.paid_installments!} installments={orderHistory?.payment.installments!}  payment_method={orderHistory?.payment.method!}/>
            <p>{orderHistory?.payment.date}</p>
          </S.Row>
          <S.ProductsList>
            {(orderHistory?.orders ?? []).map((item, index) => {
              return (
                <S.ProductInfo key={index}>
                  <S.ProductThumb src={item?.product_info?.thumburl} />
                  <S.ProductDataTitle>
                    {item?.product_info?.title}
                  </S.ProductDataTitle>
                  <S.TotalPriceContainer flexDirection="column" noExtraSpacing>
                    <S.Price oldPrice={!!item.coupon_info?.couponid}>
                      R$ {item?.product_info?.price.toFixed(2)}
                    </S.Price>
                    {item.coupon_info?.couponid ? (
                      <>
                        <S.Price>R$ {item.price.toFixed(2)}</S.Price>
                        <S.CouponName>
                          {item.coupon_info?.couponid}
                        </S.CouponName>
                      </>
                    ) : (
                      <></>
                    )}
                  </S.TotalPriceContainer>
                </S.ProductInfo>
              );
            })}
          </S.ProductsList>
        </>
      )}

      {!loading && (
        <S.TotalPriceContainer>
          <p>Total: </p>
          <S.Price oldPrice={!!orderHistory?.couponid}>
            R$ {orderHistory?.total_price.toFixed(2)}
          </S.Price>
          {orderHistory?.couponid && (
            <S.Price>
              R$ {orderHistory?.total_price_with_discount.toFixed(2)}
            </S.Price>
          )}
        </S.TotalPriceContainer>
      )}
    </S.Container>
  );
};

export default TransactionDetail;
