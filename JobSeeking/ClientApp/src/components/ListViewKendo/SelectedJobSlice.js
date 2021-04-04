import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const SelectedJobSlice = createSlice({
    name: 'SelectedJob',
    initialState: null,
    reducers: {
        SelectedJob:(state, action) => {
            state = action.payload;
            return state;
        },
    }

});
// Export ra các reducer và các action
const { reducer, actions } = SelectedJobSlice;
export const { SelectedJob } = actions;
export default reducer;