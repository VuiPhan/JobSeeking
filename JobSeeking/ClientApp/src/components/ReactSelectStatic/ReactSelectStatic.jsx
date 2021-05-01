import React, { Component } from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

const options = [
  { value: '@TenUngVien', label: 'Tên ứng viên' },
  { value: '@TenCongTy', label: 'Tên công ty' },
  { value: '@TenCongViec', label: 'Tên công việc' },
  { value: '@VongPhongVanHienTai', label: 'Tên vòng phỏng vấn hiện tại' },
  { value: '@VongPhongVanTiepTheo', label: 'Tên vòng phỏng vấn tiếp theo' },
  { value: '@NgayPhongVanVongTiepTheo', label: 'Ngày phỏng vấn tiếp theo' },
  { value: '@NoiDungPVHienTai', label: 'Nội dung phỏng vấn của vòng hiện tại' },
  { value: '@NoiDungPVVongTiepTheo', label: 'Nội dung phỏng vấn của vòng tiếp theo' },
  { value: '@DiaChiCongTy', label: 'Địa chỉ công ty' },
]
function ReactSelectStatic(props) {
    const {initialValues,setinitialValues,label} = props;
    const HandleChangeOptions = (selectedOption) =>{
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
        const AddValueOfConfig = initialValues.contentOfEmail+`<p className="inline_text">${selectedValue}</p>`;
        setinitialValues({...initialValues,contentOfEmail:AddValueOfConfig})
        console.log('AddValueOfConfig',AddValueOfConfig);
        console.log('initialValues',initialValues);
    }
    return (
        <div>
             <FormGroup>
             {label && <Label for={label}>{label}</Label>}
            <Select options={options}
            onChange={HandleChangeOptions}
            />
       </FormGroup>
        </div>
    )
}

export default ReactSelectStatic