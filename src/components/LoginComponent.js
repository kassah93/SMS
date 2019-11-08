import React , {Component} from 'react';
import {Card, CardHeader, CardBody, FormGroup, Form, Button, Label, Input} from 'reactstrap';
import {baseUrl} from '../baseUrl';


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
    handleSubmit(event){
        console.log(this);
        event.preventDefault();
        console.log(this.state.user);
        this.handleLogin(this.state.user);
        
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
            <div className = "container" >
                <div className = "row">
                    <div className = "col-lg-4 col-sm-12">
                        <Card className = "mt-3">
                            <CardHeader className = "login-form-header">
                                <h3> Log in </h3> 
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit = {this.handleSubmit} onChange = {this.handleChange} method = "POST"> 
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
                    </div>
                </div>
            </div>
            

        );
    }

     handleLogin(user)  {
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
            console.log(res.headers);
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
            } else { 
                console.log(data);
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

