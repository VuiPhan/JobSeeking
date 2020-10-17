
import LoginReducer from 'components/FormLogin/LoginSlice';
const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    loginInfo: LoginReducer
}
const store = configureStore({
    reducer:rootReducer,
})
export default store;