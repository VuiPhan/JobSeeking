import { Button } from '@material-ui/core'
import React from 'react'
import './styleToolbar.scss'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { useHistory, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import MyToastr from 'components/Toastr/Toastr';

function ToolbarCandidate() {
    const history = useHistory();
    const IsRender = (history.location.pathname).substring(1, 12) =='ProfilePage' ? true : false;
    const HandleApplyCandidate = async (jobID) =>{
        alert('vuiii');
        confirmAlert({
            title: 'Xác nhận',
            message: 'Đưa ứng viên này vào vòng tuyển dụng',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: async () => {
                  //  const result = await JobsApi.postCancelApply(jobID);
                  const result= null;
                    if (result.error === "") {
                    MyToaStrSuccess('Bạn đã đưa ứng viên vào vòng tuyển dụng');
                    }
                    else{
                      MyToaStrError('Có lỗi xảy ra');
                    }
                    return;
                }
              },
              {
                label: 'Đóng',
                onClick: () => { }
              }
            ]
          });
    }
    return (
        <div className="Container__Parent">
        <div className="Container__Toolbar">
        <MyToastr></MyToastr>
            <Button onClick={()=>HandleApplyCandidate(1)} className="item__Button" variant="outlined" color="secondary" startIcon={<AssignmentTurnedInIcon/>}>Đưa ứng viên vào vòng tuyển dụng</Button>
            <Button className="item__Button" variant="outlined" color="primary" startIcon={<HowToRegIcon/>}>Ứng viên tiềm năng</Button>
            <Button className="item__Button" variant="outlined" color="default"  startIcon={<PersonAddDisabledIcon/>}>Bỏ qua ứng viên</Button>
        </div>
        </div>
    )
}

export default ToolbarCandidate

