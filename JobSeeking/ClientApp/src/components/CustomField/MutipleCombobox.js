import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import LoadValueListApi from 'api/loadValuelist';
import { ErrorMessage } from 'formik';
MutipleCombobox.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,

}
MutipleCombobox.defaultProps = {
    lable: '',
    placeholder: '',
    disabled: false,

}

function MutipleCombobox(props) {
    const { field, lable,form, placeholder, disabled, label, ListName } = props;
    const { name, value } = field;
    const {errors,touched} = form;
    const value1 = ','+value+','
    const [options, setoptions] = useState([]);
    const showError = errors[name] && touched[name];

    //const selectedOption = options.find(options => value.indexOf(options.value.toString()) > 0);
    const selectedOption = options.filter(function (el) {
        if(el.value === null || value=== null)
        {return;}
        return el.value !== null && value1.includes(','+el.value+',') == true ;
      });
    useEffect(() => {
        async function fetchData() {
            let response = await LoadValueListApi.getCombobox(ListName);
            setoptions(response);
        }
        fetchData();
    }, [ListName])
    const HandleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.map(e => e.value).join(",") : selectedOption;
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
                    className = {showError ? 'is-invalid' :''}
                />
<ErrorMessage name={name} component={FormFeedback}/>
            </FormGroup>
        </div>
    )
}

export default MutipleCombobox
