import React , {Component} from 'react';
import {Card, CardHeader, CardBody, FormGroup, Form, Button, Input} from 'reactstrap';
import {baseUrl} from '../baseUrl';
import {setUserCookie} from '../shared/AuthService';
import UserContext from '../context/UserContext';



export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogging : false,
            errMess   : null,
            user : {
                username : '',
                password : ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleSubmit(authUser) {
        return (event) => {
            console.log("submitted!");
            event.preventDefault();
            this.handleLogin(this.state.user , authUser);
        }
    }

    handleChange(event){
        //console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            user : {
                ...this.state.user,
                [key] : event.target.value
            }
        });
        //console.log(this.state.user);
    }

    render() {
        return(
            <UserContext.Consumer>
                {({user , authUser}) => (
                    <div className = "container" >
                        <div className = "row">
                            <div className = "col-lg-4 col-sm-12">
                                <Card className = "mt-3">
                                    <CardHeader className = "login-form-header">
                                        <h3> Log in </h3> 
                                    </CardHeader>
                                    <CardBody>
                                        <Form onSubmit = {this.handleSubmit(authUser)} onChange = {this.handleChange} method = "POST"> 
                                            <FormGroup>
                                                <Input type = "text" id = "username" name = "username" placeholder = "Username" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type = "text" id = "password" name = "password" placeholder = "Password" />
                                            </FormGroup>
                                            
                                            <Button type = "submit" color = "primary" block>Sign in</Button>                                  
                                        </Form>                                
                                    </CardBody>
                                </Card>
                                {this.state.errMess? (<div className = "alert alert-danger text-center"> {this.state.errMess} </div>) : null} 
                            </div>
                        </div>
                    </div>
                )}
                
            </UserContext.Consumer>
            
            

        );
    }

     handleLogin(user, authUser)  {
        console.log("handle Login!!");
        this.setState({
            ...this.state,
            isLogging : true
        });
        fetch(baseUrl + 'AppUsers/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(user),           
            
        }).then(res => {
            //console.log(res.headers);
            if (res.ok || res.status === 400) {
                return res;    
            } else {
                var err = new Error('Error ' + res.status + ' : ' + res.statusText);
                err.response = res;
                throw err;	
            }	
        }, err => {
            let error = new Error(err.message);
            throw error;
        }).then(res => res.json())
        .then(data => {
            let errMess = null;
            if(Object.keys(data).includes("errors")){
                console.log(data.errors);
                let key = Object.keys(data.errors)[0];
                errMess = data.errors[key];
                let err = new Error(errMess);
                throw err;
            } else if(Object.keys(data).includes("message")) { 
                errMess = data.message;
                let err = new Error(errMess);
                throw err;
            } else {
                //console.log(data);
                setUserCookie(data.token, authUser);
            }
            this.setState({
                ...this.state,
                isLogging : false,
            });
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                ...this.state,
                errMess : err.message
            });
        })
    }
}

