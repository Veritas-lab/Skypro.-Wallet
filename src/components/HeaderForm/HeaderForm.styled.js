import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;

  @media (min-width: 768px) {
    padding: 20px 40px;
    padding-left: calc(50% - 600px);
    padding-right: calc(50% - 600px);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 120px;
    height: 16px;

    @media (min-width: 768px) {
      width: 144px;
      height: 19px;
    }
  }
`;

export const Nav = styled.nav`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 60%;
    transform: translateX(-50%);
    background-color: transparent;
    border-bottom: none;
    box-shadow: none;
    padding: 0;
    align-items: center;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const NavItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-family: Montserrat;
  transition: all 0.3s ease;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;

  &.active {
    color: #2e8b57;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &:not(.active) {
    font-weight: 400;
  }

  &:hover {
    color: #2e8b57;

    &:not(.active) {
      font-weight: 600;
    }
  }

  @media (min-width: 768px) {
    padding: 0;
    border-bottom: none;
    margin-right: 24px;

    &:last-child {
      margin-right: 0;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const MobileNavItem = styled.button`
  color: #333;
  text-decoration: none;
  font-family: Montserrat;
  transition: all 0.3s ease;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight: 400;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #2e8b57;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    display: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const LogoutButton = styled.a`
  color: #333;
  text-decoration: none;
  font-family: Montserrat;
  transition: all 0.3s ease;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #2e8b57;
  }

  @media (min-width: 768px) {
    padding: 0;
    border-bottom: none;
    margin-left: auto;
  }

  @media (max-width: 767px) {
    display: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const MobileLogoutButton = styled.button`
  color: #333;
  text-decoration: none;
  font-family: Montserrat;
  transition: all 0.3s ease;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #2e8b57;
  }

  @media (min-width: 768px) {
    display: none;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Spacer = styled.div`
  width: 48px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (min-width: 768px) {
    display: none;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #333;
    border-radius: 1px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${(props) =>
        props.isOpen ? "rotate(45deg) translate(6px, 6px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
    }

    &:nth-child(3) {
      transform: ${(props) =>
        props.isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none"};
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;
