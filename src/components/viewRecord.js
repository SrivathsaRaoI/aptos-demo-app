import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import axios from 'axios';
import {baseURL} from '../Config';

const columns = [{
  dataField: 'orderid',
  text: 'Order ID',
  sort: true,
  
}, {
  dataField: 'itemname',
  text: 'Item Name',
  sort: true
}, {
  dataField: 'quantity',
  text: 'Quantity',
  sort: true
}, {
  dataField: 'status',
  text: 'Status',
  sort: true
}, {
  dataField: 'expectedDOD',
  text: 'Expected DOD',
  sort: true,
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
  },
  editor: {
    type: Type.DATE
  }
}];

const data=[{"orderid": 1,
              "itemname": "Nokia 6.1",
              "quantity": 1,
              "status": "Shipped",
              "expectedDOD": "10/18/2018"},
            {"orderid": 2,
              "itemname": "Skull Candy Ear Phone",
              "quantity": 1,
              "status": "Shipped",
              "expectedDOD": "10/18/2018"},
            {"orderid": 3,
              "itemname": "RAZOR Abyss",
              "quantity": 1,
              "status": "Shipped",
              "expectedDOD": "10/18/2018"}];

const { ExportCSVButton } = CSVExport;

const CaptionElement = () => 
        <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'blue', border: '1px solid blue', padding: '0.5em' }}>
            Order Summary
        </h3>;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

class View extends Component {
     constructor(){
        super();
        this.state = {
            data:data,
            isLoding:true
        }
       
    }
    componentWillMount(){
        axios.post(baseURL+"/find", 
                        { user_id: this.props.userId }
                       ).then( (response)=> {
                                console.log(response);
                                this.setState({data: response.data,
                                               isLoding:false});
                        }).catch((error)=> {
                            console.log(error);
                            this.setState({isLoding:false});
                        });
    }
    render() {
        return (
        <React.Fragment>
            <CaptionElement />
            <ToolkitProvider keyField="orderid"
                             data={ this.state.data }
                             columns={ columns }
                             exportCSV
            >
                {
                    props => (
                                <div>
                                    <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                    <hr />
                                    <BootstrapTable { ...props.baseProps }
                                                    striped
                                                    hover
                                                    condensed
                                                    bordered={ false }
                                                    cellEdit={ cellEditFactory({ mode: 'click',
                                                                                 blurToSave: true,
                                                                                 afterSaveCell: (oldValue, newValue, row, column) => { alert('After Saving Cell!!'); }
                                                                               })
                                                    }
                                    />
                                </div>
                            )
                }
            </ToolkitProvider>
        </React.Fragment>);
    }
}

export default View;