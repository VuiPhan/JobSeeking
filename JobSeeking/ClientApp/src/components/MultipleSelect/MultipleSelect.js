import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import LoadValueListApi from '../../api/loadValuelist';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
MultipleSelect.propTypes = {
    label: PropTypes.string,
    ListSelect: PropTypes.func,
}
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const{label,nameValueList,ListSelect} = props;
  const [names, setNames] = useState([]);
  const fetchDataValueList = async (nameValueList) =>{
    try{
       let responseUpdate = await LoadValueListApi.get(nameValueList);
       setNames(responseUpdate);
    }
    catch (error){
        console.error();
    }
}
  useEffect(() => {
    fetchDataValueList(nameValueList);
  }, [])
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {

    setPersonName(names => event.target.value);
    ListSelect(event);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input/>}
          // renderValue={(selected) => selected.join(', ')}
          renderValue={(selected) =>  selected.map(item => item.Name).join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((item,index) => (
            <MenuItem key={item.Value} value={item}>
              <Checkbox checked={personName.indexOf(item) > -1} />
              <ListItemText primary={item.Name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
