import React, { useState } from 'react'
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { Button } from 'reactstrap';

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
        let result = await SeekerAPI.post(formData);
      }
    return (
        <div>
            <a href='https://localhost:44351/api/Download' download target="_blank">Click to download</a>


            <label htmlFor="myInputCV" style={{ position: 'absolute', marginTop: 31, marginLeft: -26, color: 'black' }}>
                <LinkedCameraIcon style={{ fontSize: 30, cursor: 'pointer' }} />
            </label>
            <input
                id="myInputCV"
                style={{ display: 'none' }}
                type={"file"}
                onChange={HandleCV}
            />
            <Button type="submit" variant="outlined" color="secondary" onClick={()=>{}}>Thêm mới CV</Button>
        </div>
    )
}

export default CVPage
