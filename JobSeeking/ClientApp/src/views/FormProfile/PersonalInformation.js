import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Col, Row } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import handleGetJson from '../../common/ReadJson';
import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import loadInfomation from '../../api/UTE_Applicant/Infomation';
import { FastField, Formik } from 'formik';
import InputField from 'components/CustomField/InputField';
import SelectField from 'components/CustomField/SelectField';
function PersonalInformation() {
    const Content = handleGetJson("PersonPage");
    const submitData = () => {
        loadInfomation.post('');
    }
    const initialValues = {
        FullName: '',
        Gmail: '',
        BirthDay: '',
        PhoneNumber: '',
        Gender:null,
        AcademicLevel:null
    };


    return (
        <div>
            <Formik initialValues={initialValues}
                // validationSchema={validationShema}
                // onSubmit={values => HandleSubmitData(values)}>
                onSubmit={values => console.log(values)}>
                {FormikProps => {
                    const { values, errors, touched } = FormikProps;
                    console.log(values);
                    return (
                        <Form>
                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">{Content.MaNhanVien}</Form.Label>
                                <Col sm="5"><Form.Control plaintext readOnly defaultValue="email@example.com" /></Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">
                                    {Content.HoTen}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="FullName"
                                        component={InputField}
                                        label=""
                                        placeholder={Content.HoTen}
                                    />
                                </Col>
                                <Form.Label column sm="2">
                                    {Content.GioiTinh}
                                </Form.Label>
                                <Col sm="3">
                                    {/* <ComboBoxList ComboboxName="UTELS_GetGender"></ComboBoxList> */}
                                    <FastField
                                        name="Gender"
                                        component={SelectField}
                                        label=""
                                        placeholder="Category"
                                        ListName="HinhThucLamViec"
                                    />


                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">
                                    {Content.DiaChiEmail}
                                </Form.Label>
                                <Col sm="5">
                                <FastField
                                        name="Gmail"
                                        component={InputField}
                                        label=""
                                        placeholder={Content.DiaChiEmail}
                                    />
                                </Col>
                                <Form.Label column sm="2">
                                    {Content.NgaySinh}
                                </Form.Label>
                                <Col sm="3">

                                <FastField
                                        name="Gender"
                                        component={DatePickers}
                                        label=""
                                        placeholder={Content.SDT}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    {Content.SDT}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="PhoneNumber"
                                        component={InputField}
                                        label=""
                                        placeholder={Content.SDT}
                                        ListName="HinhThucLamViec"
                                    />
                                </Col>

                                <Form.Label column sm="2">
                                    {Content.TrinhDoHV}
                                </Form.Label>
                                <Col sm="3">
                                    <FastField
                                        name="AcademicLevel"
                                        component={SelectField}
                                        label=""
                                        placeholder={Content.TrinhDoHV}
                                        ListName="HinhThucLamViec"
                                    />
                                </Col>


                            </Form.Group>
                            <Button type='submit' variant="outlined" color="secondary">{Content.LuuDuLieu}</Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PersonalInformation
