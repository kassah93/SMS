import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewEnrollment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment : {},                                                           
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
        fetch(baseUrl + 'Enrollments/newenrollment', {
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
        .then(enrollment => {
            console.log(enrollment);
            this.setState({  
                isLoading : false,
                enrollment : enrollment,
                errMess : null  
            });
            let id_input = document.querySelector("input#enrollmentId");
            if(id_input) {
                id_input.value = this.state.enrollment.enrollmentId;
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
    addEnrollment()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));

        console.log(this.state.enrollment);

        fetch(baseUrl + 'Enrollments', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.enrollment),           
            
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
        this.addEnrollment();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            enrollment : {
                ...this.state.enrollment,
                [key] : event.target.value
            }
        });
        //console.log(this.state.enrollment);
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
            //console.log(this.state.enrollment.enrollment.enrollmentId);
            console.log("New Enrollment state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Enrollment has been addess successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/enrollments" > Go to enrollments page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/enrollments/new" onClick = {this.fetchInitialValues} > Add new enrollment </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new enrollment </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "enrollmentId">Enrollment ID</Label>
                                                <Input type = "text" id = "enrollmentId" name = "enrollmentId"  placeholder = "Enrollment ID" />
                                            </FormGroup>
                                        </div>
                                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "yearGUID">Year</Label>
                                                <select className = "form-control" id = "yearGUID" name = "yearGUID" placeholder = "Year">
                                                    <option value = {null}>-</option>
                                                    {this.props.years.map((year, index) => (
                                                        <option key = {year.yearId} value = {year.yearGUID}>{year.yearName1}</option>  
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </div>
                    
                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "sectionGUID">Section</Label>
                                                <select className = "form-control" id = "sectionGUID" name = "sectionGUID" placeholder = "Section">
                                                    <option value = {null}>-</option>
                                                    {this.props.sections.map(section => (
                                                        <option key = {section.sectionId} value = {section.sectionGUID}>{section.sectionName1}</option>  
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "semesterGUID">Semester</Label>
                                                <select className = "form-control" id = "semesterGUID" name = "semesterGUID" placeholder = "Semester">
                                                    <option value = {null}>-</option>
                                                    {this.props.semesters.map(semester => (
                                                        <option key = {semester.semesterId} value = {semester.semesterGUID}>{semester.semesterName1}</option>  
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "gradeGUID">Grade</Label>
                                                <select className = "form-control" id = "gradeGUID" name = "gradeGUID" placeholder = "Grade">
                                                    <option value = {null}>-</option>
                                                    {this.props.grades.map(grade => (
                                                        <option key = {grade.gradeId} value = {grade.gradeGUID}>{grade.gradeName1}</option>  
                                                    ))}
                                                </select>
                                            </FormGroup>
                                        </div>
                                        
                                    </div> 
                                
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add enrollment</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/enrollments" > Go back </Link>
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