import React, { useState } from 'react';

import Select from 'react-select';
import { KyNangOptions, groupedOptions } from './data';
import makeAnimated from 'react-select/animated';
import { Button } from '@material-ui/core';
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
    const [dataKyNangOptions, setKyNangOptions] = useState(KyNangOptions);
    // const selectedOption = options.filter(function (el) {
    //     if(el.value === null || value=== null)
    //     {return;}
    //     return el.value !== null && value.includes(el.value) == true ;
    //   });
    var ChucDanhValue = '';
    var KyNangValue = '';
    const HandleSelectedOptionChange = (selectedOption) => {
      debugger;
      if(selectedOption == null){
        selectedOption.forEach(element => {
          if(element.group === 'Chức danh')
          {
            ChucDanhValue += element.value +',';
          }
          if(element.group === 'Kỹ năng')
          {
            KyNangValue += element.value +',';
          }
          debugger;
        });
      }
      else{
        ChucDanhValue='';
        KyNangValue='';
      }
    

        // const changeEvent = {
        //     target: {
        //         name: name,
        //         value: selectedValue
        //     },
        // }
        // field.onChange(changeEvent);
    }
    const SubmitData = ()=>{
      console.log('ChucDanhValue',ChucDanhValue);
      console.log('KyNangValue',KyNangValue);
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
    // formatGroupLabel={formatGroupLabel}
  />
  <Button onClick={()=> SubmitData()}></Button>
        </div>
    )
}

export default SelectGroup

