import React from 'react';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { changeSearchKeyWord } from 'components/KendoSearchKeywork/ForSearchKeywordSlice';
import { useDispatch } from 'react-redux';
// this is re-rendered whenever the relevant parts of the used data stores change
function MySearchBar() {
    const [value, setValue] = useState('');
    const LoginInfo = useSelector(state => state.loginInfo);
    const dispatch = useDispatch();
  const history = useHistory();
    const handleSearch = (value) =>{
        const action = changeSearchKeyWord(value);
        dispatch(action);
        const linkRedired = `/SearchPage`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    return (
        <div>
            <div className="searchbar">
                <SearchBar
                    value={value}
                    onChange={(newValue) =>setValue(newValue)}
                    onRequestSearch={() => handleSearch(value)}
                    placeholder="Tìm kiếm từ khóa ..."
                    autoFocus
                />
                {/* {<LinearProgress />} */}
            </div>
        </div>
    )
}
export default MySearchBar
