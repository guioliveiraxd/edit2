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
import ImageUploadV2 from "../../../../../components/Atoms/ImageUploadV2";

import { BannersAdmin } from "../../../../../models/BannersModels";

import * as S from "./styles";

interface AddBannerTypes {
  onClose: () => void;
  refreshFeth: () => void;
}

const initialInputValues: BannersAdmin = {
  schoolid: "",
  bannerid: "",
  title: "",
  description: "",
  url_base64: "",
  type: "",
  linkurl: "",
  position: "",
};

const AddBanner: React.FC<AddBannerTypes> = ({ onClose, refreshFeth }) => {
  const [loading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
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

  const handleChangeImg = (img: string): void => {
    setImgUrl(img);
  };

  const handleSubmit = useCallback(
    async (data: BannersAdmin) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({});

        await schema.validate(data, {
          abortEarly: false,
        });

        if (imgUrl === "") {
          window.alert("Por favor, selecione uma imagem!");

          return;
        }

        const generatedId = v4();

        const saveBody = {
          userid: user.userid,
          bannerid: generatedId,
          position: data.position !== "" ? data.position : 1,
          linkurl: data.linkurl,
          url_base64: imgUrl ?? " ",
          schoolid: user.schoolid,
          type: " ",
          description: " ",
          title: " ",
        };

        const response = await apiBackoffice.post<string>(
          "backoffice/banner/add",
          saveBody
        );

        if (response.data === "OK") {
          window.alert("Banner Salvo!");
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
        setImgUrl("");
        setIsLoading(false);
      }
    },
    [user, user?.userid, imgUrl]
  );

  return (
    <S.Container>
      <S.CloseModalButton onClick={onClose}>
        <IoClose color="grey" size={32} />
      </S.CloseModalButton>
      <S.HeaderContainer>
        <S.Title> Novo Banner </S.Title>
      </S.HeaderContainer>

      {loading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <>
          <S.Row>
            <ImageUploadV2
              type="simple"
              setImg={handleChangeImg}
              customChild={false}
              bannerStyle={true}
            />
          </S.Row>
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
                name="linkurl"
                placeholder="Link"
                value={inputValues.linkurl}
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

export default AddBanner;
