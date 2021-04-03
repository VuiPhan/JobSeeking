import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal, Button } from 'antd';
import * as yup from 'yup';

function RecruitmentProcessForm(props) {
    const {visible,setVisible,initialValuesCV} = props;
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const validationShema = yup.object().shape({
        
    });
      const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };    
    return (
        <div>
             <Formik initialValues={initialValuesCV}
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
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
            <FastField
                name="nameOfProcess"
                component={InputField}
                label="Tên vòng phỏng vấn"
                placeholder="Mời bạn nhập"
            />
            <FastField
                name="dayTakePlace"
                component={DatePickers}
                label="Ngày diễn ra"
                placeholder=""
            />
                 <FastField
                name="contentOfProcess"
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
