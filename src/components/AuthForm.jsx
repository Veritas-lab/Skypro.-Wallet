import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./base/Button";
import RegistForm from "./RegistForm";
import LogoOnlyHeader from "./LogoOnlyHeader";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AuthContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const AuthFormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
  }
`;

const Title = styled.h1`
  color: #333333;
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
    margin-top: 8px;
  }
`;

const AuthForm = () => {
  const [showRegistration, setShowRegistration] = React.useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegistration(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowRegistration(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Убираем setAuth и используем навигацию напрямую
    navigate("/expenses");
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
              <Input type="text" placeholder="Эл. почта" required />
            </FormGroup>
            <FormGroup>
              <Input type="password" placeholder="Пароль" required />
            </FormGroup>
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
