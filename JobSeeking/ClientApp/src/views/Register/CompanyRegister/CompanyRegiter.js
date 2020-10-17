import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/CompanyPage.js";
import 'assets/css/TitleCompany.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import 'assets/scss/view/CompanyPage.scss';
import 'assets/scss/view/CompanyRegister.scss';
import { Button, Collapse, FormGroup, Input, InputGroup, Label, Row } from "reactstrap";
import { FormControl, FormLabel } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "components/CustomField/InputField";
import * as yup from 'yup';
import RegisterCompanyApi from "api/Company/RegisterCompany";
import LGCompanyPage from "Language/CompanyPage";
const useStyles = makeStyles(styles);
export default function CompanyPage(props) {
    const classes = useStyles();
    const res = LGCompanyPage.CompanyPage;
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const initialValues = {
        FullName: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        ConfirmPassword: '',
        CompanyName:'',
        TimeWorking:''
    };
    const validationShema = yup.object().shape({
        FullName: yup.string().required(res.TruongBBNhap),
        Email: yup.string().email().required(res.TruongBBNhap),
        Password: yup.string()
            .required(res.TruongBBNhap)
            .min(8, res.MatKhauQN)
            .matches(/[a-zA-Z]/, res.MatKhauInHoa)
        ,
        ConfirmPassword: yup.string()
            .required(res.TruongBBNhap)
            .oneOf([yup.ref('Password'), null], res.MatKhauKK),
        CompanyName: yup.string().required(res.TruongBBNhap),
        TimeWorking: yup.string().required(res.TruongBBNhap),
    })
    const initialValuesImage = {
        imageName: '',
        imageSrc: '',
        imageFile: null
    };
    const [values, setValues] = useState(initialValuesImage);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile: imageFile,
                    imageSrc: x.target.result
                })
            };
            reader.readAsDataURL(imageFile);
        }
    }
    const HandleSubmitData = (values) => {
        const formData = new FormData();
        console.log(values, 'values');
        console.log('sss',initialValues); 
        formData.append('FullName', values.FullName);
        formData.append('Email', values.Email);
        formData.append('PhoneNumber', values.PhoneNumber);
        formData.append('Password', values.Password);
        formData.append('CompanyName', values.CompanyName);
        formData.append('TimeWorking', values.TimeWorking);
        formData.append('imageFile', values.imageFile);
        formData.append('imageName', values.imageName);
        RegisterCompanyApi.post(formData);
    }
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className="containerTitle">
                                    <img src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" alt="..." />
                                    <div>
                                        <h1>FPT Software</h1>
                                        <h5><LocationOnIcon></LocationOnIcon> Ho Chi Minh, Ha Noi, Da Nang, Others</h5>
                                        <h5><AccessAlarmIcon></AccessAlarmIcon > Thứ 2 - Thứ 6. Từ 8h00 - 18h00</h5>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
                <div className='ContainerForm'>
                    <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                         onSubmit={values =>HandleSubmitData(values)}>
                        {FormikProps => {
                            const { value, errors, touched } = FormikProps;
                            return (
                                <Form>
                                    <h1>{res.ThongTinDN}</h1>
                                    <FastField
                                        name="FullName"
                                        component={InputField}
                                        label={res.HoVaTen}
                                        placeholder={res.HoVaTen}
                                    />
                                    <FastField
                                        name="Email"
                                        component={InputField}
                                        label={res.DiaChiEmail}
                                        placeholder={res.DiaChiEmail}
                                    />

                                    <FastField
                                        name="Password"
                                        component={InputField}
                                        label={res.MatKhau}
                                        type='password'
                                        placeholder={res.MatKhau}
                                    />

                                    <FastField
                                        name="ConfirmPassword"
                                        component={InputField}
                                        label={res.NLMatKhau}
                                        type='password'
                                        placeholder={res.NLMatKhau}
                                    />

                                    <h1>{res.TTCongTy}</h1>

                                    <FastField
                                        name="CompanyName"
                                        component={InputField}
                                        label={res.TenCongTy}
                                        placeholder={res.TenCongTy}
                                    />

                                    <FastField
                                        name="TimeWorking"
                                        component={InputField}
                                        label={res.TGLamViec}
                                        placeholder={res.TGLamViec}
                                    />
                                    <FormGroup>
                                        <Label for='FirstName'>{res.LogoCongTy}</Label>
                                    </FormGroup>

                                    <FormGroup>
                                        <input type='file' onChange={showPreview} accept='image/*'></input>
                                    </FormGroup>

                                    <FormGroup>
                                        <img className='imageLogoCompany' src={values.imageSrc}></img>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type='submit'>{res.DangKy}</Button>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
            <Footer />
        </div>
    );
}
