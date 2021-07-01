import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import { Bar, Line, Pie } from 'react-chartjs-2'
import DashboardPageAPI from 'api/AdminPage/DashboardPageAPI';
import { FastField, Formik } from 'formik';
import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Form } from 'antd';
import { Button } from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached';
import { useDispatch } from 'react-redux';
import { UpdateLoading } from 'api/app/LoadingSlicer';
function Dashboard() {
    const [dataLineChart, setDataLineChart] = useState({});
    const [dataViewCard,setDataViewCard] = useState({numCandidate:0,numRecruiter:0,candidateElect:0});
    const dispatch = useDispatch();
    const [dataChart_TinTuyenDung,setDataChart_TinTuyenDung] = useState({});
    const [dataChart_KyNang,setDataChart_KyNang] = useState({});
    const [dataChart_ChucDanh,setDataChart_ChucDanh] = useState({});
    const [dataChart_UngVienVaNhaTuyenDung,setDataChart_UngVienVaNhaTuyenDung] = useState({});
    
    const getDataForCard = async () =>{
        const dataCard = await DashboardPageAPI.getViewCardStatis();
        setDataViewCard(dataCard[0]);
    }
    const getDataForChart = async (fromTime,toTime) =>{
        dispatch(UpdateLoading(true));
        const dataChart_TinTuyenDung = await DashboardPageAPI.getViewCardStatis_Chart(fromTime,toTime);
        const dataChart_TinTuyenDung_DataAPI = {
            labels: dataChart_TinTuyenDung[0],
            datasets: [
                {
                    label: "Tin tuyển dụng",
                    data: dataChart_TinTuyenDung[1],
                    fill: true,
                    // backgroundColor: "rgba(75,192,192,0.2)",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: "rgba(75,192,192,1)"
                }
            ]
        };
        const dataChart_KyNang_DataAPI = {
            labels: dataChart_TinTuyenDung[2],
            datasets: [
                {
                    label: "Tin tuyển dụng",
                    data: dataChart_TinTuyenDung[3],
                    fill: true,
                    // backgroundColor: "rgba(75,192,192,0.2)",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: "rgba(75,192,192,1)"
                }
            ]
        };
        const dataChart_ChucDanh_DataAPI = {
            labels: dataChart_TinTuyenDung[4],
            datasets: [
                {
                    label: "Tin tuyển dụng",
                    data: dataChart_TinTuyenDung[5],
                    fill: true,
                    // backgroundColor: "rgba(75,192,192,0.2)",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: "rgba(75,192,192,1)"
                }
            ],
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
        };
        const dataChart_UngVienVaTuyenDung_DataAPI = {
            labels:dataChart_TinTuyenDung[6],
            datasets: [
                {
    
                    label: "Ứng viên",
                    data: dataChart_TinTuyenDung[7],
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: "Nhà tuyển dụng",
                    data: dataChart_TinTuyenDung[8],
                    fill: false,
                    borderColor: "#742774"
                }
            ]
        };
        setDataChart_TinTuyenDung(dataChart_TinTuyenDung_DataAPI);
        setDataChart_KyNang(dataChart_KyNang_DataAPI);
        setDataChart_ChucDanh(dataChart_ChucDanh_DataAPI);
        setDataChart_UngVienVaNhaTuyenDung(dataChart_UngVienVaTuyenDung_DataAPI);
        setTimeout(() => {
            dispatch(UpdateLoading(false));
          }, 1000)
    }
    const initialValues = {
        fromTime:'2021-01-01',
        toTime:'2021-12-31',
    }
    useEffect(() => {
        getDataForCard();
        getDataForChart(initialValues.fromTime,initialValues.toTime);
    }, []);
  
    const RefreshChart = (values) =>{
        getDataForChart(values.fromTime,values.toTime);
    }
    return (
        
        <div style={{ marginTop: 85,marginLeft:29 }}>
         <Formik 
        initialValues={initialValues}
        //validationSchema={}
        enableReinitialize
        //onSubmit={values => HandleSubmitData(values)}
      >
           {FormikProps => {
               const { values, errors, touched } = FormikProps;
               return (
                   <div>
                <Row>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-globe text-warning" />
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Nhà tuyển dụng</p>
                                        <CardTitle tag="p">{dataViewCard.numRecruiter}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            <div className="stats">
                                <i className="fas fa-sync-alt" /> Số nhà tuyển dụng
                </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-money-coins text-success" />
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Ứng viên</p>
                                        <CardTitle tag="p">{dataViewCard.numCandidate}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            <div className="stats">
                                <i className="far fa-calendar" /> Số ứng viên trong hệ thống
                </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-vector text-danger" />
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Tiềm năng</p>
                                        <CardTitle tag="p">{dataViewCard.appPotential}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            <div className="stats">
                                <i className="far fa-clock" /> Số ứng viên tiềm năng
                </div>
                        </CardFooter>
                    </Card>
                </Col>
                <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                        <CardBody>
                            <Row>
                                <Col md="4" xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-favourite-28 text-primary" />
                                    </div>
                                </Col>
                                <Col md="8" xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Trúng tuyển</p>
                                        <CardTitle tag="p">{dataViewCard.candidateElect}</CardTitle>
                                        <p />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            <div className="stats">
                                <i className="fas fa-sync-alt" /> Số lượt ứng viên trúng tuyển
                </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Row>
                <h3 style={{paddingLeft:17}}>Xem thông kê</h3>
   
                <Col span={12} style={{paddingTop:5}}>
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
                        <Button type='submit'
                        style={{ float: 'right' }} variant="outlined"
                         startIcon={<CachedIcon />} color="secondary"
                         onClick = {() => RefreshChart(values)}
                                                    >Xem</Button>
                      </div>
                    </Form.Item>
                  </Col>
        
            </Row>
            </div>
               )
            }}
          </Formik>
          <Row>
          <Col md="8">
                    <Bar data={dataChart_TinTuyenDung} />
                    <div style={{marginTop:50}}>
                    <Line data={dataChart_UngVienVaNhaTuyenDung} />
                    </div>
                </Col>
                <Col md="4">
                <Pie data={dataChart_KyNang} />
                <div style={{marginTop:70}}>
                <Pie data={dataChart_ChucDanh} />
                </div>
                </Col>
          </Row>

        </div>
    )
}

export default Dashboard
