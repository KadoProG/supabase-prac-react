import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import styles from '@/components/common/TextField.module.scss';

export type TextFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  /** フォーム上の名前 */
  name: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 必須項目にするか */
  required?: boolean;
  /** デザインの追記 */
  style?: React.CSSProperties;
};

export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { field, fieldState } = useController<T>({
    name: props.name,
    control: props.control,
    rules: {
      ...props.rules,
      required: props.required ? '入力必須の項目です' : undefined,
    },
  });

  return (
    <div className={styles.container} style={props.style}>
      <input
        {...field}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={`${styles.Input} ${fieldState.error ? styles.InputError : ''}`}
      />
      {fieldState.error && <p className={styles.errorText}>{fieldState.error.message}</p>}
    </div>
  );
};
