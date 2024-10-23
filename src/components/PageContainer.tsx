import React from 'react';

import styles from './styles.module.css';

const PageContainer = (
  props: React.PropsWithChildren<unknown>
): React.ReactElement => <div className={styles.wrapper}>{props.children}</div>;

export default PageContainer;
