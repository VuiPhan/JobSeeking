
import LoginReducer from 'components/FormLogin/LoginSlice';
import CommentReducer from 'components/ListViewKendo/ListViewKendoSlice';
import JobKendoReducer from 'components/ListViewKendo/ListViewKendo2Slice';
import SearchFieldReducer from 'components/ListViewKendo/ForSearchSlice';
import WorkProcessReducer from '../../views/FormProfile/Child/WorkProcessSlice';
import EducationReducer from '../../views/FormProfile/Child/EducationSlice';
import CertificateReducer from '../../views/FormProfile/Child/CertificateSlice';
// Chọn công việc trong tuyển dụng
import JobSelected from 'components/RecruitmentManagementPage/RecruitmentSelectSlicer';
// Chọn công việc rồi xem ứng viên đã apply
import SelectedJobProfile from 'components/ListViewKendo/SelectedJobSlice';
// load lại khi thêm mới
import ListRecruitProcessSlice from '../../views/RecruitmentManagement/ListRecruitmentSlicer';
import ListCandidateOfProcessSlice from '../../views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
import ForSearchKeywordSlice from '../../components/KendoSearchKeywork/ForSearchKeywordSlice'
const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    loginInfo: LoginReducer,
    DataComment:CommentReducer,
    JobKendo:JobKendoReducer,
    SearchField:SearchFieldReducer,
    WorkProcess:WorkProcessReducer,
    Education:EducationReducer,
    Certificate:CertificateReducer,
    JobSelected:JobSelected,
    SelectedJobProfile:SelectedJobProfile,
    ListRecruitProcess:ListRecruitProcessSlice,
    ListCandidateOfProcess:ListCandidateOfProcessSlice,
    SearchKeyword:ForSearchKeywordSlice
}
const store = configureStore({
    reducer:rootReducer,

})
export default store;