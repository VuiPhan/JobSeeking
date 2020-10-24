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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import MyCKEditor from "components/CKEditor/CKEditor";
import Select from 'react-select';
import PublishedRecruitmentAPI from "api/Company/PublishedRecruitmentAPI";
import SelectField from "components/CustomField/SelectField";
import MutipleSelectField from "components/CustomField/MutipleSelectField";



const useStyles = makeStyles(styles);
export default function PublishedRecruitment(props) {
    const classes = useStyles();
    const res = LGCompanyPage.PublishedRecruitment;
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const initialValues = {
        Title: '',
        categoryId: null,
        categoryIdMutiple: ''

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
    const [requireWork, setrequireWork] = useState({ requireCV: 'abs', jobDescription: '' });

    const ChangeRequireWork = data => {
        //setrequireWork({requireCV:data2});
        setrequireWork({
            ...requireWork,
            requireCV: data
        })
    }
    const ChangeJobDescription = data => {
        //setrequireWork({requireCV:data2});
        setrequireWork({
            ...requireWork,
            jobDescription: data
        })
    }
    const HandleSubmitData = (valuesForm) => {
        console.log(requireWork);
        const formData = new FormData();
        formData.append('Title', valuesForm.Title);
        formData.append('RequireCV', requireWork.requireCV);
        formData.append('JobDescription', requireWork.jobDescription);
        formData.append('imageFile', values.imageFile);
        formData.append('imageName', values.imageName);
        debugger;
        PublishedRecruitmentAPI.post(formData);
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
                        // validationSchema={validationShema}
                        // onSubmit={values => HandleSubmitData(values)}>
                        // onSubmit={values => HandleSubmitData(values)}>
                        onSubmit={values => console.log(values)}>
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
                                    <h1>{res.MoTaCongViec}</h1>
                                    <FastField
                                        component={MyCKEditor}
                                        ChangeRequireWork={ChangeJobDescription}
                                        label=""
                                        placeholder={res.YeuCauCongViec}
                                    />
                                    <h1>{res.YeuCauCongViec}</h1>

                                    <FastField
                                        component={MyCKEditor}
                                        ChangeRequireWork={ChangeRequireWork}
                                        label=""
                                        placeholder={res.YeuCauCongViec}
                                    />
                                    <FastField
                                        name="categoryId"
                                        component={SelectField}
                                        label="Category"
                                        placeholder="Category"
                                        options={[{ value: 1, label: "Vui" }, { value: 2, label: "Buon" }, { value: 3, label: "Đẹp trai" }, { value: 4, label: "Đẹp tra2i" }]}
                                    />
                                    <FastField
                                        name="categoryIdMutiple"
                                        component={MutipleSelectField}
                                        label="Các thế mạnh của chúng tôi"
                                        placeholder="Category"
                                        options={[{ value: 1, label: "C#" }, { value: 2, label: "SQL" }, { value: 3, label: "JavaScript" }, { value: 4, label: "JavaScript" }]}
                                    />
                                    <FastField
                                        name="categoryIdMutiple"
                                        component={MutipleSelectField}
                                        label="Các bằng cấp ưu tiên"
                                        ListName="BangCapUuTien"
                                        placeholder="Mời bạn chọn các bằng cấp được ưu tiên"
                                        options={[{ value: 1, label: "C#" }, { value: 2, label: "SQL" }, { value: 3, label: "JavaScript" }, { value: 4, label: "JavaScript" }]}
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
