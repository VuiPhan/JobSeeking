import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './WorkProcessItem.scss';
import { GetWorkProcess } from './WorkProcessSlice';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import WorkProcessForm from '../Form/WorkProcessForm';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import WorkProcessAPI from 'api/JobSeeker/WorkProcessAPI';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { confirmAlert } from 'react-confirm-alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router';
import EducationForm from '../Form/EducationForm';
import { GetEducation } from './EducationSlice';

function EducationRender(props) {
    var parse = require('html-react-parser')
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.loginInfo);

    const item = props.item;
    console.log('itemitemitemaaaa',item);
    const isOwn  = LoginInfo.CadidateCode == item.candidateCode ? "" : "hidden";
    const [isShowForm,setisShowForm] = useState(false);
    const ShowForm = ()=>{
        setisShowForm(true);
    }
    const UpdateStateShowForm = ()=>{
        setisShowForm(false);
    }
    const DeleteItem = async (RecID)=>{
      confirmAlert({
        title: 'Xác nhận',
        message: 'Bạn muốn gỡ quá trình làm việc này?',
        buttons: [
          {
            label: 'Xóa',
            onClick:async () => {
                    await WorkProcessAPI.deleteWorkProcess(RecID);
                    const action = GetWorkProcess();
                    const execaction = await dispatch(action);
                    MyToaStrSuccess('Bạn đã gỡ quá trình làm việc!');
            }
          },
          {
            label: 'Đóng',
            onClick: () => {}
          }
        ]
      });
    }
    return (
        <div>
            <div className="Container" style={{ backgroundColor: item.backgroundColor }}>
                <div>
                    <div className="cricle__TimeWorking">
                        {parse(item.timeWorking)}
                    </div>
                    <h3>{item.jobTitle}</h3>
                    <h5>{item.companyName}</h5>
                </div>
                <div className="description">
                    {parse(item.description)}
                </div>
                <div className="btn__Adjust" style={{visibility: isOwn}}>
                <Tooltip title="Chỉnh sửa">
                        <IconButton aria-label="edit" onClick={()=>ShowForm(item.recID)}>
                            <EditIcon color="secondary"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton aria-label="delete" onClick={()=>DeleteItem(item.recID)}>
                            <DeleteIcon color="primary" />
                        </IconButton>
                    </Tooltip>
            </div>
            </div>
            {isShowForm == true ?<EducationForm UpdateStateShowForm={UpdateStateShowForm} item={item}/>:null}
        </div>
    )
}
function EducationItem(props) {
    const dispatch = useDispatch();
    const { CandidateCode } = useParams();
    const LoginInfo = useSelector(state => state.loginInfo);
    const Education = useSelector(state => state.Education);
    const fetchDataEducation = async () => {
        const action = GetEducation(CandidateCode);
        const result = await dispatch(action);
    };
    useEffect(() => {
        fetchDataEducation();
    }, [CandidateCode,LoginInfo.CadidateCode])

    return (
        <div>
            {Education.map((item, i) => {
                return <EducationRender item={item}></EducationRender>
            })}
        </div>
    )
}

export default EducationItem
