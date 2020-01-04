import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewGrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grade : {},                                                           
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
        fetch(baseUrl + 'Grades/newgrade', {
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
        .then(grade => {
            console.log(grade);
            this.setState({  
                isLoading : false,
                grade : grade,
                errMess : null  
            });
            let id_input = document.querySelector("input#gradeId");
            if(id_input) {
                id_input.value = this.state.grade.gradeId;
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
    addGrade()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));
        fetch(baseUrl + 'Grades', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.grade),           
            
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
        this.addGrade();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            grade : {
                ...this.state.grade,
                [key] : event.target.value
            }
        });
        //console.log(this.state.grade);
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
            //console.log(this.state.grade.grade.gradeId);
            console.log("New Grade state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Grade has been added successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/grades" > Go to grades page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/grades/new" onClick = {this.fetchInitialValues} > Add new grade </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new grade </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "gradeId">Grade ID</Label>
                                                <Input type = "text" id = "gradeId" name = "gradeId"  placeholder = "Grade ID" />
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "gradeSymbol">Grade Symbol</Label>
                                                <Input type = "text" id = "gradeSymbol" name = "gradeSymbol" placeholder = "Grade Symbol" />
                                            </FormGroup>
                                        </div>
                                    
                                        <div className = "col-sm-12" >
                                            <FormGroup>
                                                <Label  htmlFor = "gradeName1">Grade Name</Label>
                                                <Input type = "text" id = "gradeName1" name = "gradeName1" placeholder = "Grade Name" />
                                            </FormGroup>
                                        </div>
                                    </div>
                                        
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add grade</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/grades" > Go back </Link>
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