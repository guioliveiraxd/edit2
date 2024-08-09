import { useEffect, useState } from "react";
import Button from "../../../components/Atoms/Button";
import Loading from "../../../components/Atoms/Loading";
import { useRequestWithPagination } from "../../../hooks/useRequestWithPagination";
import { BannersAdmin } from "../../../models/BannersModels";
import { Center, ListContainer } from "../../_layout/AdminLayout.styles";
import { useAdminApi } from "../Admin/hooks/useAdminApi";
import BannersTable from "./components/BannersTable";
import { FaPlus } from "react-icons/fa";
import { Modal } from "../../../components/Atoms/Modal";
import AddBanner from "./components/AddBanner";

const AdminBanners = () => {
  const { data, isLoading, setIsLoading, setData, setMaxPage } =
    useRequestWithPagination<BannersAdmin[]>([]);

  const { fetchBanners } = useAdminApi();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSelectItem = () => {};

  const handleModalState = () => {
    setOpenModal((prevState) => !prevState);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchBanners();

    setMaxPage(1);
    setData(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ListContainer>
        {isLoading && data.length === 0 ? (
          <Center>
            <Loading />
          </Center>
        ) : (
          <>
            <Button
              style={{ margin: "0 auto" }}
              onClick={handleModalState}
              loading={isLoading}
            >
              <FaPlus />
              Adicionar Novo Banner
            </Button>
            <BannersTable data={data} onSelectItem={handleSelectItem} />
            <Modal isOpen={openModal}>
              <AddBanner onClose={handleModalState} refreshFeth={fetchData} />
            </Modal>
          </>
        )}
      </ListContainer>
    </>
  );
};

export default AdminBanners;
