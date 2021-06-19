import React, { useState,useEffect } from 'react';
import 'antd/dist/antd.css';
import { Drawer,Form,  Button, Col, Row } from 'antd';
import MyCKEditor from "components/CKEditor/CKEditor";
import { Formik,Form as FormMikContainer, FastField } from "formik";
import * as yup from 'yup';
import InputField from "components/CustomField/InputField";
import SelectField from 'components/CustomField/SelectField';
import { MyToaStrSuccess,MyToaStrError } from 'components/Toastr/Toastr2';
import { useDispatch } from 'react-redux';
import DatePickers from 'components/DatetimePicker/DatetimePicker';
import EducationAPI from 'api/JobSeeker/EducationAPI';
import { GetEducation } from '../Child/EducationSlice';
import handleGetJson from 'common/ReadJson';
import { IsObjectEmpty } from 'common/CommonFunction';


function EducationForm(props) {
    const {item,UpdateStateShowForm} = props;
    const [isvisible, SetIsvisible] = useState(true);
    const [res, setRes] = React.useState({});
    const itemOrdinal =  item == null ? {
      degreeTraining: 1,
      nameSchool: '',
      fromTime: '2020-01-01',
      toTime: '2020-01-01',
      descriptions:''
  
    } : {
      degreeTraining: item.degreeTraining,
      nameSchool: item.nameSchool,
      fromTime: item.fromTime,
      toTime: item.toTime,
      descriptions:item.descriptions
    }
    const LoadResource = async () => {
      const resource = await handleGetJson("DrawerQualifications", "PersonalPage");
      const resourceCommon = await handleGetJson("Validation", "LanguageInApp");
      const resourceFinal = { ...resource, ...resourceCommon };
      setRes(resourceFinal);
    }
    useEffect(() => {
      LoadResource();
    }, [])
  const showDrawer = () => {
    SetIsvisible(true);
  };

  const onClose = () => {
    SetIsvisible(false);
    UpdateStateShowForm();
  };

  const validationShema = yup.object().shape({
    degreeTraining: yup.string()
    .required(res.TruongBBNhap)
  ,
  nameSchool: yup.string()
  .required(res.TruongBBNhap)
  })
  const dispatch = useDispatch();
  const HandleSubmitData = async (data,errors) => {
    if(IsObjectEmpty(errors) === true ||data.degreeTraining ==="" || data.nameSchool ===""){
      MyToaStrError(res.VuiLongKiemTraLaiThongTin);
      return;
    }
       var recID = 0
       if (typeof item !== 'undefined'){
          recID = item.recID
       }
      const formData = new FormData();
      formData.append('DegreeTraining', data.degreeTraining);
      formData.append('NameSchool', data.nameSchool);
      formData.append('FromTime', data.fromTime);
      formData.append('ToTime', data.toTime);
      formData.append('Descriptions', data.descriptions);
      formData.append('RecID',recID );
      const result = await EducationAPI.post(formData);
      const action = GetEducation();
      const execaction = await dispatch(action);
      MyToaStrSuccess('Cập nhật thành công');
      onClose();
  }

  const [initialValues, setinitialValues] = React.useState(itemOrdinal);
    return (
        <div>
          <Formik initialValues={initialValues}
        validationSchema={validationShema}
        enableReinitialize
       // onSubmit={values => HandleSubmitData(values)}
      >
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
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
                  <Button type='submit' onClick={() => HandleSubmitData(values,errors)} type="primary">
                    Lưu
              </Button>
                </div>
              }
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item>
                      <FastField
                                        name="nameSchool"
                                        component={InputField}
                                        label="Tên trường"
                                        placeholder="Mời bạn nhập tên trường"
                                    />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item >
                      <FastField
                                        name="degreeTraining"
                                        component={SelectField}
                                        disabled={false}
                                        label="Loại bằng"
                                        placeholder=""
                                        ListName="TypeDegree" />
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

export default EducationForm
