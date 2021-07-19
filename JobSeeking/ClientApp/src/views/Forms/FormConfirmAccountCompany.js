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
import LogoJobSeeking from '../../assets/img/HeaderCompany/LogoJobseeking.png';

function FormConfirmAccountCompany(props) {
  const { item, visible, setVisible,LoadDataSource,RegisterCompany } = props;
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
    RegisterCompany();
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
                <img src={LogoJobSeeking}/>
               <p>1. Là nhà tuyển dụng trên hệ thống, 
                 bạn cần có trách nhiệm với các thông tin về công việc và công ty mà bạn cung cấp là đúng sự thật. </p>

   
                <p>2. Công ty và nhà tuyển dụng không được phép sử dụng cơ sở dữ liệu về hồ sơ các ứng viên trong bất kỳ hoàn cảnh nào mà theo 
                  sự đánh giá riêng của JobSeekingUTE là bất hợp pháp, ảnh hưởng trực tiếp đến quyền lợi của người khác. Nếu vi phạm bạn sẽ chịu trách nhiệm trước pháp luật.
                </p>
                <p>3. Tài khoản của bạn sẽ bị khóa mà không cần có sự thông báo trước nếu chúng tôi phát hiện sự vi phạm. Tất nhiên bạn sẽ nhận được Email khi khóa tài khoản.
                </p>
                <p>4. Hệ thống JobSeekingUTE sẽ miễn phí cho bạn 1 tháng sử dụng tài khoản. Sau đó bạn sẽ nhận được Email để hoàn thành thủ tục thanh toán để sử dụng hệ thống JobSeekingUTE.
                </p>
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormConfirmAccountCompany
