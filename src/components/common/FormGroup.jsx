import React from 'react';
import styled from 'styled-components';

const GroupWrapper = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

const FormGroup = ({ children }) => <GroupWrapper>{children}</GroupWrapper>;

export default FormGroup;