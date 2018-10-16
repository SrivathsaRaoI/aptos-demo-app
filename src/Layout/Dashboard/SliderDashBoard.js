import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import View from '../../components/viewRecord';
import './SliderDashBoard.css';


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class DashBoard extends Component{

    state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render(){
      return(
           <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
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
                    <Header style={{ background: '#212529', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <View userId= {this.props.toview} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Zensar
                    </Footer>
                </Layout>
           </Layout>

      );
  }
}
export default DashBoard;