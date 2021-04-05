import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal, Button } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from 'views/RecruitmentManagement/ListRecruitmentSlicer';
import SelectField from 'components/CustomField/SelectField';


function CandidateRecruitmentForm(props) {
  const { item, visible, setVisible } = props;
  console.log('itemitemitemitem',item);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const validationShema = yup.object().shape({

  });
  const [initialValues, setinitialValues] = React.useState({});
  useEffect(() => {
    setinitialValues(item);
  }, [item])
  const dispatch = useDispatch();
  const handleOk = async (data) => {
    debugger;
    console.log('datadatadata',data);
    // setModalText('The modal will be closed after two seconds');
    //setConfirmLoading(true);
    var recID = 0
    if (typeof item !== 'undefined') {
      recID = item.recID
    }
    const formData = new FormData();
    formData.append('JobID', 1);
    formData.append('RoundName', data.roundName);
    formData.append('DateInterview', data.dateInterview);
    formData.append('ContentInterview', data.contentInterview);
    formData.append('RecID', recID);
    console.log('formDataformData',formData)
    const result = await RecruitmentManagerAPI.AddUpdateRoundInterview(formData);
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListRecruitProcess(1);
    const execaction = await dispatch(action);
    MyToaStrSuccess('Thêm mới thành công');
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
          console.log('VuiinitialValuesinitialValues',initialValues);
          return (
            <FormFormik>
              <Modal
                title="KẾT QUẢ PHỎNG VẤN"
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <FastField
                  name="fullName"
                  component={InputField}
                  label="Tên ứng viên"
                  placeholder="Mời bạn nhập"
                />
                <FastField
                  name="dateInterview"
                  component={DatePickers}
                  label="Ngày diễn ra"
                  placeholder=""
                />
                <div style={{marginTop:10}}>
                 <FastField
                  name="result"
                  component={SelectField}
                  label="Kết quả"
                  ListName="Recruit.ResultInterView" />
                  </div>
                <FastField
                  name="contentInterview"
                  component={InputField}
                  type="textarea"
                  label="Mô tả thêm"
                  placeholder="Mời bạn nhập"
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
