import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CompanyAPI from 'api/Company/CompanyAPI';

export const GetDataCommentRedux = createAsyncThunk(
    'Comment/callAPI',
    async data => {
        var response = await CompanyAPI.getReview(data);
        return response;
    },
);
const DataKendoComment = createSlice({
    name: 'DataKendoComment',
    initialState: [],
    reducers: {
         AddDataComment:async (state, action) => {
           
        },
    },
    extraReducers: {
        [GetDataCommentRedux.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = DataKendoComment;
export const { AddDataComment } = actions;
export default reducer;