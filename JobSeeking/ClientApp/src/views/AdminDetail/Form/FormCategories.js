import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DateAndTimePicker from 'components/DatetimePicker/DateAndTimePicker';
import { Modal, Button } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
import { Form } from 'antd';
import { GetListRecruitProcess } from 'views/RecruitmentManagement/ListRecruitmentSlicer';
function FormCategories(props) {
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
    formData.append('RecID', recID);
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
                title="Quản lý danh mục"
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <FastField
                  name="roundName"
                  component={InputField}
                  label="Tên danh mục"
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

export default FormCategories
