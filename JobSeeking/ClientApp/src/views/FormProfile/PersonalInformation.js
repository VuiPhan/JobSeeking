import React from 'react'
import { Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import handleGetJson from '../../common/ReadJson';
import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import SelectField from 'components/CustomField/SelectField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
function PersonalInformation(props) {
    // Chi cho load lan dau
    const {disableForm,data,SubmitDataFinal} = props;
    const res = handleGetJson("PersonPage");
    const resValidation = handleGetJson("Validation");
    const LoginInfo = useSelector(state => state.loginInfo);
    const isAddMode = !LoginInfo.CadidateCode ? true : false;
    const isView = !LoginInfo.companyID ? true : false;

   
    const validationShema = yup.object().shape({
        firstName: yup.string().required(resValidation.TruongBBNhap),
        lastName: yup.string().required(resValidation.TruongBBNhap),
        email: yup.string().email().required(resValidation.TruongBBNhap),
        password: yup.string()
            .required(resValidation.TruongBBNhap)
            .min(8, resValidation.MatKhauQN)
            .matches(/[a-zA-Z]/, resValidation.MatKhauInHoa)
        ,
        rePassword: yup.string()
            .required(resValidation.TruongBBNhap)
            .oneOf([yup.ref('password'), null], resValidation.MatKhauKK),
        birthDay: yup.string().required(resValidation.TruongBBNhap),
        gender: yup.number().required(resValidation.TruongBBNhap).nullable(),
        academicLevel: yup.number().required(resValidation.TruongBBNhap).nullable(),
        phoneNumber: yup.number().required(resValidation.TruongBBNhap),

    })
    return (
        <div>
            <Formik initialValues={data}
                // validationSchema={validationShema}
                onSubmit={values => SubmitDataFinal(values)}
                enableReinitialize>
                {FormikProps => {
                    const { values, errors, touched } = FormikProps;
                    return (
                        <FormFormik>
                            <Form.Group as={Row} >
                                <Form.Label column sm="2">{res.TaiKhoan}</Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="email"
                                        disabled={disableForm}
                                        component={InputField}
                                        label=""
                                        placeholder={res.DiaChiEmail}
                                    />
                                </Col>
                            </Form.Group>

                            {disableForm?null: <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.MatKhau}
                                </Form.Label>
                                <Col sm="10">
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        label=""
                                        placeholder={res.MatKhau}
                                    />
                                </Col>
                            </Form.Group>}
                           

                            {disableForm?null: <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.NhapLaiMatKhau}
                                </Form.Label>
                                <Col sm="10">
                                    <FastField
                                        name="rePassword"
                                        component={InputField}
                                        label=""
                                        placeholder={res.NhapLaiMatKhau}
                                    />
                                </Col>
                            </Form.Group>}

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.HoVaTenDem}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="lastName"
                                        disabled={disableForm}
                                        component={InputField}
                                        label=""
                                        placeholder={res.HoVaTenDem}
                                    />
                                </Col>
                                <Form.Label column sm="2">
                                    {res.Ten}
                                </Form.Label>
                                <Col sm="3">
                                    <FastField
                                        name="firstName"
                                        disabled={disableForm}
                                        component={InputField}
                                        label=""
                                        placeholder={res.Ten}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.TrinhDoHV}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="academicLevel"
                                        component={SelectField}
                                        label=""
                                        placeholder={res.TrinhDoHV}
                                        ListName="TrinhDoHV" />
                                </Col>
                                <Form.Label column sm="2">
                                    {res.NgaySinh}
                                </Form.Label>
                                <Col sm="3">
                                    <FastField
                                        name="birthDayString"
                                        component={DatePickers}
                                        label=""
                                        placeholder=""
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    {res.SDT}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="phoneNumber"
                                        component={InputField}
                                        label=""
                                        placeholder={res.SDT}
                                    />
                                </Col>

                                <Form.Label column sm="2">
                                    {res.GioiTinh}
                                </Form.Label>
                                <Col sm="3">

                                    <FastField
                                        name="gender"
                                        component={SelectField}
                                        label=""
                                        placeholder=""
                                        ListName="GioiTinh" />
                                </Col>
                            </Form.Group>
                            {isView ? <Button startIcon={<SaveIcon/>} type="submit" variant="outlined" color="secondary">{isAddMode ? res.TaoTaiKhoan : 'Cập nhật'}</Button>:null}
                            {/* <Button type="submit" variant="outlined" color="secondary">Tạo</Button> */}
                        </FormFormik>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PersonalInformation
