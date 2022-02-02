import { shallow } from 'enzyme';
import React from 'react';
import { push } from 'connected-react-router';

import { plain as ExportAndSubmit, mapDispatchToProps } from './ApdExport';

const useParams = jest.fn().mockReturnValue({ apdId: 123 });

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
    const fakePush = jest.fn();
    const component = shallow(
      <ExportAndSubmit
        push={fakePush}
        useParams={useParams}
        years={['2021', '2022']}
      />
    );
    component.find('Button').simulate('click');

    expect(fakePush).toHaveBeenCalledTimes(1);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ push });
  });
});
