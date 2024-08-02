import styles from '@/components/common/Divider.module.scss';
import React from 'react';

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = (props) => (
  <div className={styles.divider}>
    <p className={styles.divider__label}>{props.label}</p>
  </div>
);
