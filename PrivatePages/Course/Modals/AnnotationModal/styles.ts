import styled from "styled-components";
import Button from "../../../../../components/Atoms/Button";

export const Container = styled.div`
  position: relative;
  margin-top: 40px;
`;

export const AddContainer = styled.div`
  position: relative;

  margin-left: auto;
  margin-right: 14%;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  width: 600px;
  height: 200px;

  padding: 12px 12px;

  border-radius: 4px;

  background: rgba(255, 255, 255, 1);

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
`;

export const AddHeader = styled.div`
  display: flex;
  width: 100%;
  height: 30%;

  font-size: 16px;
`;

export const AddBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-top: 12px;
  padding-bottom: 8px;

  width: 100%;

  input {
    width: 100%;
    height: 80px;
  }
`;

export const CloseModalButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;

  margin-top: 8px;
  margin-right: 8px;

  img {
    opacity: 1;
    width: 20px;

    transition: 0.4s;
  }

  &:hover {
    transform: scaleX(1.04) scaleY(1.04);

    img {
      opacity: 0.5;
      cursor: pointer;
    }
  }
`;

export const SaveNoteButton = styled(Button)`
  width: 180px;
  height: 40px;

  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;

  font-family: "Raleway";
  font-size: 12px;
  font-weight: normal;
`;
