import React from 'react';
import {StandardTextFieldProps, TextField as MaterialField} from '@material-ui/core';
import {useField} from 'formik';
import styles from './TextField.module.scss';

interface FieldProps extends StandardTextFieldProps {
  helperText: string;
}
// const styles1 = theme => ({
//   notchedOutline: {
//     borderWidth: "1px",
//     borderColor: "yellow !important"
//   }
// });

const TextField: React.FC<FieldProps> = ({
  //
  label,
  placeholder,
  helperText,
  ...custom
}) => {
  // @ts-ignore
  const [field, meta] = useField(custom);
  return (
    <MaterialField
      className={styles.field}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      // label={label}
      placeholder={placeholder}
      {...field}
      {...custom}
    />
  );
};

export default TextField;
