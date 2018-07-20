import { fromAPI, toAPI } from './apd';

describe('APD serializer', () => {
  describe('deserializer from API format to redux state shape', () => {
    it('deserializes everything given to it', () => {
      const apdAPI = {
        id: 'apd id',
        activities: ['an activity'],
        federalCitations: 'federal things, like that s with a circle on it',
        incentivePayments: [
          {
            q1: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q2: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q3: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q4: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            year: '1431'
          }
        ],
        narrativeHIE: 'hie hie hie',
        narrativeHIT: 'hit hit hit',
        narrativeMMIS: 'mmis mmis mmis',
        programOverview: 'doing the moop moop',
        pointsOfContact: 'people to talk to',
        previousActivityExpenses: [
          {
            hie: 'pa hie',
            hit: 'pa hit',
            mmis: 'pa mmis',
            year: '1431'
          }
        ],
        previousActivitySummary: 'last time on Batman...',
        stateProfile: {
          thing: null,
          other: 'text'
        },
        years: ['1431']
      };

      expect(fromAPI(apdAPI, undefined, a => a)).toEqual({
        id: 'apd id',
        activities: ['an activity'],
        assurancesAndCompliance:
          'federal things, like that s with a circle on it',
        hieNarrative: 'hie hie hie',
        hitNarrative: 'hit hit hit',
        incentivePayments: {
          ehAmt: { '1431': { 1: 47, 2: 47, 3: 47, 4: 47 } },
          ehCt: { '1431': { 1: 9, 2: 9, 3: 9, 4: 9 } },
          epAmt: { '1431': { 1: 355, 2: 355, 3: 355, 4: 355 } },
          epCt: { '1431': { 1: 59, 2: 59, 3: 59, 4: 59 } }
        },
        mmisNarrative: 'mmis mmis mmis',
        overview: 'doing the moop moop',
        pointsOfContact: 'people to talk to',
        previousActivityExpenses: {
          '1431': {
            hie: 'pa hie',
            hit: 'pa hit',
            mmis: 'pa mmis'
          }
        },
        previousActivitySummary: 'last time on Batman...',
        stateProfile: {
          thing: '',
          other: 'text'
        },
        years: ['1431']
      });
    });

    it('uses defaults for missing properties', () => {
      const defaults = {
        activities: 'a a a',
        assurancesAndCompliance: 'b b b',
        hieNarrative: 'c c c',
        hitNarrative: 'd d d',
        incentivePayments: 'e e e',
        mmisNarrative: 'f f f',
        overview: 'g g g',
        pointsOfContact: 'h h h',
        previousActivityExpenses: 'i i i',
        previousActivitySummary: 'j j j',
        stateProfile: 'l l l',
        years: [987654321]
      };

      expect(fromAPI({}, defaults, a => a)).toEqual({
        id: undefined,
        activities: 'a a a',
        assurancesAndCompliance: 'b b b',
        hieNarrative: 'c c c',
        hitNarrative: 'd d d',
        incentivePayments: 'e e e',
        mmisNarrative: 'f f f',
        overview: 'g g g',
        pointsOfContact: 'h h h',
        previousActivityExpenses: 'i i i',
        previousActivitySummary: 'j j j',
        stateProfile: 'l l l',
        years: ['987654321']
      });
    });
  });

  describe('serializes redux state shape into API format', () => {
    it('does the magical serialization', () => {
      const apdState = {
        assurancesAndCompliance: '45 CFR something something',
        incentivePayments: {
          ehAmt: { '1431': { 1: 47, 2: 47, 3: 47, 4: 47 } },
          ehCt: { '1431': { 1: 9, 2: 9, 3: 9, 4: 9 } },
          epAmt: { '1431': { 1: 355, 2: 355, 3: 355, 4: 355 } },
          epCt: { '1431': { 1: 59, 2: 59, 3: 59, 4: 59 } }
        },
        hieNarrative: 'hie hie hie',
        hitNarrative: 'hit hit hit',
        mmisNarrative: 'mmis mmis mmis',
        overview: 'doing the moop moop',
        pointsOfContact: 'people to talk to',
        previousActivityExpenses: {
          '1431': {
            hie: 'pa hie',
            hit: 'pa hit',
            mmis: 'pa mmis'
          }
        },
        previousActivitySummary: 'last time on Batman...',
        stateProfile: 'big, lots of dirt and trees and stuff',
        years: ['1431']
      };

      const activityState = {
        byKey: {
          a: 'first activity',
          b: 'second activity'
        }
      };

      expect(toAPI(apdState, activityState, a => a)).toEqual({
        activities: ['first activity', 'second activity'],
        federalCitations: '45 CFR something something',
        incentivePayments: [
          {
            q1: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q2: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q3: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            q4: {
              ehPayment: 47,
              ehCount: 9,
              epPayment: 355,
              epCount: 59
            },
            year: '1431'
          }
        ],
        narrativeHIE: 'hie hie hie',
        narrativeHIT: 'hit hit hit',
        narrativeMMIS: 'mmis mmis mmis',
        pointsOfContact: 'people to talk to',
        previousActivityExpenses: [
          {
            hie: 'pa hie',
            hit: 'pa hit',
            mmis: 'pa mmis',
            year: '1431'
          }
        ],
        previousActivitySummary: 'last time on Batman...',
        programOverview: 'doing the moop moop',
        stateProfile: 'big, lots of dirt and trees and stuff',
        years: ['1431']
      });
    });
  });
});
