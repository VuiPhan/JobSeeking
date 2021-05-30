import handleGetJson from 'common/ReadJson';
import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Table, Tag, Radio, Space, Divider } from 'antd';
import RecruiterManagementAPI from 'api/AdminPage/RecruiterManagementAPI';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
function RecruiterManagement() {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [dataSource, setDataSource] = useState([]);
    const history = useHistory();
    const [res, setRes] = React.useState({});
    const isActive = "1";
    const [lstCandidateSelected, setLstCandidateSelected] = React.useState('');

    const LoadResource = async () => {
        const resource = await handleGetJson("RecruiterManagement", "AdminPage");
        setRes(resource);
    }
    const LoadDataSource = async () => {
        const resource = await RecruiterManagementAPI.getInfomationCompany();
        setDataSource(resource);
    }
    const generateResult = (data) => {
        let text = "";
        switch (data) {
            case 1:
                text = res.DangHoatDong;
                break;
            case 2:
                text = res.ChuaXacNhan;
                break;
            case 3:
                text = res.Khoa;
                break
        }
        return text;
    }
    const RedirectPageCompany = (companyID) => {
        const linkRedired = `/Company/${companyID}`;
        history.push(linkRedired);
    }
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setLstCandidateSelected(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.recID == "",
            // Column configuration not to be checked
            name: record.recID
        })
    };
    const columns = [
        {
            key: 'recID',
            title: res.MaNhaTuyenDung,
            dataIndex: 'companyID',

            render: text => <a>{text}</a>,
        },
        {
            key: 'recID',
            title: res.TenCongTy,
            dataIndex: 'companyName',
            render: text => <a>{text}</a>,
        }
        ,
        {
            key: 'recID',
            title: res.NgayTaoTK,
            dataIndex: 'joinDate_String',
            render: text => <a>{text.substring(0, 10)}</a>,
        },
        {
            key: 'recID',
            title: res.TrangThai,
            dataIndex: 'statusAccount',
            filters: [
                {
                  text: 'Đang hoạt động',
                  value: 1,
                },
                {
                  text: 'Chưa xác nhận',
                  value: 2,
                },
                {
                  text: 'Khóa',
                  value: 3,
                }],
                onFilter: (value, record) => record.statusAccount === value,
                //sorter: (a, b) => a.name.length - b.name.length,
                //sortDirections: ['descend'],
            render: tags => (
                <span>
                    <Tag color={tags == isActive ? "green" : "volcano"} key={tags}>
                        {generateResult(tags)}
                    </Tag>
                </span>
            ),
        },
        {
            key: 'recID',
            title: res.ThaoTac,
            dataIndex: 'companyID',
            render: (companyID) => (
                <EditIcon onClick={() => handleAction(companyID)}></EditIcon>
            ),
        },
        {
            key: 'recID',
            title: res.XemTrang,
            dataIndex: 'companyID',
            render: (companyID) => (
                <ArrowForwardIosIcon onClick={() => RedirectPageCompany(companyID)}></ArrowForwardIosIcon>
            ),
        }
    ];
    const [dataRenderTable, setdataRenderTable] = React.useState([]);
    useEffect(() => {
        LoadDataSource();
        LoadResource();
    }, [])
    const handleStatusOfCompany = async (companyID, status) => {
        const result = await RecruiterManagementAPI.updateStatusOfAccount(companyID, status);
        if (result.error === "") {
            MyToaStrSuccess('Cập nhật thành công');
            LoadDataSource();
            return
        }
        MyToaStrError('Có lỗi xảy ra');
    }
    const StatusAccount = { DangHoatDong: 1, MoiDangKy: 2, Khoa: 3 }
    const handleAction = (companyID) => {
        let arrayButton = [
            {
                label: res.XacNhanTaiKhoan,
                onClick: async () => {
                    handleStatusOfCompany(companyID, StatusAccount.DangHoatDong);
                    return;
                }
            },
            {
                label: res.KhoaTaiKhoan,
                onClick: async () => {
                    handleStatusOfCompany(companyID, StatusAccount.Khoa);
                    return;
                }
            },
            {
                label: res.MoKhoaTaiKhoan,
                onClick: async () => {
                    handleStatusOfCompany(companyID, StatusAccount.DangHoatDong);
                    return;
                }
            },
            {
                label: 'Đóng',
                onClick: () => { }
            }
        ]
        let dataSelected = dataSource.find(ele => ele.companyID === companyID);

        if (dataSelected.statusAccount == StatusAccount.DangHoatDong) {
            arrayButton.splice(0, 1); // 0: Xác nhận tài khoản.
            arrayButton.splice(1, 1); // 2: Mở khóa tài khoản
        }
        if (dataSelected.statusAccount == StatusAccount.MoiDangKy) {
            arrayButton.splice(1, 1); // 1: Khóa
            arrayButton.splice(1, 1); // 2: Mở khóa tài khoản
        }
        if (dataSelected.statusAccount == StatusAccount.Khoa) {
            arrayButton.splice(0, 1); // 0: Xác nhận tài khoản.
            arrayButton.splice(0, 1); // 1: Mở khóa tài khoản
        }
        confirmAlert({
            title: res.ThaoTacConfirm,
            message: '',
            buttons: arrayButton
        });
    }
    return (
        <div style={{ marginTop: 40, marginLeft: 29, marginRight: 29 }}>
            <h1>{res.QuanLyNhaTuyenDung}</h1>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20'] }}
            />
        </div>
    )
}

export default RecruiterManagement
