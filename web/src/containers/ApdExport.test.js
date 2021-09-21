import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { push } from 'connected-react-router';

import { plain as ExportAndSubmit, mapDispatchToProps } from './ApdExport';

const useParams = jest
  .fn()
  .mockReturnValue({ apdId: '0123456789abcdef01234567' });

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(
      shallow(
        <ExportAndSubmit
          push={() => {}}
          useParams={useParams}
          years={['2021', '2022']}
        />
      )
    ).toMatchSnapshot();
  });

  test('routes to print preview', () => {
    const fakePush = sinon.spy();
    const component = shallow(
      <ExportAndSubmit
        push={fakePush}
        useParams={useParams}
        years={['2021', '2022']}
      />
    );
    component.find('Button').simulate('click');

    expect(fakePush.calledOnce).toEqual(true);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ push });
  });
});
