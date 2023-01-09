import React from 'react';
import {
  Footer,
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube
} from 'hds-react';

/**
 * NOTE: This is currently a placeholder footer. To be replaced by updated Footer component in HDS 3.0
 */

const PageFooter = () => (
  <Footer title="Pysäköinnin Sähköinen Asiointi">
    <Footer.Navigation navigationAriaLabel="HDS Footer navigation">
      <Footer.Item label="Item" />
      <Footer.Item label="Item" />
      <Footer.Item label="Item" />
      <Footer.Item label="Item" />
      <Footer.Item label="Item" />
    </Footer.Navigation>
    <Footer.Utilities backToTopLabel="Back to top">
      <Footer.SoMe>
        <Footer.Item icon={<IconFacebook />} />
        <Footer.Item icon={<IconTwitter />} />
        <Footer.Item icon={<IconInstagram />} />
        <Footer.Item icon={<IconYoutube />} />
      </Footer.SoMe>
      <Footer.Item label="Contact us" />
      <Footer.Item label="Give feedback" />
    </Footer.Utilities>
    <Footer.Base
      copyrightHolder="Copyright"
      copyrightText="All rights reserved">
      <Footer.Item label="Link" />
      <Footer.Item label="Link" />
      <Footer.Item label="Link" />
    </Footer.Base>
  </Footer>
);

export default PageFooter;
