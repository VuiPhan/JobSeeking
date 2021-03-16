import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import { Drawer,Form,  Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MyCKEditor from "components/CKEditor/CKEditor";
import { Formik,Form as FormMikContainer, FastField } from "formik";
import * as yup from 'yup';
//import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import InputField from "components/CustomField/InputField";
import SelectField from 'components/CustomField/SelectField';
import WorkProcessAPI from 'api/JobSeeker/WorkProcessAPI';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
//import WorkProcessItem from './Child/WorkProcessItem';
//import { GetWorkProcess } from './Child/WorkProcessSlice';
import { useDispatch } from 'react-redux';
import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { GetWorkProcess } from '../Child/WorkProcessSlice';

function WorkProcessForm(props) {
    const {item} = props;

    const [isvisible, SetIsvisible] = useState(true);
  
  const showDrawer = () => {
    SetIsvisible(true);
  };

  const onClose = () => {
    SetIsvisible(false);
  };

  const validationShema = yup.object().shape({


  })
  const dispatch = useDispatch();
  const HandleSubmitData = async (data) => {
      console.log('valuesFormvaluesForm',data);
      const formData = new FormData();
      formData.append('jobTitle', data.jobTitle);
      formData.append('staffType', data.staffType);
      formData.append('companyName', data.companyName);
      formData.append('FromTime', data.fromTime);
      formData.append('ToTime', data.toTime);
      formData.append('Description', data.description);
      formData.append('RecID', item.recID);
      const result = await WorkProcessAPI.post(formData);
      const action = GetWorkProcess();
      const execaction = await dispatch(action);
      MyToaStrSuccess('Thêm mới thành công');
  }
  const itemOrdinal =  item == null ? {
    jobTitle: '',
    staffType: '',
    companyName: '',
    fromTime: '2020-01-01',
    toTime: '2020-01-01',
    description:''

  } : {
    jobTitle: item.jobTitle,
    staffType: item.staffTypeNumber,
    companyName: item.companyName,
    fromTime: item.fromTime,
    toTime: item.toTime,
    description:item.description
  }
  const [initialValues, setinitialValues] = React.useState(itemOrdinal);
    return (
        <div>
          <Formik initialValues={initialValues}
        validationSchema={validationShema}
        enableReinitialize
        onSubmit={values => HandleSubmitData(values)}
      >
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          console.log('value', values);
          return (
            <Drawer
              title="Kinh nghiệm làm việc trước đây"
              width={720}
              onClose={() => onClose()}
              visible={isvisible}
              bodyStyle={{ paddingBottom: 80 }}
              footer={
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
                    Đóng
              </Button>
                  <Button type='submit' onClick={() => HandleSubmitData(values)} type="primary">
                    Lưu
              </Button>
                </div>
              }
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item>
                    {/*  name="name"
                      label=""
                      rules={[{ required: true, message: 'Mời bạn nhập chức danh công việc' }]}
                    >
                      <Input placeholder="Mời bạn nhập chức danh công việc" /> */}
                      <FastField
                                        name="jobTitle"
                                        component={InputField}
                                        label="Chức danh công việc"
                                        placeholder="Mời bạn nhập chức danh công việc"
                                    />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                    <FastField
                                        name="companyName"
                                        component={InputField}
                                        label="Tên công ty"
                                        placeholder="Mời bạn nhập tên công ty"
                                    />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item >
                      <FastField
                                        name="staffType"
                                        component={SelectField}
                                        disabled={false}
                                        label="Loại nhân viên"
                                        placeholder=""
                                        ListName="LoaiHopDong" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                      name="approver"
                      label="Từ ngày đến ngày"
                      rules={[{ required: true, message: 'Please choose the approver' }]}
                    >
                      <div style={{display:'flex'}}>
                      <FastField
                        name="fromTime"
                        component={DatePickers}
                        label=""
                        placeholder=""
                      />
                         <FastField
                        name="toTime"
                        component={DatePickers}
                        label=""
                        placeholder=""
                      />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    {/* <Form.Item
                      name="approver"
                      label="Approver"
                      rules={[{ required: true, message: 'Please choose the approver' }]}
                    >
                      <Select placeholder="Please choose the approver">
                        <Option value="jack">Jack Ma</Option>
                        <Option value="tom">Tom Liu</Option>
                      </Select>
                    </Form.Item> */}
                  </Col>
                  <Col span={12}>
                    
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="description"
                      label="Mô tả thêm"
                      rules={[
                        {
                          required: true,
                          message: 'please enter url description',
                        },
                      ]}
                    >
                      <FastField
                        name="description"
                        component={MyCKEditor}
                        label=""
                        placeholder="Mô tả"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Drawer>
          )
        }}
      </Formik>
        </div>
    )
}

export default WorkProcessForm
