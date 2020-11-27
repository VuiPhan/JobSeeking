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


function CVAddForm(props) {
    const { isOpen, handleClose } = props;
    const initialValuesCV = {
        CVName: 'Mời bạn chọn CV',
        CVType: 1,
        CVFile: null
    };
    const [valuesCV, setValuesCV] = useState(initialValuesCV);
    const HandleCV = e => {
        if (e.target.files && e.target.files[0]) {
            let CVFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {

                setValuesCV({
                    ...valuesCV,
                    CVFile: CVFile,
                    CVSrc: x.target.result,
                    CVName: CVFile.name
                })
            };
            reader.readAsDataURL(CVFile);
        }
    }
    const SubmitCV = async (values) => {
        const formData = new FormData();
        formData.append('CVFile', valuesCV.CVFile);
        formData.append('CVName', valuesCV.CVFile.name);
        let result = await SeekerAPI.submitCV(formData);
    }
    return (
        <div >
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogContent >
                    <Formik initialValues={initialValuesCV}
                        // validationSchema={validationShema} 
                        onSubmit={values => SubmitCV(values)}>
                        {FormikProps => {
                            return (
                                <Form >
                                    <FastField
                                        name="CVType"
                                        component={SelectField}
                                        label="Chức danh công việc"
                                        placeholder=""
                                        ListName="HinhThucLamViec"
                                    />
                                    <h3>CV của bạn</h3>
                                    {/* <a href='https://localhost:44351/api/Download' download target="_blank">Click to download</a> */}
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
                                        <p style={{ paddingLeft: 20 }}>{valuesCV.CVName}</p>
                                    </div>
                                    <FormGroup>
                                        <Button type='submit' variant="outlined" color="secondary">Lưu thông tin CV</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button variant="outlined" color="secondary" onClick={handleClose}>Đóng</Button>
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
