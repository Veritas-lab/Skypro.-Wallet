import styled from 'styled-components';

const ButtonWrapper = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#1FA46C')};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '##1FA46C')};
  }
`;

const Button = ({ children, disabled = false, type = 'button', onClick }) => (
  <ButtonWrapper type={type} disabled={disabled} onClick={onClick}>
    {children}
  </ButtonWrapper>
);

export default Button;