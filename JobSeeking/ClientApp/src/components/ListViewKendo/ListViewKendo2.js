
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';
import './styleListView.scss';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadJobsApi from 'api/HomePageAPI';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
const myHeader = () => {
    return (
        <ListViewHeader style={{ color: 'rgb(1817, 80, 92)', fontSize: 40 ,fontFamily: "fantasy",borderBottomStyle: "groove"}} className='pl-4 pb-2 pt-2'>
            Những công việc nổi bật trong tuần
        </ListViewHeader>
    );
}
const MyItemRender = props => {
    let item = props.dataItem;
    var parse = require('html-react-parser');
    const history = useHistory();
    const LoginInfo = useSelector(state => state.loginInfo);
    const HandleRedirectPage = (id) =>{
        const linkRedired = `/Jobs/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
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
                        <Button startIcon={<FavoriteIcon />} onClick={()=>HandleRedirectPage(item.jobID)} variant="outlined" color="primary">Yêu thích</Button>

                      
                        </div>
                        <div style={{display:"inline",paddingLeft: 10}}>
                        {LoginInfo.companyID == item.companyID ?<Button onClick={()=>HandleRedirectPageEdit(item.jobID)} 
                                variant="outlined" color="secondary"
                                startIcon={<EditOutlinedIcon />}
                              >Chỉnh sửa</Button>:null}
                            </div>
                 
                </CardActions>
            </div>
            <div>
            <CardImage src={`https://localhost:44351/Images/${item.imageLogo}`} style={{ width: 100, height: 100, maxWidth: 220 }} />
            <h6 style={{fontFamily:'Anton', textAlign:'center',marginTop:20}}>  {item.postingDateString}</h6>
            </div>
            
        </Card>
    )
}
function ListViewKendo2(props) {
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
    const { companyID } = useParams();
    useEffect(() => {
        // Kiêm tra xem trang đang đứng có phải là công ty của mình hay không? -- Nếu thật thì trả false otherwise true
        var OwnCompany = true;
        if(companyID == LoginInfo.companyID && typeof LoginInfo.companyID !== 'undefined' ){
            OwnCompany = false;
        }
        async function fetchMyAPI() {
          const result = await LoadJobsApi.getAll(dataID,LoginInfo.CadidateCode,OwnCompany);
          setData(result);
        }
        if(dataID){
            fetchMyAPI();
        }
      }, [dataID,LoginInfo.CadidateCode]);
     
    return (
        <div>
               <div>
                   {
                       data.length > 0 ? 
                       <div>
                       <ListView
                       data={data.slice(begin,begin+take)}
                       item={MyItemRender}
                       style={{ width: "100%" }}
                       header={myHeader}
                       
                   />
                   <Pagination style={{marginLeft:'auto',marginTop:10,marginBottom:10}} count={Math.round(data.length/take)} hideNextButton = {false} hidePrevButton={false} page={page} onChange={handlePageChange}  variant="outlined" color="secondary" />
                   </div>: <div><p style={{textAlign: 'center',padding: 40,fontSize: 24}}>Chưa có việc làm nào được đăng. Hãy chờ thêm chút thời gian bạn nhé!</p></div>
                   }
                
                <div style={{display:'flex'}}>
                
                </div>
            </div>
        </div>
    )
}

export default ListViewKendo2
