import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const ForSearchKeywordSlice = createSlice({
    name: 'SearchKeywordField',
    initialState: '',
    reducers: {
        changeSearchKeyWord:(state, action) => {
            state = action.payload;
            return state;
        },
    }

});
// Export ra các reducer và các action
const { reducer, actions } = ForSearchKeywordSlice;
export const { changeSearchKeyWord } = actions;
export default reducer;