
import LoginReducer from 'components/FormLogin/LoginSlice';
import CommentReducer from 'components/ListViewKendo/ListViewKendoSlice';
import JobKendoReducer from 'components/ListViewKendo/ListViewKendo2Slice';
import SearchFieldReducer from 'components/ListViewKendo/ForSearchSlice';
const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    loginInfo: LoginReducer,
    DataComment:CommentReducer,
    JobKendo:JobKendoReducer,
    SearchField:SearchFieldReducer

}
const store = configureStore({
    reducer:rootReducer,

})
export default store;