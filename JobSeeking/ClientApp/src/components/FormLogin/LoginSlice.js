import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import LoginApi from 'api/System/Login';

export const LoginAPIRedux = createAsyncThunk(
    'login/callAPI',
    async data => {
        var response = await LoginApi.get(data);
        return response;
    },
);
if (localStorage.getItem('UserLogin') == "") {
    localStorage.setItem('UserLogin', JSON.stringify({ UserID: "", role: "", Email: "" }));
}
var UserLogin = JSON.parse(localStorage.getItem('UserLogin'));
if (UserLogin == null) {
    UserLogin = { UserLoginDB: '' };
}
const login = createSlice({
    name: 'login',
    initialState: UserLogin,
    reducers: {
        LoginForm: (state, action) => {

        },
        Logout: (state, action) => {
            state = { UserID: "", role: "", Email: "" };
            localStorage.setItem('token', '');
            localStorage.setItem('UserLogin','');
            return state;
        },
    },
    extraReducers: {
        [LoginAPIRedux.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = login;
export const { LoginForm, Logout } = actions;
export default reducer;