
import React from 'react';
import ReactDOM from 'react-dom';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import './ComboboxList.css';
import LoadComboboxApi from '../../api/System/LoadCombobox';
// export class ComboBoxList extends React.Component {
//     sports = [
//         { text: 'Basketball', id: 1 },
//         { text: 'Football', id: 2 },
//         { text: 'Tennis', id: 3 },
//         { text: 'Volleyball', id: 4 },
//         { text: 'Basketball', id: 5 },
//         { text: 'Football', id: 6 },
//         { text: 'Tennis', id: 7},
//         { text: 'Vui', id: 8 }
//     ];
//     state = {
//         // Since the reference of the initial value is not from the 'sports' collection,
//         // 'dataItemKey' have to be set.
//         value: { text: 'Football', id: 2 }
//     };

//     handleChange = (event) => {
//         this.setState({
//             value: event.target.value
//         });
//     }

//     render() {
//         return (
            
//             <div>
//                 <div className="example-config">
//                     Selected Value: {JSON.stringify(this.state.value)}
//                 </div>
//                 <ComboBox
//                     data={this.sports}
//                     textField="text"
//                     dataItemKey="id"
//                     value={this.state.value}
//                     onChange={this.handleChange}
//                 />
//             </div>
//         );
//     }
// }

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
        //changeCombobox(this.state.value);
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