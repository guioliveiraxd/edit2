import { useState, useRef, useCallback } from "react";
import { IoClose } from "react-icons/io5";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { v4 } from "uuid";

import apiBackoffice from "../../../../../services/apiBackoffice";
import { useAuth } from "../../../../../hooks/auth";
import getValidationErrors from "../../../../../utils/getValidationErrors";

import Input from "../../../../../components/Atoms/Input";
import Loading from "../../../../../components/Atoms/Loading";
import Button from "../../../../../components/Atoms/Button";

import { SectionsModels } from "../../../../../models/SectionsModels";

import * as S from "./styles";

interface AddSectionTypes {
  onClose: () => void;
  refreshFeth: () => void;
}

const initialInputValues: SectionsModels = {
  schoolid: "",
  sectionid: "",
  title: "",
  type: "",
  position: "",
};

const AddSection: React.FC<AddSectionTypes> = ({ onClose, refreshFeth }) => {
  const [loading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState(initialInputValues);
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (data: SectionsModels) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required("Título Obrigatório!").min(3),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const generatedId = v4();

        const saveBody = {
          userid: user.userid,
          sectionid: generatedId,
          title: data.title,
          position: data.position !== "" ? data.position : 1,
          schoolid: user.schoolid,
          type: "horizontal",
          levelid: "all",
          roomid: "all",
          profileid: "all",
        };

        const response = await apiBackoffice.post<string>(
          "backoffice/section/add",
          saveBody
        );

        console.log("submit seaction", response);

        if (response.data === "OK") {
          window.alert("Seção Salva!");
          onClose();
          refreshFeth();
        } else if (response.data === "ERROR") {
          window.alert(
            "Ocorreu um erro ao salvar, por favor, tente novamente."
          );
          onClose();
        }
      } catch (err) {
        window.alert("Por favor, preencha todos os campos!");

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      } finally {
        setInputValues(initialInputValues);
        setIsLoading(false);
      }
    },
    [user, user?.userid]
  );

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Nova Seção </S.Title>
      </S.HeaderContainer>

      {loading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <>
          <S.Row>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              className="form big"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
              autoComplete="off"
            >
              <Input
                name="title"
                placeholder="Título"
                value={inputValues.title}
                onChange={(e) => handleInputChanges(e)}
              />
              <Input
                name="position"
                placeholder="Posição"
                value={inputValues.position}
                onChange={(e) => handleInputChanges(e)}
              />
              <div style={{ paddingBottom: "60px" }}>
                <Button type="submit">
                  {loading ? <Loading size={2} /> : "Salvar"}
                </Button>
              </div>
            </Form>
          </S.Row>
        </>
      )}
    </S.Container>
  );
};

export default AddSection;
