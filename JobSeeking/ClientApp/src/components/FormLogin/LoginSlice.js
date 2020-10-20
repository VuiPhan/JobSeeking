import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import LoginApi from 'api/System/Login';

export const someAction = createAsyncThunk(
    'login/callAPI',
    async type => {
        var x = await LoginApi.get(type);
        return x;
    },
    );
  
var UserLogin = JSON.parse(localStorage.getItem('UserLogin'));
if(UserLogin == null){
    UserLogin = {UserLoginDB:''};
}
const login = createSlice({
    name:'login',
    initialState:UserLogin,
    reducers:{
        LoginForm: (state,action) =>{
          
        },
        Logout: (state,action) =>{
            state ={UserID:"",Roles:"",Email:""};
            return state;
        },
    },
    extraReducers: {
      [someAction.fulfilled]: (state, action) => {
         state = action.payload;
         return state;
      },
    },

});
// Export ra các reducer và các action
const {reducer,actions} =login;
export const { LoginForm,Logout } = actions;
export default reducer;