import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const CertifyAndSubmit = () => (
  <Section id="certify-submit">
    <SectionTitle>{t('certifyAndSubmit.title')}</SectionTitle>

    <h3>{t('certifyAndSubmit.helpText')}</h3>

    <Collapsible title="Certify and Submit">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default CertifyAndSubmit;
