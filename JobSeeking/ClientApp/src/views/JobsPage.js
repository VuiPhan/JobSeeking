import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import '../../src/assets/css/TitleCompany.scss';
import LGCompanyPage from "Language/CompanyPage";
import JobsApi from "api/Company/JobsAPI.js";
import { useHistory, useParams } from "react-router-dom";
import { Button, Icon } from "@material-ui/core";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HeaderCompany from "components/HeaderCompany/HeaderCompany.js";
import ListViewKendo2 from "components/ListViewKendo/ListViewKendo2.js";
import { useDispatch, useSelector } from 'react-redux';
import { ChooseJob } from "components/ListViewKendo/ListViewKendo2Slice.js";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { MyToaStrError, MyToaStrSuccess } from "components/Toastr/Toastr2.js";
import MyToastr from "components/Toastr/Toastr.js";
import TagList from "@progress/kendo-react-dropdowns/dist/npm/MultiSelect/TagList";
import { changeSearch } from "components/ListViewKendo/ForSearchSlice.js";

const useStyles = makeStyles(styles);


export default function JobsPage(props) {
  const classes = useStyles();
  const res = LGCompanyPage.JobPage;
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  var parse = require('html-react-parser');
  const [data, setData] = useState({ 
    companyId: null, companyName: '', TimeWorking: '',
     jobsTitle: '', jobDescriptions: 'a', jobRequirements:
      'b', reasonsToJoin: 'c', loveWorkingHere: 'd'
      ,postingDate:'',
      scalePeople:'',
      CompanyType:''

     });
  const history = useHistory();
  const { jobID } = useParams();
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo);

  const [dataJobWorking, setJobWorking] = useState([{value:1,label:''},{value:2,label:''}]);
  const [dataTagSkill, setTagSkill] = useState([]);
  const [dataPriorityDegree, setPriorityDegree] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await JobsApi.get(jobID);
      // Nếu có candidate code thì update luôn số lần click
      if(LoginInfo.CadidateCode){
        const resultClick = await JobsApi.insertClick(LoginInfo.CadidateCode,jobID);
      }
      setData(result[0][0]);
      setJobWorking(result[2]);
      setTagSkill(result[1]);
      setPriorityDegree(result[3]);
      if (LoginInfo.companyID == result[0][0].companyId) {
        const action = ChooseJob({ jobID: jobID, IsAccess: true });
        var x = dispatch(action);
      }
      else {
        const action = ChooseJob({ jobID: jobID, IsAccess: false });
        var x = dispatch(action);
      }

    }
    fetchMyAPI();

  }, [jobID,LoginInfo]);
  const lookingForCandidates = () => {
    confirmAlert({
      title: 'Tìm kiếm ứng viên',
      message: 'Bạn sẽ được hệ thống hỗ trợ tìm kiếm các ứng viên phù hợp với yêu cầu công việc',
      buttons: [
        {
          label: 'Tìm kiếm ngay',
          onClick: async () => {
            const action = ChooseJob({ jobID: jobID, IsAccess: true ,IsSearch :true});
            var x = dispatch(action);
            MyToaStrSuccess('Hệ thống đã lọc những ứng viên có khả năng ở góc dưới bên phải màn hình');
            return;
          }
        },
        {
          label: 'Đóng',
          onClick: () => { }
        }
      ]
    });
  };
  const submitApply = () => {
    if (!LoginInfo.CadidateCode) {
      MyToaStrError('Bạn hãy đăng nhập để sử dụng tính năng này!');
      return;
    }
    confirmAlert({
      title: 'Ứng tuyển',
      message: 'Bạn sẽ gửi hồ sơ của bạn đến nhà tuyển dụng?',
      buttons: [
        {
          label: 'Vâng tôi muốn ứng tuyển',
          onClick: async () => {
            const result = await JobsApi.postApply(jobID);
            if (result.error === "") {
            MyToaStrSuccess('Bạn đã ứng tuyển thành công. Hãy chờ thông tin từ nhà tuyển dụng!');
            }
            else{
              MyToaStrError('Bạn đã ứng tuyển công việc này rồi! Hãy chờ thông tin từ nhà tuyển dụng!');
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
  };
  const HandleRedirectPage = (id) => {
    const linkRedired = `/Company/${id}`;
    history.push(linkRedired);
    window.scrollTo(0, 150);
  }
  const HandleRedirectPageTag = (id,IsJobTitle,label) => {
    let ChucDanhValue = null;
    let KyNangValue = null;
    if(IsJobTitle == true){
      ChucDanhValue = id;
    }
    else{
      KyNangValue = id;
    }

    const dataSearch = { ChucDanhValue: ChucDanhValue, KyNangValue: KyNangValue,NameValue:label };
    const action = changeSearch(dataSearch);
    dispatch(action);
    const linkRedired = `/Tag`;
    history.push(linkRedired);
    window.scrollTo(0, 450);
  }
  return (
    <div>
      <MyToastr></MyToastr>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <HeaderCompany CompanyID={jobID} IsCompany={0}></HeaderCompany>
            <div className="row">
              <div className="side">
                <div className="detail_side">
                  <AccessAlarm />
                  <p className="detail_side_content">OT:{data.otMode}</p>
                </div>
                <br></br>
                <div className="detail_side">
                  <MonetizationOnIcon color="secondary" />
                  <p className="detail_side_content"> Mức lương: $ {data.salary}</p>
                  <br></br>
                </div>
                <br></br>
                <div className="detail_side">
                  <LocationCityIcon color="secondary" />
                  <p className="detail_side_content">{data.companyAddress}</p>
                </div>
                <br></br>

                <div className="detail_side">
                  <Brightness7Icon />
                  <p className="detail_side_content"> {data.companyType}</p>
                </div>
                <br></br>
                <div className="detail_side">
                  <PeopleIcon />
                  <p className="detail_side_content"> {data.scalePeople}</p>
                </div>
                <br></br>
                <div className="detail_side">
                  <DateRangeIcon />
                  <p className="detail_side_content"> {data.postingDate}</p>
                </div>
                <br></br>
                <div className="">
                  <p>Kỹ năng:</p>
                  <div className="">
                  <ul>
                  {dataTagSkill.map((item) =>
      <li key={item.value}><a href="javascript:void(0)" onClick={()=> {HandleRedirectPageTag(item.value,false,item.label)}} >{item.label}</a></li>
    )}
                  </ul>
                  </div>
                </div>
                <div className="">
                  <p>Chức danh công việc:</p>
                  <div className="">
                  <ul>
                  {dataJobWorking.map((item) =>
      <li key={item.value}><a href="javascript:void(0)" onClick={()=> {HandleRedirectPageTag(item.value,true,item.label)}} >{item.label}</a></li>
    )}
                  </ul>
                  </div>
                </div>
                <div className="">
                  <p>Bằng cấp ưu tiên:</p>
                  <div className="">
                  <ul>
                  {dataPriorityDegree.map((item) =>
      <li key={item.value}><a>{item.label}</a></li>
    )}
                  </ul>
                  </div>
                </div>

                <div className="CenterButton">
                  {LoginInfo.role === "Recruiter" ?
                    null
                    : <div className="buttonCenter"> <Button variant="outlined" onClick={() => submitApply()} color="secondary">Ứng tuyển ngay</Button>
                    </div>
                  }
                  <div className="buttonCenter">
                    <Button onClick={() => HandleRedirectPage(data.companyId)} variant="outlined" color="primary">Về chúng tôi</Button>

                  </div>
                </div>
                <div className="CenterButton">
                  {LoginInfo.companyID == data.companyId  ?
                    <div className="buttonCenter"> <Button variant="outlined" onClick={() => lookingForCandidates()} color="secondary">Tìm kiếm ứng viên</Button>
                   
                    </div>
                     : null
                  }
                </div>
              </div>
              <div className="main">
                <h3 className="TitleWork">{parse(data.jobsTitle)}</h3>
                <h3>
                  {res.LyDoNenGiaNhap}
                </h3>
                <div>
                  {parse(data.reasonsToJoin)}
                </div>
                <h3>
                  {res.MoTaCongViec}
                </h3>
                <div>
                  {parse(data.jobDescriptions)}
                </div>

                <h3>
                  {res.YeuCauCongViec}
                </h3>
                <div>
                  {parse(data.jobRequirements)}

                </div>
                <h3>
                  {res.TaiSaoBanYeuThich}
                </h3>
                <div>
                  {parse(data.loveWorkingHere)}
                </div>

              </div>


            </div>
            <h3>
              {res.CacCongViecTuongTu}
            </h3>
            <ListViewKendo2 dataID={-1}></ListViewKendo2>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
