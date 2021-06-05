import React, { useEffect } from 'react'
import { Modal } from 'antd';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import handleGetJson from 'common/ReadJson';
import { Steps } from 'antd';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { Dialog, DialogContent } from '@material-ui/core';
import ListViewKendo2 from 'components/ListViewKendo/ListViewKendo2';
import {  FormGroup} from "reactstrap";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

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
    const timelineCandidateAPI = await SeekerAPI.GetTimelineCandidate();
    setValueTimeline(timelineCandidateAPI);
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
    alert('Vui');
  };
  const handleCancel = () => {
    setVisible(false);
  }

  return (
    <div>
      <Dialog open={visible} maxWidth={900} style={{ height: 600 }} onClose={() => setVisible(false)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <h1 style={{paddingTop: 0}}>{res.ThongTinThem}</h1>
          <hr></hr>
          <div style={{ marginTop: 0 }}>
            <p style={{
              fontStyle: 'italic',
              fontSize: 12,
              color: 'brown'
            }}>{res.HoanTatThongTin}</p>
            <Steps >
              <Step title={valueTimeline.hasPersonalInformation = true ? res.HoanThanh : res.HayHoanTat} description={res.ThongTinCaNhan} status={valueTimeline.hasPersonalInformation_Name} />
              <Step title={valueTimeline.hasWorkInfomation = true ? res.HoanThanh : res.HayHoanTat} description={res.ThongTinCongViec} status={valueTimeline.hasWorkInfomation_Name} />
              <Step title={valueTimeline.hasInfoEducation = true ? res.HoanThanh : res.HayHoanTat} description={res.HocVan} status={valueTimeline.hasInfoEducation_Name} />
              <Step title={valueTimeline.hasWorkInfomation = true ? res.HoanThanh : res.HayHoanTat} status={valueTimeline.hasWorkInfomation_Name} description={res.QuaTrinhLamViec} />
              <Step title={valueTimeline.hasInfoCV = true ? res.HoanThanh : res.HayHoanTat} status={valueTimeline.hasInfoCV_Name} description={res.ThongTinCV} />
            </Steps>
            <div style={{ marginTop: 10 }}>
              <ListViewKendo2 dataID={-1}></ListViewKendo2>
            </div>
          </div>
          <hr style={{ marginTop: 10 }}></hr>
          <FormGroup>
            <div style={{ float: 'right',marginBottom:15 }}>
              <Button startIcon={<DoneIcon />} type='submit' variant="outlined" color="secondary">{res.TatThongBao} </Button>
              <Button startIcon={<CloseIcon />} style={{ marginLeft: 10 }} onClick={() => setVisible(false)} variant="outlined" color="primary">{res.Dong}</Button>
            </div>
          </FormGroup>

        </DialogContent>
      </Dialog>

    </div>
  )
}
export default FormTimeLineCandidate
