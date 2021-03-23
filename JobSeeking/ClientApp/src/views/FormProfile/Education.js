import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Drawer,Form,  Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Formik,Form as FormMikContainer, FastField } from "formik";
import * as yup from 'yup';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { GetWorkProcess } from './Child/WorkProcessSlice';
import { useDispatch, useSelector } from 'react-redux';
import EducationItem from './Child/EducationItem';
import EducationAPI from 'api/JobSeeker/EducationAPI';
import EducationForm from './Form/EducationForm';

const { Option } = Select;

export default function DrawerEducation(props) {
  const LoginInfo = useSelector(state => state.loginInfo);
  const [isvisible, SetIsvisible] = useState(false);
  const showDrawer = () => {
    SetIsvisible(true);
  };

  const onClose = () => {
    SetIsvisible(false);
  };

  const validationShema = yup.object().shape({


  })
  const dispatch = useDispatch();
  const HandleSubmitData = async (data) => {
      const formData = new FormData();
      formData.append('DegreeTraining', data.jobTitle);
      formData.append('NameSchool', data.companyName);
      formData.append('FromTime', data.fromTime);
      formData.append('ToTime', data.toTime);
      formData.append('Descriptions', data.description);
      const result = await EducationAPI.post(formData);
      const action = GetWorkProcess();
      const execaction = await dispatch(action);
      MyToaStrSuccess('Thêm mới thành công');
  }

  const [initialValues, setinitialValues] = React.useState({
    jobTitle: '',
    staffType: '',
    companyName: '',
    fromTime: '2020-01-01',
    toTime: '2020-01-01',
    description:''
  });
  const [isShowForm,setisShowForm] = useState(false);
    const ShowForm = ()=>{
        setisShowForm(true);
    }
    const UpdateStateShowForm = ()=>{
        setisShowForm(false);
    }

  return (
    <div>
      {LoginInfo.CadidateCode === "" ? null: <Button type="primary" onClick={() => ShowForm()}>
        <PlusOutlined /> Thêm học vấn
        </Button>}

        {isShowForm == true ?<EducationForm UpdateStateShowForm={UpdateStateShowForm}/>:null}
        <EducationItem></EducationItem>
    </div>
  );
}

