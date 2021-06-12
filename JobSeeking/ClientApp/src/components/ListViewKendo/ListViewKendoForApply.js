
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import './styleListView.scss';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadJobsApi from 'api/HomePageAPI';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';
import ConstCommon from 'common/ConstInApp';
import JobsApi from 'api/Company/JobsAPI';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import MyToastr from 'components/Toastr/Toastr';
import { confirmAlert } from 'react-confirm-alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const myHeader = () => {
    return (
        <ListViewHeader style={{ color: 'rgb(1817, 80, 92)', fontSize: 40 ,fontFamily: "fantasy",borderBottomStyle: "groove"}} className='pl-4 pb-2 pt-2'>
            Danh sách công việc mà bạn đã ứng tuyển
        </ListViewHeader>
    );
}
const MyItemRender = props => {
    const {reLoad} = props;
    let item = props.dataItem;
    var parse = require('html-react-parser');
    const history = useHistory();
    const LoginInfo = useSelector(state => state.loginInfo);
    const HandleRedirectPage = (id) =>{
        const linkRedired = `/Jobs/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 450);
    }
    const HandleCancelApply = async (jobID) =>{
        confirmAlert({
            title: 'Xác nhận',
            message: 'Nhà tuyển dụng sẽ không còn nhìn thấy bạn trong danh sách ứng tuyển',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: async () => {
                    const result = await JobsApi.postCancelApply(jobID);
                    if (result.error === "") {
                    MyToaStrSuccess('Bạn đã gỡ thành công ứng tuyển vào công việc này.');
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
    
    const HandleRedirectPageEdit = (id) =>{
        const linkRedired = `/PublishedRecruitment/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    return (
        <Card style={{ padding: '20px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column'>
                <div style={{ padding: '0 8px', marginRight: '3rem' ,height:162,overflow:'hidden',msTextOverflow:'ellipsis'}}>
                    <CardTitle style={{ fontSize: 20,fontWeight:'bold' }}>
                        {item.jobsTitle}
                    </CardTitle>
                    <CardSubtitle  className = "HoverColorCompany" style={{ fontSize: 16, marginTop: 0 ,fontWeight:'bold', fontStyle: 'italic'}}>
                        {item.companyName}
                    </CardSubtitle>
                    <CardSubtitle className = "HoverColorLocation" style={{ fontSize: 14, marginTop: 0 ,fontStyle: 'italic'}}>
                    {item.jobAddress}
                    </CardSubtitle>
                    <CardSubtitle style={{ fontSize: 12 }}>
                    {parse(item.jobRequirements)}
                    </CardSubtitle>
                </div>
                <CardActions style={{ padding: 0,margin:5 }}>
                    <Button onClick={()=>HandleRedirectPage(item.jobID)} 
                                variant="outlined" color="secondary"
                                startIcon={<VisibilityIcon />}
                              >Xem chi tiết</Button>
                    <div style={{display:"inline",paddingLeft: 10}}>
                        <Button startIcon={<DeleteForeverIcon />} onClick={()=>HandleCancelApply(item.jobID)} variant="outlined" color="primary">Hủy ứng tuyển</Button>
                        </div>
                </CardActions>
            </div>
            <div>
            <CardImage src={`${ConstCommon.LinkImage}${item.imageLogo}`} style={{ width: 100, height: 100, maxWidth: 220 }} />
            <h6 style={{fontFamily:'Anton', textAlign:'center',marginTop:20}}>  {item.postingDateString}</h6>
            </div>
            
        </Card>
    )
}
function ListViewKendoForApply(props) {
    const {dataID} = props;
    const [data, setData] = useState( [ {
        "Title": "How to design with love?",
        "Subtitle": "7 tips to fall in love with your job.",
        "Date": "Feb 24,  2020",
        "imageJob": "2-220x140.png",
        "jobRequirements": "<p><i>Hybrid Technologies là công ty công nghệ phần mềm liên doanh Nhật-Việt, cung cấp các dịch vụ và mô hình làm việc đa dạng như Mô hình Hybrid, Mô hình Ủy thác, hay lĩnh vực Trí tuệ nhân tạo (AI).</i></p>"
    }]);
    const [page, setpage] = useState(1);
    // Số phần tử lấy.
    const [take, settake] = useState(5);
    // Phần tử bắt đầu lấy
    const [begin, setbegin] = useState(0);
    const handlePageChange = (e) => {
        setpage(parseInt(e.target.innerText));
        setbegin((parseInt(e.target.innerText)-1)*take);
    }
    const LoginInfo = useSelector(state => state.loginInfo);
    async function fetchMyAPI() {
        const result = await LoadJobsApi.getJobForApplyOfCandidate();
        setData(result);
      }
    useEffect(() => {
            fetchMyAPI();
      }, []);
    return (
        <div>
            <p style={{paddingTop:20,fontWeight: 900,color: 'crimson'}}> Tổng cộng {data.length} công việc mà bạn đã ứng tuyển</p>
               <div>
                   {
                       data.length > 0 ? 
                       <div>
                       <ListView
                       data={data.slice(begin,begin+take)}
                       reLoad={fetchMyAPI()}
                       item={MyItemRender}
                       style={{ width: "100%" }}
                       header={myHeader}
                       
                   />
                   <Pagination style={{marginLeft:'auto',marginTop:10,marginBottom:10}} count={Math.round(data.length/take)} hideNextButton = {false} hidePrevButton={false} page={page} onChange={handlePageChange}  variant="outlined" color="secondary" />
                   </div>: <div><p style={{textAlign: 'center',color:'green',padding: 40,fontSize: 24}}>Bạn chưa ứng tuyển công việc nào. Hãy nhanh tay chọn cho mình 1 công việc nhé!</p></div>
                   }
                
                <div style={{display:'flex'}}>
                
                </div>
            </div>
        </div>
    )
}

export default ListViewKendoForApply
