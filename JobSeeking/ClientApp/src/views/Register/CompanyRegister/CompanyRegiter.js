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
const useStyles = makeStyles(styles);

export default function CompanyPage(props) {
    const classes = useStyles();


    //LoadLanguageForPage();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const initialValues = {
        FullName:'',
        Email:''
    };
  
    const validationShema = yup.object().shape({
        FullName: yup.string().required('Trường bắt buộc nhập'),
        Email:yup.number().required(),
    })

    const initialValuesImage ={
        imageName:'',
        imageSrc: '',
        imageFile:null

    };
    debugger;
    const [values,setValues ] = useState(initialValuesImage);
    debugger;
    const handleInputChange = e => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })

    }
    const showPreview = e =>{
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x =>{
                setValues({
                    ...values,
                    imageFile:imageFile,
                    imageSrc:x.target.result

                })
            };
            reader.readAsDataURL(imageFile);
        }
    }
    const HandleSubmitData = (e) =>{
        const formData = new FormData();
        console.log(values,'values');
        formData.append('imageFile',values.imageFile);
        formData.append('imageName',values.imageName);
        debugger;

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
                            onSubmit={HandleSubmitData}>
                        {FormikProps =>{
                            const {value,errors,touched} = FormikProps;
                            return(
                                <Form>
                                <h1>Thông tin đăng nhập</h1>
                                <FastField
                                name="FullName"
                                component={InputField}
                                label="Họ và tên"
                                placeholder="Họ và tên"
                                />
                                <FastField
                                name="Email"
                                component={InputField}
                                label="Địa chỉ Email"
                                placeholder="Địa chỉ Email"
                                />
                                <FormGroup>
                                    <Label for='FirstName'>Điện Thoại</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Điện Thoại'></Input>
                                </FormGroup>
        
                                <FormGroup>
                                    <Label for='FirstName'>Mật Khẩu</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Mật Khẩu'></Input>
                                </FormGroup>
        
                                <FormGroup>
                                    <Label for='FirstName'>Nhập Lại Mật Khẩu</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Nhập Lại Mật Khẩu'></Input>
        
                                </FormGroup>
                                <h1>Thông tin công ty</h1>
                                <FormGroup>
                                    <Label for='FirstName'>Tên công ty</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Tên công ty'></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='FirstName'>Thời gian làm việc</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Thời gian làm việc'></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='FirstName'>Logo công ty</Label>
                                    <Input name='FirstName' id='FirstName' placeholder='Logo công ty'></Input>
                                </FormGroup>

                                <FormGroup>
                                    {/* <Input type='file' onChange={showPreview} accept='image/*'></Input> */}
                                    <input type='file' onChange={showPreview} accept='image/*'></input>
                                </FormGroup>

                                <FormGroup>
                                    <img className='imageLogoCompany' src={values.imageSrc}></img>
                                </FormGroup>
                                <FormGroup>
                                <Button type='submit'>Haha</Button>
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
