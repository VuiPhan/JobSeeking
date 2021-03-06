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
    const selectedOption = options.filter(function (el) {
        if(el.value === null || value=== null)
        {return;}
        return el.value !== null && value.includes(el.value) == true ;
      });
    useEffect(() => {
        async function fetchData(){
            let response  = await LoadValueListApi.get(ListName);
            setoptions(response);
        }
        fetchData();
    }, [ListName])
    const HandleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ?  selectedOption.map(e => e.value).join(",") : selectedOption;
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
