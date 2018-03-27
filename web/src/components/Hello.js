import React from 'react';

import Container from './Container';
import UsaAnimated from './UsaAnimated';
import { t } from '../i18n';
import { STATES } from '../util';

const Hello = () => (
  <Container>
    <div className="my3 py4 center">
      <UsaAnimated />
      <p className="mt3">{t('test')}</p>
      <hr />
      <div className="left-align">
        {STATES.slice(0, 50).map(s => (
          <img key={s.id} src={`/static/img/${s.id}.svg`} alt={s.name} />
        ))}
      </div>
    </div>
  </Container>
);

export default Hello;
