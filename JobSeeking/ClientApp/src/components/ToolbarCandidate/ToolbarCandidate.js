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
import { useDispatch, useSelector } from 'react-redux';
import RecruitmentProfileAPI from 'api/Recruitment/RecruitmentProfile';

function ToolbarCandidate() {
    const history = useHistory();
    const IsRender = (history.location.pathname).substring(1, 12) =='ProfilePage' ? true : false;
    const { CandidateCode } = useParams();
    const SelectedJobProfile = useSelector(state => state.SelectedJobProfile);

    const HandleApplyCandidate = async (jobID) =>{
        confirmAlert({
            title: 'Xác nhận',
            message: 'Đưa ứng viên này vào vòng tuyển dụng',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: async () => {
                    const result = await RecruitmentProfileAPI.post(SelectedJobProfile,CandidateCode);
                    if (result.error === "") {
                    MyToaStrSuccess('Bạn đã đưa ứng viên vào vòng tuyển dụng');
                    }
                    else{
                      MyToaStrError('Ứng viên đã ở trong vòng tuyển dụng');
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
    const HandlePotentialCandidates = async (jobID) =>{
      confirmAlert({
          title: 'Xác nhận',
          message: 'Đưa ứng viên này vào ứng viên tiềm năng',
          buttons: [
            {
              label: 'Xác nhận',
              onClick: async () => {
                  const result = await RecruitmentProfileAPI.AddPotentialCandidates(CandidateCode);
                  if (result.error === "") {
                  MyToaStrSuccess('Bạn đã đưa ứng viên vào ứng viên tiềm năng');
                  }
                  else{
                    MyToaStrError('Ứng viên đã ở trong ứng viên tiềm năng');
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
  const HandleIgnoreCandidates = async (jobID) =>{
    confirmAlert({
        title: 'Xác nhận',
        message: 'Bỏ qua ứng viên',
        buttons: [
          {
            label: 'Xác nhận',
            onClick: async () => {
                const result = await RecruitmentProfileAPI.IgnoreCandidates(SelectedJobProfile,CandidateCode);
                if (result.error === "") {
                MyToaStrSuccess('Thành công');
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
            <Button onClick={()=>HandleApplyCandidate()} className="item__Button" variant="outlined" color="secondary" startIcon={<AssignmentTurnedInIcon/>}>Đưa ứng viên vào vòng tuyển dụng</Button>
            <Button onClick={()=>HandlePotentialCandidates()} className="item__Button" variant="outlined" color="primary" startIcon={<HowToRegIcon/>}>Ứng viên tiềm năng</Button>
            <Button onClick={()=>HandleIgnoreCandidates()} className="item__Button" variant="outlined" color="default"  startIcon={<PersonAddDisabledIcon/>}>Bỏ qua ứng viên</Button>
        </div>
        </div>
    )
}

export default ToolbarCandidate

