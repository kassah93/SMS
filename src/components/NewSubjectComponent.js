import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject : {},                                                           
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
        fetch(baseUrl + 'Subjects/newsubject', {
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
        .then(subject => {
            console.log(subject);
            this.setState({  
                isLoading : false,
                subject : subject,
                errMess : null  
            });
            let id_input = document.querySelector("input#subjectId");
            if(id_input) {
                id_input.value = this.state.subject.subjectId;
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
    addSubject()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));
        fetch(baseUrl + 'Subjects', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.subject),           
            
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
        this.addSubject();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            subject : {
                ...this.state.subject,
                [key] : event.target.value
            }
        });
        //console.log(this.state.subject);
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
            //console.log(this.state.subject.subject.subjectId);
            console.log("New Subject state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Subject has been added successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/subjects" > Go to subjects page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/subjects/new" onClick = {this.fetchInitialValues} > Add new subject </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new subject </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "subjectId">Subject ID</Label>
                                                <Input type = "text" id = "subjectId" name = "subjectId"  placeholder = "Subject ID" />
                                            </FormGroup>
                                        </div>
                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "subjectName1">Subject Name</Label>
                                                <Input type = "text" id = "subjectName1" name = "subjectName1" placeholder = "Subject Name" />
                                            </FormGroup>
                                        </div>
                                    </div>
                                        
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add subject</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/subjects" > Go back </Link>
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