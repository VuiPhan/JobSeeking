import React, { useState, useEffect } from 'react'
import { TextField, Collapse, Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import jsonData from '../../assets/language/PersonalPage.json'
import "react-datepicker/dist/react-datepicker.css";
import handleGetJson from '../../common/ReadJson';
import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import ComboBox from '../../components/Combobox/Combobox';
import ControllableStates from '../../components/Combobox/ComboboxController';
import ComboboxKendo, { ComboBoxList } from '../../components/Kendo/Combobox';
import loadInfomation from '../../api/UTE_Applicant/Infomation';
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import SelectField from 'components/CustomField/SelectField';
import * as yup from 'yup';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAPIRedux } from 'components/FormLogin/LoginSlice';
function PersonalInformation() {
    // Chi cho load lan dau
    const res = handleGetJson("PersonPage");
    const resValidation = handleGetJson("Validation");
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.loginInfo);
    const [data, setData] = useState({
        firstName: 'Pha',
        lastName: '',
        password: '',
        rePassword: '',
        email: '',
        birthDay: '',
        phoneNumber: '',
        gender: 1,
        academicLevel: 1
    });
    const [test,setTest] = useState('');
    useEffect(() => {
        setTest('Vui nè');
        debugger;
        async function fetchMyAPI() {
         //   const result = await SeekerAPI.get(LoginInfo.UserID);
            //debugger;
            //console.log(result);
            let dataSet = {
                firstName: 'Phan',
                lastName: 'Vui'
            };
            
             //setData(result[0]);
             //console.log(result[0]);
             setData(prevState => {
                // Object.assign would also work
                return {...prevState, ...dataSet};
              });
              console.log('datadataa',data);
             setTest('Vui nè');
             console.log('testtest',test);
        }
        fetchMyAPI();
    }, [LoginInfo.UserID]);
    
    const submitData = async (values) => {
        setTest('VuiVuiUVi');
        return;
        const formData = new FormData();
        formData.append('LastName', values.lastName);
        formData.append('FirstName', values.firstName);
        formData.append('Password', values.password);
        formData.append('Email', values.email);
        formData.append('BirthDay', values.birthDay);
        formData.append('PhoneNumber', values.phoneNumber);
        formData.append('Gender', values.gender);
        formData.append('AcademicLevel', values.academicLevel);
        let result = await SeekerAPI.post(formData);
        if (result.error === "") {

            let dataLogin = { Email: values.Email, Password: values.Password }
            debugger;
            const action = LoginAPIRedux(dataLogin);
            dispatch(action);
        }



    }
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
            .oneOf([yup.ref('Password'), null], resValidation.MatKhauKK),
        birthDay: yup.string().required(resValidation.TruongBBNhap),
        gender: yup.number().required(resValidation.TruongBBNhap).nullable(),
        academicLevel: yup.number().required(resValidation.TruongBBNhap).nullable(),
        phoneNumber: yup.number().required(resValidation.TruongBBNhap),

    })
    return (
        <div>
            <Formik initialValues={data}
                validationSchema={validationShema}
                onSubmit={values => submitData(values)}>

                {FormikProps => {
                    const { values, errors, touched } = FormikProps;
                    console.log(values);
                    return (
                        <FormFormik>

                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">{res.TaiKhoan}</Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        label=""
                                        placeholder={res.DiaChiEmail}
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="">
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
                            </Form.Group>


                            <Form.Group as={Row} controlId="">
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
                            </Form.Group>


                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">
                                    {res.HoVaTenDem}
                                </Form.Label>
                                <Col sm="5">
                                    <FastField
                                        name="lastName"
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
                                        component={InputField}
                                        label=""
                                        placeholder={res.Ten}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="">
                                <Form.Label column sm="2">
                                    {res.DiaChiEmail}
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
                                        name="birthDay"
                                        component={DatePickers}
                                        label=""
                                        placeholder=""
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="">
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
                                    {res.TrinhDoHV}
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


                            <Button type="submit" variant="outlined" color="secondary">{res.TaoTaiKhoan}</Button>
                        </FormFormik>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PersonalInformation
