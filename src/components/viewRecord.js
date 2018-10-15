import React, {Component} from 'react';
import { Table } from 'antd';

import axios from 'axios';
import {baseURL} from '../Config';

const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'blue', border: '1px solid blue', padding: '0.5em' }}>
                                Order Summary
                             </h3>;

const columns = [{
  title: 'Order Id',
  dataIndex: 'order_id',
  key: 'order_id',
  sorter: (a, b) => a.order_id - b.order_id
}, {
  title: 'Item Name',
  dataIndex: 'itemname',
  key: 'itemname',
  sorter: (a, b) => a.itemname.length - b.itemname.length
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity',
  sorter: (a, b) => a.quantity - b.quantity
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  sorter: (a, b) => a.status.length - b.status.length
}, {
  title: 'Expected DOD',
  dataIndex: 'expected_dod',
  key: 'expected_dod',
  sorter: (a, b) => a.expected_dod.length - b.expected_dod.length
}];


class View extends Component {
     constructor(){
        super();
        this.state = {
            data:[{"order_id": 1,
              "itemname": "Nokia 6.1",
              "quantity": 1,
              "status": "Shipped",
              "expected_dod": "10/18/2018"},
            {"order_id": 2,
              "itemname": "Skull Candy Ear Phone",
              "quantity": 1,
              "status": "Shipped",
              "expected_dod": "10/18/2018"},
            {"order_id": 3,
              "itemname": "RAZOR Abyss",
              "quantity": 1,
              "status": "Shipped",
              "expected_dod": "10/18/2018"}],
            isLoding:true
        }
    }
    componentWillMount(){
        axios.post(baseURL+"/find", 
                        { user_id: this.props.userId }
                       ).then( (response)=> {
                                console.log(response);
                                this.setState({data: response.data.result,
                                               isLoding:false});
                        }).catch((error)=> {
                            console.log(error);
                            this.setState({isLoding:false});
                        });
    }

    render() {
        return (<React.Fragment>
            <CaptionElement />
            <Table dataSource={this.state.data} columns={columns} />
            </React.Fragment>);
    }
}


export default View;