
import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Card, CardBody, CardHeader, Button, Badge} from 'reactstrap';
import { fetchData, fetchIndividualData } from '../shared/fetchData';

const EnrollmentInfo = ({id, year, section, semester, grade}) => (
    <div className = "row" >
        <div className = "col-md-3 col-6">
            <div className = "badge badge-info">
                Enrollment ID
            </div> 
        </div>  
        <div className = "col-md-3 col-6">
            <div className = "badge badge-light">
                {id}
            </div>  
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-info">
                Year
            </div> 
        </div>
        <div className = "col-md-3 col-6">  
            <div className = "badge badge-light">
                {year ? year.yearName1 : null}
            </div>
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-info">
                Section
            </div> 
        </div>  
        <div className = "col-md-3 col-6">
            <div className = "badge badge-light">
                {section ? section.sectionName1 : null}
            </div>
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-info">
                Semester
            </div>   
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-light">
                {semester ? semester.semesterName1 : null}
            </div>
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-info">
                Grade
            </div>   
        </div>
        <div className = "col-md-3 col-6">
            <div className = "badge badge-light">
                {grade? grade.gradeName1 : null}
            </div>
        </div>
    </div>
    )

//===========================================================

const style = {
    cursor : 'pointer'
};

 const EnrollmentCollapse = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);


    return (
        <React.Fragment >
            <div onClick = {toggle} style = {style}>
                {props.header}
            </div>
                
            <Collapse isOpen = {isOpen} className = "my-3" >
                {props.children}
            </Collapse>           
                   
        </React.Fragment>
    );
}

//=================================================================

export class EnrollmentDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            enrollment : {
                isLoading : false,
                enrollment  : {},
                errMess   : null
            },

            students : {
                isLoading : false,
                students  : [],
                errMess   : null  
            },

            subjects : {
                isLoading : false,
                subjects  : [],
                errMess   : null  
            }
        }
        this.fetchData           = fetchData.bind(this);  
        this.fetchIndividualData = fetchIndividualData.bind(this);
    }

  componentDidMount() {
      this.fetchIndividualData('enrollment', this.props.id);
      this.fetchData('students');
      this.fetchData('subjects');
  }  

  render() {

        if (this.state.enrollment.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Enrollments</h3>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.enrollment.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.enrollment.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {

            let enrollmentStudents;

            if (this.state.enrollment.enrollment.enrollmentStudents) {
                 enrollmentStudents = this.state.enrollment.enrollment.enrollmentStudents.map(student => (
                    <div className = "row">
                        <div className = "col-3">
                            <div className = "badge badge-success">
                                Student Id
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-light">
                                {student.studentId}
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-success">
                                Student Name
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-light">
                                {student.studentName}
                            </div>
                        </div>
                    </div>
                ));
            }

            let enrollmentSubjects;

            if (this.state.enrollment.enrollment.subjects) {
                 enrollmentSubjects = this.state.enrollment.enrollment.subjects.map(subject => (
                    <div className = "row">
                        <div className = "col-3">
                            <div className = "badge badge-primary">
                                Subject Id
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-light">
                                {subject.subjectId}
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-primary">
                                Subject Name
                            </div>
                        </div>
                        <div className = "col-3">
                            <div className = "badge badge-light">
                                {subject.subjectName1}
                            </div>
                        </div>
                    </div>
                ));
            }

            console.log(this.state.enrollment);
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Enrollments</h3>
                        </div>
                        
                    </div>
                    <EnrollmentInfo id = {this.state.enrollment.enrollment.enrollmentId} 
                                    year = {this.props.years.filter(year => year.yearGUID === this.state.enrollment.enrollment.yearGUID)[0]}
                                    section  = {this.props.sections.filter(section => section.sectionGUID === this.state.enrollment.enrollment.sectionGUID)[0]}
                                    semester = {this.props.semesters.filter(semester => semester.semesterGUID === this.state.enrollment.enrollment.semesterGUID)[0]}
                                    grade    = {this.props.grades.filter(grade => grade.gradeGUID === this.state.enrollment.enrollment.gradeGUID)[0]} 
                                />
                    
                    
                    <EnrollmentCollapse header = {
                        (<div className = "row">
                            <div className = "col-12 mt-3" >
                                <div className = "alert alert-success">
                                    Enrollment Students
                                </div>
                            </div>
                        </div>)}

                        children = {enrollmentStudents}
                        />

                    <EnrollmentCollapse header = {
                        (<div className = "row">
                            <div className = "col-12 mt-3" >
                                <div className = "alert alert-primary">
                                    Enrollment Subjects
                                </div>
                            </div>
                        </div>)}

                        children = {enrollmentSubjects}
                        />
                     
                </div>
            );
        }
    }

}
