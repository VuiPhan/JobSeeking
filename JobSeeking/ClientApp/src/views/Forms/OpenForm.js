import { Button } from '@material-ui/core'
import React from 'react'

function OpenForm(props) {
    const{ComponentForm} = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    return (
        <div>
            <Button type="submit" variant="outlined" color="secondary" onClick={()=>{handleClickOpen()}}>Thêm mới CV</Button>
            <ComponentForm isOpen={open} handleClose={handleClickOpen}></ComponentForm>
        </div>
    )
}

export default OpenForm
