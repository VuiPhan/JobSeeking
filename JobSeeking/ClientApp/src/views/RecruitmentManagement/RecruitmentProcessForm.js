import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DateAndTimePicker from 'components/DatetimePicker/DateAndTimePicker';
import { Modal, Button } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from './ListRecruitmentSlicer';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
import { Form } from 'antd';
function RecruitmentProcessForm(props) {
  const { item, visible, setVisible } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const SelectedJob = useSelector(state => state.SelectedJobProfile);

  const validationShema = yup.object().shape({

  });
  const [initialValues, setinitialValues] = React.useState(item);
  const dispatch = useDispatch();
  const handleOk = async (data) => {
    let recID = 0;
    if (data.hasOwnProperty('recID')) {
      recID=data.recID;
    }
    const formData = new FormData();
    formData.append('JobID', SelectedJob);
    formData.append('RoundName', data.roundName);
    formData.append('DateInterview', data.dateInterview);
    formData.append('ContentInterview', data.contentInterview);
    formData.append('RecID', recID);
    const result = await RecruitmentManagerAPI.AddUpdateRoundInterview(formData);
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListRecruitProcess(SelectedJob);
    const execaction = await dispatch(action);

    const action2 = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action2);
    MyToaStrSuccess('Cập nhật thành công');
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Formik initialValues={item}
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
                okText = "Lưu"
                cancelText = "Đóng"
              >
                <FastField
                  name="roundName"
                  component={InputField}
                  label="Tên vòng phỏng vấn"
                  placeholder="Mời bạn nhập"
                />
                  <FastField
                    name="dateInterview"
                    component={DateAndTimePicker}
                    label="Thời gian phỏng vấn"
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
