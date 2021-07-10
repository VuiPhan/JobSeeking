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
import ConfigAppManagementAPI from 'api/AdminPage/ConfigAppManagementAPI';
import ConfigAppForm from './Form/ConfigAppForm';
function ConfigAppManagement() {
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
        const resource = await handleGetJson("ConfigAppPage", "AdminPage");
        setRes(resource);
    }
    const LoadDataSource = async () => {
        dispatch(UpdateLoading(true));
        const resource = await ConfigAppManagementAPI.getManagerConfigApps();
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
            key: 'key',
            title: res.Key,
            dataIndex: 'key',

            render: text => <a>{text}</a>,
        },
        {
            key: 'key',
            title: res.MaCauHinh,
            dataIndex: 'nameConfig',
            render: text => <a>{text}</a>,
        }
        ,
        {
            key: 'key',
            title: res.TenCauHinh,
            dataIndex: 'descriptionss',
            render: text => <a>{text}</a>,
        },
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
    const [item, setItem] = React.useState({
        jobID: 1,
        roundName: '',
        dateInterview: '2021-01-01',
        contentInterview: '',
      });
      const onDoubleClickRowAndt = (record) => {
            setVisible(true);
            setItem(record);
      }
    return (
        <div style={{ marginTop: 40, marginLeft: 29, marginRight: 29 }}>
            <h1>{res.ThietLapCauHinhHeThong}</h1>
            <ConfigAppForm visible={visible} setVisible={setVisible} item={item} LoadDataSource={LoadDataSource}></ConfigAppForm>
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

export default ConfigAppManagement
