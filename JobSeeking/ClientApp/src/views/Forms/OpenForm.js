import { Button } from '@material-ui/core'
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ListCV from './ListCV';

function OpenForm(props) {
    const { ComponentForm } = props;
    const [open, setOpen] = React.useState(false);
    const LoginInfo = useSelector(state => state.loginInfo);
    const datainitialValuesCV = {
        pathCV: 'Mời bạn chọn CV',
        jobTitleID: 1,
        CVFile: null,
        description: 'Việc làm'
    };
    const [initialValuesCV, setinitialValuesCV] = React.useState(datainitialValuesCV);
    const [listCV, setlistCV] = React.useState([{ RecID: 1, JobTitleName: "DEV-WEB-C#" }]);
    async function fetchData() {
        const result = await SeekerAPI.getListCV(1);
        setlistCV(result);
    }
    useEffect(() => {
        fetchData();
    }, [])
    
    const handleClickOpen = (values) => {
        setOpen(!open);
        if(values===0){
            setinitialValuesCV(datainitialValuesCV);
            return;
        }
        
        if (Number.isInteger(values)) {
            setinitialValuesCV(listCV.find(data => data.recID === values));
        }

    };
    const HandleCV = e => {
        if (e.target.files[0].size > 150625) {
            debugger;
            alert("Dung lượng file quá lớn, bạn vui lòng chọn CV kích cỡ nhở hơn 100KB!");
            return;
        };

        if (e.target.files && e.target.files[0]) {
            let CVFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {

                setinitialValuesCV({
                    ...initialValuesCV,
                    CVFile: CVFile,
                    CVSrc: x.target.result,
                    pathCV: CVFile.name
                })
            };
            
            reader.readAsDataURL(CVFile);
        }
    }
    return (
        <div>
            <Button type="submit" variant="outlined" color="secondary" onClick={() => { handleClickOpen(0) }}>Thêm mới CV</Button>
            <ComponentForm refreshData={fetchData} HandleCV={HandleCV} isOpen={open} handleClose={handleClickOpen} initialValuesCV={initialValuesCV}></ComponentForm>
            <ListCV handleClose={handleClickOpen} data={listCV}></ListCV>
        </div>
    )
}

export default OpenForm
