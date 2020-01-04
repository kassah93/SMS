import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year : {},                                                           
            isLoading : false,
            isPosting : false,
            success : false,
            errMess : null,
            postErrMess : null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchInitialValues = this.fetchInitialValues.bind(this);
    }

    fetchInitialValues() {
        this.setState(state => ({  
            isLoading : true,
            errMess : null,
            success : false,
            postErrMess : null,
            isPosting : false,  
        }));
        fetch(baseUrl + 'Years/newyear', {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                return res;
            } else {
                var err = new Error('Error ' + res.status + ' : ' + res.statusText);
                err.response = res;
                throw err  
            }
        }, err => {
            let error = new Error(err.message);
            throw error;       
        })
        .then(res => res.json())
        .then(year => {
            console.log(year);
            this.setState({  
                isLoading : false,
                year : year,
                errMess : null  
            });
            let id_input = document.querySelector("input#yearId");
            if(id_input) {
                id_input.value = this.state.year.yearId;
            }
            
        })
        .catch(err => {
            console.log(err);
            this.setState({ 
                isLoading : false,
                errMess : err.message        
            });
        });
    }
///=========================================================
    addYear()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));
        fetch(baseUrl + 'Years', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.year),           
            
        }).then(res => {
            ////console.log(res.headers);
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
            } else if(Object.keys(data).includes("Message")) { 
                errMess = data.Message;
                let err = new Error(errMess);
                throw err;
            } else {
                ////console.log(data);
                this.setState(state => ({
                    isPosting : false,
                    success : true,
                }));
            }
            
        })
        .catch((err) => {
            console.log(err);
            this.setState(state => ({
                isPosting : false,
                postErrMess : err.message,
                success : false,
            }));
        })
    }

    handleSubmit(event) {

        event.preventDefault();
        this.addYear();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            year : {
                ...this.state.year,
                [key] : event.target.value
            }
        });
        //console.log(this.state.year);
    }

    componentDidMount(){
        this.fetchInitialValues();
    }

    render(){
        if (this.state.errMess) {
            return(
                <React.Fragment>
                    <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                        {this.state.errMess}
                    </div>
                </React.Fragment>
            );
        }
        else if (this.state.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            //console.log(this.state.year.year.yearId);
            console.log("New Year state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Year has been addess successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/years" > Go to years page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/years/new" onClick = {this.fetchInitialValues} > add new year </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new year </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "yearId">Year ID</Label>
                                                <Input type = "text" id = "yearId" name = "yearId"  placeholder = "Year ID" />
                                            </FormGroup>
                                        </div>
                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "yearName1">Year Name</Label>
                                                <Input type = "text" id = "yearName1" name = "yearName1" placeholder = "Year Name" />
                                            </FormGroup>
                                        </div>
                                    </div>
                                        
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add year</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/years" > Go back </Link>
                                    </div> 

                                    {this.state.postErrMess? (<div className = "alert alert-danger text-center"> {this.state.postErrMess} </div>) : null}
                                    
                                </div>  
                                                            
                            </Form>  
                            
                        </CardBody> 
                                                
                    </Card>       
                );
            }
        }
    }
}