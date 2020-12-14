import React, { useEffect } from 'react'
// import MutipleCombobox from 'components/CustomField/MutipleCombobox';
import { FastField, Form, Formik } from 'formik';
import MutipleCombobox from 'components/CustomField/MutipleCombobox.js';
import { Col, Row } from 'reactstrap';
import ComboboxField from 'components/CustomField/ComboboxField';
import { Button, FormGroup } from '@material-ui/core';
import MutipleSelectField from 'components/CustomField/MutipleSelectField';
import SaveIcon from '@material-ui/icons/Save';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';


function WorkInfomation(props) {
    //const {data} = props;
    const { CandidateCode } = useParams();
    const LoginInfo = useSelector(state => state.loginInfo);
    var disableForm = false;
    if (CandidateCode) {
      disableForm = true;
    }
    const [dataWorkInfo, setDataWorkInfo] = useState({
        candidateCode:'',
        jobTitleIDs: "1,2",
        jobSkillIDs: "1",
        jobLocations: "1",
      });
      async function fetchDataWorkInfo() {
        const result = await SeekerAPI.getWorkInfo(LoginInfo.CadidateCode);
        setDataWorkInfo(result[0]);
      }
      useEffect(() => {
        fetchDataWorkInfo();
      }, [CandidateCode, LoginInfo.CadidateCode])
      const UpdateWorkInfo = async (data) => {
        const formData = new FormData();
        formData.append('JobSkillIDs', data.jobSkillIDs);
        formData.append('JobTitleIDs', data.jobTitleIDs);
        formData.append('JobLocations', data.jobLocations);
        const result = await SeekerAPI.updateWorkInfo(formData);
        MyToaStrSuccess('Cập nhật thành công');
      }
    return (
        <div>
            <Formik initialValues={dataWorkInfo}
                // validationSchema={validationShema} 
                onSubmit={values => UpdateWorkInfo(values)}
                enableReinitialize>
                {FormikProps => {
                    return (
                        <Form >
                            <h4>Việc làm theo cấp bậc</h4>
                            <FastField
                                name="jobTitleIDs"
                                component={MutipleCombobox}
                                label=""
                                placeholder=""
                                ListName="UTELS_GetJobTitle"
                            />
                            <h4>Việc làm theo kỹ năng</h4>
                            <FastField
                                name="jobSkillIDs"
                                component={MutipleCombobox}
                                label=""
                                placeholder=""
                                ListName="UTELS_GetJobSkill"
                            />
                            <h4>Việc làm theo nơi làm việc</h4>
                            <FastField
                                name="jobLocations"
                                component={MutipleSelectField}
                                label=""
                                placeholder=""
                                ListName="NoiLamViec"
                            />
                            <FormGroup>
                                <Row className='clearfix'>
                                <Col xs="12" sm="12"> <Button type='submit' style={{ float: 'right' }} variant="outlined" color="secondary" startIcon={<SaveIcon/>} >Lưu thông tin </Button>
                                </Col>
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
