import {
  costAllocationSplitSchema,
  costAllocationMatchRateSchema,
  hitechCostAllocationSchema,
  mmisCostAllocationSchema
} from './costAllocation.js';
import { FUNDING_CATEGORY_TYPE } from '../utils/constants.js';

describe('cost allocation validation', () => {
  describe('cost allocation ffp with split', () => {
    test('90/10 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSplitSchema.validate(
          { federal: 90, state: 10 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('75/25 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSplitSchema.validate(
          { federal: 75, state: 25 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('50/50 valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSplitSchema.validate(
          { federal: 50, state: 50 },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('0/100 invalid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationSplitSchema.validate(
          { federal: 0, state: 100 },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });
  });

  describe('cost allocation ffp with match rate', () => {
    test('90/10 DDI valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('75/25 DDI valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('50/50 DDI valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 50,
            state: 50,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('75/25 M&O valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('50/50 M&O valid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 50,
            state: 50,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('0/100 invalid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          { federal: 0, state: 100 },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });

    test('90/10 wrong funding category invalid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 0,
            state: 100,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });

    test('50/50 wrong funding category invalid', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        costAllocationMatchRateSchema.validate(
          {
            federal: 0,
            state: 100,
            fundingCategory: 'BAD'
          },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });
  });

  describe('cost allocation', () => {
    test('valid cost allocation with split', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        hitechCostAllocationSchema.validate(
          {
            2022: { ffp: { federal: 75, state: 25 } },
            2023: { ffp: { federal: 50, state: 50 } }
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('invalid cost allocation with split', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        hitechCostAllocationSchema.validate(
          {
            costAllocation: {
              2022: { ffp: { federal: 0, state: 100 }, other: 0 },
              2023: { ffp: { federal: 90, state: 10 }, other: 0 }
            }
          },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(1);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
    });

    test('valid cost allocation with match rate', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        mmisCostAllocationSchema.validate(
          {
            2022: {
              ffp: {
                federal: 75,
                state: 25,
                fundingCategory: FUNDING_CATEGORY_TYPE.DDI
              },
              other: 0
            },
            2023: {
              ffp: {
                federal: 50,
                state: 50,
                fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
              },
              other: 0
            }
          },
          { abortEarly: false }
        );
      expect(schemaValidation).toEqual([]);
    });

    test('invalid cost allocation with match rate', () => {
      const { error: { details: schemaValidation = [] } = {} } =
        mmisCostAllocationSchema.validate(
          {
            2022: {
              ffp: { federal: 0, state: 100, fundingCategory: 'BAD' },
              other: 0
            },
            2023: {
              ffp: {
                federal: 90,
                state: 10,
                fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
              },
              other: 0
            },
            2024: {
              ffp: { federal: 75, state: 25, fundingCategory: 'BAD' },
              other: 0
            }
          },
          { abortEarly: false }
        );
      expect(schemaValidation.length).toEqual(3);
      expect(schemaValidation[0].message).toEqual(
        'Select a federal-state split.'
      );
      expect(schemaValidation[1].message).toEqual('Select a valid match rate.');
      expect(schemaValidation[2].message).toEqual('Select a funding category.');
    });
  });
});
