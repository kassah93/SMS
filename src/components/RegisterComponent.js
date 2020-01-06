import React , {Component} from 'react';
import {Redirect, Link } from 'react-router-dom';
import {Card, CardHeader, CardBody, FormGroup, Form, Button, Input} from 'reactstrap';
import {baseUrl} from '../baseUrl';
import {setUserCookie} from '../shared/AuthService';
import UserContext from '../context/UserContext';

export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            isRegistering : false,
            errMess       : null,
            user : {
                username        : '',
                password        : '',
                confirmPassword : ''
            },
            errors : {
                username : null,
                password : null,
                confirmPassword : null
            }
        };
        this.mounted = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        
    }
    handleSubmit(authUser) {
        return (event) => {
            event.preventDefault();
            this.handleRegister(this.state.user , authUser);
        }
    }

    handleChange(event){
        let key = event.target.name;
        this.setState({
            ...this.state,
            user : {
                ...this.state.user,
                [key] : event.target.value
            }
        });
    }

    validatePassword(event) {
        //console.log(event.target.parent);
        if (this.state.user.password !== this.state.user.confirmPassword) {
            this.setState(state => ({
                ...state,
                errors : {
                    ...state.errors,
                    ['confirmPassword'] : "Password doesn't match"
                }  
            }));
            this.controlSubmitDisabled(true);
        } else {
            this.setState(state => ({
                ...state,
                errors : {
                    ...state.errors,
                    ['confirmPassword'] : null
                }  
            }));
            this.controlSubmitDisabled(false);
        }
        //console.log(this.state.errors);
    }

    controlSubmitDisabled(value) {
        let submitButton = document.querySelector('button#signup');
        submitButton.disabled = value;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        this.setState(state => ({
            isRegistering : false
        }));
    }

    render() {
        return(
            <UserContext.Consumer>
                {({user , authUser}) => {
                    if(user) {
                        return (
                            <Redirect to = "/home" />    
                        );
                    } else {
                        return (
                            <div className = "container" >
                                <div className = "row">
                                    <div className = "col-lg-4 col-sm-12">
                                        <Card outline color = "secondary" className = "mt-3" style = {{border : "2px solid"}}>
                                            <CardHeader className = "login-form-header">
                                                <h3> Sign up </h3> 
                                            </CardHeader>
                                            <CardBody>
                                                <Form onSubmit = {this.handleSubmit(authUser)} onChange = {this.handleChange} method = "POST"> 
                                                    <FormGroup>
                                                        <Input type = "text" id = "username" name = "username" placeholder = "Username" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Input type = "password" id = "password" name = "password" placeholder = "Password" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Input onKeyUp = {this.validatePassword} type = "password" id = "confirmPassword" name = "confirmPassword" placeholder = "Type password again" />
                                                        {this.state.errors.confirmPassword && <div className = "text-danger" > {this.state.errors.confirmPassword} </div>} 
                                                    </FormGroup>
                                                    
                                                    <Button id = "signup" type = "submit" color = "primary" block>
                                                        {this.state.isRegistering? <div><span className="spinner-border spinner-border-sm"></span> Registering...</div> :
                                                        <div>Sign up</div>}     
                                                    </Button>                                  
                                                </Form>  

                                                <div className = "primary" >
                                                    <Link to = "/login" > Already have account? Login instead! </Link>
                                                </div>                              
                                            </CardBody>

                                        </Card>
                                        {this.state.errMess? (<div className = "alert alert-danger text-center"> {this.state.errMess} </div>) : null} 
                                    </div>
                                </div>
                            </div>);                       
                        }                   
                    }
                }
            </UserContext.Consumer>
        );
    }

     handleRegister(user, authUser)  {
        //console.log("handle Register!!");
        this.setState( state => ({
            isRegistering : true
        }));
        
        fetch(baseUrl + 'AppUsers/register', {
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
                //console.log(data.errors);
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
            if (this.mounted) {
                this.setState(state => ({
                    isRegistering : false,
                }));
            }
            
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

