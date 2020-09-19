/* eslint-disable no-use-before-define */
import React,{useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoadComboboxApi from '../../api/System/LoadCombobox';

const options = ['Option 1', 'Option 2'];
export default function ComboBox(props) {
    const {ComboboxName} = props;
    const [value, setValue] = React.useState();
    const [inputValue, setInputValue] = React.useState('');
    const [dataCombobox, setdataCombobox] = useState([{"ID":1,"Name":'The Shawshank Redemption'}]);

    useEffect(async () => {
      let dataCombobox2 = await LoadComboboxApi.get(ComboboxName);
      //setdataCombobox(dataCombobox2);
      console.log("dataCombobox",dataCombobox);
    }, [])
    return (
      <div>
        <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <br />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataCombobox}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
        />
      </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

