import React from 'react';
import "./loginPage.css";
import {
  withRouter
} from 'react-router-dom'

class Home extends React.Component {
    componentWillMount(){
        let username = sessionStorage.getItem("username");
        if(!username){
             this.props.history.push('/')
        }

    }
    render(){
        return(
            <div>
            <button type="submit" className="btn btn-primary" 
            onClick ={() => {sessionStorage.removeItem("username"); this.props.history.push('/')}}>Logout</button>
            <h1>{this.props.location.state.username}</h1>
            <h1>{this.props.location.state.user_id}</h1>
            </div>
        )
    }
}

export default Home;


