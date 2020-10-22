import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.object,
}
SelectField.defaultProps = {
    lable: '',
    placeholder: '',
    disabled: false,
    options: [],
}

function SelectField(props) {
    const { field, options, lable, placeholder, disabled,label } = props;
    const { name,value } = field;
    const selectedOption = options.find(options => options.value === value);  
    const HandleSelectedOptionChange = (selectedOption) => {
        debugger;
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
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

export default SelectField
