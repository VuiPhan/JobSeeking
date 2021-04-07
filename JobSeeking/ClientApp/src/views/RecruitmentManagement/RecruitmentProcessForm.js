import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal, Button } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from './ListRecruitmentSlicer';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';

function RecruitmentProcessForm(props) {
  const { item, visible, setVisible } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const SelectedJob = useSelector(state => state.SelectedJobProfile);

  const validationShema = yup.object().shape({

  });
  const itemOrdinal = item == null ? {
    jobID: 1,
    roundName: '',
    dateInterview: '2021-01-01',
    contentInterview: '',
  } : {
    jobID: item.jobID,
    roundName: item.roundName,
    dateInterview: item.dateInterview,
    contentInterview: item.contentInterview,
    recID: item.recID
  }
  const [initialValues, setinitialValues] = React.useState(itemOrdinal);
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
    formData.append('JobID', SelectedJob);
    formData.append('RoundName', data.roundName);
    formData.append('DateInterview', data.dateInterview);
    formData.append('ContentInterview', data.contentInterview);
    formData.append('RecID', recID);
    console.log('formDataformData',formData)
    const result = await RecruitmentManagerAPI.AddUpdateRoundInterview(formData);
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListRecruitProcess(SelectedJob);
    const execaction = await dispatch(action);

    const action2 = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action2);
    MyToaStrSuccess('Thêm mới thành công');
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
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
                title="Quy trình phỏng vấn"
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <FastField
                  name="roundName"
                  component={InputField}
                  label="Tên vòng phỏng vấn"
                  placeholder="Mời bạn nhập"
                />
                <FastField
                  name="dateInterview"
                  component={DatePickers}
                  label="Ngày diễn ra"
                  placeholder=""
                />
                <FastField
                  name="contentInterview"
                  component={InputField}
                  type="textarea"
                  label="Nội dung"
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

export default RecruitmentProcessForm
