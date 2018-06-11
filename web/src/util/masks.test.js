import masks from './masks';

describe('mask utils', () => {
  test('can unmask dollars', () => {
    expect(masks.dollar.unmask('$12,345.67')).toBe(12345.67);
  });

  test('can unmask percents', () => {
    expect(masks.percent.unmask('12.3%')).toBe(12.3);
  });
});
