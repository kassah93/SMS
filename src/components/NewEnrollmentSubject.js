import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Button} from 'reactstrap';
import {baseUrl} from '../baseUrl';

export class NewEnrollmentSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            request : {},
            errMess   : null,
            isPosting : false,
            success   : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addEnrollmentSubject()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            errMess : null,
        }));

        fetch(baseUrl + 'enrollments/AddSubject', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.request),           
            
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
                    errMess : null
                }));
            }
            
        })
        .catch((err) => {
            console.log(err);
            this.setState(state => ({
                isPosting : false,
                errMess : err.message,
                success : false,
            }));
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let enrollmentGUID = this.props.enrollmentGUID;
        let subjectGUID    = document.querySelector('select#subjectGUID').value;

        this.setState(state => ({
                 request: { 
                            enrollmentGUID : enrollmentGUID,
                            subjectGUID    : subjectGUID,
                 }
            }), () => {this.addEnrollmentSubject();});
        
        
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Add Subject to Enrollment</ModalHeader>
                <ModalBody>
                    Please select the subject
                    <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                        <div className = "container" >
                            <div className = "row" >                                 
                                <div className = "col-sm-6" >
                                    <FormGroup>
                                        <Label  htmlFor = "subjectGUID">Subject</Label>
                                        <select className = "form-control" id = "subjectGUID" name = "subjectGUID" placeholder = "Subject">
                                            {this.props.subjects.map((subject) => (
                                                <option key = {subject.subjectId} value = {subject.subjectGUID}>{subject.subjectName1}</option>  
                                            ))}
                                        </select>
                                    </FormGroup>
                                </div>
                            
                                <Button type = "submit" color = "primary" block size = "lg">
                                    {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                    <div>Add enrollment subject</div>}      
                                </Button>
                            </div>

                            {this.state.errMess? (<div className = "row" >
                                                    <div className = "col-12">
                                                        <div className = "alert alert-danger text-center"> {this.state.errMess} </div>
                                                    </div>
                                                 </div>) : null}

                            {this.state.success? (<div className = "row">
                                                    <div className = "col-12">
                                                        <div className = "alert alert-success text-center"> Subject added successfully </div>
                                                    </div>
                                                  </div>) : null}
                            
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="Secondary" onClick={this.props.toggle}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        )                 
    }  
} 
