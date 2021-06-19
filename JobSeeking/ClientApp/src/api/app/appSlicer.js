import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const AppSlice = createSlice({
    name: 'AppSlice',
    initialState: {isOwnProfile:false},
    reducers: {
        CheckIsOwnProfile:(state, action) => {
            state.isOwnProfile = action.payload;
            return state;
        },
    }
});
// Export ra các reducer và các action
const { reducer, actions } = AppSlice;
export const { CheckIsOwnProfile } = actions;
export default reducer;