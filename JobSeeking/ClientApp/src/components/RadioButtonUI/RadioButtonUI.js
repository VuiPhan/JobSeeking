import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import '../RadioButtonUI/RadioButtonUI.scss';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));
ErrorRadios.propTypes = {
    question: PropTypes.object,
    handleBack:PropTypes.func,
    handleNext:PropTypes.func,
}
export default function ErrorRadios(props) {
  const {question,handleBack,handleNext} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleBack2 = () =>{
    handleBack();
    setValue('');
  }
  const handleNext2 = () =>{
    handleNext();
    setValue('');
  }


  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === props.question.Means) {
      setHelperText('You got it!');
      setError(false);
    } else if (value == "") {
      setHelperText('Please select an option.');
      setError(true);
    } else {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend" className="MeanVocabulary">Synonyms of words: {props.question.Vocabulary}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          <FormControlLabel value={props.question.Question1} control={<Radio />} label={props.question.Question1} />
          <FormControlLabel value={props.question.Question2} control={<Radio />} label={props.question.Question2} />
          <FormControlLabel value={props.question.Question3} control={<Radio />} label={props.question.Question3} />
          <FormControlLabel value={props.question.Question4} control={<Radio />} label={props.question.Question4} />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <div style={{display:"inline"}}>
        <Button  onClick={handleBack2} variant="outlined" color="primary" className={classes.button}>
          Back
        </Button>
        <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
        <Button onClick={handleNext2} variant="outlined" color="primary" className={classes.button}>
          Next
        </Button>
        </div>
      </FormControl>
    </form>
  );
}
