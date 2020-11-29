import React from 'react'
// import MutipleCombobox from 'components/CustomField/MutipleCombobox';
import { FastField, Form, Formik } from 'formik';
import MutipleCombobox from 'components/CustomField/MutipleCombobox.js';
import { Row } from 'reactstrap';
import ComboboxField from 'components/CustomField/ComboboxField';
import { FormGroup } from '@material-ui/core';
import MutipleSelectField from 'components/CustomField/MutipleSelectField';
function WorkInfomation() {
    const datainitialValuesCV = {
        jobTitleID: 1,
        jobSkillID: 1,
        jobLocationID: 1,

    };
    const [initialValuesCV, setinitialValuesCV] = React.useState(datainitialValuesCV);
    return (
        <div>
            <p>Vui nè</p>
            <Formik initialValues={initialValuesCV}
                // validationSchema={validationShema} 
                onSubmit={values => console.log(values)}
                enableReinitialize>
                {FormikProps => {
                    return (
                        <Form >
                            <h3>Thông tin CV</h3>
                            <h4>Việc làm IT theo cấp bậc</h4>
                            <FastField
                                name="jobTitleID"
                                component={MutipleCombobox}
                                label=""
                                placeholder=""
                                ListName="UTELS_GetJobTitle"
                            />

                            <FastField
                                name="jobSkillID"
                                component={MutipleCombobox}
                                label=""
                                placeholder=""
                                ListName="UTELS_GetJobSkill"
                            />

                            <FastField
                                name="jobLocationID"
                                component={MutipleSelectField}
                                label=""
                                placeholder=""
                                ListName="NoiLamViec"
                            />
                            <FormGroup>
                                <Row className='clearfix'>
                                    {/* <Col xs="9" sm="9"><Button type='submit' style={{ float: 'right' }} variant="outlined" startIcon={<CloudUploadIcon />} color="secondary">Lưu thông tin CV</Button></Col>
                                    <Col xs="3" sm="3" ><Button style={{ float: 'right' }} variant="outlined" color="primary" onClick={handleClose} startIcon={<CloseIcon />} >Đóng</Button></Col> */}
                                </Row>
                            </FormGroup>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default WorkInfomation
