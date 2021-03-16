import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WorkProcessAPI from 'api/JobSeeker/WorkProcessAPI';

export const GetWorkProcess = createAsyncThunk(
    'workProcess/callAPI',
    async data => {
        debugger;
        var response = await WorkProcessAPI.get();
        return response;
    },
);
const WorkProcessSlice = createSlice({
    name: 'WorkProcess',
    initialState: [],
    reducers: {
        GetWorkProcessReducers: (state, action) => {

        },
    },
    extraReducers: {
        [GetWorkProcess.fulfilled]: (state, action) => {
            state = action.payload;
            debugger;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = WorkProcessSlice;
export const { GetWorkProcessReducers } = actions;
export default reducer;