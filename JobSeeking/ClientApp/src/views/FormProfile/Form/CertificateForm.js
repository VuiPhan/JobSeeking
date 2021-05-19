import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MyCKEditor from "components/CKEditor/CKEditor";
import { Formik, Form as FormMikContainer, FastField } from "formik";
import * as yup from 'yup';
//import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import InputField from "components/CustomField/InputField";
import SelectField from 'components/CustomField/SelectField';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
//import WorkProcessItem from './Child/WorkProcessItem';
//import { GetWorkProcess } from './Child/WorkProcessSlice';
import { useDispatch } from 'react-redux';
import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { GetWorkProcess } from '../Child/WorkProcessSlice';
import { GetEducation } from '../Child/EducationSlice';
import handleGetJson from 'common/ReadJson';
import CertificateAPI from 'api/JobSeeker/CertificateAPI';
import { GetCertificate } from '../Child/CertificateSlice';

function CertificateForm(props) {
  const { item, UpdateStateShowForm } = props;
  const [isvisible, SetIsvisible] = useState(true);
  const [res, setRes] = React.useState({});

  const LoadResource = async () => {
    const resource = await handleGetJson("DrawerQualifications", "PersonalPage");
    console.log('resourceresource', resource);
    setRes(resource);
  }
  useEffect(() => {
    LoadResource();
  }, [])
  const itemOrdinal = item == null ? {
    certificateName: '',
    degreePlace: '',
    fromTime: '2020-01-01',
    certificateType:1,
    toTime: '2020-01-01',
    descriptions: ''

  } : {
    certificateName: item.certificateName,
    degreePlace: item.degreePlace,
    fromTime: item.fromTime,
    certificateType:item.certificateType,
    toTime: item.toTime,
    descriptions: item.descriptions
  }
  const showDrawer = () => {
    SetIsvisible(true);
  };

  const onClose = () => {
    SetIsvisible(false);
    UpdateStateShowForm();
  };

  const validationShema = yup.object().shape({


  })
  const dispatch = useDispatch();
  const HandleSubmitData = async (data) => {
    var recID = 0
    if (typeof item !== 'undefined') {
      recID = item.recID
    }
    const formData = new FormData();
    formData.append('CertificateName', data.certificateName);
    formData.append('DegreePlace', data.degreePlace);
    formData.append('CertificateType', data.certificateType);
    
    formData.append('FromTime', data.fromTime);
    formData.append('ToTime', data.toTime);
    formData.append('Descriptions', data.descriptions);
    formData.append('RecID', recID);
    const result = await CertificateAPI.post(formData);
    const action = GetCertificate();
    const execaction = await dispatch(action);
    if(recID === 0){
      MyToaStrSuccess('Thêm mới thành công');
    }
    else{
      MyToaStrSuccess('Chỉnh sửa thành công');
    }
    
    onClose();
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
          return (
            <Drawer
              title={res.ThongTinChungChi}
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
                      <FastField
                        name="certificateName"
                        component={InputField}
                        label="Tên chứng chỉ"//{res.TenChungChi}
                        placeholder="Mời bạn nhập tên chứng chỉ"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <FastField
                        name="degreePlace"
                        component={InputField}
                        label="Nơi cấp chứng chỉ"//{res.TenChungChi}
                        placeholder="Mời bạn nhập nơi cấp"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item >
                      <FastField
                        name="certificateType"
                        component={SelectField}
                        disabled={false}
                        label="Loại chứng chỉ"
                        placeholder=""
                        ListName="CertificateType" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="approver"
                      label="Từ ngày đến ngày"
                      rules={[{ required: true, message: 'Please choose the approver' }]}
                    >
                      <div style={{ display: 'flex' }}>
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
                  </Col>
                  <Col span={12}>

                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="descriptions"
                      label="Mô tả thêm"
                      rules={[
                        {
                          required: true,
                          message: 'please enter url description',
                        },
                      ]}
                    >
                      <FastField
                        name="descriptions"
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

export default CertificateForm
