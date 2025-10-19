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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLoginClick(e);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const trimmedData = {
      name: formData.name.trim(),
      login: formData.login.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.name || !trimmedData.login || !trimmedData.password) {
      setError("Все поля должны быть заполнены.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(trimmedData.login)) {
      setError("Пожалуйста, введите корректный email адрес.");
      setIsLoading(false);
      return;
    }

    if (trimmedData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов.");
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(trimmedData);
      login(user);
      navigate("/expenses");
    } catch (err) {
      if (err.message && err.message.includes("уже зарегистрирован")) {
        setError("Пользователь с таким email уже зарегистрирован.");
      } else {
        setError(
          err.message ||
            "Ошибка регистрации. Проверьте данные и попробуйте снова."
        );
      }
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="login"
            placeholder="Эл. почта"
            value={formData.login}
            onChange={handleChange}
            required
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton type="submit" disabled={isLoading}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </StyledButton>
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
