import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import VocabularyApi from '../api/vocabularyApi';
import LoadQuestionApi from '../api/loadQuestion';
import ErrorRadios from './RadioButtonUI/RadioButtonUI';
import MultipleSelect from './MultipleSelect/MultipleSelect';
import './LoadQuestion.scss';
import { Button } from '@material-ui/core';
import Example from './Notification/Notification';
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function LoadQuestion(props) {
  const [question, setquestion] = useState({});
  const [recID, setrecID] = useState(1);
  const [questionItem, setquestionItem] = useState({RecID:0,Vocabulary:"",Means:"",Question1:"",Question2:"",Question3:"",Question4:""});
  const [ListSelectValue, setListSelectValue] = useState([]);
  const [ListSelectValueDay, setListSelectValueDay] = useState([]);
  useEffect(() => {
    fetchProductList2();
   
  }, [])

  const fetchProductList2 = async () =>{
    try{
      const  dataFileter = {id:recID, Week: ListSelectValue,Day:ListSelectValueDay};
      const response = await LoadQuestionApi.GetDataFromFilter(dataFileter);
      //const response = await LoadQuestionApi.get(recID);
      let arrayItem = [response.Means,response.Question1,response.Question2,response.Question3];
      let ArrayNew = shuffle(arrayItem);
      setquestionItem({RecID:response.RecID,Vocabulary:response.Vocabulary,Means:response.Means,Question1:arrayItem[0],Question2:arrayItem[1],Question3:arrayItem[2],Question4:arrayItem[3]});
      setquestion(response);
  }
  catch (error){
     console.error();
  }
 }
  const getNextDatabyID = ()=>{
    setrecID(recID+1);
    fetchProductList2();
  }
  const getBackDatabyID = ()=>{
    setrecID(recID-1);
    fetchProductList2();
  }
 const ChangeSelect = (event)=>{
        debugger;
        setListSelectValue(event.target.value);
    }
    const ChangeSelectDay = (event)=>{
      setListSelectValueDay(event.target.value);

    }
  return (
    <div>
        <Example Type="success"></Example>
        <div className="displayFlex">
        <MultipleSelect label="Chọn tuần học" ListSelect={ChangeSelect} nameValueList="TuanHoc"></MultipleSelect>
        <MultipleSelect label="Chọn ngày học" ListSelect={ChangeSelectDay} nameValueList="NgayTrongTuan"></MultipleSelect>
        <Button variant="outlined" color="secondary" onClick={fetchProductList2}>Lọc dữ liệu</Button>
        </div>
      <ErrorRadios question={questionItem} handleBack={getBackDatabyID} handleNext={getNextDatabyID}></ErrorRadios>
      
    </div>
  )
}

LoadQuestion.propTypes = {

}

export default LoadQuestion

