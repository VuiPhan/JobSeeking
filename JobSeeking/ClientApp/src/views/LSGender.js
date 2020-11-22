import React,{useState,useEffect} from 'react';
import loadGender from '../api/UTELS/loadGender';
import ListMaster from '../components/ListMaster/ListMaster';
import Header from '../components/Header/Header';
function LSGender(props) {
    const [genderList, setGenderList] = useState([]);
    const { ...rest } = props;
    const fetchGenderList = async () =>{
        try{
           let responseUpdate = await loadGender.getAll();
           setGenderList(responseUpdate);
        }
        catch (error){
            console.error();
        }
    }
    // Chi cho load lan dau
    useEffect(() => {
        fetchGenderList();
        }, [])
    return (
        <div>
           <Header brand="Job Seeking"></Header>
           <ListMaster data = {genderList} ></ListMaster>
        </div>
    )
}
export default LSGender
