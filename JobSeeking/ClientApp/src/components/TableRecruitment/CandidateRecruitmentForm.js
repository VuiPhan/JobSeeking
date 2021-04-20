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
import SwitchLabels from 'components/Checkbox/Checkbox';

function CandidateRecruitmentForm(props) {
  const { item, visible, setVisible } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const validationShema = yup.object().shape({

  });
  const [initialValues, setinitialValues] = React.useState(item);
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
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action);
    setinitialValues({});
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
                <div style={{ marginTop: 10 }}>
                  <FastField
                    name="result"
                    component={SelectField}
                    label="Kết quả"
                    ListName="Recruit.ResultInterView" />
                </div>
                <FastField
                  name="descriptions"
                  component={InputField}
                  type="textarea"
                  label="Mô tả thêm"
                  placeholder="Mời bạn nhập"
                />
                <FastField
                  name="isAcceptWork"
                  component={SwitchLabels}
                  label="Ứng viên trúng tuyển"
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
