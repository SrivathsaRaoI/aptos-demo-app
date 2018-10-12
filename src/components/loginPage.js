import React from 'react';
import "./loginPage.css";
import SimpleReactValidator from 'simple-react-validator'
import {
  withRouter
} from 'react-router-dom'
import axios from 'axios';

class LoginPage extends React.Component {
    constructor(){
        super();
        this.state ={
            username:"",
            password:""
        }
        this.changeData = this.changeData.bind(this);
        this.submit = this.submit.bind(this);
        this.validator = new SimpleReactValidator();
    }
    changeData(type,event){
        if(type == "password")
        this.setState({password:event.target.value})
        else
        this.setState({username:event.target.value})
    }
    submit(event){
        event.preventDefault();
      if( this.validator.allValid() ){
          axios.post('http://104.211.231.95:8080/authenticate', {
    username: this.state.username,
    password: this.state.password
  })
  .then(function (response) {
    console.log(response);
    let data = response.data.result;

    sessionStorage.setItem("username", this.state.username);
    sessionStorage.setItem("user_id", data.user_id);

    //this.props.history.push('/home')
  })
  .catch(function (error) {
    console.log(error);
  });
          
  } else {
    this.validator.showMessages();
    // rerender to show messages for the first time
    this.forceUpdate();
  }
    }
    render(){
        return(
        <div className="container login-form">
          <form className="form-style">
                <div className="form-group">
                    <label >username</label>
                    <input type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                    onChange ={this.changeData.bind(this,'username')} />
                    {this.validator.message('username', this.state.username, 'required', 'text-danger')}
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    onChange ={this.changeData.bind(this,'password')} />
                    {this.validator.message('password', this.state.password, 'required', 'text-danger')}

                </div>
                <button type="submit" className="btn btn-primary" onClick ={this.submit}>Submit</button>
          </form>
        </div>

        )
    }
}

export default LoginPage;


