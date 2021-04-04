import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { useSelector } from 'react-redux';

export const GetListRecruitProcess = createAsyncThunk(
    'ListRecruitProcess/callAPI',
    async data => {
   //     const SelectedJob = useSelector(state => state.SelectedJobProfile);
        const result = await RecruitmentManagerAPI.GetRoundRecruit(data);
        return result;
    },
);
const ListRecruitProcessSlice = createSlice({
    name: 'ListRecruitProcess',
    initialState: [],
    reducers: {
        ListRecruitProcess: (state, action) => {

        },
    },
    extraReducers: {
        [GetListRecruitProcess.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = ListRecruitProcessSlice;
export const { ListRecruitProcess } = actions;
export default reducer;