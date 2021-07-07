
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card } from '@progress/kendo-react-layout';
import './styleListViewReview.scss';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import Ratting from 'components/Rating/Rating';
import { GetDataCommentRedux } from 'components/ListViewKendo/ListViewKendoSlice';
const myHeader = () => {
    return (
        <ListViewHeader style={{ color: 'rgb(1817, 80, 92)', fontSize: 40, fontFamily: "fantasy", borderBottomStyle: "groove" }} className='pl-4 pb-2 pt-2'>
            Review đánh giá công ty
        </ListViewHeader>
    );
}   
const MyItemRender = props => {
    let item = props.dataItem;
    var parse = require('html-react-parser');
    const history = useHistory();
    const LoginInfo = useSelector(state => state.loginInfo);
    const HandleRedirectPage = (id) => {
        const linkRedired = `/Jobs/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    const HandleRedirectPageEdit = (id) => {
        const linkRedired = `/PublishedRecruitment/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    return (
        <Card style={{ padding: '20px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column DetailComment'>
                <div >
                    <h1 className='TitleReview DetailComment no__Paddingtop'>{item.titleReview}</h1>
                    <Ratting key={item.recID} value={item.star} size={25}></Ratting>
                    <h1 className='Ilike DetailComment no__Paddingtop' >Điều tôi thích</h1>
                    <p className='detail'>{item.iLike}</p>
                    <h1 className='Improve DetailComment no__Paddingtop'>Đề nghị cải thiện</h1>
                    <p  className='detail'>{item.improve}</p>
                </div>
            </div>
        </Card>
    )
}
function Comments(props) {
    const { dataID } = props;
    const [data, setData] = useState([{
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
        setbegin((parseInt(e.target.innerText) - 1) * take);
    }
    const LoginInfo = useSelector(state => state.loginInfo);
    const { companyID } = useParams();
    const DataComment = useSelector(state => state.DataComment);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchMyAPI() {
            const action = GetDataCommentRedux(dataID);
            await dispatch(action);
        }
        fetchMyAPI()
    }, []);
    return (
        <div>
            <div>
                {
                    DataComment.length > 0 ?
                        <div>
                            <ListView
                                data={DataComment.slice(begin, begin + take)}
                                item={MyItemRender}
                                style={{ width: "100%" }}
                                header={myHeader}
                            />
                            <div style={{ display: 'flex' }}>
                                <Pagination style={{ marginLeft: 'auto', marginTop: 10, marginBottom: 10 }} count={Math.round(DataComment.length / take)} hideNextButton={false} hidePrevButton={false} page={page} onChange={handlePageChange} variant="outlined" color="secondary" />
                            </div>
                        </div> :
                        <div><p style={{ textAlign: 'center', padding: 40, fontSize: 24 }}>Chưa có thông tin. Hãy chờ thêm chút thời gian bạn nhé!</p></div>
                }
            </div>
        </div>
    )
}

export default Comments
