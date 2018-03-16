import React from 'react';

import Container from './Container';
import UsaAnimated from './UsaAnimated';
import { t } from '../i18n';

const Hello = () => (
  <Container>
    <div className="my3 py4 center">
      <UsaAnimated />
      <p className="mt3">{t('test')}</p>
    </div>
  </Container>
);

export default Hello;
