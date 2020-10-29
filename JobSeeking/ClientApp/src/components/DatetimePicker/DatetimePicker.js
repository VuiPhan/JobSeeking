import React,{PropTypes} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
// DatePickers.propTypes = {
//    ChangeInputDate:PropTypes.func,
// }
export default function DatePickers(props) {

  const classes = useStyles();
  const getDataDate = new Date();

  const { field, form, type, label, placeholder, disabled } = props;
  const { name } = field;
  const {errors,touched} =  form;
  const showError = errors[name] && touched[name];
  return (
    // <form className={classes.container} noValidate>
    <form>
      <TextField
        id="date"
        {...field}
        label=""
        type="date"
        style={{width: 140}}
        defaultValue={getDataDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
       />
    </form>
  );
}
