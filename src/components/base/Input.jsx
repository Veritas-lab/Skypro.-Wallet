import styled from 'styled-components';

const InputWrapper = styled.input`
  width: 286px;
  padding: 12px;
  color: #000000;
  border: 1px solid ${({ status }) => (status === 'error' ? '#ff0000' : status === 'success' ? '#00ff00' : '#e0e0e0')};
  background-color: ${({ status }) => (status === 'error' ? '#ffebeb' : status === 'success' ? '#ebffeb' : '#fff')};
  border-radius: 8px;
  font-size: 14px;

  &::placeholder {
    color: #999999;
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
    opacity: 1;
  }
`;

const Input = ({ name, value, onChange, placeholder, type = 'text', status = 'normal' }) => (
  <InputWrapper
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    status={status}
  />
);

export default Input;