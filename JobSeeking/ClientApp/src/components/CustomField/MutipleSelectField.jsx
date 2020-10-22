import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
MutipleSelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.object,
}
MutipleSelectField.defaultProps = {
    lable: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function MutipleSelectField(props) {
    const { field, options, lable, placeholder, disabled,label } = props;
    const { name,value } = field;
    const selectedOption = options.find(options => options.value === value);  


    function showProps(selectedOption) {
        var result = selectedOption;
        return result;
      }
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
