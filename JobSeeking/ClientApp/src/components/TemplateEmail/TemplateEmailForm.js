import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { Modal } from 'antd';
import * as yup from 'yup';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'components/CustomField/SelectField';
import handleGetJson from 'common/ReadJson';
import TemplateEmailAPI from 'api/Recruitment/TemplateEmailAPI';
import MyCKEditor from "components/CKEditor/CKEditor";
import Text from 'antd/lib/typography/Text';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import ReactSelectStatic from 'components/ReactSelectStatic/ReactSelectStatic';
import './TemplateEmail.scss';
import { Tooltip } from '@material-ui/core';
import { IsObjectEmpty } from 'common/CommonFunction';
import ConstCommon from 'common/ConstInApp';



function TemplateEmailForm(props) {
  const { visible, setVisible, widthForm } = props;
  //const item ={isElect:true};
  const [confirmLoading, setConfirmLoading] = React.useState(false);


  const [res, setRes] = React.useState({});
  const LoadResource = async () => {
    const resource = await handleGetJson("TemplateEmail", "RecruitmentPage");
    const resourceCommon = await handleGetJson("Notification", "LanguageInApp");
    const resourceValidation = await handleGetJson("Validation", "LanguageInApp");
    const resourceFinal = { ...resource, ...resourceCommon, ...resourceValidation };
    setRes(resourceFinal);
  }
  const [lstTemplateEmail, setLstTemplateEmail] = React.useState([]);
  const LoginInfo = useSelector(state => state.loginInfo);

  const [initialValues, setinitialValues] = React.useState({});
  const validationShema = yup.object().shape({
    subject: yup.string()
      .required(res.TruongBBNhap)
      .nullable()
    ,
    contentOfEmail: yup.string()
      .required(res.TruongBBNhap)
  });
  const GetTemplateEmail = async () => {
    if(LoginInfo.role === ConstCommon.RoleRecruiter){
    const lstTemplate = await TemplateEmailAPI.getTemplateEmail();
    setinitialValues(lstTemplate[0]);
    setLstTemplateEmail(lstTemplate);
  }
  }
  useEffect(() => {
    LoadResource();
    GetTemplateEmail();
  }, [])
  const UpdateItemWhenChangeTemplate = (TemplateID) => {
    debugger;
    const dataSelected = lstTemplateEmail.find(ele => ele.templateID === TemplateID);
    setinitialValues(dataSelected);
  }
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async (data,errors) => {
    if(IsObjectEmpty(errors)){
      MyToaStrError(res.VuiLongKiemTraLaiThongTin);
      return;
    }
    const formData = new FormData();
    formData.append('RecID', data.recID == null ? 0 : data.recID);
    formData.append('TemplateID', data.templateID);
    formData.append('Subject', data.subject);
    formData.append('ContentOfEmail', data.contentOfEmail);
    const result = await TemplateEmailAPI.post(formData);
    setVisible(false);
    setConfirmLoading(false);
    MyToaStrSuccess(res.CapNhatThanhCong);
    await GetTemplateEmail();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const UpdateSuggestEmail = (TemplateID) => {
    const updateSuggest = {
      ...initialValues, contentOfEmail: initialValues.suggestContentEmail,
      subject: initialValues.suggestSubject
    };
    setinitialValues(updateSuggest);
  }
  return (
    <div>
      <Formik initialValues={initialValues}
        validationSchema={validationShema}
        enableReinitialize>
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          return (
            <FormFormik>
              <Modal
                title={res.ThietLapTemplateEmail}
                visible={visible}
                onOk={() => handleOk(values,errors)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={widthForm}
                okText="Lưu"
                cancelText="Đóng"
              >
                <div style={{ marginTop: 0 }}>
                  <FastField
                    name="templateID"
                    component={SelectField}
                    label={res.LoaiEmail}
                    ListName="TemplateEmailID"
                    HandleOnChange={UpdateItemWhenChangeTemplate} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Tooltip title={res.GoiY}>
                    <Button onClick={() => UpdateSuggestEmail(values.templateID)} startIcon={<DoneIcon />} variant="outlined" color="secondary">Gợi ý</Button>
                  </Tooltip>
                </div>
                <FastField
                  name="subject"
                  component={InputField}
                  label={res.ChuDe}
                  placeholder={res.MoiBanNhapTT}
                />
                <ReactSelectStatic initialValues={values}
                  setinitialValues={setinitialValues}
                  label={res.ChonThongTin}
                ></ReactSelectStatic>
                <div className="MyCKEditor">
                  <FastField
                    name="contentOfEmail"
                    component={MyCKEditor}
                    label={res.NoiDungEmail}
                    placeholder={res.MoiBanNhapTT}
                  />
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
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}
export default TemplateEmailForm
