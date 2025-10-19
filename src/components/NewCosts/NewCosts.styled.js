import styled from "styled-components";
import Button from "../base/Button";

export const FormContainer = styled.div`
  padding: 32px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 20px 67px -12px #00000013;
  border: 1px solid #e0e0e0;
`;

export const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin: 0px;
  margin-bottom: 24px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  padding: 14px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #f8f9fa;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: 768px) {
    order: 2;
  }
`;

export const SubmitButton = styled(Button)`
  @media (max-width: 768px) {
    order: 1;
  }
`;
