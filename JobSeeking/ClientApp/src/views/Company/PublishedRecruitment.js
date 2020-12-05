import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/CompanyPage.js";
import 'assets/css/TitleCompany.scss';
import 'assets/scss/view/CompanyPage.scss';
import 'assets/scss/view/CompanyRegister.scss';
import { Col, FormGroup, Label, Row } from "reactstrap";
import Button from '@material-ui/core/Button';
import { Formik, Form, FastField } from "formik";
import InputField from "components/CustomField/InputField";
import * as yup from 'yup';
import LGCompanyPage from "Language/CompanyPage";
import MyCKEditor from "components/CKEditor/CKEditor";
import PublishedRecruitmentAPI from "api/Company/PublishedRecruitmentAPI";
import SelectField from "components/CustomField/SelectField";
import MutipleSelectField from "components/CustomField/MutipleSelectField";
import HeaderCompany from "components/HeaderCompany/HeaderCompany";
import { useSelector } from "react-redux";
import { MyToaStrSuccess } from "components/Toastr/Toastr2";
import MyToastr from "components/Toastr/Toastr";
import { useHistory, useParams } from "react-router-dom";
import MutipleCombobox from "components/CustomField/MutipleCombobox";
import './PublishCss.scss';
import ReceiptIcon from '@material-ui/icons/Receipt';
import NumberFormatCustom from 'components/InputNumber/InputNumber';
import { TextField } from "@material-ui/core";
import SwitchLabels from "components/Checkbox/Checkbox";
import JobsApi from "api/Company/JobsAPI";
const useStyles = makeStyles(styles);
export default function PublishedRecruitment(props) {
    const classes = useStyles();
    const res = LGCompanyPage.PublishedRecruitment;
    const { ...rest } = props;
    const { jobID } = useParams();

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
    const validationShema = yup.object().shape({
        title: yup.string().required(res.TruongBBNhap),
        Strengths: yup.string().email().required(res.TruongBBNhap)
    })
    const [initialValues, setinitialValues] = React.useState({
        title: '',
        categoryId: null,
        Strengths: '',
        priorityDegree: '1',
        jobDescriptions: '',
        requireCV: '',
        reasonsToJoin: '',
        loveWorkingHere: '',
        jobTitleIDs: "1,2",
        jobSkillIDs: "1",
        jobLocations: "1",
        isAcceptCandidate: false,
    });
    const history = useHistory();
    const [valuesSalary, setvaluesSalary] = React.useState({
        salaryFrom: '500',
        salaryTo: '1000',
    });
    const handleChange = (event) => {
        setvaluesSalary({
            ...valuesSalary,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        async function fetchDataView() {
            let result = await JobsApi.getForEdit(jobID);
            setinitialValues(result);
            setvaluesSalary( {...valuesSalary,salaryFrom:result.salaryFrom,salaryTo:result.salaryTo})
        }
        if (jobID) {
            fetchDataView();
        }
    }, [jobID])
    const HandleSubmitData = async (valuesForm) => {
        const formData = new FormData();

        formData.append('Title', valuesForm.title);
        formData.append('RequireCV', valuesForm.requireCV);
        formData.append('ReasonsToJoin', valuesForm.reasonsToJoin);
        formData.append('JobDescriptions', valuesForm.jobDescriptions);
        formData.append('LoveWorkingHere', valuesForm.loveWorkingHere);
        formData.append('Strengths', valuesForm.Strengths);
        formData.append('PriorityDegree', valuesForm.priorityDegree);

        formData.append('SalaryFrom', valuesSalary.salaryFrom);
        formData.append('SalaryTo', valuesSalary.salaryTo);

        formData.append('JobTitleIDs', valuesForm.jobTitleIDs);
        formData.append('JobSkillIDs', valuesForm.jobSkillIDs);
        formData.append('JobLocations', valuesForm.jobLocations);
        if (jobID) {
            // Update 
            formData.append('JobID', jobID);
            await PublishedRecruitmentAPI.post(formData);
            MyToaStrSuccess('Cập nhật thông tin thành công');
        }
        else {
            // Tạo mới
            await PublishedRecruitmentAPI.post(formData);
            MyToaStrSuccess('Đăng tin thành công. Sẽ nhanh chóng chuyển đến trang công ty');

        }
        setTimeout(() => {
            const LinkToPageCompany = `/Company/${LoginInfo.companyID}`;
            history.push(LinkToPageCompany);
            window.scrollTo(0, 150);
        }, 3000);
    }

    const LoginInfo = useSelector(state => state.loginInfo);
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <HeaderCompany CompanyID={LoginInfo.companyID} IsCompany={1}></HeaderCompany>
                    </div>
                </div>
                <div className='ContainerForm'>
                    <Formik initialValues={initialValues}
                        // validationSchema={validationShema}
                        enableReinitialize
                        onSubmit={values => HandleSubmitData(values)}
                    >
                        {FormikProps => {
                            const { value, errors, touched } = FormikProps;
                            console.log('initialValues2', initialValues);
                            return (
                                <Form>
                                    <h1 className='headerThongTinCV'> THÔNG TIN CÔNG VIỆC</h1>
                                    <h1>{res.TieuDeCongViec}</h1>
                                    <FastField
                                        name="title"
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
                                    <MyToastr></MyToastr>
                                    <h1>{res.MoTaCongViec}</h1>
                                    <FastField
                                        name="jobDescriptions"
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
                                    <h1>Mức lương</h1>
                                    <p>Nếu để trống thì hệ thống sẽ hiểu:"You'll love it"</p>
                                    <div style={{ display: "flex" }}>
                                        <TextField
                                            label="Mức lương từ"
                                            value={valuesSalary.salaryFrom}
                                            onChange={handleChange}
                                            name="salaryFrom"
                                            id="formatted-numberformat-input"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />
                                        <TextField
                                            label="Mức lương đến"
                                            style={{ marginLeft: 30 }}
                                            value={valuesSalary.salaryTo}
                                            onChange={handleChange}
                                            name="salaryTo"
                                            id="formatted-numberformat-input"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                        />


                                    </div>
                                    {/* <FastField
                                        name="categoryId"
                                        component={SelectField}
                                        label="Category"
                                        placeholder="Category"
                                        ListName="HinhThucLamViec"
                                    /> */}
                                    {/* <FastField
                                        name="Strengths"
                                        component={MutipleSelectField}
                                        label="Các thế mạnh của chúng tôi"
                                        placeholder="Category"
                                        ListName="TheManhCongTy"
                                    /> */}
                                    <h4>Các bằng cấp ưu tiên</h4>
                                    <FastField
                                        name="priorityDegree"
                                        component={MutipleSelectField}
                                        label=""
                                        ListName="BangCapUuTien"
                                        placeholder="Mời bạn chọn các bằng cấp được ưu tiên"
                                    />
                                    <h4>Chọn việc làm theo cấp bậc</h4>
                                    <FastField
                                        name="jobTitleIDs"
                                        component={MutipleCombobox}
                                        label=""
                                        placeholder=""
                                        ListName="UTELS_GetJobTitle"
                                    />
                                    <h4>Chọn việc làm theo kỹ năng</h4>
                                    <FastField
                                        name="jobSkillIDs"
                                        component={MutipleCombobox}
                                        label=""
                                        placeholder=""
                                        ListName="UTELS_GetJobSkill"
                                    />
                                    <h4>Chọn việc làm theo nơi làm việc</h4>
                                    <FastField
                                        name="jobLocations"
                                        component={MutipleSelectField}
                                        label=""
                                        placeholder=""
                                        ListName="NoiLamViec"
                                    />
                                    {/* <FastField
                                        name="isAcceptCandidate"
                                        component={SwitchLabels}
                                        label="Đã nhận đủ ứng viên"
                                    /> */}
                                    <FormGroup>
                                        <Label for='FirstName'>{res.LogoCongTy}</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type='submit' variant="outlined" color="secondary">{jobID ? "Cập nhật tin" : res.DangTin}</Button>
                                    </FormGroup>
                                    {/* <CrossArea></CrossArea> */}
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
