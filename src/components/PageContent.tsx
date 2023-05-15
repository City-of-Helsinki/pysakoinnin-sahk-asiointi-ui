import React from 'react';

import styles from './styles.module.css';

const PageContent = (
  props: React.PropsWithChildren<unknown>
): React.ReactElement => (
  <div className={styles.content} id="content">
    {props.children}
  </div>
);

export default PageContent;
