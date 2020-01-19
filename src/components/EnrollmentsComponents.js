import React from 'react';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import {Card, CardBody, CardHeader, Button, CardText, Badge, CardFooter} from 'reactstrap';

const EnrollmentCard = ({ID , year, section, semester, grade ,color}) => {
    return(
        <div className = "col-lg-6" key = {ID}>
            <Card outline color = {color} style = {{border : "2px solid", maxHeight : "200px"}}  >
                <CardHeader>
                    <Badge color = {color} > Enrollment ID </Badge> 
                    <Badge color = "light">{ID}</Badge>                      
                </CardHeader>
                <CardBody >
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-3">
                                <Badge color = {color}> Year </Badge>
                            </div>
                            <div className = "col-3">
                                <Badge  color = "light"> {year} </Badge>
                            </div>

                            <div className = "col-3">
                                <Badge color = {color}> Section </Badge>
                            </div>
                            <div className = "col-3">
                                <Badge  color = "light"> {section} </Badge>
                            </div>   
                        </div>   

                        <div className = "row">
                            <div className = "col-3">
                                <Badge color = {color}> Semester </Badge>
                            </div>
                            <div className = "col-3">
                                <Badge  color = "light"> {semester} </Badge>
                            </div>

                            <div className = "col-3">
                                <Badge color = {color}> Grade </Badge>
                            </div>
                            <div className = "col-3">
                                <Badge  color = "light"> {grade} </Badge>
                            </div>   
                        </div>  

                        <div className = "row">
                            <hr style = {{height : "2px," , width : "100%"}}/>
                        </div>
                        <div className = "row">
                            <Link to = {"/enrollments/" + ID}>
                                <Button color = "success" size = "sm">
                                    Show More
                                </Button>
                            </Link>
                        </div >
                    </div>
                    
                </CardBody>
            </Card>
        </div>
    );
}

export class Enrollments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            enrollments : {
                isLoading : false,
                enrollments  : [],
                errMess   : null
            },

            years : {
                isLoading : false,
                years     : [],
                errMess   : null  
            },

            sections : {
                isLoading : false,
                sections  : [],
                errMess   : null  
            },

            semesters : {
                isLoading : false,
                semesters : [],
                errMess   : null   
            },

            grades : {
                isLoading : false,
                grades    : [],
                errMess   : null   
            }
        }
    }

    fetchData(name){
        this.setState(state => ({
            [name] : {
                isLoading : true,
                [name]    : [],
                errMess   : null
            }       
        }));
        fetch(baseUrl + name + '/Read?from=0', {
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
        .then(data => {
            console.log(data);
            this.setState(state => ({
                [name] : {
                    isLoading : false,
                    [name]    : data,
                    errMess   : null  
                }
            }));
            this.props.setParentData({
                [name] : data,
            })
        })
        .catch(err => {
            console.log(err);
            this.setState(state => ({
                [name] : {
                    isLoading : false,
                    [name]    : [],
                    errMess   : err.message  
                }
            }));
        });
    }

    
    componentDidMount() {
        this.fetchData('enrollments');
        this.fetchData('years');
        this.fetchData('sections');
        this.fetchData('semesters');
        this.fetchData('grades');
    }

    render(){

        let err = (this.state.enrollments.errMess || this.state.years.errMess || this.state.sections.errMess
                || this.state.semesters.errMess || this.state.grades.errMess);


        let isLoading = (this.state.enrollments.isLoading || this.state.years.isLoading || this.state.sections.isLoading
            || this.state.semesters.isLoading || this.state.grades.isLoading);


        if (err) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Enrollments</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/enrollments/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.enrollments.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            
            const enrollments = this.state.enrollments.enrollments.map(enrollment => (
                <EnrollmentCard color = "primary" ID = {enrollment.enrollmentId} 
                             year     = {this.state.years.years.filter(year => year.yearGUID === enrollment.yearGUID)[0].yearName1} 
                             section  = {this.state.sections.sections.filter(section => section.sectionGUID === enrollment.sectionGUID)[0].sectionName1}
                             semester = {this.state.semesters.semesters.filter(semester => semester.semesterGUID === enrollment.semesterGUID)[0].semesterName1}
                             grade    = {this.state.grades.grades.filter(grade => grade.gradeGUID === enrollment.gradeGUID)[0].gradeName1}
                             />
                
            ));

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Enrollments</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/enrollments/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        {enrollments}
                    </div>
                </div>
            );
        }
    }
}