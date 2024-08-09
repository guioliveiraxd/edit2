import { useState } from "react";
import * as S from "./styles";
import Loading from "../../../components/Atoms/Loading";
import { Modal } from "../../../components/Atoms/Modal";
import TransactionDetail from "./components/TransactionDetail";
import PaymentsTable from "./components/PaymentsTable";
import Button from "../../../components/Atoms/Button";
import { usePaymentBusiness } from "./hooks/usePaymentBusiness";
import { Center, ListContainer } from "../../_layout/AdminLayout.styles";

const Admin = () => {
  const {
    wallet,
    isLoading,
    payments,
    fetchMorePayments,
    currentPage,
    maxPage,
  } = usePaymentBusiness();
  const [itemToOpen, setItemToOpen] = useState<{
    cartid: string;
    transactionid: string;
  }>();

  const handleSelectItem = (args: {
    cartid: string;
    transactionid: string;
  }) => {
    setItemToOpen(args);
  };

  const showFetchMoreBtn = !!payments.length && maxPage > currentPage;

  const showLoading = isLoading && !payments.length;

  return (
    <>
      <S.WalletContainer>
        <S.WalletCard bgColor="orange">
          <S.WalletTitle>Saldo</S.WalletTitle>
          <S.WalletValue>
            <p>R$</p>
            {wallet.balance.toFixed(2)}
          </S.WalletValue>
        </S.WalletCard>
        <S.WalletCard>
          <S.WalletTitle>
            Disponível <br /> para retirada
          </S.WalletTitle>
          <S.WalletValue>
            <p>R$</p>
            {wallet.available.toFixed(2)}
          </S.WalletValue>
        </S.WalletCard>
      </S.WalletContainer>
      <ListContainer>
        {showLoading ? (
          <Center>
            <Loading />
          </Center>
        ) : (
          <PaymentsTable
            data={payments}
            currentIndex={currentPage}
            lastIndex={maxPage}
            onSelectItem={handleSelectItem}
          />
        )}
      </ListContainer>
      <Modal isOpen={itemToOpen !== undefined}>
        {itemToOpen && (
          <TransactionDetail
            {...itemToOpen}
            onClose={() => setItemToOpen(undefined)}
          />
        )}
      </Modal>
      {showFetchMoreBtn && (
        <Button onClick={fetchMorePayments} loading={isLoading}>
          Carregar mais ...
        </Button>
      )}
    </>
  );
};

export default Admin;
