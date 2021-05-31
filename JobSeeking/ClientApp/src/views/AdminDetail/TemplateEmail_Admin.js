import TemplateEmail_AdminAPI from 'api/AdminPage/TemplateEmail_AdminAPI';
import handleGetJson from 'common/ReadJson';
import React, { useEffect, useState } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import * as yup from 'yup';
import SelectField from 'components/CustomField/SelectField';
import Text from 'antd/lib/typography/Text';
import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import ReactSelectStatic from 'components/ReactSelectStatic/ReactSelectStatic';
import MyCKEditor from "components/CKEditor/CKEditor";


function TemplateEmail_Admin() {
    const [res, setRes] = React.useState({});
    const [dataSource, setDataSource] = useState([]);
    const [initialValues, setinitialValues] = React.useState({});
    const GetTemplateEmail = async () => {
        const lstTemplate = await TemplateEmail_AdminAPI.getAllTemplateEmail();
        setinitialValues(lstTemplate[0]);
        setLstTemplateEmail(lstTemplate);
      }
  const [lstTemplateEmail, setLstTemplateEmail] = React.useState([]);

    const validationShema = yup.object().shape({
      suggestSubject: yup.string()
          .required(res.TruongBBNhap)
          .nullable()
        ,
        suggestContentEmail: yup.string()
          .required(res.TruongBBNhap)
      });
  const LoadResource = async () => {
    const resource = await handleGetJson("TemplateEmail", "AdminPage");
    const resourceCommon = await handleGetJson("Notification", "LanguageInApp");
    const resourceValidation = await handleGetJson("Validation", "LanguageInApp");
    const resourceFinal = { ...resource, ...resourceCommon, ...resourceValidation };
    setRes(resourceFinal);
    console.log('resourceFinalresourceFinal',resourceFinal);
  }
    const UpdateSuggestEmail =async (data) => {
      debugger;
      const formData = new FormData();
      formData.append('TemplateID', data.templateID);
      formData.append('SuggestSubject', data.suggestSubject);
      formData.append('SuggestContentEmail', data.suggestContentEmail);
      const lstTemplate = await TemplateEmail_AdminAPI.updateTemplateEmailAdmin(formData);
      if(lstTemplate.error === ""){
          MyToaStrSuccess(res.CapNhatThanhCong);
          GetTemplateEmail();
          return;
      }
      MyToaStrError(lstTemplate.error);
      }
    const UpdateItemWhenChangeTemplate = (TemplateID) => {
        const dataSelected = lstTemplateEmail.find(ele => ele.templateID === TemplateID);
        setinitialValues(dataSelected);
      }
    useEffect(() => {
      GetTemplateEmail();
        LoadResource();
    }, [])
    return (
        <div  style={{ marginTop: 40, marginLeft: 29, marginRight: 29 }}>
                <h1>{res.QuanLyEmail}</h1>
                <div>
      <Formik initialValues={initialValues}
        validationSchema={validationShema}
        enableReinitialize>
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          console.log('errors',errors);
          return (
            <FormFormik>
                <div style={{ marginTop: 0 }}>
                  <FastField
                    name="templateID"
                    component={SelectField}
                    label="Loại Email"
                    ListName="Admin_TemplateEmailID"
                    HandleOnChange={UpdateItemWhenChangeTemplate} />
                </div>
             
                <FastField
                  name="suggestSubject"
                  component={InputField}
                  label="Chủ đề: "
                  placeholder={res.MoiBanNhapTT}
                />
                <ReactSelectStatic initialValues={values}
                  setinitialValues={setinitialValues}
                  label={res.ChonThongTin}
                ></ReactSelectStatic>
                <div className="MyCKEditor">
                  <FastField
                    name="suggestContentEmail"
                    component={MyCKEditor}
                    label={res.NoiDungEmail}
                    placeholder={res.MoiBanNhapTT}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:15,marginLeft:10 }}>
                  <Tooltip title={res.CapNhat}>
                    <Button onClick={() => UpdateSuggestEmail(values)} startIcon={<DoneIcon />} variant="outlined" color="secondary">{res.CapNhat}</Button>
                  </Tooltip>
                </div>
                <div style={{ marginTop: 3 }}>
                  <Text>Hướng dẫn sử dụng cấu hình Email</Text>
                  <br />
                  <Text>@TenUngVien: Tên ứng viên</Text>
                  <br />
                  <Text>@TenCongTy: Tên công ty</Text>
                  <br />
                  <Text>@TenCongViec: Tên công việc</Text>
                  <br />
                  <Text>@VongPhongVanHienTai: Vòng phỏng vấn hiện tại</Text>
                  <br />
                  <Text>@VongPhongVanTiepTheo: Vòng phỏng vấn tiếp theo</Text>
                  <br />
                  <Text>@NgayPhongVanVongTiepTheo: Ngày phỏng vấn tiếp theo</Text>
                  <br />
                  <Text>@NoiDungPVHienTai: Nội dung phỏng vấn vòng hiện tại</Text>
                  <br />
                  <Text>@NoiDungPVVongTiepTheo: Nội dung phỏng vấn vòng tiếp theo</Text>
                  <br />
                  <Text>@DiaChiCongTy: Địa chỉ công ty</Text>
                </div>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
        </div>
    )
}

export default TemplateEmail_Admin
