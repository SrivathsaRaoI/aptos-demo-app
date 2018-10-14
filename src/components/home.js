import React from 'react';
import Sidebar from './SideBar';

class Home extends React.Component {
    componentWillMount(){
        let username = sessionStorage.getItem("username");
        if(!username){
             this.props.history.push('/')
        }

    }

    render(){
        return(
            <Sidebar toview= {this.props.location.state.user_id}
                     toLogout={() => {sessionStorage.removeItem("username"); this.props.history.push('/')}}
             />
        )
    }
}

export default Home;


