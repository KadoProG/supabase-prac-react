import styles from '@/components/common/button/Button.module.scss';
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => (
  <button onClick={props.onClick} disabled={props.disabled} className={styles.button}>
    {props.children}
  </button>
);
