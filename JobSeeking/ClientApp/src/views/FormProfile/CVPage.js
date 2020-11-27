import React, { useState } from 'react'
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { Button } from '@material-ui/core';
import OpenForm from 'views/Forms/OpenForm';
import CVAddForm from 'views/Forms/CVAddForm';

function CVPage() {
    
  const initialValuesCV = {
    CVName: '',
    CVFile: null
  };
  const [valuesCV, setValuesCV] = useState(initialValuesCV);

    const HandleCV = e => {
        if (e.target.files && e.target.files[0]) {
          let CVFile = e.target.files[0];
          const reader = new FileReader();
          reader.onload = x => {
            setValuesCV({
              ...valuesCV,
              CVFile: CVFile,
              CVSrc: x.target.result
            })
          };
          reader.readAsDataURL(CVFile);
        }
      }
      const SubmitCV = async ()=>{
    const formData = new FormData();
        formData.append('CVFile', valuesCV.CVFile);
        formData.append('CVName', valuesCV.CVFile.name);
        let result = await SeekerAPI.submitCV(formData);
      }
    return (
        <div>
          
            <OpenForm ComponentForm={CVAddForm}></OpenForm>
        </div>
    )
}

export default CVPage
