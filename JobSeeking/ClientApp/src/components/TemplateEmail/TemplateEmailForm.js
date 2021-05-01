import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from 'views/RecruitmentManagement/ListRecruitmentSlicer';
import SelectField from 'components/CustomField/SelectField';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
//import SwitchLabels from 'components/Checkbox/Checkbox';
import SwitchLabels from "components/Checkbox/Checkbox";
import handleGetJson from 'common/ReadJson';
import TemplateEmailAPI from 'api/Recruitment/TemplateEmailAPI';
import MyCKEditor from "components/CKEditor/CKEditor";
import Text from 'antd/lib/typography/Text';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import ReactSelectStatic from 'components/ReactSelectStatic/ReactSelectStatic';
import './TemplateEmail.scss';


function TemplateEmailForm(props) {
  const { visible, setVisible,widthForm } = props;
  //const item ={isElect:true};
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const validationShema = yup.object().shape({});
  const [res, setRes] = React.useState({});
  const LoadResource = async () => {
    const resource = await handleGetJson("TemplateEmail", "RecruitmentPage");
    const resourceCommon = await handleGetJson("Notification", "LanguageInApp");
    const resourceFinal = { ...resource, ...resourceCommon };
    setRes(resourceFinal);
  }
  const [lstTemplateEmail, setLstTemplateEmail] = React.useState([]);
  const [initialValues, setinitialValues] = React.useState({});

  const GetTemplateEmail = async () => {
    const lstTemplate = await TemplateEmailAPI.getTemplateEmail();
    setinitialValues(lstTemplate[0]);
    setLstTemplateEmail(lstTemplate);
  }
  useEffect(() => {
    LoadResource();
    GetTemplateEmail();
  }, [])
  const UpdateItemWhenChangeTemplate = (TemplateID) => {
    const dataSelected = lstTemplateEmail.find(ele => ele.templateID === TemplateID);
    setinitialValues(dataSelected);
  }
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async (data) => {
    const formData = new FormData();
    formData.append('RecID', data.recID == null ? 0: data.recID);
    formData.append('TemplateID', data.templateID);
    formData.append('Subject', data.subject);
    formData.append('ContentOfEmail', data.contentOfEmail);
    const result = await TemplateEmailAPI.post(formData);
    setVisible(false);
    setConfirmLoading(false);
    MyToaStrSuccess(res.ThemMoiThanhCong);
    await GetTemplateEmail();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const UpdateSuggestEmail = (TemplateID) =>{
    const updateSuggest = {...initialValues,contentOfEmail:initialValues.suggestContentEmail,
      subject:initialValues.suggestSubject
    };
    setinitialValues(updateSuggest);
  }
  return (
    <div>
      <Formik initialValues={initialValues}
        validationSchema={validationShema}
        onSubmit={values => console.log(values)}
        enableReinitialize>
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          return (
            <FormFormik>
              <Modal
                title={res.ThietLapTemplateEmail}
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={widthForm}
              >
                <div style={{ marginTop: 0 }}>
                  <FastField
                    name="templateID"
                    component={SelectField}
                    label={res.LoaiEmail}
                    ListName="TemplateEmailID"
                    HandleOnChange={UpdateItemWhenChangeTemplate} />
                </div>
                <div style={{display:'flex',justifyContent: 'flex-end'}}>
                <Button onClick={()=> UpdateSuggestEmail(values.templateID)} startIcon={<DoneIcon />} variant="outlined" color="secondary">Gợi ý</Button>
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
