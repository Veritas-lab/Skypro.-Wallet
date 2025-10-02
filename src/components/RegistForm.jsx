import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./base/Button";
import { useState, useContext } from "react";
import { registerUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

const AuthFormContainer = styled.div`
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

const Title = styled.h1`
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

const FormGroup = styled.div`
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Input = styled.input`
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

const LinkContainer = styled.div`
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

const LinkParagraph = styled.p`
  display: block;
  margin: 4px 0;

  @media (max-width: 768px) {
    margin: 2px 0;
  }
`;

const StyledLink = styled.a`
  color: #999999;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledButton = styled(Button)`
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

const RegistForm = ({ onLoginClick }) => {
  const navigate = useNavigate();
    const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLoginClick(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Убираем setAuth и используем навигацию напрямую
    navigate("/expenses");

    try {
      const user = await registerUser(formData);
      login(user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка регистрации. Проверьте данные и попробуйте снова.");
    }
  };

  return (
    <AuthFormContainer>
      <Title>Регистрация</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Input type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Input type="text"
          name="login"
          placeholder="Эл. почта"
          value={formData.login}
          onChange={handleChange}
          required />
        </FormGroup>
        <FormGroup>
          <Input type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton type="submit">Зарегистрироваться</StyledButton>
      </form>
      <LinkContainer>
        <LinkParagraph>Уже есть аккаунт?</LinkParagraph>
        <LinkParagraph>
          <StyledLink href="#login" onClick={handleLoginClick}>
            Войдите здесь
          </StyledLink>
        </LinkParagraph>
      </LinkContainer>
    </AuthFormContainer>
  );
};

export default RegistForm;
