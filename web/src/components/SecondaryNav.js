import React from 'react';
import { LinksContextConsumer } from '../contexts/LinksContextProvider';
import NextPreviousButtons from './NextPreviousButtons';

const SecondaryNav = () => {
  return (
    <LinksContextConsumer>
      {context => (
        <div className="pre-button-section-break">
          <NextPreviousButtons context={context} />
        </div>
      )}
    </LinksContextConsumer>
  );
};

export default SecondaryNav;
