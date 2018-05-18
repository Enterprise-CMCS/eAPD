import React from 'react';

import { t } from '../i18n';
import Section from './Section';
import SectionDesc from './SectionDesc';
import SectionTitle from './SectionTitle';
import Collapsible from './Collapsible';

const CertifyAndSubmit = () => (
  <Section id="certify-submit">
    <SectionTitle>{t('certifyAndSubmit.title')}</SectionTitle>
    <SectionDesc>{t('certifyAndSubmit.helpText')}</SectionDesc>
    <Collapsible title="Certify and Submit">
      <div>...</div>
    </Collapsible>
  </Section>
);

export default CertifyAndSubmit;
