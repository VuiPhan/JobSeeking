import TableRecruitment from 'components/TableRecruitment/TableRecruitment'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecruitmentManagerAPI from '../../api/Recruitment/RecruitmentManager';
import { GetListCandidateProcess } from './RecruitmentOfCandidatesSlicer';
function RecruitmentOfCandidatesPage(props) {
    const { JobID } = props;
    const dispatch = useDispatch();
    const lstCandidateOfProcess = useSelector(state => state.ListCandidateOfProcess);
    const SelectedJob = useSelector(state => state.SelectedJobProfile);
    useEffect(() => {
        async function fetchDataView() {
            const action = GetListCandidateProcess(SelectedJob);
            const result = await dispatch(action);
        }
        fetchDataView();
    }, [SelectedJob])
    return (
        <div>
            {lstCandidateOfProcess.map((item, index) => {
                return (<TableRecruitment key={index} dataSource={item}></TableRecruitment>)
            })}

        </div>
    )
}

export default RecruitmentOfCandidatesPage

