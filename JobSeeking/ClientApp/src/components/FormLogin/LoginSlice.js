import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import LoginApi from 'api/System/Login';

export const someAction = createAsyncThunk(
    'login/callAPI',
    async type => {
        var x = await LoginApi.get(type);
        return x;
    },
    );
  
const login = createSlice({
    name:'login',
    initialState:{UserID:"",Roles:"",Email:""},
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