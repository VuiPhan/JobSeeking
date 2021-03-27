import React from 'react'
import ListViewKendo_Manage from './ListViewKendo/ListViewKendo_Manage'
import './Typography/RecruitmentManagement.scss';
import RecruitmentManagementPage from '../views/RecruitmentManagement/RecruitmentManagementPage.js';
function RecruitmentManagement() {
  return (
    <div >
      <div className="Recruitment"
      >
        <ListViewKendo_Manage dataID={15}></ListViewKendo_Manage>
        <div className="Recruitment__Page">
        <RecruitmentManagementPage></RecruitmentManagementPage>
        </div>
      </div>
    </div>
  )
}
export default RecruitmentManagement
