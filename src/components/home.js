import React from 'react';
import Layout from '../Layout/Dashboard/SliderDashBoard';

class Home extends React.Component {
    componentWillMount(){
        let username = sessionStorage.getItem("username");
        if(!username){
             this.props.history.push('/')
        }

    }

    render(){
        let user_id = this.props.location && this.props.location.state && this.props.location.state && 0;
        return(<Layout toview= {user_id} />);
    }
}

export default Home;


