import React from 'react';
import { render, screen } from 'apd-testing-library';
import Instruction from './Instruction';
import { t } from '../i18n';

jest.mock('../i18n', () => ({ t: jest.fn() }));

afterEach(() => {
  t.mockReset();
});

describe('Instruction heading', () => {
  it('converts heading to title case by default', () => {
    const originalTitle = 'What type of APD are you creating?';
    t.mockReturnValueOnce(originalTitle);
    render(<Instruction source="apd.overview.apdType" />);

    const expectedTitleCaseHeading = 'What Type of APD Are You Creating?';
    const titleCaseHeading = screen.getByRole('heading');
    expect(titleCaseHeading).toHaveTextContent(expectedTitleCaseHeading);
  });
  it('disables title case conversion in the heading when "disableTitleCaseConversion" is passed in', () => {
    const originalTitle = 'What type of APD are you creating?';
    t.mockReturnValueOnce(originalTitle);

    render(
      <Instruction source="apd.overview.apdType" disableTitleCaseConversion />
    );

    const noTitleCaseHeading = screen.getByRole('heading');
    expect(noTitleCaseHeading).toHaveTextContent(originalTitle);
  });
});
