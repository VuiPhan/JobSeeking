import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import LoadValueListApi from 'api/loadValuelist';
import { ErrorMessage } from 'formik';
SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
}
SelectField.defaultProps = {
    lable: '',
    placeholder: '',
    disabled: false,
}

function SelectField(props) {
    const { field, form,lable, placeholder, disabled,label,ListName } = props;
    const { name,value } = field;
    const {errors,touched} = form;
    const showError = errors[name] && touched[name];
    const [options, setoptions] = useState([]);
    const selectedOption = options.find(options => options.value === value);  
    useEffect(() => {
        async function fetchData(){
            let response  = await LoadValueListApi.get(ListName);
            setoptions(response);
        }
        fetchData();
        
    }, [ListName])
    const HandleSelectedOptionChange = (selectedOption) => {
        
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
                className = {showError ? 'is-invalid' :''}
                />
            <ErrorMessage name={name} component={FormFeedback}/>
            </FormGroup>
        </div>
    )
}

export default SelectField
