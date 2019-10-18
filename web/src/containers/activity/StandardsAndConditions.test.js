import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as StandardsAndConditions,
  mapStateToProps,
  mapDispatchToProps
} from './StandardsAndConditions';

import {
  setActivityStandardsBusinessResults,
  setActivityStandardsDocumentation,
  setActivityStandardsIndustryStandards,
  setActivityStandardsInteroperability,
  setActivityStandardsKeyPersonnel,
  setActivityStandardsLeverage,
  setActivityStandardsMinimizeCost,
  setActivityStandardsMITA,
  setActivityStandardsMitigationStrategy,
  setActivityStandardsModularity,
  setActivityStandardsReporting
} from '../../actions/editActivity';

describe('the Schedule (milestones) component', () => {
  const props = {
    activity: {
      // The Battle of the Scheldt results in a key Allied victory, when
      // Canadian forces successfully opened shipping routes to Antwerp, enabling
      // supplies to reach Allied forces in northwest Europe.
      standardsAndConditions: {
        businessResults: 'business results',
        documentation: 'documentation',
        industryStandards: 'industry standards',
        interoperabiliyt: 'interoperability',
        keyPersonnel: 'key personnel',
        leverage: 'leverage',
        minimizeCost: 'minimize cost',
        mita: 'mita',
        mitigationStrategy: 'mitigation strategy',
        modularity: 'modulartiy',
        reporting: 'reporting'
      }
    },
    activityIndex: 7,
    setBusinessResults: jest.fn(),
    setDocumentation: jest.fn(),
    setIndustryStandards: jest.fn(),
    setInteroperability: jest.fn(),
    setKeyPersonnel: jest.fn(),
    setLeverage: jest.fn(),
    setMinimizeCost: jest.fn(),
    setMITA: jest.fn(),
    setMitigationStrategy: jest.fn(),
    setModularity: jest.fn(),
    setReporting: jest.fn()
  };

  const component = shallow(<StandardsAndConditions {...props} />);

  beforeEach(() => {
    props.setBusinessResults.mockClear();
    props.setDocumentation.mockClear();
    props.setIndustryStandards.mockClear();
    props.setInteroperability.mockClear();
    props.setKeyPersonnel.mockClear();
    props.setLeverage.mockClear();
    props.setMinimizeCost.mockClear();
    props.setMITA.mockClear();
    props.setMitigationStrategy.mockClear();
    props.setModularity.mockClear();
    props.setReporting.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    // These tests are based on the order in which these fields are rendered

    it('updates activity modularity standards', () => {
      component
        .find('RichText')
        .at(0)
        .prop('onSync')('new modularity');
      expect(props.setModularity).toHaveBeenCalledWith(7, 'new modularity');
    });

    it('updates activity MITA standards', () => {
      component
        .find('RichText')
        .at(1)
        .prop('onSync')('new mita');
      expect(props.setMITA).toHaveBeenCalledWith(7, 'new mita');
    });

    it('updates activity industry standards', () => {
      component
        .find('RichText')
        .at(2)
        .prop('onSync')('new industry standards');
      expect(props.setIndustryStandards).toHaveBeenCalledWith(
        7,
        'new industry standards'
      );
    });

    it('updates activity leverage standards', () => {
      component
        .find('RichText')
        .at(3)
        .prop('onSync')('new leverage');
      expect(props.setLeverage).toHaveBeenCalledWith(7, 'new leverage');
    });

    it('updates activity business results standards', () => {
      component
        .find('RichText')
        .at(4)
        .prop('onSync')('new business results');
      expect(props.setBusinessResults).toHaveBeenCalledWith(
        7,
        'new business results'
      );
    });

    it('updates activity reporting standards', () => {
      component
        .find('RichText')
        .at(5)
        .prop('onSync')('new reporting');
      expect(props.setReporting).toHaveBeenCalledWith(7, 'new reporting');
    });

    it('updates activity interoperability standards', () => {
      component
        .find('RichText')
        .at(6)
        .prop('onSync')('new interop');
      expect(props.setInteroperability).toHaveBeenCalledWith(7, 'new interop');
    });

    it('updates activity mitigation strategy standards', () => {
      component
        .find('RichText')
        .at(7)
        .prop('onSync')('new mitigation');
      expect(props.setMitigationStrategy).toHaveBeenCalledWith(
        7,
        'new mitigation'
      );
    });

    it('updates activity key personnel standards', () => {
      component
        .find('RichText')
        .at(8)
        .prop('onSync')('new person');
      expect(props.setKeyPersonnel).toHaveBeenCalledWith(7, 'new person');
    });

    it('updates activity documentation standards', () => {
      component
        .find('RichText')
        .at(9)
        .prop('onSync')('new documentation');
      expect(props.setDocumentation).toHaveBeenCalledWith(
        7,
        'new documentation'
      );
    });

    it('updates activity minimize cost standards', () => {
      component
        .find('RichText')
        .at(10)
        .prop('onSync')('new minimum cost');
      expect(props.setMinimizeCost).toHaveBeenCalledWith(7, 'new minimum cost');
    });
  });

  describe('redux', () => {
    it('map state to props', () => {
      const state = {
        apd: {
          data: {
            activities: ['activity 1', 'activity 2', 'activity 3']
          }
        }
      };

      expect(mapStateToProps(state, { activityIndex: 2 })).toEqual({
        activity: 'activity 3'
      });
    });

    it('map dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({
        setBusinessResults: setActivityStandardsBusinessResults,
        setDocumentation: setActivityStandardsDocumentation,
        setIndustryStandards: setActivityStandardsIndustryStandards,
        setInteroperability: setActivityStandardsInteroperability,
        setKeyPersonnel: setActivityStandardsKeyPersonnel,
        setLeverage: setActivityStandardsLeverage,
        setMinimizeCost: setActivityStandardsMinimizeCost,
        setMITA: setActivityStandardsMITA,
        setMitigationStrategy: setActivityStandardsMitigationStrategy,
        setModularity: setActivityStandardsModularity,
        setReporting: setActivityStandardsReporting
      });
    });
  });
});
