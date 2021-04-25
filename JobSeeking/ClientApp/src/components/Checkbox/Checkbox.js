
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const { field, label } = props;
  const { value } = field;
  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch {...field} checked={value} />}
        label={label}
      />
    </FormGroup>
  );
}