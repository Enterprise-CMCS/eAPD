import React from 'react';

import { render, screen } from 'apd-testing-library';

import FederalAdmin from './FederalAdmin';


describe('<FederalAdmin />', () => {

  test('loads and displays temp message', async () => {

    render(<FederalAdmin />)
  
    expect(screen.getByRole('heading')).toHaveTextContent('Federal admin panel coming soon...');
  });  
});
