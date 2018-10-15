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
        let user_id = this.props.location && this.props.location.state && this.props.location.state && 0;
        return(
            <Sidebar toview= {user_id}
                     toLogout={() => {sessionStorage.removeItem("username"); this.props.history.push('/')}}
             />
        )
    }
}

export default Home;


