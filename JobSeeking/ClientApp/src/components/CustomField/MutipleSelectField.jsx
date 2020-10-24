import React,{useEffect,useState} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import LoadValueListApi from 'api/loadValuelist';
MutipleSelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,

}
MutipleSelectField.defaultProps = {
    lable: '',
    placeholder: '',
    disabled: false,

}

function MutipleSelectField(props) {
    const { field, lable, placeholder, disabled,label,ListName } = props;
    const { name,value } = field;
    const [options, setoptions] = useState([])
    const selectedOption = options.find(options => options.value === value);  
    debugger;
    useEffect(() => {
        async function fetchData(){
            debugger;
            let response  = await LoadValueListApi.get(ListName);
            setoptions(response);
        }
        fetchData();
        
    }, [])
    const HandleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ?  selectedOption.map(e => e.value).join(",") : selectedOption;
        debugger;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            },
        }
        field.onChange(changeEvent);
    }
    return (
        <div>
            <FormGroup>
                {label && <Label for={name}>{label}</Label>}
                <Select 
                 id={name}
                 {...field}
                 isMulti
                 value={selectedOption}
                onChange={HandleSelectedOptionChange}
                placeholder={placeholder}
                isDisabled={disabled}
                options={options}
                />

            </FormGroup>
        </div>
    )
}

export default MutipleSelectField
