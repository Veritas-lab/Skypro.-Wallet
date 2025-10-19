// RegistForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { registerUser } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import {
  AuthFormContainer,
  Title,
  FormGroup,
  Input,
  LinkContainer,
  LinkParagraph,
  StyledLink,
  StyledButton,
  ErrorMessage,
} from "./RegistForm.styled";

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

    const trimmedData = {
      name: formData.name.trim(),
      login: formData.login.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.name || !trimmedData.login || !trimmedData.password) {
      setError("Все поля должны быть заполнены.");
      return;
    }

    try {
      const user = await registerUser(trimmedData);
      login(user);
      navigate("/expenses");
    } catch (err) {
      setError(
        err.message ||
          "Ошибка регистрации. Проверьте данные и попробуйте снова."
      );
    }
  };

  return (
    <AuthFormContainer>
      <Title>Регистрация</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="login"
            placeholder="Эл. почта"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
