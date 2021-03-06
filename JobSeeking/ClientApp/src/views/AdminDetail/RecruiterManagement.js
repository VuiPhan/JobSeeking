import handleGetJson from 'common/ReadJson';
import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Table, Tag, Radio, Space, Divider, Input } from 'antd';
import RecruiterManagementAPI from 'api/AdminPage/RecruiterManagementAPI';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch } from 'react-redux';
import { UpdateLoading } from 'api/app/LoadingSlicer';
import PaymentForm from './Form/PaymentForm';
function RecruiterManagement() {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [visible, setVisible] = React.useState(false);

    const [dataSource, setDataSource] = useState([]);
    const [dataSourceOriginal, setDataSourceOriginal] = useState([]);
    const history = useHistory();
    const [res, setRes] = React.useState({});
    const isActive = "1";
    const [lstCandidateSelected, setLstCandidateSelected] = React.useState('');
    const dispatch = useDispatch();

    const LoadResource = async () => {
        const resource = await handleGetJson("RecruiterManagement", "AdminPage");
        setRes(resource);
    }
    const LoadDataSource = async () => {
        dispatch(UpdateLoading(true));

        const resource = await RecruiterManagementAPI.getInfomationCompany();
        setDataSource(resource);
        setDataSourceOriginal(resource);
        setTimeout(() => {
            dispatch(UpdateLoading(false));
        }, 1000)
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
            case 4:
                text = res.KhongDuDieuKien;
                break
            case 5:
                text = res.HetHanSuDung;
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
    useEffect(() => {
        LoadDataSource();
        LoadResource();
    }, [])
    const [value, setValue] = useState('');
    const FilterByNameInput = (
        <Input
            placeholder="Tên công ty - Tìm kiếm"
            value={value}
            onChange={e => {
                const currValue = e.target.value;
                setValue(currValue.toLowerCase());
                const filteredData = dataSourceOriginal.filter(entry =>
                    entry.companyName.toLowerCase().includes(currValue)
                );
                setDataSource(filteredData);
            }}
        />
    );
    const columns = [
        {
            key: 'recID',
            title: res.MaNhaTuyenDung,
            dataIndex: 'companyID',

            render: text => <a>{text}</a>,
        },
        {
            key: 'recID',
            title: FilterByNameInput,//res.TenCongTy,
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
                },
                {
                    text: 'Không đủ điều kiện',
                    value: 4,
                },
                {
                    text: 'Hết hạn sử dụng',
                    value: 5,
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

    const handleStatusOfCompany = async (companyID, status) => {

        const result = await RecruiterManagementAPI.updateStatusOfAccount(companyID, status);
        if (result.error === "") {
            MyToaStrSuccess('Cập nhật thành công');
            LoadDataSource();
            return
        }
        MyToaStrError('Có lỗi xảy ra');
    }
    const StatusAccount = { DangHoatDong: 1, MoiDangKy: 2, Khoa: 3, KhongDuDieuKien: 4,KhoaDoHetHan:5 }
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
                label: res.KhongDuDieuKien,
                onClick: async () => {
                    handleStatusOfCompany(companyID, StatusAccount.KhongDuDieuKien);
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
            arrayButton.splice(1, 1); // 4: Không đủ điều kiện

        }
        if (dataSelected.statusAccount == StatusAccount.MoiDangKy) {
            arrayButton.splice(1, 1); // 1: Khóa
            arrayButton.splice(1, 1); // 2: Mở khóa tài khoản
        }
        if (dataSelected.statusAccount == StatusAccount.Khoa) {
            arrayButton.splice(0, 1); // 0: Xác nhận tài khoản.
            arrayButton.splice(0, 1); // 1: Mở khóa tài khoản
            arrayButton.splice(1, 1); // 4: Không đủ điều kiện

        }
        if (dataSelected.statusAccount == StatusAccount.KhongDuDieuKien) {
            arrayButton.splice(1, 3);
        }
        if (dataSelected.statusAccount == StatusAccount.KhoaDoHetHan) {
            arrayButton.splice(0, 4);
        }

        confirmAlert({
            title: res.ThaoTacConfirm,
            message: '',
            buttons: arrayButton
        });
    }
    const [item, setItem] = React.useState({
        jobID: 1,
        roundName: '',
        dateInterview: '2021-01-01',
        contentInterview: '',
      });
      const onDoubleClickRowAndt = (record) => {
          console.log('recordrecord',record);
            setVisible(true);
            setItem(record);
      }
     
    return (
        <div style={{ marginTop: 40, marginLeft: 29, marginRight: 29 }}>
            <h1>{res.QuanLyNhaTuyenDung}</h1>
            <PaymentForm visible={visible} setVisible={setVisible} item={item} LoadDataSource={LoadDataSource}></PaymentForm>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {}, // click row
                      onDoubleClick: event => {onDoubleClickRowAndt(record)}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    };
                  }}
                columns={columns}
                dataSource={dataSource}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20'] }}
            />
        </div>
    )
}

export default RecruiterManagement
