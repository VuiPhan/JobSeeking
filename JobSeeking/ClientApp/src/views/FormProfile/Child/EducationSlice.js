import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import EducationAPI from 'api/JobSeeker/EducationAPI';

export const GetEducation = createAsyncThunk(
    'education/callAPI',
    async data => {
        var response = await EducationAPI.get(data);
        return response;
    },
);
const EducationSlice = createSlice({
    name: 'Education',
    initialState: [],
    reducers: {
        GetEducationReducers: (state, action) => {

        },
    },
    extraReducers: {
        [GetEducation.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = EducationSlice;
export const { GetEducationReducers } = actions;
export default reducer;