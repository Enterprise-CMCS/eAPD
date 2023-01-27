import expensesSchema from './expenses.js';

describe('expenses validation', () => {
  test('valid expenses', () => {
    const { error: { details: schemaValidation = [] } = {} } =
      expensesSchema.validate(
        {
          description: 'abc',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        { abortEarly: false }
      );
    expect(schemaValidation).toEqual([]);
  });

  test('zero expenses', () => {
    const { error: { details: schemaValidation = [] } = {} } =
      expensesSchema.validate(
        {
          description: 'abc',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        },
        { abortEarly: false }
      );
    expect(schemaValidation).toEqual([]);
  });

  test('null expenses', () => {
    const { error: { details: schemaValidation = [] } = {} } =
      expensesSchema.validate(
        {
          description: 'abc',
          category: 'Training and outreach',
          years: { 2022: null, 2023: 40000 }
        },
        { abortEarly: false }
      );
    expect(schemaValidation.length).toEqual(1);
    expect(schemaValidation[0].message).toEqual('Provide an annual cost.');
  });
});
