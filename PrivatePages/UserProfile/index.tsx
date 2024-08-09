import React, { useCallback, useRef, useState } from "react";
import getValidationErrors from "../../../utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import { useToast } from "../../../hooks/toast";
import { useAuth } from "../../../hooks/auth";
import { Form } from "@unform/web";

import ImageUpload from "../../../components/Atoms/ImageUpload";
import Loading from "../../../components/Atoms/Loading";
import Input from "../../../components/Atoms/Input";

import {
  ImageContainer,
  StyledButton,
  InputWrapper,
  FormWrapper,
  Container,
  ChildImg,
  MainImg,
} from "./styles";

const UserProfile: React.FC = () => {
  interface DataFormInfo {
    username: string;
    fullname: string;
    email: string;
    password: string;
  }

  const [isUpdating, setIsUpdating] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const inputStyle = {
    width: 300,
    height: 25,
    paddingTop: 10,
    paddingLeft: 5,
  };

  const handleUpdate = useCallback(
    async (data: DataFormInfo) => {
      setIsUpdating(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required("Apelido obrigatório!"),
          fullname: Yup.string().required("Nome obrigatório!"),
          email: Yup.string().required("Email obrigatório!"),
          password: Yup.string().required("Senha obrigatória!"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const updatingUser = user;

        user.email = data.email !== "" ? data.email : user.email;
        user.password = data.password !== "" ? data.password : user.password;
        user.fullname = data.fullname !== "" ? data.fullname : user.fullname;

        await updateUser(updatingUser, imgUrl, true);
        setIsUpdating(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: "error",
            title: "Erro na edição :(",
            description:
              "Oops... parece que algo deu errado, tente novamente mais tarde!",
          });
        }
        setIsUpdating(false);
      }
    },
    [addToast, imgUrl, updateUser, user]
  );

  return (
    <Container>
      <ImageContainer>
        <div className="main-profile-img">
          <MainImg
            src={imgUrl && imgUrl !== "" ? imgUrl : user.imageurl}
            alt="user"
          />
        </div>
        {user.profileid === "Parent" && (
          <div className="child-profile-img">
            <ChildImg
              src={
                imgUrl && imgUrl !== "" ? imgUrl : user.selectedChild?.imageurl
              }
              alt="nl-mini-logo"
            />
          </div>
        )}
      </ImageContainer>

      <ImageUpload setImgUrl={setImgUrl} />

      <Form ref={formRef} onSubmit={handleUpdate}>
        <FormWrapper>
          <h3>Perfil</h3>
          <InputWrapper>
            <div className="input-group">
              <p className="input-title">Apelido</p>
              <Input
                enabled={false}
                name="username"
                style={inputStyle}
                defaultValue={user.username}
              />
            </div>

            <div className="input-group">
              <p className="input-title">Nome completo</p>
              <Input
                name="fullname"
                enabled={false}
                style={inputStyle}
                defaultValue={user.fullname}
              />
            </div>

            <div className="input-group">
              <p className="input-title">Sala</p>
              <Input
                name="room"
                enabled={false}
                style={inputStyle}
                defaultValue={user.roomid}
              />
            </div>

            <div className="input-group">
              <p className="input-title">E-mail</p>
              <Input
                name="email"
                style={inputStyle}
                defaultValue={user.email}
              />
            </div>

            <div className="input-group">
              <p className="input-title">Senha</p>
              <Input
                name="password"
                type="password"
                style={inputStyle}
                defaultValue={user.password}
              />
            </div>

            <StyledButton type="submit" enabled={!isUpdating}>
              {isUpdating ? <Loading size={2} /> : "SALVAR"}
            </StyledButton>
          </InputWrapper>
        </FormWrapper>
      </Form>
    </Container>
  );
};

export default UserProfile;
