
import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import './ComboboxList.css';
import LoadComboboxApi from '../../api/System/LoadCombobox';
var allData = [
   
];

export class ComboBoxList extends React.Component {
    constructor(props){
        super();
        const {ComboboxName,changeCombobox} = props;
        this.state = {ComboboxName:props.ComboboxName,data:[],handleChangeCombobox:changeCombobox}
    }
    async componentDidMount(){
        let dataAPI = await LoadComboboxApi.get(this.state.ComboboxName);
        this.setState({data:dataAPI});
        allData =  dataAPI;
        console.log("data",dataAPI);
    }
    state = {
        data: allData.slice()
    };
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
        console.log('this.setState.value',this.state.value); 
        console.log('',); 
        this.state.handleChangeCombobox(event.target.value);
    }
    filterChange = (event) => {
        this.setState({
            data: this.filterData(event.filter)
        });
    }

    filterData(filter) {
        const data = allData.slice();
        return filterBy(data, filter);
    }

    render() {
        return (
            <div>
                 <ComboBox
                data={this.state.data}
                textField="Name"
                value={this.state.value}
                filterable={true}
                onFilterChange={this.filterChange}
                onChange={this.handleChange}
            />
            </div>
           
        );
    }
}