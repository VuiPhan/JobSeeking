import React from 'react'
import ListViewKendo_Manage from '../ListViewKendo/ListViewKendo_Manage'
import './RecruitmentManagement.scss';
import RecruitmentManagementPage from '../../views/RecruitmentManagement/RecruitmentManagementPage.js';
import { useSelector } from 'react-redux';
function RecruitmentManagement() {
  const LoginInfo = useSelector(state => state.loginInfo);

  return (
    <div className="Recruitment_Container">
      <div className="Recruitment">
        <ListViewKendo_Manage dataID={LoginInfo.companyID}></ListViewKendo_Manage>
        </div>
        <div className="Recruitment__Page">
        <RecruitmentManagementPage entPage></RecruitmentManagementPage>
        </div>
    </div>
  )
}
export default RecruitmentManagement
