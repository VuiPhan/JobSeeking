import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
MultilineTextFields.propTypes = {
    labelText:PropTypes.string,
    ChangeText:PropTypes.func,
}
export default function MultilineTextFields(props) {
  const {labelText,ChangeText,dataText} = props;
  const classes = useStyles();
   const [valueIts, setValue] = React.useState('');
  // const value = dataText;
  const handleChange = (event) => {
    setValue(event.target.value);
    ChangeText(event);  
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-multiline-flexible"
          label={labelText}
          multiline
          rowsMax={4}
          value={valueIts}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
