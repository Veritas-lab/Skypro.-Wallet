// AuthForm.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import RegistForm from "../RegistForm/RegistForm";
import LogoOnlyHeader from "../LogoOnlyHeader";
import {
  PageContainer,
  AuthContent,
  AuthFormContainer,
  Title,
  FormGroup,
  Input,
  LinkContainer,
  LinkParagraph,
  StyledLink,
  StyledButton,
  ErrorMessage,
} from "./AuthForm.styled";

const AuthForm = () => {
  const [showRegistration, setShowRegistration] = React.useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegistration(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowRegistration(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedLogin = formLogin.trim();
    const trimmedPassword = formPassword.trim();

    if (!trimmedLogin || !trimmedPassword) {
      setError("Логин и пароль не могут быть пустыми.");
      return;
    }

    try {
      const userData = await loginUser({
        login: trimmedLogin,
        password: trimmedPassword,
      });
      login(userData);
      navigate("/expenses");
    } catch (err) {
      setError(err.message || "Ошибка авторизации. Проверьте логин и пароль.");
    }
  };

  if (showRegistration) {
    return (
      <PageContainer>
        <LogoOnlyHeader />
        <AuthContent>
          <RegistForm onLoginClick={handleLoginClick} />
        </AuthContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <LogoOnlyHeader />
      <AuthContent>
        <AuthFormContainer>
          <Title>Вход</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                placeholder="Эл.почта"
                value={formLogin}
                onChange={(e) => setFormLogin(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                placeholder="Пароль"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <StyledButton type="submit">Войти</StyledButton>
          </form>
          <LinkContainer>
            <LinkParagraph>Нужно зарегистрироваться?</LinkParagraph>
            <LinkParagraph>
              <StyledLink href="#register" onClick={handleRegisterClick}>
                Регистрируйтесь здесь
              </StyledLink>
            </LinkParagraph>
          </LinkContainer>
        </AuthFormContainer>
      </AuthContent>
    </PageContainer>
  );
};

export default AuthForm;
