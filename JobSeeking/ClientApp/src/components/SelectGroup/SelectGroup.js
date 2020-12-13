import React, { useState } from 'react';

import Select from 'react-select';
import { KyNangOptions, groupedOptions } from './data';
import makeAnimated from 'react-select/animated';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import CommonAPI from 'api/System/CommonAPI';
import { useEffect } from 'react';
import { changeSearch } from 'components/ListViewKendo/ForSearchSlice';
import { useDispatch } from 'react-redux';
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};
const animatedComponents = makeAnimated();
const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
function SelectGroup(props) {
  // const { field, lable, placeholder, disabled,label,ListName } = props;
  // const { name,value } = field;
  const [options, setoptions] = useState(groupedOptions);
  const history = useHistory();
  const HandleRedirectPage = (id) => {
    const linkRedired = `/Company/${id}`;
    history.push(linkRedired);
    window.scrollTo(0, 450);
  }
  useEffect(() => {
    async function fetchDataView() {
      const result = await CommonAPI.getListSearch();
      setoptions([...options, { ...options[0], options: result[0] }
        , { ...options[1], options: result[1] }, { ...options[2], options: result[2] }])
    }
    fetchDataView();
  }, []);
  var ChucDanhValue = '';
  var KyNangValue = '';
  const HandleSelectedOptionChange = (selectedOption) => {
    ChucDanhValue = '';
    KyNangValue = '';
    if (selectedOption !== null) {
      selectedOption.forEach(element => {
        if (element.value.slice(-2) === 'JT') {
          ChucDanhValue += element.value.substring(0, element.value.length - 2) + ',';
        }
        if (element.value.slice(-2) === 'JS') {
          KyNangValue += element.value.substring(0, element.value.length - 2) + ',';
        }
        if (element.value.slice(-2) === 'CP') {
          HandleRedirectPage(element.value.substring(0, element.value.length - 2));
        }
      });
    }
    else {
      ChucDanhValue = '';
      KyNangValue = '';
    }
  }
  const dispatch = useDispatch();
  const HandleRedirectPageTag = () => {
    const dataSearch = { ChucDanhValue: ChucDanhValue, KyNangValue: KyNangValue };
    const action = changeSearch(dataSearch);
    dispatch(action);
    if (history.location.pathname === '/Tag') {
      // const action = changeSearch(dataSearch);
      // dispatch(action);
      return;
    }
    const linkRedired = `/Tag`;
    history.push(linkRedired);
    window.scrollTo(0, 150);

  }
  return (
    <div>
      <Select
        // defaultValue={KyNangOptions[1]}
        // value={selectedOption}
        onChange={HandleSelectedOptionChange}
        options={options}
        components={animatedComponents}
        isMulti
        placeholder="Tìm kiếm theo kỹ năng, chức vụ, công ty"
      // formatGroupLabel={formatGroupLabel}
      />
      <Button startIcon={<SearchIcon />} style={{ float: 'right', marginTop: 20 }} onClick={() => HandleRedirectPageTag()} variant="outlined" color="primary">Tìm kiếm việc làm liên quan</Button>
    </div>
  )
}

export default SelectGroup

