import React from 'react';
import {
  Footer,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube,
  Logo,
  logoFi,
  logoSv
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

const PageFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer title={t('common:title')} className="hide-on-print">
      <Footer.Utilities
        soMeLinks={[
          <Footer.Link
            key="facebook"
            icon={<IconFacebook />}
            href="https://www.facebook.com/kaupunkiymparisto/"
            target="_blank"
          />,
          <Footer.Link
            key="twitter"
            icon={<IconTwitter />}
            href="https://twitter.com/HelsinkiKymp"
            target="_blank"
          />,
          <Footer.Link
            key="instagram"
            icon={<IconInstagram />}
            href="https://www.instagram.com/kaupunkiymparisto"
            target="_blank"
          />,
          <Footer.Link
            key="youtube"
            icon={<IconYoutube />}
            href="https://www.youtube.com/@kaupunkiymparisto"
            target="_blank"
          />
        ]}>
        <Footer.Link
          label={t('common:contact-us')}
          href="https://www.hel.fi/fi/kaupunkiymparisto-ja-liikenne/kaupunkiympariston-asiakaspalvelu"
          target="_blank"
        />
        <Footer.Link
          label={t('common:feedback')}
          href="https://palautteet.hel.fi/"
          target="_blank"
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder="Copyright"
        copyrightText="All rights reserved"
        backToTopLabel={t('common:back-to-top')}
        logo={
          <Logo
            src={i18n.language === 'sv' ? logoSv : logoFi}
            alt={t('navigation.logo')}
            size="medium"
          />
        }>
        <Footer.Link
          label={t('common:legal:terms-and-conditions:title')}
          href={t('common:legal:terms-and-conditions:link')}
          target="_blank"
        />
        <Footer.Link
          label={t('common:legal:registry-description:title')}
          href={t('common:legal:registry-description:link')}
          target="_blank"
        />
        <Footer.Link
          label={t('common:legal:data-protection:title')}
          href={t('common:legal:data-protection:link')}
          target="_blank"
        />
        <Footer.Link
          label={t('common:legal:accessibility:title')}
          href={t('common:legal:accessibility:link')}
          target="_blank"
        />
      </Footer.Base>
    </Footer>
  );
};

export default PageFooter;
