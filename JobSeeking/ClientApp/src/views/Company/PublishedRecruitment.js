import React, { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/CompanyPage.js";
import 'assets/css/TitleCompany.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import 'assets/scss/view/CompanyPage.scss';
import 'assets/scss/view/CompanyRegister.scss';
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "components/CustomField/InputField";
import * as yup from 'yup';
import LGCompanyPage from "Language/CompanyPage";
import MyCKEditor from "components/CKEditor/CKEditor";
import PublishedRecruitmentAPI from "api/Company/PublishedRecruitmentAPI";
import SelectField from "components/CustomField/SelectField";
import MutipleSelectField from "components/CustomField/MutipleSelectField";
import HeaderCompany from "components/HeaderCompany/HeaderCompany";



const useStyles = makeStyles(styles);
export default function PublishedRecruitment(props) {
    const classes = useStyles();
    const res = LGCompanyPage.PublishedRecruitment;
    const { ...rest } = props;
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
    const initialValues = {
        Title: '',
        categoryId: null,
        Strengths: '',
        PriorityDegree: '',
        jobDescription: '',
        requireCV: '',
        reasonsToJoin: '',
        loveWorkingHere:''
    };
    const HandleSubmitData = (valuesForm) => {
        console.log(valuesForm);
        const formData = new FormData();
        formData.append('Title', valuesForm.Title);
        formData.append('RequireCV', valuesForm.requireCV);
        formData.append('ReasonsToJoin', valuesForm.reasonsToJoin);
        formData.append('JobDescription', valuesForm.jobDescription);
        formData.append('LoveWorkingHere', valuesForm.loveWorkingHere);
        formData.append('Strengths', valuesForm.Strengths);
        formData.append('PriorityDegree', valuesForm.PriorityDegree);
        formData.append('imageFile', values.imageFile);
        formData.append('imageName', values.imageName);
        PublishedRecruitmentAPI.post(formData);
    }
    const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <HeaderCompany data = {data}></HeaderCompany>
                    </div>
                </div>
                <div className='ContainerForm'>
                    <Formik initialValues={initialValues}
                        // validationSchema={validationShema}
                        // onSubmit={values => HandleSubmitData(values)}>
                        onSubmit={values => HandleSubmitData(values)}>
                        {FormikProps => {
                            const { value, errors, touched } = FormikProps;
                            return (
                                <Form>
                                    <h1>{res.TieuDeCongViec}</h1>
                                    <FastField
                                        name="Title"
                                        component={InputField}
                                        label=""
                                        placeholder={res.TieuDeCongViec}
                                    />
                                    <h1>{res.LyDoGiaNhapCongTy}</h1>
                                    <FastField
                                        name="reasonsToJoin"
                                        component={MyCKEditor}
                                        label=""
                                        placeholder={res.LyDoGiaNhapCongTy}
                                    />

                                    <h1>{res.MoTaCongViec}</h1>
                                    <FastField
                                        name="jobDescription"
                                        component={MyCKEditor}
                                        label=""
                                        placeholder={res.YeuCauCongViec}
                                    />
                                    <h1>{res.YeuCauCongViec}</h1>

                                    <FastField
                                        name="requireCV"
                                        component={MyCKEditor}
                                        label=""
                                        placeholder={res.YeuCauCongViec}
                                    />

                                    <h1>{res.TaiSaoBanYeuThich}</h1>
                                    <FastField
                                        name="loveWorkingHere"
                                        component={MyCKEditor}
                                        label=""
                                        placeholder={res.TaiSaoBanYeuThich}
                                    />

                                    <FastField
                                        name="categoryId"
                                        component={SelectField}
                                        label="Category"
                                        placeholder="Category"
                                        ListName="HinhThucLamViec"
                                    />
                                    <FastField
                                        name="Strengths"
                                        component={MutipleSelectField}
                                        label="Các thế mạnh của chúng tôi"
                                        placeholder="Category"
                                        ListName="TheManhCongTy"
                                    />
                                    <FastField
                                        name="PriorityDegree"
                                        component={MutipleSelectField}
                                        label="Các bằng cấp ưu tiên"
                                        ListName="BangCapUuTien"
                                        placeholder="Mời bạn chọn các bằng cấp được ưu tiên"
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
                                        <Button type='submit'>{res.DangTin}</Button>
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
