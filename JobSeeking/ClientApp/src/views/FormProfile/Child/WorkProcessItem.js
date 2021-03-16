import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './WorkProcessItem.scss';
import { GetWorkProcess } from './WorkProcessSlice';
import { Button } from '@material-ui/core';
import WorkProcessForm from '../Form/WorkProcessForm';
function WorkProcessItemRender(props) {
    var parse = require('html-react-parser')
    console.log('propsprops', props);
    const item = props.item;
    const [isShowForm,setisShowForm] = useState(false);
    const ShowForm = ()=>{
        setisShowForm(true);
    }
    return (
        <div>
            <div className="Container" style={{ backgroundColor: item.backgroundColor }}>
                <div>
                    <div className="cricle__TimeWorking">
                        {parse(item.timeWorking)}
                    </div>
                    <h3>{item.jobTitle}</h3>
                    <h5>{item.companyName}</h5>
                </div>
                <div className="description">
                    {parse(item.description)}
                </div>
                <Button onClick={()=>ShowForm()}>Click</Button>
            </div>
            {isShowForm == true ?<WorkProcessForm item={item}/>:null}
        </div>
    )
}
function WorkProcessItem(props) {
    const dispatch = useDispatch();
    const WorkProcess = useSelector(state => state.WorkProcess);
    console.log('WorkProcessWorkProcess', WorkProcess);
    const fetchDataWorkProcess = async () => {
        const action = GetWorkProcess();
        const result = await dispatch(action);
    };
    useEffect(() => {
        fetchDataWorkProcess();
    }, [])

    return (
        <div>
            {WorkProcess.map((item, i) => {
                return <WorkProcessItemRender item={item}></WorkProcessItemRender>
            })}
        </div>
    )
}

export default WorkProcessItem
