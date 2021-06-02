import handleGetJson from 'common/ReadJson';
import { FastField, Formik, Form as FormFormik } from 'formik';
import SelectField from 'components/CustomField/SelectField';
import React, { useEffect, useState } from 'react'

import * as yup from 'yup';
import { Table, Tag, Radio, Space, Divider } from 'antd';

import ManagerCategories_API from 'api/AdminPage/ManagerCategories_API';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import FormCategories from './Form/FormCategories';
import { Tooltip } from '@material-ui/core';
import { Button, Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
function ManagerCategories() {
    const [res, setRes] = React.useState({});
    const [selectionType, setSelectionType] = useState('checkbox');

    const [typeSelect, setTypeSelect] = React.useState({ typeSelected: 1 });
    const [dataSource, setDataSource] = React.useState([]);
    const [initialValues, setinitialValues] = React.useState({});
    const validationShema = yup.object().shape({});
    const [lstSelected, setLstSelected] = React.useState('');
    const [item, setItem] = React.useState({
        categoryCode: 0,
        categoryName: '',
      });
  const [visible, setVisible] = React.useState(false);

    const LoadResource = async () => {
        const resource = await handleGetJson("ManagerCategories", "AdminPage");
        setRes(resource);
    }
    const LoadDataSource = async () => {
        const dataSourceApi = await ManagerCategories_API.getManagerCategories(typeSelect.typeSelected);
        setDataSource(dataSourceApi);
    }
    const UpdateItemWhenChangeTemplate = (typeSelected) => {
        setTypeSelect({ typeSelected: typeSelected });
    }
    useEffect(() => {
        LoadDataSource();
    }, [typeSelect])
    useEffect(() => {
        LoadResource();
    }, [])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setLstSelected(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.recID == "",
            // Column configuration not to be checked
            name: record.recID
        })
    };
    const handleAction = async (key) => {
        let dataSelected = dataSource.find(ele => ele.key === key);
        console.log('dataSelecteddataSelected',dataSelected);
        setItem(dataSelected);
        setVisible(true);
    }
    const lockItem = async (data) => {

    }
    const generateResult = (data) => {
        let text = "";
        switch (data) {
            case false:
                text = res.DangSuDung;
                break;
            case true:
                text = res.DaKhoa;
                break;
        }
        return text;
    }
    const handleStatusOfCategory = async (categoryCode) =>{
        const dataSourceApi = await ManagerCategories_API.lockCategory(categoryCode,typeSelect.typeSelected);
        if(dataSourceApi.error ===""){
            MyToaStrSuccess("Cập nhật thành công");
            LoadDataSource();
            return;
          }
          MyToaStrError(dataSourceApi.error);
    }
    const handleLockCategory = (categoryCode) => {
        let arrayButton = [
            {
                label: res.KhoaDanhMuc,
                onClick: async () => {
                    handleStatusOfCategory(categoryCode);
                    return;
                }
            },
            {
                label: res.MoKhoaDanhMuc,
                onClick: async () => {
                    handleStatusOfCategory(categoryCode);
                    return;
                }
            },
            {
                label: 'Đóng',
                onClick: () => { }
            }
        ]
        let dataSelected = dataSource.find(ele => ele.categoryCode === categoryCode);
        if (dataSelected.isLock == true) {
            arrayButton.splice(0, 1); // Bỏ nút khóa

        }
        else {
            arrayButton.splice(1, 1); // Bỏ nút mở

        }
        confirmAlert({
            title: res.ThaoTacConfirm,
            message: '',
            buttons: arrayButton
        });
    }
    const columns = [
        {
            key: 'key',
            title: res.MaDanhMuc,
            dataIndex: 'key',
//            render: text => <a>{text}</a>,
        },
        {
            key: 'recID',
            title: res.TenDanhMuc,
            dataIndex: 'categoryName',
          //  render: text => <a>{text}</a>,
        },
        {
            key: 'recID',
            title: res.TrangThai,
            dataIndex: 'isLock',
            filters: [
                {
                  text: 'Đang hoạt động',
                  value: false,
                },
                {
                  text: 'Đã khóa',
                  value: true,
                }],
                onFilter: (value, record) => record.isLock === value,
            render: tags => (
                <span>
                    <Tag color={tags == false ? "green" : "volcano"} key={tags}>
                        {generateResult(tags)}
                    </Tag>
                </span>
            ),
        },
        {
            key: 'recID',
            title: res.ChinhSua,
            dataIndex: 'categoryCode',
            render: (categoryCode) => (
                <EditIcon onClick={() => handleAction(categoryCode)}></EditIcon>
            ),
        },
        {
            key: 'recID',
            title: res.Khoa,
            dataIndex: 'categoryCode',
            render: (categoryCode) => (
                <LockIcon onClick={() => handleLockCategory(categoryCode)}></LockIcon>
            ),
        }
    ]
    const OpenFormAddNew = async () =>{
        setItem({
            categoryCode: 0,
            categoryName: '',
          });
        setVisible(true);
    }

    return (
        <div style={{ marginTop: 40, marginLeft: 29, marginRight: 29 }}>
            <h1>{res.ThietLapDanhMuc}</h1>
            <Formik initialValues={typeSelect}
                validationSchema={validationShema}
                enableReinitialize>
                {FormikProps => {
                    const { values, errors, touched } = FormikProps;
                    console.log('errors', errors);
                    return (
                        <div>
                            <FormFormik>
                                <div style={{ marginTop: 0 }}>
                                    <FastField
                                        name="typeSelected"
                                        component={SelectField}
                                        label="Chọn dữ liệu để thiết lập"
                                        ListName="ManagerCategories"
                                        HandleOnChange={UpdateItemWhenChangeTemplate} />
                                </div>
                            </FormFormik>
                            <h6>Bảng dữ liệu </h6>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:1, marginBottom:10,marginLeft:10 }}>
                  <Tooltip title={res.ThemMoi}>
                    <Button onClick={() => OpenFormAddNew()} startIcon={<AddIcon />} variant="outlined" color="secondary">{res.ThemMoi}</Button>
                  </Tooltip>
                </div>
                {/* <Button onClick={() => InserUpdateItem(values)} startIcon={<DoneIcon />} variant="outlined" color="secondary">{res.ThemMoi}</Button> */}
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
                }}
            </Formik>
            <FormCategories visible={visible} typeCategory={typeSelect.typeSelected} setVisible={setVisible} LoadDataSource={LoadDataSource} item={item}></FormCategories>
        </div>

    )
}

export default ManagerCategories
