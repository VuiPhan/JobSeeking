import React,{useState,useEffect} from 'react'
import { TextField, Collapse, Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css';
import { Form,Col,Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import jsonData from '../../assets/language/PersonalPage.json'
import "react-datepicker/dist/react-datepicker.css";
import handleGetJson from '../../common/ReadJson';
import DatePickers from '../../components/DatetimePicker/DatetimePicker';
import ComboBox from '../../components/Combobox/Combobox';
import ControllableStates from '../../components/Combobox/ComboboxController';
import ComboboxKendo, { ComboBoxList } from '../../components/Kendo/Combobox';
import loadInfomation from '../../api/UTE_Applicant/Infomation';
function PersonalInformation() {
    const [FullName,setFullName] = useState('Vui nè');
    const [birthday,setbirthday] = useState();
    const [gmail,setgmail] = useState();
    const [phoneNumber,setphoneNumber] = useState();
    const [gender,setgender] = useState({});
    // Chi cho load lan dau
    const Content = handleGetJson("PersonPage");
    const submitData = () => {
        let InfomationPerson = {
            FullName:FullName,
            BirthDay:birthday,
            PhoneNumber:phoneNumber,
            _GenderID:gender,
            Gmail:gmail
        }
        alert(JSON.stringify(InfomationPerson));
        loadInfomation.post(InfomationPerson);
    }
    const ChangeInputDate = (event) =>{
          setbirthday(event.target.value);
    }
    const changeFullName = (event) =>{
        setFullName(event.target.value);
    }
    const changePhoneNumber = (event) =>{
        setphoneNumber(event.target.value);
    }
    const changeGmail = (event) =>{
        setgmail(event.target.value);
    }
    const changeComboboxGender = (data) =>{
        debugger;
        if(data){
            setgender(data.ID);
        }
    }
    return (
        <div>
            <Form>

                <Form.Group as={Row} controlId="">
                    <Form.Label column sm="2">{Content.MaNhanVien}</Form.Label>
                    <Col sm="5"><Form.Control plaintext readOnly defaultValue="email@example.com" /></Col>
                </Form.Group>

                <Form.Group as={Row} controlId="">
                    <Form.Label column sm="2">
                    {Content.HoTen}
                </Form.Label>
                    <Col sm="5">
                        <Form.Control value={FullName} onChange={changeFullName} type="text" placeholder={Content.HoTen} />
                    </Col>
                    <Form.Label column sm="2">
                    {Content.GioiTinh}
                </Form.Label>
                    <Col sm="3">
                        {/* <Form.Control type="text" placeholder="Giới tính" /> */}
                        <ComboBoxList changeCombobox={changeComboboxGender} ComboboxName="UTELS_GetGender"></ComboBoxList>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="">
                    <Form.Label column sm="2">
                       {Content.DiaChiEmail}
                </Form.Label>
                    <Col sm="5">
                        <Form.Control type="text" value={gmail} onChange={changeGmail} placeholder= {Content.DiaChiEmail} />
                    </Col>
                    <Form.Label column sm="2">
                        {Content.NgaySinh}
                </Form.Label>
                    <Col sm="3">
                        <DatePickers ChangeInputDate={ChangeInputDate}></DatePickers>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="">
                    <Form.Label column sm="2">
                       {Content.SDT}
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" value={phoneNumber} onChange={changePhoneNumber} placeholder= {Content.SDT} />
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                       {Content.TrinhDoHV}
                </Form.Label>
                    <Col sm="8">
                        <ComboBoxList></ComboBoxList>
                    </Col>
                </Form.Group> */}
                <Button onClick={submitData} variant="outlined" color="secondary">{Content.LuuDuLieu}</Button>
            </Form>
        </div>
    )
}
export default PersonalInformation
