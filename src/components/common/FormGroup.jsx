import React from 'react';
import styled from 'styled-components';

const GroupWrapper = styled.div`
  margin-bottom: 24px;
  width: 313px;
`;

const FormGroup = ({ children }) => <GroupWrapper>{children}</GroupWrapper>;

export default FormGroup;