import { hoc, Box } from 'rebass';
import styled from 'styled-components';

export const OverflowAuto = styled(Box)`
  overflow: auto;
`;

export const Table = hoc()(Box.withComponent('table'));

export const TableBase = styled(Table)`
  th,
  td {
    padding: 0.25rem 1rem;
    line-height: inherit;
  }
`;

export const TableBordered = styled(TableBase)`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-collapse: collapse;

  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
`;
