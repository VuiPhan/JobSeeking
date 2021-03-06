import React, { useEffect } from 'react'
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
import SwitchLabels from 'components/Checkbox/Checkbox';
function PersonalInformation(props) {
    // Chi cho load lan dau
    const { disableForm, data, SubmitDataFinal } = props;
    const [res, setRes] = React.useState({});
    const [resValidation,setresValidation] =  React.useState({});
    const isOwnProfile = useSelector(state => state.AppSlice.isOwnProfile);

    const LoadResource = async () =>{
        const resource = await handleGetJson("PersonPage", "PersonalPage");
        const resourceValidation = await handleGetJson("Validation", "PersonalPage");
        setRes(resource);
        setresValidation(resourceValidation);
    }
    useEffect(() => {
        LoadResource();
    }, [])

    
    const LoginInfo = useSelector(state => state.loginInfo);
    const isAddMode = LoginInfo.CadidateCode ? false : true;
    const isView = LoginInfo.companyID ? false : true;


    const validationShema = yup.object().shape({
        firstName: yup.string().required(resValidation.TruongBBNhap),
        lastName: yup.string().required(resValidation.TruongBBNhap),
        email: yup.string().email().required(resValidation.TruongBBNhap),
        password: yup.string()
            .required(resValidation.TruongBBNhap)
            .min(8, resValidation.MatKhauQN)
            .matches(/[a-zA-Z]/, resValidation.MatKhauInHoa)
            .nullable()
        ,
        rePassword: yup.string()
            .required(resValidation.TruongBBNhap)
            .oneOf([yup.ref('password'), null], resValidation.MatKhauKK).nullable(),
        gender: yup.number().required(resValidation.TruongBBNhap).nullable(),
        academicLevel: yup.number().required(resValidation.TruongBBNhap).nullable(),
        phoneNumber: yup.number().required(resValidation.TruongBBNhap),

    })
    return (
        <div>
            <Formik initialValues={data}
                validationSchema={validationShema}
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
                                <Form.Label column sm="3">Tôi muốn nhận việc</Form.Label>
                                <Col sm="2">
                                    <FastField
                                        name="isAcceptWork"
                                        component={SwitchLabels}
                                        label=""
                                    />
                                </Col>
                            </Form.Group>

                            {disableForm || LoginInfo.CadidateCode ? null : <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.MatKhau}
                                </Form.Label>
                                <Col sm="10">
                                    <FastField
                                        name="password"
                                        component={InputField}
                                        label=""
                                        type="password"
                                        placeholder={res.MatKhau}
                                    />
                                </Col>
                            </Form.Group>}


                            {disableForm || LoginInfo.CadidateCode ? null : <Form.Group as={Row} >
                                <Form.Label column sm="2">
                                    {res.NhapLaiMatKhau}
                                </Form.Label>
                                <Col sm="10">
                                    <FastField
                                        name="rePassword"
                                        component={InputField}
                                        type="password"
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
                                        disabled={disableForm}
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
                                        disabled={disableForm}
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
                                        disabled={disableForm}
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
                                        disabled={disableForm}
                                        label=""
                                        placeholder=""
                                        ListName="GioiTinh" />
                                </Col>
                            </Form.Group>
                            {isOwnProfile ? <Button startIcon={<SaveIcon />} type="submit" variant="outlined" color="secondary">{isAddMode ? res.TaoTaiKhoan : 'Cập nhật'}</Button> : null}
                        </FormFormik>
                    )
                }}
            </Formik>
        </div>
    )
}
export default PersonalInformation
