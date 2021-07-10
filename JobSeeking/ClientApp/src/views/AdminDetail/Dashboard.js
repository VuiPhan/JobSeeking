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
    const [dataViewCard, setDataViewCard] = useState({ numCandidate: 0, numRecruiter: 0, candidateElect: 0 });
    const dispatch = useDispatch();
    const [dataChart_TinTuyenDung, setDataChart_TinTuyenDung] = useState({});
    const [dataChart_KyNang, setDataChart_KyNang] = useState({});
    const [dataChart_ChucDanh, setDataChart_ChucDanh] = useState({});
    const [dataChart_UngVienVaNhaTuyenDung, setDataChart_UngVienVaNhaTuyenDung] = useState({});
    const [dataChart_LuotThanhToanVaSoTienThanhToan, setDataChart_LuotThanhToanVaSoTienThanhToan] = useState({});

    const getDataForCard = async () => {
        const dataCard = await DashboardPageAPI.getViewCardStatis();
        setDataViewCard(dataCard[0]);
    }
    const getDataForChart = async (fromTime, toTime) => {
        dispatch(UpdateLoading(true));
        const dataChart_TinTuyenDung = await DashboardPageAPI.getViewCardStatis_Chart(fromTime, toTime);
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
            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Tin tuyển dụng theo tháng',
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        position:'bottom',
                        color:'#FFC107',
                        fontSize:20
                    }
                }
            }
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
            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Thông kê công việc theo kỹ năng',
                        padding: {
                            top: 40,
                            bottom: 10
                        },
                        position:'bottom',
                        color:'#FFC107',
                        fontSize:20
                    }
                }
            }
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
                plugins: {
                    title: {
                        display: true,
                        text: 'Thông kê theo chức danh công việc',
                        padding: {
                            top: 40,
                            bottom: 10
                        },
                        position:'bottom',
                        color:'#FFC107',
                        fontSize:20
                    }
                }
            }
        };
        const dataChart_UngVienVaTuyenDung_DataAPI = {
            labels: dataChart_TinTuyenDung[6],
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
            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Thông kê lượt đăng ký theo tháng của ứng viên và nhà tuyển dụng',
                        padding: {
                            top: 10,
                            bottom: 10
                        },
                        position:'bottom',
                        color:'#FFC107',
                        fontSize:20
                    }
                }
            }
        };
        const dataOptions = {
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true,
                        }
                    }],
                    yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true,

                        }
                    }, {
                        type: "linear",
                        display: true,
                        position: "right",
                        id: "y-axis-2",
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true,

                        }
                    }]
                }
            }
        }
        const dataChart_LuotThanhToanVaSoTienThanhToan_DataAPI = {
            labels: dataChart_TinTuyenDung[6],
            datasets: [
                {
                    type: 'line',
                    label: 'Số lượt thanh toán',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    fill: false,
                    data: dataChart_TinTuyenDung[9],
                    backgroundColor: '#FFC107',
                    borderColor: '#FFC107',
                    hoverBackgroundColor: '#FFC107',
                    hoverBorderColor: '#FFC107',
                    yAxisID: 'y-axis-1'
                },
                {
                    type: 'bar',
                    label: 'Doanh thu',
                    backgroundColor: '#FFC1CE',
                    fill: false,
                    data: dataChart_TinTuyenDung[10],
                    yAxisID: 'y-axis-2',
                    borderColor: '#65BEF9',
                    backgroundColor: '#65BEF9',
                    pointBorderColor: '#65BEF9',
                    pointBackgroundColor: '#65BEF9',
                    pointHoverBackgroundColor: '#65BEF9',
                    pointHoverBorderColor: '#65BEF9',

                },

            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Thông kê doanh thu theo tháng',
                        padding: {
                            top: 20,
                            bottom: 10
                        },
                        position:'bottom',
                        color:'#FFC107',
                        fontSize:20
                    }
                }
            }

        };
        setDataChart_TinTuyenDung(dataChart_TinTuyenDung_DataAPI);
        setDataChart_KyNang(dataChart_KyNang_DataAPI);
        setDataChart_ChucDanh(dataChart_ChucDanh_DataAPI);
        setDataChart_UngVienVaNhaTuyenDung(dataChart_UngVienVaTuyenDung_DataAPI);
        setDataChart_LuotThanhToanVaSoTienThanhToan(dataChart_LuotThanhToanVaSoTienThanhToan_DataAPI);
        setTimeout(() => {
            dispatch(UpdateLoading(false));
        }, 1000)
    }
    const initialValues = {
        fromTime: '2021-01-01',
        toTime: '2021-12-31',
    }
    useEffect(() => {
        getDataForCard();
        getDataForChart(initialValues.fromTime, initialValues.toTime);
    }, []);

    const RefreshChart = (values) => {
        getDataForChart(values.fromTime, values.toTime);
    }
    const optionsOfTinTuyenDung = {
        
    }
 
    return (

        <div style={{ marginTop: 85, marginLeft: 29 }}>
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
                                <h3 style={{ paddingLeft: 17 }}>Xem thông kê</h3>

                                <Col span={12} style={{ paddingTop: 5 }}>
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
                                                onClick={() => RefreshChart(values)}
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
                    
                    <Bar data={dataChart_TinTuyenDung} options ={dataChart_TinTuyenDung.options} />
                    <div style={{ marginTop: 50 }}>
                        <Line data={dataChart_UngVienVaNhaTuyenDung} options ={dataChart_UngVienVaNhaTuyenDung.options}  />
                    </div>
                </Col>
                <Col md="4">
                <div style={{ marginTop: 18 }}>
                    <Pie data={dataChart_KyNang}  options ={dataChart_KyNang.options}/>
                    </div>
                    <div style={{ marginTop: 62 }}>
                        <Pie data={dataChart_ChucDanh} options ={dataChart_ChucDanh.options} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <div style={{ marginTop: 50 }}>
                        <Bar data={dataChart_LuotThanhToanVaSoTienThanhToan} options={dataChart_LuotThanhToanVaSoTienThanhToan.options}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
