import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import WorkProcessAPI from 'api/JobSeeker/WorkProcessAPI';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import WorkProcessItem from './Child/WorkProcessItem';
import { GetWorkProcess } from './Child/WorkProcessSlice';
import { useDispatch, useSelector } from 'react-redux';
import WorkProcessForm from './Form/WorkProcessForm';
const { Option } = Select;

export default function DrawerWorkProcess(props) {
  const LoginInfo = useSelector(state => state.loginInfo);
  const isOwnProfile = useSelector(state => state.AppSlice.isOwnProfile);
  
  const [isvisible, SetIsvisible] = useState(false);
  const showDrawer = () => {
    SetIsvisible(true);
  };

  const onClose = () => {
    SetIsvisible(false);
  };

  const dispatch = useDispatch();
  const HandleSubmitData = async (data) => {
      const formData = new FormData();
      formData.append('jobTitle', data.jobTitle);
      formData.append('staffType', data.staffType);
      formData.append('companyName', data.companyName);
      formData.append('FromTime', data.fromTime);
      formData.append('ToTime', data.toTime);
      formData.append('Description', data.description);
      const result = await WorkProcessAPI.post(formData);
      const action = GetWorkProcess();
      const execaction = await dispatch(action);
      MyToaStrSuccess('Thêm mới thành công');
  }
  const [isShowForm,setisShowForm] = useState(false);
    const ShowForm = ()=>{
        setisShowForm(true);
    }
    const UpdateStateShowForm = ()=>{
        setisShowForm(false);
    }

  return (
    <div>
      {LoginInfo.CadidateCode && isOwnProfile ? <Button type="primary" onClick={() => ShowForm()}>
        <PlusOutlined /> Thêm quá trình
        </Button> : null }

        {isShowForm == true ?<WorkProcessForm UpdateStateShowForm={UpdateStateShowForm}/>:null}
        <WorkProcessItem></WorkProcessItem>
    </div>
  );
}

