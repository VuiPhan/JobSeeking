import React, { useEffect } from 'react'
// import MutipleCombobox from 'components/CustomField/MutipleCombobox';
import { FastField, Form, Formik } from 'formik';
import MutipleCombobox from 'components/CustomField/MutipleCombobox.js';
import { Col, Row } from 'reactstrap';
import { Button, FormGroup } from '@material-ui/core';
import MutipleSelectField from 'components/CustomField/MutipleSelectField';
import SaveIcon from '@material-ui/icons/Save';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
function WorkInfomation(props) {
    //const {data} = props;
    const { CandidateCode } = useParams();
    const LoginInfo = useSelector(state => state.loginInfo);
    var disableForm = false;
    if (CandidateCode) {
        disableForm = true;
    }
    const [dataWorkInfo, setDataWorkInfo] = useState({
        candidateCode: '',
        jobTitleIDs: null,
        jobSkillIDs: null,
        jobLocations: null,
    });
    async function fetchDataWorkInfo() {
        if (LoginInfo.CadidateCode) {
            const result = await SeekerAPI.getWorkInfo(LoginInfo.CadidateCode);
            setDataWorkInfo(result[0]);
        }
        else {
            const result = await SeekerAPI.getWorkInfo(CandidateCode);
            setDataWorkInfo(result[0]);
        }

    }
    useEffect(() => {
        debugger;
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
                                <HtmlTooltip
                            title={
                            <React.Fragment>
                                <Typography color="inherit"></Typography>
                                <em>{"Các chức danh công việc"}</em> <u>{'có khả năng'}</u>.{' '}
                                {"ứng tuyển"}
                            </React.Fragment>
                            }
                        >
                            <h4>Chức danh công việc</h4>
                        </HtmlTooltip>
                            <FastField
                                name="jobTitleIDs"
                                component={MutipleCombobox}
                                label=""
                                disabled={disableForm}
                                placeholder=""
                                ListName="UTELS_GetJobTitle"
                            />
                               
                               <HtmlTooltip
                            title={
                            <React.Fragment>
                                <Typography color="inherit"></Typography>
                                <em>{"Đây là các kỹ năng"}</em> <b>{''}</b> <u>{'nổi bật'}</u>
                                {" của bạn"}
                            </React.Fragment>
                            }
                        >
                            <h4>Kỹ năng thế mạnh</h4>
                        </HtmlTooltip>
                            <FastField
                                name="jobSkillIDs"
                                component={MutipleCombobox}
                                disabled={disableForm}
                                label=""
                                placeholder=""
                                ListName="UTELS_GetJobSkill"
                            />
                           
                            <HtmlTooltip
                            title={
                            <React.Fragment>
                                <Typography color="inherit"></Typography>
                                <em>{"Ở đây chúng tôi cung cấp"}</em> <b>{'một số'}</b> <u>{'Tỉnh thành'}</u>.{' '}
                                {"nổi bật tuyển dụng công nghệ thông tin"}
                            </React.Fragment>
                            }
                        >
                            <h4>Nơi làm việc</h4>
                        </HtmlTooltip>
                            {/* <FastField
                                name="jobLocations"
                                component={MutipleSelectField}
                                label=""
                                placeholder=""
                                disabled={disableForm}
                                ListName="NoiLamViec"
                            /> */}
                            <FastField
                                name="jobLocations"
                                component={MutipleCombobox}
                                label=""
                                placeholder=""
                                disabled={disableForm}
                                ListName="UTELS_GetProvince"
                            />
                            {LoginInfo.CadidateCode ? <FormGroup>
                                <Row className='clearfix'>
                                    <Col xs="12" sm="12"> <Button type='submit' style={{ float: 'right' }} variant="outlined" color="secondary" startIcon={<SaveIcon />} >Lưu thông tin </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                                : null}
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default WorkInfomation
