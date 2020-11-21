
import LoginReducer from 'components/FormLogin/LoginSlice';
import CommentReducer from 'components/ListViewKendo/ListViewKendoSlice';
import JobKendoReducer from 'components/ListViewKendo/ListViewKendo2Slice';
const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    loginInfo: LoginReducer,
    DataComment:CommentReducer,
    JobKendo:JobKendoReducer,

}
const store = configureStore({
    reducer:rootReducer,

})
export default store;