import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const ForSearchSlice = createSlice({
    name: 'SearchField',
    initialState: {ChucDanhValue:'',KyNangValue:'',NameValue:'',LocationValue:''},
    reducers: {
         changeSearch:(state, action) => {
             debugger;
            state = action.payload;
            return state;
        },
    }

});
// Export ra các reducer và các action
const { reducer, actions } = ForSearchSlice;
export const { changeSearch } = actions;
export default reducer;