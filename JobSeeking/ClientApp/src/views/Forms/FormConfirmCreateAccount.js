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

function FormConfirmCreateAccount(props) {
  const { item, visible, setVisible,LoadDataSource,RegisterCandidate } = props;
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
    RegisterCandidate();
    setVisible(false);

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
                title={"Điều khoản sử dụng hệ thống JobSeekingUTE"}
                visible={visible}
                onOk={() => handleOk(values)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Tôi đã đọc kỹ điều khoản và đồng ý"
                cancelText="Đóng"
              >
               <p>1. Chúng tôi luôn cố gắng để bảo vệ dữ liệu thông tin cá nhân của bạn. Tuy nhiên để đáp ứng
                   nghiệp vụ tuyển dụng thông tin
                      sẽ được cung cấp cho các nhà tuyển dụng khi bạn ở trạng thái tìm việc.
                      </p>
               <p>2. Là người sử dụng ứng dụng, bạn cần có trách nhiệm với các thông tin của bạn cung cấp là đúng sự thật.
                </p>
                <p>3. Tài khoản của bạn sẽ bị khóa mà không cần có thông báo trước nếu chúng tôi phát hiện hành vi bất thường xảy ra.
                </p>
                <p>4. JobSeekingUTE chỉ là nơi gặp gỡ kết nối giữa ứng viên và công việc. Mọi phát sinh liên quan giữa bạn với công ty về các giao dịch chúng tôi sẽ không liên đới. 
                </p>
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormConfirmCreateAccount
