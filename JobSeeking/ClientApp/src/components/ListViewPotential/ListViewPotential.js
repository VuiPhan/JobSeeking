
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import ConstCommon from 'common/ConstInApp';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { ChooseJob } from 'components/ListViewKendo/ListViewKendo2Slice';
import SearchBar from 'material-ui-search-bar';

//const IsAccess = useSelector(state => state.JobKendo);

const myHeader2 = () => {
    return (
        <ListViewHeader style={{ fontSize: 20, fontWeight: "bold", color: "#dfa579", borderBottomStyle: "groove" }} className='pl-4 pb-2 pt-2'>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginTop: 7 }}>
                    Ứng viên
            </div>
                <div style={{ flex: 1 }}>
                    <SearchBar
                        // value={value}
                        // onChange={(newValue) =>setValue(newValue)}
                        // onRequestSearch={() => console.log}
                        placeholder="Tìm kiếm từ khóa ..."
                    />
                </div>
            </div>
        </ListViewHeader>
    );
}
function myHeader() {
    return (
        <div>
            <ListViewHeader style={{ fontSize: 20, fontWeight: "bold", color: "#dfa579", borderBottomStyle: "groove" }} className='pl-4 pb-2 pt-2'>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, marginTop: 7 }}>
                        Ứng viên
            </div>
                    <div style={{ flex: 1 }}>
                        <SearchBar
                            // value={value}
                            // onChange={(newValue) =>setValue(newValue)}
                            // onRequestSearch={() => console.log}
                            placeholder="Tìm kiếm từ khóa ..."
                        />
                    </div>
                </div>
            </ListViewHeader>
        </div>
    )
}


const MyItemRender = props => {
    let item = props.dataItem;

    const history = useHistory();
    const HandleRedirectPage = (id) => {
        const linkRedired = `/ProfilePage/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    const DeletePotentialCandidate = (id) => {
        const linkRedired = `/ProfilePage/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    var parse = require('html-react-parser');

    return (
        <Card style={{ border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column'>
                <div >
                    <CardTitle style={{ fontSize: 18, fontWeight: "bold" }}>
                        {parse(item.fullName)}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 12, marginTop: 0 }}>
                        {item.titleJob}
                    </CardSubtitle>
                </div>
                <br></br>
                <CardActions style={{ padding: 0 }}>
                    <Button onClick={() => HandleRedirectPage(item.candidateCode)}
                        variant="outlined" color="secondary">Xem chi tiết</Button>
                </CardActions>
            </div>
            <CardImage src={`${ConstCommon.LinkImage}${item.pathAvatar}`} style={{ width: 100, height: 100, maxWidth: 220 }} />
        </Card>
    )
}
function ListViewPotential(props) {
    const [data, setData] = useState([{
        "recID": "2",
        "candidateCode": "2",
        "pathAvatar": "2",
        "fullName": "Phan Đăng Vui",
        "titleJob": ""
    },
    ]);
    const [dataOrdinal, setdataOrdinal] = useState([]);
    const [page, setpage] = useState(1);
    // Số phần tử lấy.
    const [take, settake] = useState(2);
    // Phần tử bắt đầu lấy
    const [begin, setbegin] = useState(0);
    const dispatch = useDispatch();
    const handlePageChange = (e) => {
        setpage(parseInt(e.target.innerText));
        setbegin((parseInt(e.target.innerText) - 1) * take);
    }
    async function fetchMyAPI() {
        const result = await RecruitmentManagerAPI.GetCandidatePotential();
        setData(result);
        setdataOrdinal(result);
        const action = ChooseJob({ jobID: 1, IsAccess: true });
        var x = dispatch(action);
    }
    useEffect(() => {
        fetchMyAPI();
    }, []);
    const handleSearch = (value) => {
        if (value === '') {
            setData(dataOrdinal);
            return;
        }
        let result = dataOrdinal.filter(o => o.fullName.toLowerCase().includes(value.toLowerCase()));
        setData(result);
    }

    const [value, setValue] = useState('');

    const HandleSetValue = (newValue) => {
        if (newValue === '') {
            setData(dataOrdinal);
            return;
        }
        setValue(newValue);
        handleSearch(newValue);
    }

    return (
        <div>
            <div>
                <div style={{ border: 'solid', borderBottom: 'none', borderColor: 'darkgrey' }}>
                    <ListViewHeader style={{ fontSize: 20, fontWeight: "bold", color: "#dfa579", borderBottomStyle: "groove" }} className='pl-4 pb-2 pt-2'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, marginTop: 7 }}>
                                Ứng viên tiềm năng
                            </div>
                            <div style={{ flex: 1 }}>
                                <SearchBar
                                    value={value}
                                    onChange={(newValue) => HandleSetValue(newValue)}
                                    onRequestSearch={() => handleSearch(value)}
                                    placeholder="Tìm kiếm ..."
                                />
                            </div>
                        </div>
                    </ListViewHeader>
                </div>
                <ListView
                    data={data.slice(begin, begin + take)}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                />
                <Pagination style={{ marginTop: 3 }} count={Math.round(data.length / take)} hideNextButton={false} hidePrevButton={false} page={page} onChange={handlePageChange} variant="outlined" color="secondary" />
            </div>
        </div>
    )
}
export default ListViewPotential
