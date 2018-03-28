import React from 'react';

import Container from './Container';
import UsaAnimated from './UsaAnimated';
import { t } from '../i18n';
import { STATES } from '../util';

// TODO (bren): make imgs for all places
const statesWithImg = [
  ...STATES.slice(0, 51),
  { id: 'pr', name: 'Puerto Rico' }
];

const Hello = () => (
  <Container>
    <div className="my3 py4 center">
      <UsaAnimated />
      <p className="mt3">{t('test')}</p>
      <hr />
      <div className="clearfix mxn1">
        {statesWithImg.map(s => (
          <div key={s.id} className="col col-3 sm-col-2 px1 mb2">
            <div className="p1 border">
              <img key={s.id} src={`/static/img/${s.id}.svg`} alt={s.name} />
              <div className="h6 truncate">{s.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Container>
);

export default Hello;
