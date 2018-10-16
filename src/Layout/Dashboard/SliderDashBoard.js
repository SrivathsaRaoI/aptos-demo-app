import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import View from '../../components/viewRecord';
import './SliderDashBoard.css';

const { Header, Footer, Sider } = Layout;

class DashBoard extends Component{

    state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  //to render
  render(){
      return(
           <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{height: '60px'}}>
                    </div>
                     <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Summary</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.props.toLogout}>
                            <Icon type="desktop" />
                            <span>Logout</span>
                        </Menu.Item>
                     </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ padding: '0 0px',
                                                                                                      lineHeight: '64px' }}>
                                <Menu.Item key="1">Order</Menu.Item>
                            </Menu>
                    </Header>
                    <View userId= {this.props.toview} />
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Aptos
                    </Footer>
                </Layout>
           </Layout>

      );
  }
}
export default DashBoard;