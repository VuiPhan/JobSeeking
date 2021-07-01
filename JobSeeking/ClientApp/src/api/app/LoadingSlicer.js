import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const LoadingSlicer = createSlice({
    name: 'LoadingSlicer',
    initialState: {isLoading:false},
    reducers: {
        UpdateLoading:(state, action) => {
            state.isLoading = action.payload;
            return state;
        },
    }
});
// Export ra các reducer và các action
const { reducer, actions } = LoadingSlicer;
export const { UpdateLoading } = actions;
export default reducer;