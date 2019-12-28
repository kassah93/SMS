import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student : {},                                                           
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
        fetch(baseUrl + 'Students/newstudent', {
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
        .then(student => {
            console.log(student);
            this.setState({  
                isLoading : false,
                student : student,
                errMess : null  
            });
            let id_input = document.querySelector("input#studentId");
            if(id_input) {
                id_input.value = this.state.student.studentId;
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
    addStudent()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));
        fetch(baseUrl + 'Students', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.student),           
            
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
        this.addStudent();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            student : {
                ...this.state.student,
                [key] : event.target.value
            }
        });
        //console.log(this.state.student);
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
            //console.log(this.state.student.student.studentId);
            console.log("New Student state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Student has been addess successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/students" > Go to students page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/students/new" onClick = {this.fetchInitialValues} > add new student </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new student </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "studentId">Student ID</Label>
                                                <Input type = "text" id = "studentId" name = "studentId"  placeholder = "Student ID" />
                                            </FormGroup>
                                        </div>
                                    

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "studentName">Student Name</Label>
                                                <Input type = "text" id = "studentName" name = "studentName" placeholder = "Student Name" />
                                            </FormGroup>
                                        </div>
                                

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "studentMobile">Student Mobile</Label>
                                                <Input type = "text" id = "studentMobile" name = "studentMobile" placeholder = "Student Mobile" />
                                            </FormGroup>
                                        </div>
                                    

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "fatherName">Father Name</Label>
                                                <Input type = "text" id = "fatherName" name = "fatherName" placeholder = "Father Name" />
                                            </FormGroup>
                                        </div>
                                    

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "fatherMobile">Father Mobile</Label>
                                                <Input type = "text" id = "fatherMobile" name = "fatherMobile" placeholder = "Father Mobile" />
                                            </FormGroup>
                                        </div>
                                    

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "motherName">Mother Name</Label>
                                                <Input type = "text" id = "motherName" name = "motherName" placeholder = "Mother Name" />
                                            </FormGroup>
                                        </div>
                                    

                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "motherMobile">Mother Mobile</Label>
                                                <Input type = "text" id = "motherMobile" name = "motherMobile" placeholder = "Mother Mobile" />
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "birthCity">Birth City</Label>
                                                <Input type = "text" id = "birthCity" name = "birthCity" placeholder = "Birth City" />
                                            </FormGroup>
                                        </div>
                                        
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "gender">Gender</Label>
                                                <select className = "form-control" id = "gender" name = "gender" placeholder = "Please select gender">
                                                    <option value = "0">Male</option>
                                                    <option value = "1">Female</option>
                                                </select>
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "address">Address</Label>
                                                <Input type = "text" id = "address" name = "address" placeholder = "Address" />
                                            </FormGroup>
                                        </div>
                                        

                                    </div> 
                                
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add student</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/students" > Go back </Link>
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