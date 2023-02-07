import {
  default as costAllocationSchema,
  costAllocationFFPSchema,
  costAllocationOtherSchema
} from './costAllocation.js';

describe('cost allocation validation', () => {
  describe('cost allocation ffp', () => {
    test('90/10 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationFFPSchema.validate(
          { federal: 90, state: 10 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('75/25 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationFFPSchema.validate(
          { federal: 75, state: 25 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('50/50 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationFFPSchema.validate(
          { federal: 50, state: 50 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('0/100 invalid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationFFPSchema.validate(
          { federal: 0, state: 100 },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });
  });

  describe('cost allocation other funding', () => {
    test('valid other funding', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationOtherSchema.validate(0, { abortEarly: false });
      expect(schemaValidation).toEqual([]);
    });

    test('negative other funding', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationOtherSchema.validate(-1, { abortEarly: false });
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Provide an other funding amount greater than or equal to $0.'
      );
    });

    test('null other funding', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationOtherSchema.validate(null, { abortEarly: false });
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Provide an other funding amount greater than or equal to $0.'
      );
    });

    test('undefined other funding', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationOtherSchema.validate(undefined, { abortEarly: false });
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Provide a valid funding amount.'
      );
    });
  });

  describe('cost allocation', () => {
    test('valid cost allocation', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSchema.validate(
          {
            2022: { ffp: { federal: 75, state: 25 }, other: 0 },
            2023: { ffp: { federal: 50, state: 50 }, other: 0 }
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('invalid cost allocation', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSchema.validate(
          {
            2022: { ffp: { federal: 0, state: 100 }, other: 0 },
            2023: { ffp: { federal: 90, state: 10 }, other: 0 }
          },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });
  });
});
