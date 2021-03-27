import { Button } from '@material-ui/core'
import React from 'react'
import './styleToolbar.scss'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { useHistory, useParams } from 'react-router-dom';

function ToolbarCandidate() {
    const history = useHistory();
    const IsRender = (history.location.pathname).substring(1, 12) =='ProfilePage' ? true : false
    return (
        <div className="Container__Parent">
        <div className="Container__Toolbar">
            <Button className="item__Button" variant="outlined" color="secondary" startIcon={<AssignmentTurnedInIcon/>}>Đưa ứng viên vào vòng tuyển dụng</Button>
            <Button className="item__Button" variant="outlined" color="primary" startIcon={<HowToRegIcon/>}>Ứng viên tiềm năng</Button>
            <Button className="item__Button" variant="outlined" color="default"  startIcon={<PersonAddDisabledIcon/>}>Bỏ qua ứng viên</Button>
        </div>
        </div>
    )
}

export default ToolbarCandidate

