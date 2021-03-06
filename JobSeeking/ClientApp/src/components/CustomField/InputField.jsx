import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

InputField.propTypes = {
    field:PropTypes.object.isRequired,
    form:PropTypes.object.isRequired,
    
    type:PropTypes.string,
    lable:PropTypes.string,
    placeholder:PropTypes.string,
    disabled:PropTypes.bool,

};
InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false
}
function InputField(props) {
    // Phải có Initial Form để bind tương ứng với tương ứng của mình

    const { field, form, type, label, placeholder, disabled } = props;
    const { name } = field;
    const {errors,touched} =  form;
    const showError = errors[name] && touched[name];
    const valueRender = field.value == null ? '' : field.value;
    return (
        <div>
            <FormGroup>
                {label && <Label for={name}>{label}</Label>}
                <Input
                    id={name}
                    {...field}
                    value={valueRender}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    invalid={showError}
                    ></Input>
            {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
            <ErrorMessage name={name} component={FormFeedback}/>
            </FormGroup>
        </div>
    );
}

export default InputField;