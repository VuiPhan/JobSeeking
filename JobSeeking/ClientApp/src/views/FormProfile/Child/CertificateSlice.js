import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CertificateAPI from 'api/JobSeeker/CertificateAPI';

export const GetCertificate = createAsyncThunk(
    'Certificate/callAPI',
    async data => {
        var response = await CertificateAPI.get(data);
        return response;
    },
);
const CertificateSlice = createSlice({
    name: 'Certificate',
    initialState: [],
    reducers: {
        GetCertificateReducers: (state, action) => {

        },
    },
    extraReducers: {
        [GetCertificate.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = CertificateSlice;
export const { GetCertificateReducers } = actions;
export default reducer;