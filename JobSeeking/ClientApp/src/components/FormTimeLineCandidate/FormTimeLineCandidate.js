import React, { useEffect } from 'react'
import { Modal } from 'antd';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import handleGetJson from 'common/ReadJson';
import { Steps } from 'antd';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { Dialog, DialogContent,DialogTitle  } from '@material-ui/core';
import {  FormGroup} from "reactstrap";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ListViewJobRecent from 'components/ListViewJobRecent/ListViewJobRecent';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';

const { Step } = Steps;

function FormTimeLineCandidate(props) {
  const { visible, setVisible, widthForm } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  
  const LoginInfo = useSelector(state => state.loginInfo);
  const [res, setRes] = React.useState({});
  const LoadResource = async () => {
    const resource = await handleGetJson("AppPage", "AppPage");
    setRes(resource);
  }
  const [valueTimeline, setValueTimeline] = React.useState({});

  const validationShema = yup.object().shape({
    subject: yup.string()
      .required(res.TruongBBNhap)
      .nullable()
    ,
    contentOfEmail: yup.string()
      .required(res.TruongBBNhap)
  });
  const GetTimelineCandidate = async () => {
    if(LoginInfo.CadidateCode){
    const timelineCandidateAPI = await SeekerAPI.GetTimelineCandidate();
    setValueTimeline(timelineCandidateAPI);
  }
  }
  useEffect(() => {
    LoadResource();
  }, [])

  useEffect(() => {
    GetTimelineCandidate();
  }, [LoginInfo])
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async () => {
    const result = await SeekerAPI.updateStatusViewTimeLine(false);
    if(result.error === ""){
      MyToaStrSuccess("Cập nhật thành công")
      setVisible(false);
      return;
    }
    MyToaStrError("Có lỗi xảy ra");
  };
  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <div>
      <Dialog open={visible} maxWidth={900} style={{ height: 700 }} onClose={() => setVisible(false)} aria-labelledby="form-dialog-title">
        <DialogTitle>
            <h1 style={{paddingTop: 0}}>{res.ThongTinThem}</h1>
            <hr></hr>
        </DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 0 }}>
            <p style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: 'brown'
            }}>
              {valueTimeline.hasPersonalInformation === true &&
              valueTimeline.hasWorkInfomation === true &&
              valueTimeline.hasInfoEducation === true &&
              valueTimeline.hasInfoExperience === true &&
              valueTimeline.hasInfoCV === true ?
              res.DaHoanTatThongTin : res.HoanTatThongTin}</p>
            <Steps >
              <Step title={valueTimeline.hasPersonalInformation === true ? res.HoanThanh : res.HayHoanTat} 
                    description={res.ThongTinCaNhan} status={valueTimeline.hasPersonalInformation_Name} />

              <Step title={valueTimeline.hasWorkInfomation === true ? res.HoanThanh : res.HayHoanTat} 
                    description={res.ThongTinCongViec} status={valueTimeline.hasWorkInfomation_Name} />

              <Step title={valueTimeline.hasInfoEducation === true ? res.HoanThanh : res.HayHoanTat} 
                    description={res.HocVan} status={valueTimeline.hasInfoEducation_Name} />

              <Step title={valueTimeline.hasInfoExperience === true ? res.HoanThanh : res.HayHoanTat}
                    status={valueTimeline.hasInfoExperience_Name} description={res.QuaTrinhLamViec} />

              <Step title={valueTimeline.hasInfoCV === true ? res.HoanThanh : res.HayHoanTat} 
                    status={valueTimeline.hasInfoCV_Name} description={res.ThongTinCV} />
            </Steps>
            <div style={{ marginTop: 15 }}>
              <ListViewJobRecent dataID={-1} ></ListViewJobRecent>
            </div>
          </div>
          <hr style={{ marginTop: 10 }}></hr>
          <FormGroup>
            <div style={{ float: 'right',paddingBottom:20}}>
              <Button startIcon={<DoneIcon />} type='submit' variant="outlined" onClick={() => handleOk() } color="secondary">{res.TatThongBao} </Button>
              <Button startIcon={<CloseIcon />} style={{ marginLeft: 10 }} onClick={() => setVisible(false)} variant="outlined" color="primary">{res.Dong}</Button>
            </div>
          </FormGroup>
        </DialogContent>
      </Dialog>

    </div>
  )
}
export default FormTimeLineCandidate
