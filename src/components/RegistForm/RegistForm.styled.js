import styled from "styled-components";
import Button from "../base/Button";

export const AuthFormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px #00000021;
  width: 379px;
  padding: 32px;

  @media (max-width: 768px) {
    width: 343px;
    padding: 24px;
    border-radius: 0px;
  }
`;

export const Title = styled.h1`
  color: #000000;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 12px;
  font-weight: 400;
  border: 0.5px solid #999999;
  border-radius: 6px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 11px;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 24px;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 16px;
    font-size: 11px;
  }
`;

export const LinkParagraph = styled.p`
  display: block;
  margin: 4px 0;

  @media (max-width: 768px) {
    margin: 2px 0;
  }
`;

export const StyledLink = styled.a`
  color: #999999;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  padding: 15px;
  margin-top: 12px;
  background-color: #7334ea;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6b1eaf;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 11px;
    margin-top: 8px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-bottom: 12px;
  text-align: center;
  min-height: 18px;
`;
