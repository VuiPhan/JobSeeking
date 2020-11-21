import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const DataKendoJob = createSlice({
    name: 'DataKendoJob',
    initialState: {IsCompanyJob:false},
    reducers: {
         ChooseJob:(state, action) => {
            state = action.payload;
            debugger;
            return state;
        },
    }

});
// Export ra các reducer và các action
const { reducer, actions } = DataKendoJob;
export const { ChooseJob } = actions;
export default reducer;