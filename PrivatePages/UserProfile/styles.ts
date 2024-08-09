import styled from "styled-components";
import Button from "../../../components/Atoms/Button";

export const Container = styled.div`
  width: 100%;
  padding: 40px 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 68px;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;

  flex-shrink: 0;

  .main-profile-img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: solid 2px #dbdbdb;
  }

  .child-profile-img {
    position: absolute;
    width: 28px;
    height: 28px;
    background: #000;
    border-radius: 50%;

    bottom: -8px;
    right: -6px;
  }
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ChildImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: solid 2px #dbdbdb;
  object-fit: cover;
  flex-shrink: 0;
`;

export const FormWrapper = styled.div`
  height: 525px;

  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: flex-start;

  h3 {
    font-family: "Roboto", sans-serif;
    font-size: 48px;
    font-weight: lighter;
    color: #ffffff;
    letter-spacing: 4px;
  }
`;

export const InputWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-around;
  font-family: "Roboto", sans-serif;

  .input-title {
    z-index: 2;
    font-size: 14px;
    position: absolute;
    margin-left: 20px;
    margin-top: 8px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
