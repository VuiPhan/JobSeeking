import { Button, Dialog, DialogContent, FormGroup } from '@material-ui/core'
import InputField from 'components/CustomField/InputField';
import SelectField from 'components/CustomField/SelectField';
import MyToastr from 'components/Toastr/Toastr';
import { FastField, Formik } from 'formik'
import React, { useState } from 'react'
import { Form } from "formik";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { MyToaStr3 } from 'components/Toastr/Toastr2';
import ConstCommon from 'common/ConstInApp';
import ComboboxField from 'components/CustomField/ComboboxField';
import TextAreaField from 'components/CustomField/TextAreaField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import { Col, Row } from 'reactstrap';
function CVAddForm(props) {
    const { isOpen, handleClose, FClose, initialValuesCV, HandleCV, refreshData } = props;
    const SubmitCV = async (values) => {
        const formData = new FormData();
        formData.append('CVFile', initialValuesCV.CVFile);
        formData.append('CVName', initialValuesCV.CVFile.name);
        formData.append('JobTitleID', values.jobTitleID);
        formData.append('Description', values.description);
        let result = await SeekerAPI.submitCV(formData);
        MyToaStr3('Bạn đã thêm CV thành công!');
        refreshData();
        FClose(!isOpen);
    }

    const LinkDownLoad = `${ConstCommon.LinkConnectAPILocal}UploadAndDownload?FileName=${initialValuesCV.pathCV}`;
    return (
        <div >
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogContent >
                    <Formik initialValues={initialValuesCV}
                        // validationSchema={validationShema} 
                        onSubmit={values => SubmitCV(values)}
                        enableReinitialize>
                        {FormikProps => {
                            return (
                                <Form >
                                    <h3>Thông tin CV</h3>
                                    <h4>Việc làm IT theo cấp bậc</h4>
                                    <FastField
                                        name="jobTitleID"
                                        component={ComboboxField}
                                        label=""
                                        placeholder=""
                                        ListName="UTELS_GetJobTitle"
                                    />
                                    <h4>CV của bạn</h4>

                                    <div style={{ display: 'flex' }}>

                                        <label htmlFor="myInputCV" style={{ color: 'black' }}>
                                            <PresentToAllIcon style={{ fontSize: 30, cursor: 'pointer' }} />
                                        </label>

                                        <input
                                            id="myInputCV"
                                            style={{ display: 'none' }}
                                            type={"file"}
                                            onChange={HandleCV}
                                        />
                                        <p style={{ paddingLeft: 20 }}>{initialValuesCV.pathCV}</p>
                                        {initialValuesCV.recID ? <a style={{ paddingLeft: 20 }} href={LinkDownLoad} download target="_blank">Tải xuống CV</a> : null}
                                    </div>
                                    <h4>Mô tả thêm</h4>
                                    <FastField
                                        name="description"
                                        component={TextAreaField}
                                        label=""
                                        placeholder=""
                                    />
                                    <FormGroup>
                                        <Row className='clearfix'>
                                            <Col xs="9" sm="9"><Button type='submit'  style={{float:'right'}} variant="outlined" startIcon={<CloudUploadIcon />} color="secondary">Lưu thông tin CV</Button></Col>
                                            <Col xs="3" sm="3" ><Button style={{float:'right'}} variant="outlined" color="primary" onClick={handleClose} startIcon={<CloseIcon />} >Đóng</Button></Col>
                                        </Row>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CVAddForm