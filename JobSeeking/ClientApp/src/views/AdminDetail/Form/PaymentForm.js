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

function PaymentForm(props) {
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
  const handleOk = async () => {
    const result = await RecruiterManagementAPI.paymentCompany(item.companyID,valuesMoney);
    if(result.error === ""){
      MyToaStrSuccess('Thanh toán thành công');
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
                title={"Thanh toán sử dụng "}
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Thanh toán"
                cancelText="Đóng"
              >
                <FastField
                  name="companyName"
                  component={InputField}
                  label="Tên công ty"
                  disabled={true}
                  placeholder=""
                />
                 <FastField
                  name="emailCompany"
                  component={InputField}
                  label="Thông tin liên lạc"
                  disabled={true}
                  placeholder=""
                />
                <FastField
                  name="expiryDate_String"
                  component={InputField}
                  label="Ngày hết hạn sử dụng"
                  disabled={true}
                  placeholder=""
                />
                <TextField
                  label="Thanh toán (VNĐ)"
                  value={valuesMoney}
                  onChange={handleChange}
                  name="salaryFrom"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}

export default PaymentForm
