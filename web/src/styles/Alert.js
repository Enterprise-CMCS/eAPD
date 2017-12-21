import styled from 'styled-components';
import { Box } from 'rebass';

export const alertColors = {
  success: ['#e7f4e4', '#2e8540'],
  warning: ['#fff1d2', '#fdb81e'],
  error: ['#f9dede', '#e31c3d'],
  info: ['#e1f3f8', '#02bfe7'],
  fallback: ['#f1f1f1', '#8b8b8b']
};

const cssRules = kind => {
  const colors = alertColors[kind] || alertColors.fallback;

  return `
    background-color: ${colors[0]};
    border-left: 0.5rem solid ${colors[1]};
  `;
};

const Alert = styled(Box)`
  ${props => cssRules(props.kind)};
  padding: 1rem;
`;

export default Alert;
