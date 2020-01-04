import React from 'react';
import {Card, CardBody, CardHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

export class NewSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section : {},                                                           
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
        fetch(baseUrl + 'Sections/newsection', {
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
        .then(section => {
            console.log(section);
            this.setState({  
                isLoading : false,
                section : section,
                errMess : null  
            });
            let id_input = document.querySelector("input#sectionId");
            if(id_input) {
                id_input.value = this.state.section.sectionId;
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
    addSection()  {
        this.setState(state => ({
            isPosting : true,
            success : false,
            postErrMess : null,
        }));
        fetch(baseUrl + 'Sections', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body :  JSON.stringify(this.state.section),           
            
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
        this.addSection();
        
    }

    handleChange(event){
       // console.log(event.target.value);
        let key = event.target.name;
        this.setState({
            ...this.state,
            section : {
                ...this.state.section,
                [key] : event.target.value
            }
        });
        //console.log(this.state.section);
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
            //console.log(this.state.section.section.sectionId);
            console.log("New Section state is :", this.state)
            if (this.state.success) {
                return(
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-sm-12 alert alert-success text-center"> Section has been added successfully </div>
                        </div>
                        <div className = "row">
                            <div className = "col-sm-6 primary" >
                                <Link to = "/sections" > Go to sections page </Link>
                            </div>
                            <div className = "col-sm-6 primary" >
                                <Link to = "/sections/new" onClick = {this.fetchInitialValues} > Add new section </Link>
                            </div>
                        </div>
                    </div>
                    
                );
            } else {
                return (
                    <Card className = "mt-3">
                        <CardHeader className = "login-form-header">
                            <h3 className = "mt-4"> Add new section </h3> 
                        </CardHeader>
                        <CardBody>
                            <Form  method = "POST" onSubmit = {this.handleSubmit} onChange = {this.handleChange}> 
                                <div className = "container" >
                                    <div className = "row" >                                 
                                        <div className = "col-sm-6" >                           
                                            <FormGroup>
                                                <Label  htmlFor = "sectionId">Section ID</Label>
                                                <Input type = "text" id = "sectionId" name = "sectionId"  placeholder = "Section ID" />
                                            </FormGroup>
                                        </div>

                                        <div className = "col-sm-6" >
                                            <FormGroup>
                                                <Label  htmlFor = "sectionSymbol">Section Symbol</Label>
                                                <Input type = "text" id = "sectionSymbol" name = "sectionSymbol" placeholder = "Section Symbol" />
                                            </FormGroup>
                                        </div>
                                    
                                        <div className = "col-sm-12" >
                                            <FormGroup>
                                                <Label  htmlFor = "sectionName1">Section Name</Label>
                                                <Input type = "text" id = "sectionName1" name = "sectionName1" placeholder = "Section Name" />
                                            </FormGroup>
                                        </div>
                                    </div>
                                        
                                    <Button type = "submit" color = "primary" block size = "lg">
                                        {this.state.isPosting? <div><span className="spinner-border spinner-border-sm"></span> Adding...</div> :
                                        <div>Add section</div>}      
                                    </Button> 
                                    
                                    <div className = "primary" >
                                        <Link to = "/sections" > Go back </Link>
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