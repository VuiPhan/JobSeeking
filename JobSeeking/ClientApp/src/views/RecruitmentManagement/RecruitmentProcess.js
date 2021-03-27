import React from 'react'
import * as yup from 'yup';
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/IconInput';
import DatePickers from 'components/DatetimePicker/DatetimePicker';


function RecruitmentProcess() {
    const validationShema = yup.object().shape({
        
    });
    return (
        <div>
            <Formik initialValues={null}
                 validationSchema={validationShema}
                onSubmit={values => console.log(values)}
                enableReinitialize>
                {FormikProps => {
                    const { values, errors, touched } = FormikProps;
                    return (
                        <FormFormik>
            <FastField
                name="firstName"
                component={InputField}
                label=""
                placeholder=""
            />
            <FastField
                name="birthDayString"
                component={DatePickers}
                label=""
                placeholder=""
            />
              </FormFormik>
                    )
                }}
            </Formik>
        </div>
    )
}

export default RecruitmentProcess
