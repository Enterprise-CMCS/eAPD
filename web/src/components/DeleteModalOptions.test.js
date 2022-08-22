import '@testing-library/jest-dom/extend-expect';
import getDeleteModalOptions from './DeleteModalOptions';

describe('DeleteModalOptions function', () => {
  const objectTypes = [
    'APD',
    'Activity',
    'Private Contractor',
    'Milestone',
    'Key Personnel',
    'Other State Expense',
    'Outcome and Metrics',
    'FFY',
    'Metric',
    'State Staff Expenses',
    'Funding Source'
  ];
  it('returns consistent values', () => {
    objectTypes.forEach(objType => {
      const bodyOptions = getDeleteModalOptions(objType);
      expect(bodyOptions).toMatchSnapshot();
      expect(bodyOptions.body()).toMatchSnapshot();
    });
  });

  it('has the correct body text', () => {
    objectTypes.forEach(objType => {
      const bodyOptions = getDeleteModalOptions(objType);
      expect(bodyOptions.body()).toMatchSnapshot();
    });
  });
});
