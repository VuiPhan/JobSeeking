import handleGetJson from 'common/ReadJson';
import { FastField, Formik, Form as FormFormik } from 'formik';
import SelectField from 'components/CustomField/SelectField';
import React, { useEffect, useState } from 'react'

import * as yup from 'yup';
import { Table, Tag, Radio, Space, Divider } from 'antd';

import ManagerCategories_API from 'api/AdminPage/ManagerCategories_API';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import FormCategories from './Form/FormCategories';
import { Tooltip } from '@material-ui/core';
import { Button } from 'bootstrap';
import DoneIcon from '@material-ui/icons/Done';

function ManagerCategories() {
    const [res, setRes] = React.useState({});
    const [selectionType, setSelectionType] = useState('checkbox');

    const [typeSelect, setTypeSelect] = React.useState({ typeSelected: 1 });
    const [dataSource, setDataSource] = React.useState([]);
    const [initialValues, setinitialValues] = React.useState({});
    const validationShema = yup.object().shape({});
    const [lstSelected, setLstSelected] = React.useState('');
    const [item, setItem] = React.useState({
        jobID: 1,
        roundName: '',
        dateInterview: '2021-01-01',
        contentInterview: '',
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
    const handleAction = async (data) => {
        setVisible(true);
    }
    const lockItem = async (data) => {

    }
    const columns = [
        {
            key: 'recID',
            title: res.MaDanhMuc,
            dataIndex: 'categoryCode',
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
            title: res.ChinhSua,
            dataIndex: 'categoryCode',
            render: (categoryCode) => (
                <EditIcon onClick={() => handleAction(categoryCode)}></EditIcon>
            ),
        },
        {
            key: 'recID',
            title: res.Xoa,
            dataIndex: 'categoryCode',
            render: (categoryCode) => (
                <ArrowForwardIosIcon onClick={() => lockItem(categoryCode)}></ArrowForwardIosIcon>
            ),
        }
    ]
    const InserUpdateItem = async (data) =>{

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
                            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop:15,marginLeft:10 }}>
                  <Tooltip title={res.ThemMoi}>
                    <Button onClick={() => InserUpdateItem(values)} startIcon={<DoneIcon />} variant="outlined" color="secondary">{res.ThemMoi}</Button>
                  </Tooltip>
                </div> */}
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
            <FormCategories visible={visible} setVisible={setVisible} item={item}></FormCategories>
        </div>

    )
}

export default ManagerCategories
