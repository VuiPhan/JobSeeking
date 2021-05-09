import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from 'views/RecruitmentManagement/ListRecruitmentSlicer';
import SelectField from 'components/CustomField/SelectField';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
//import SwitchLabels from 'components/Checkbox/Checkbox';
import SwitchLabels from "components/Checkbox/Checkbox";
import handleGetJson from 'common/ReadJson';

function CandidateRecruitmentForm(props) {
  const { item, visible, setVisible } = props;
  //const item ={isElect:true};
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const validationShema = yup.object().shape({});
  const [res, setRes] = React.useState({});
  const LoadResource = async () => {
    const resource = await handleGetJson("RecruitmentForm", "RecruitmentPage");
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
    const result = await RecruitmentManagerAPI.UpdateResultOfCandidate(formData);
    if(result.error !== ""){
      MyToaStrError(result.error);  
      return;
    }
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action);
    setinitialValues({});
    MyToaStrSuccess(res.CapNhatThanhCong);
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
                title={res.KQPhongVan}
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <FastField
                  name="fullName"
                  component={InputField}
                  label={res.TenUV}
                  disabled={true}
                  placeholder={res.MoiBanNhapTT}
                />
                <FastField
                  name="dateInterview"
                  component={DatePickers}
                  label={res.NgayDienRa}
                  placeholder=""
                />
                <div style={{ marginTop: 10 }}>
                  <FastField
                    name="result"
                    component={SelectField}
                    label={res.KetQua}
                    ListName="Recruit.ResultInterView" />
                </div>
                <FastField
                  name="descriptions"
                  component={InputField}
                  type="textarea"
                  label={res.MoTaThem}
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
export default CandidateRecruitmentForm