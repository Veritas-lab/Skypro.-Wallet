import React from "react";
import styled from "styled-components";
import LogoIcon from "../icons/LogoIcon";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
`;

const NavItem = styled.a`
  color: #333;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #000;
  }

  &.nav-item_1 {
    color: #666;

    &:hover {
      color: #000;
    }
  }
`;

const Exit = styled.div`
  display: flex;
  align-items: center;
`;

const NavItemExit = styled.a`
  color: #ff4444;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff0f0;
    color: #ff0000;
  }
`;

const HeaderForm = () => {
  return (
    <Header>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <Nav>
        <NavItem href="#expenses">Мои расходы</NavItem>
        <NavItem href="#analysis" className="nav-item_1">
          Анализ расходов
        </NavItem>
      </Nav>
      <Exit>
        <NavItemExit href="#logout">Выйти</NavItemExit>
      </Exit>
    </Header>
  );
};

export default HeaderForm;
