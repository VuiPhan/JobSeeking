import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EducationItem .scss';
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
import CertificateForm from '../Form/CertificateForm';
import { GetCertificate } from './CertificateSlice';
import CertificateAPI from 'api/JobSeeker/CertificateAPI';

function CertificateRender(props) {
    var parse = require('html-react-parser')
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.loginInfo);

    const item = props.item;
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
                    await CertificateAPI.deleteCertificate(RecID);
                    const action = GetCertificate();
                    const execaction = await dispatch(action);
                    MyToaStrSuccess('Bạn đã gỡ thành công!');
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
            <div className="Container__Education" style={{ backgroundColor: item.backgroundColor }}>
                <div>
                    <div className="cricle__TimeWorking">
                        {parse(item.timeActive)}
                    </div>
                    <h3>{item.certificateName}</h3>
                    <h5>{item.certificateTypeName}</h5>
                    <h5>{item.degreePlace}</h5>
                </div>
                <hr
       className="line_Break"
    />
                <div className="description">
                    {parse(item.descriptions)}
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
            {isShowForm == true ?<CertificateForm UpdateStateShowForm={UpdateStateShowForm} item={item}/>:null}
        </div>
    )
}
function CertificateItem(props) {
    const dispatch = useDispatch();
    const { CandidateCode } = useParams();
    const LoginInfo = useSelector(state => state.loginInfo);
    const lstCertificate = useSelector(state => state.Certificate);
    const fetchDataCertificate = async () => {
        const action = GetCertificate(CandidateCode);
        const result = await dispatch(action);
    };
    useEffect(() => {
        fetchDataCertificate();
    }, [CandidateCode,LoginInfo.CadidateCode])

    return (
        <div>
            {lstCertificate.map((item, i) => {
                return <CertificateRender item={item}></CertificateRender>
            })}
        </div>
    )
}

export default CertificateItem
