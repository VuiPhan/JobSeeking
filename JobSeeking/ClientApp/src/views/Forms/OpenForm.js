import { Button } from '@material-ui/core'
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import MyToastr from 'components/Toastr/Toastr';
import { MyToaStr2, MyToaStr3 } from 'components/Toastr/Toastr2';
import React, { useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert';
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
        debugger;
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
    const deleteCV = (values) => {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn muốn xóa CV này ra khỏi hồ sơ của bạn?',
            buttons: [
              {
                label: 'Xóa',
                onClick:async () => {
                    if (Number.isInteger(values)) {
                        debugger;
                        let objDelete =  (listCV.find(data => data.recID === values));
                        const formData = new FormData();
                        formData.append('RecId', objDelete.recID);
                        formData.append('PathCV', objDelete.pathCV);
                        await SeekerAPI.deleteCV(formData);
                        MyToaStr3('Bạn đã gỡ CV thành công!');
                        fetchData();
                    }
                    
                }
              },
              {
                label: 'Đóng',
                onClick: () => {}
              }
            ]
          });
          
    };
    const HandleCV = e => {
        if (e.target.files[0].size > 150625) {
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
            <MyToastr></MyToastr>
            <Button type="submit" variant="outlined" color="secondary" onClick={() => { handleClickOpen(0) }}>Thêm mới CV</Button>
            <ComponentForm refreshData={fetchData} HandleCV={HandleCV} isOpen={open} FClose={setOpen} handleClose={handleClickOpen} initialValuesCV={initialValuesCV}></ComponentForm>
            <ListCV handleClose={handleClickOpen} deleteCV={deleteCV} data={listCV}></ListCV>
        </div>
    )
}

export default OpenForm
