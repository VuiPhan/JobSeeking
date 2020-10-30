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
  const {ChangeInputDate} = props;
  const classes = useStyles();
  const getDataDate = new Date();
  console.log('getDataDate',getDataDate);
  const changeData = (e) =>{
      console.log(e.target.value);
      ChangeInputDate(e);
  }
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        onChange={changeData}
        label=""
        type="date"
        defaultValue={getDataDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
