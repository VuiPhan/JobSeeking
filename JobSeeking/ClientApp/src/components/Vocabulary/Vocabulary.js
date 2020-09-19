import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import EnhancedTable from '../TableMaterialUI/MaterialUI';
import LoadVocabulary from '../../api/loadVocabulary';
import './Vocabulary.scss';
import MultilineTextFields from '../TextField/TextNormal';
import { Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import VocabularyApi from '../../api/vocabularyApi';
import MultipleSelect from '../MultipleSelect/MultipleSelect';

function Vocabulary(props) {
    const [vocabularyList, setVocabularyList] = useState([]);
    const headCells = [
        { id: 'RecID',width: "3px", numeric: false, disablePadding: true, label: 'Số thứ tự' },
        { id: 'Vocabulary1',width: "10px", numeric: true, disablePadding: false, label: 'Từ' },
        { id: 'Means',width: "10px", numeric: true, disablePadding: false, label: 'Nghĩa' },
        { id: 'MeansMultiple',width: "10px", numeric: true, disablePadding: false, label: 'Từ loại' },
      ];
      const fetchProductList = async () =>{
        try{
            debugger;
           let responseUpdate = await LoadVocabulary.getAll();
            setVocabularyList(responseUpdate);
        }
        catch (error){
            console.error();
        }
    }
    useEffect(() => {
        fetchProductList();
      }, [])
    const handleSubmitData = (e) => {
        e.preventDefault();
        const obj = {Vocabulary1:vocabularyText,Means:meanText};
        VocabularyApi.post(obj);
        fetchProductList();
    }
    const [vocabularyText, setVocabularyText] = useState('');
    const [meanText, setMeanText] = useState('');
    const [ListSelectValue, setListSelectValue] = useState([]);
    const ChangeTextVocabulary = (event)=>{
        setVocabularyText(event.target.value);
    }
    const ChangeTextMean = (event)=>{
        setMeanText(event.target.value);
    }
    const ChangeSelect = (event)=>{
        debugger;
        setListSelectValue(event.target.value);
    }
    return (
        <div className="table_center">
            <EnhancedTable data = {vocabularyList} title="List of vocabulary" headCells={headCells}></EnhancedTable>
            <div>
                {/* <Form onSubmit={handleSubmitData}>  */}
                    <MultilineTextFields labelText="Vocabulary" dataText={vocabularyText} ChangeText = {ChangeTextVocabulary} ></MultilineTextFields>
                    <MultilineTextFields labelText="Means" dataText={meanText} ChangeText = {ChangeTextMean}></MultilineTextFields>
                    <MultipleSelect label="Từ loại" ListSelect={ChangeSelect} nameValueList ="TuLoai"></MultipleSelect>
                    <MultipleSelect label="Thứ trong tuần" nameValueList ="NgayTrongTuan"></MultipleSelect>
                    <Button type="button" onClick={handleSubmitData}>Submit Data</Button>
                {/* </Form> */}
            </div>
        </div>
    )
}

Vocabulary.propTypes = {

}

export default Vocabulary

