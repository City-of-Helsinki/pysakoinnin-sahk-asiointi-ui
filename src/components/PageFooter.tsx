import React from 'react';
import {
  Footer,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube
} from 'hds-react';
import { useTranslation } from 'react-i18next';

/**
 * NOTE: This is currently a placeholder footer. To be replaced by updated Footer component in HDS 3.0
 */

const PageFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer title={t('common:title')} className="hide-on-print">
      <Footer.Utilities backToTopLabel={t('common:back-to-top')}>
        <Footer.SoMe>
          <Footer.Item
            icon={<IconFacebook />}
            href="https://www.facebook.com/kaupunkiymparisto/"
            target="_blank"
          />
          <Footer.Item
            icon={<IconTwitter />}
            href="https://twitter.com/HelsinkiKymp"
            target="_blank"
          />
          <Footer.Item
            icon={<IconInstagram />}
            href="https://www.instagram.com/kaupunkiymparisto"
            target="_blank"
          />
          <Footer.Item
            icon={<IconYoutube />}
            href="https://www.youtube.com/@kaupunkiymparisto"
            target="_blank"
          />
        </Footer.SoMe>
        <Footer.Item
          label={t('common:contact-us')}
          href="https://www.hel.fi/fi/kaupunkiymparisto-ja-liikenne/kaupunkiympariston-asiakaspalvelu"
          target="_blank"
        />
        <Footer.Item
          label={t('common:feedback')}
          href="https://palautteet.hel.fi/"
          target="_blank"
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder="Copyright"
        copyrightText="All rights reserved">
        <Footer.Item
          label={t('common:legal:terms-and-conditions:title')}
          href={t('common:legal:terms-and-conditions:link')}
          target="_blank"
        />
        <Footer.Item
          label={t('common:legal:registry-description:title')}
          href={t('common:legal:registry-description:link')}
          target="_blank"
        />
        <Footer.Item
          label={t('common:legal:data-protection:title')}
          href={t('common:legal:data-protection:link')}
          target="_blank"
        />
        <Footer.Item
          label={t('common:legal:accessibility:title')}
          href={t('common:legal:accessibility:link')}
          target="_blank"
        />
      </Footer.Base>
    </Footer>
  );
};

export default PageFooter;
