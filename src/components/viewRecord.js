import React, {Component} from 'react';
import { Table } from 'antd';
import axios from 'axios';
import {baseURL} from '../Config';
import {Layout, Breadcrumb} from 'antd';

const { Content } = Layout;

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
  sorter: (a, b) => a.itemname.localeCompare(b.itemname) 
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity',
  sorter: (a, b) => a.quantity - b.quantity
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  sorter: (a, b) => a.status - b.status
}, {
  title: 'Expected DOD',
  dataIndex: 'expected_dod',
  key: 'expected_dod',
  render: (expected_dod) => {
    let dateObj = expected_dod;
    if (typeof expected_dod !== 'object') {
      dateObj = new Date(expected_dod);
    }
   return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
  },
  sorter: (a, b) => parseInt(new Date(a.expected_dod).getTime()) - parseInt(new Date(b.expected_dod).getTime())
}];


class View extends Component {
     constructor(){
        super();
        this.state = {
            data:[],
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

    //to render
    render() {
         return (
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Order Summary</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                       <Table dataSource={this.state.data} loading={this.state.isLoding}columns={columns} />
                    </div>
            </Content>
            );
      }
}


export default View;