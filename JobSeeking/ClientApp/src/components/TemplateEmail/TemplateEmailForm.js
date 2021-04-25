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

function TemplateEmailForm(props) {
  const { item, visible, setVisible } = props;
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
  useEffect(() => {
    LoadResource();
  }, [])
  const [initialValues, setinitialValues] = React.useState();
  useEffect(() => {
      setinitialValues(item);
  }, [item])
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async (data) => {
    const formData = new FormData();
    formData.append('DateInterview', data.dateInterview);
    formData.append('Result', data.result);
    formData.append('Descriptions', data.descriptions);
    formData.append('RecID', initialValues.recID);
    formData.append('IsElect', data.isElect);
    const result = await RecruitmentManagerAPI.UpdateResultOfCandidate(formData);
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action);
    setinitialValues({});
    MyToaStrSuccess(res.ThemMoiThanhCong);
  };
  const handleCancel = () => {
    setVisible(false);
  };
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
              >
                  <div style={{ marginTop: 10 }}>
                  <FastField
                    name="result"
                    component={SelectField}
                    label={res.LoaiEmail}
                    ListName="TemplateEmailID" />
                </div>
                <FastField
                  name="fullName"
                  component={InputField}
                  label={res.ChuDe}
                  placeholder={res.MoiBanNhapTT}
                />
              
                <FastField
                  name="descriptions"
                  component={InputField}
                  type="textarea"
                  label={res.NoiDungEmail}
                  placeholder={res.MoiBanNhapTT}
                />
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}
export default TemplateEmailForm
