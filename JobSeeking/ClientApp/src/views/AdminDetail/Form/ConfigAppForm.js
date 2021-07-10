import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import DateAndTimePicker from 'components/DatetimePicker/DateAndTimePicker';
import { Modal, Button, DatePicker } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import NumberFormatCustom from 'components/InputNumber/InputNumber';
import { TextField } from "@material-ui/core";
import RecruiterManagementAPI from 'api/AdminPage/RecruiterManagementAPI';
import ConfigAppManagementAPI from 'api/AdminPage/ConfigAppManagementAPI';

function ConfigAppForm(props) {
  const { item, visible, setVisible,LoadDataSource } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const [valuesMoney, setValuesMoney] = React.useState(500000);
  const validationShema = yup.object().shape({
    money: yup.number()
      .required("Trường bắt buộc nhập")
    ,
  });
  const [initialValues, setinitialValues] = React.useState(item);
  const dispatch = useDispatch();
  const handleOk = async (data) => {
    const formData = new FormData();
    formData.append('NameConfig', data.nameConfig);
    formData.append('ContentConfig', data.contentConfig);
    formData.append('Descriptionss', data.descriptionss);
    const result = await ConfigAppManagementAPI.updateConfigApp(formData);
    if(result.error === ""){
      MyToaStrSuccess('Cập nhật thành công');
      setVisible(false);
      LoadDataSource();
      return
    }
    MyToaStrError(result.error);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  const handleChange = (event) => {
    debugger;
    setValuesMoney(event.target.value);
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
                title={"Thông tin cấu hình"}
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Đóng"
              >
                <FastField
                  name="nameConfig"
                  component={InputField}
                  label="Mã cấu hình"
                  disabled={true}
                  placeholder=""
                />
                 <FastField
                  name="descriptionss"
                  component={InputField}
                  label="Tên cấu hình"
                  placeholder=""
                />
                <FastField
                  name="contentConfig"
                  component={InputField}
                  label="Nội dung"
                  type="textarea"
                  placeholder=""
                />
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}

export default ConfigAppForm
