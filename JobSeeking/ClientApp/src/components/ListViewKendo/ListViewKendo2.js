
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';
import './styleListView.scss';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadJobsApi from 'api/HomePageAPI';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

    const HandleRedirectPage = (id) =>{
        const linkRedired = `/Jobs/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    return (
        <Card style={{ padding: '20px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column'>
                <div style={{ padding: '0 8px', marginRight: '3rem' }}>
                    <CardTitle style={{ fontSize: 20,fontWeight:'bold' }}>
                        {item.jobsTitle}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 14, marginTop: 0 ,fontWeight:'bold', fontStyle: 'italic'}}>
                        {item.companyName}
                    </CardSubtitle>
                    <CardSubtitle style={{ fontSize: 12 }}>
                    {parse(item.jobRequirements)}
                    </CardSubtitle>
                </div>
                <CardActions style={{ padding: 0,margin:3 }}>
                    <Button onClick={()=>HandleRedirectPage(item.jobID)} 
                                variant="outlined" color="secondary"
                                startIcon={<VisibilityIcon />}
                              >Xem chi tiết</Button>
                    <div style={{display:"inline",paddingLeft: 10}}><Button startIcon={<FavoriteIcon />} onClick={()=>HandleRedirectPage(item.jobID)} variant="outlined" color="primary">Thêm vào yêu thích</Button></div>
                    
                </CardActions>
            </div>
            <div>
            <CardImage src={`https://localhost:44351/Images/${item.imageLogo}`} style={{ width: 100, height: 100, maxWidth: 220 }} />
            <h6 style={{textAlign:'center',marginTop:10}}>Ha Noi</h6>
            <h6 style={{textAlign:'center',marginTop:10, fontStyle: 'italic'}}>20 ngày trước</h6>
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
    const [take, settake] = useState(2);
    // Phần tử bắt đầu lấy
    const [begin, setbegin] = useState(0);
    const handlePageChange = (e) => {
        setpage(parseInt(e.target.innerText));
        setbegin((parseInt(e.target.innerText)-1)*take);
    }
    useEffect(() => {
        async function fetchMyAPI() {
          const result = await LoadJobsApi.getAll(dataID);
          setData(result);
        }
        if(dataID){
            fetchMyAPI();
        }
      }, [dataID]);
     
    return (
        <div>
               <div>
                <ListView
                    data={data.slice(begin,begin+take)}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={myHeader}
                />
                <Pagination style={{marginLeft:650,marginTop:10,marginBottom:10}} count={Math.round(data.length/take)} hideNextButton = {false} hidePrevButton={false} page={page} onChange={handlePageChange}  variant="outlined" color="secondary" />
            </div>
        </div>
    )
}

export default ListViewKendo2
