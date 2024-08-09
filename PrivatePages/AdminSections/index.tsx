import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

import { SectionsModels } from "../../../models/SectionsModels";
import { useRequestWithPagination } from "../../../hooks/useRequestWithPagination";
import { useAdminApi } from "../Admin/hooks/useAdminApi";

import SectionsTable from "./components/SectionsTable";
import Button from "../../../components/Atoms/Button";
import Loading from "../../../components/Atoms/Loading";
import { Modal } from "../../../components/Atoms/Modal";
import AddSection from "./components/AddSection";

import { Center, ListContainer } from "../../_layout/AdminLayout.styles";

const AdminSections = () => {
  const { data, isLoading, setIsLoading, setData } = useRequestWithPagination<
    SectionsModels[]
  >([]);

  const { fetchSections } = useAdminApi();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSelectItem = () => {};

  const handleModalState = () => {
    setOpenModal((prevState) => !prevState);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await fetchSections();

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
              Adicionar Nova Seção
            </Button>
            <SectionsTable data={data} onSelectItem={handleSelectItem} />
            <Modal isOpen={openModal}>
              <AddSection onClose={handleModalState} refreshFeth={fetchData} />
            </Modal>
          </>
        )}
      </ListContainer>
    </>
  );
};

export default AdminSections;
