import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { useSelector } from 'react-redux';

export const GetListCandidateProcess = createAsyncThunk(
    'ListCandidateOfProcess/callAPI',
    async data => {
   //     const SelectedJob = useSelector(state => state.SelectedJobProfile);
        debugger;
        const result = await RecruitmentManagerAPI.GetCandidateOfRoundRecruit(data);
        return result;
    },
);
const ListCandidateOfProcessSlice = createSlice({
    name: 'ListCandidateOfProcess',
    initialState: [],
    reducers: {
        ListCandidateOfProcess: (state, action) => {

        },
    },
    extraReducers: {
        [GetListCandidateProcess.fulfilled]: (state, action) => {
            state = action.payload;
            return state;
        },
    },

});
// Export ra các reducer và các action
const { reducer, actions } = ListCandidateOfProcessSlice;
export const { ListCandidateOfProcess } = actions;
export default reducer;