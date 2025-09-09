import styled from 'styled-components';

const LabelWrapper = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: block;
  margin-bottom: 8px;
`;

const Label = ({ htmlFor, children }) => (
  <LabelWrapper htmlFor={htmlFor}>{children}</LabelWrapper>
);

export default Label;