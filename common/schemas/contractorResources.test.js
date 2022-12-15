import contractorResourcesSchema from './contractorResources';

describe('contractor validation', () => {
  test('valid contractor', () => {
    const { error: { details: schemaValidation = [] } = {} } =
      contractorResourcesSchema.validate(
        {
          description: 'Technology consulting and planning services.',
          end: '2023-01-15',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: 'false',
          name: 'Tech Consulting Inc.',
          start: '2021-01-15',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        },
        { abortEarly: false }
      );

    expect(schemaValidation).toEqual([]);
  });

  test('contractor missing useHourly', () => {
    const { error: { details: schemaValidation = [] } = {} } =
      contractorResourcesSchema.validate(
        {
          description: 'Maintain SLR',
          end: '2021-01-15',
          hourly: {
            2022: { hours: null, rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: '',
          name: 'Super SLR Incorporated',
          start: '2020-01-15',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        { abortEarly: false }
      );

    expect(schemaValidation.length).toEqual(1);
    expect(schemaValidation[0].message).toEqual(
      'Must select hourly or yearly.'
    );
  });
});
