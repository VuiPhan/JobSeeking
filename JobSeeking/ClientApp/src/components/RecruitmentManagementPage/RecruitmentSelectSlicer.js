import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const JobSelected = createSlice({
    name: 'jobSelected',
    initialState: null,
    reducers: {
         chooseJob:async (state, action) => {
            state = action.payload;
            return state;
        },
    }
});
// Export ra các reducer và các action
const { reducer, actions } = JobSelected;
export const { chooseJob } = actions;
export default reducer;