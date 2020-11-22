import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/CompanyPage.js";
import 'assets/css/TitleCompany.scss';
import 'assets/scss/view/CompanyPage.scss';
import 'assets/scss/view/CompanyRegister.scss';
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "components/CustomField/InputField";
import * as yup from 'yup';
import RegisterCompanyApi from "api/Company/RegisterCompany";
import LGCompanyPage from "Language/CompanyPage";
import MyCKEditor from "components/CKEditor/CKEditor";
import HeaderCompany from "components/HeaderCompany/HeaderCompany";
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
        CompanyName: '',
        TimeWorking: '',
        CompanyAddress: '',
        InfomationCompany:''
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
    const HandleSubmitData = (valuesForm) => {
        const formData = new FormData();
        formData.append('FullName', valuesForm.FullName);
        formData.append('Email', valuesForm.Email);
        formData.append('PhoneNumber', valuesForm.PhoneNumber);
        formData.append('Password', valuesForm.Password);
        formData.append('CompanyName', valuesForm.CompanyName);
        formData.append('TimeWorking', valuesForm.TimeWorking);
        formData.append('CompanyAddress', valuesForm.CompanyAddress);
        formData.append('imageFile', values.imageFile);
        formData.append('imageName', values.imageName);
        RegisterCompanyApi.post(formData);
    }
    const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <HeaderCompany data={data}></HeaderCompany>
                    </div>
                </div>
                <div className='ContainerForm'>
                    <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                        onSubmit={values => HandleSubmitData(values)}>
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
                                    <FastField
                                        name="CompanyAddress"
                                        component={InputField}
                                        label={res.DiaChi}
                                        placeholder={res.DiaChi}
                                    />
                                    <Label> Thông tin công ty</Label>
                                    <FastField
                                        name="InfomationCompany"
                                        component={MyCKEditor}
                                        label="Thông tin công ty"
                                        placeholder="Thông tin công ty"
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
