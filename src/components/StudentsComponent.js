import React from 'react';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import {Collapsible} from './CollapsibleComponent';

export const StudentDetail = ({student, ...props}) => {
    return(
        <div className = "container" >
            <div className = "row justify-content-center sm-collapse-cell student-detail" >
                <div className = "col-4 alert alert-info h-100 mr-2 p-1 text-center">
                    Father Name
                </div>
                <div className = "col-4 alert alert-dark h-100 p-1 text-center">
                    {student.fatherName ? student.fatherName : " "} 
                </div>
            </div>

            <div className = "row justify-content-center sm-collapse-cell student-detail">
                <div className = "col-4 alert alert-info h-100 mr-2 p-1 text-center">
                    <span className="phone"><i className="zmdi zmdi-whatsapp mr-2"></i></span>
                    Father Mobile
                </div>
                <div className = "col-4 alert alert-dark h-100 p-1 text-center">
                    {student.fatherMobile ? student.fatherMobile : " "}
                </div>
            </div>

            <div className = "row justify-content-center md-collapse-cell student-detail" >
                <div className = "col-4 alert alert-info h-100 mr-2 p-1 text-center">
                    Mother Name
                </div>
                <div className = "col-4 alert alert-dark h-100 p-1 text-center">
                    {student.motherName ? student.motherName : " "}
                </div>
            </div>

            <div className = "row justify-content-center md-collapse-cell student-detail">
                <div className = "col-4 alert alert-info h-100 mr-2 p-1 text-center ">
                    <span className="phone"><i className="zmdi zmdi-whatsapp mr-2"></i></span>
                    Mother Mobile
                </div>
                <div className = "col-4 alert alert-dark h-100 p-1 text-center">
                    {student.motherMobile? student.motherMobile : " "}
                </div>
            </div>

            <div className = "row justify-content-center student-detail">
                <div className = "col-4 alert alert-info text-center  h-100 mr-2 p-1 text-center">
                    Gender
                </div>
                <div className = "col-4 text-center alert alert-dark h-100 p-1 text-center">
                    {student.gender === "0" ? "Male" : "Female"}
                </div>
            </div>
            <div className = "row justify-content-center student-detail">
                <div className = "col-4 alert alert-info text-center  h-100 mr-2 p-1 text-center">
                    Address
                </div>
                <div className = "col-4 text-center alert alert-dark h-100 p-1 text-center">
                    {student.address ? student.address : " "}
                </div>
            </div>
            <div className = "row justify-content-center student-detail">
                <div className = "col-4 alert alert-info text-center  h-100 mr-2 p-1 text-center">
                    Birth City
                </div>
                <div className = "col-4 text-center alert alert-dark h-100 p-1 text-center">
                    {student.birthCity ? student.birthCity : " "}
                </div>
            </div>
        </div>
    );
}

export class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students : {
                isLoading : false,
                students  : [],
                errMess   : null
            } 
        };
    }

    fetchStudents(){
        this.setState(state => ({
            students : {
                isLoading : true,
                students : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'Students/Read?from=0', {
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
        .then(students => {
            console.log(students);
            this.setState({
                students : {
                    isLoading : false,
                    students : students,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                students : {
                    isLoading : false,
                    students : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchStudents();
    }
   
    render() {
        if (this.state.students.errMess) {
            return(
                
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Students</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/students/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.students.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.students.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            const studentsTable = this.state.students.students.map(student => {
                return (           
                        
                            <Collapsible   key = {student.studentId}     
                                header =  {(<React.Fragment>
                                                <td>                      
                                                    <p className="c_name"> {student.studentId} </p>
                                                </td>
                                                <td>                      
                                                    <p className="c_name"> {student.studentName} </p>
                                                </td>
                                                <td className = "sm-cell">
                                                    <span className="phone"><i className="zmdi zmdi-whatsapp mr-2"></i>{student.studentMobile}</span>
                                                </td>
                                                <td className = "sm-cell">                      
                                                    <p className="c_name"> {student.fatherName} </p>
                                                </td>
                                                <td className = "sm-cell">
                                                    <span className="phone"><i className="zmdi zmdi-whatsapp mr-2"></i>{student.fatherMobile}</span>
                                                </td>
                                                <td className = "md-cell">                      
                                                    <p className="c_name"> {student.motherName} </p>
                                                </td>
                                                <td className = "md-cell">
                                                    <span className="phone"><i className="zmdi zmdi-whatsapp mr-2"></i>{student.motherMobile}</span>
                                                </td>                          
                                                <td className = "footable-last-visible">
                                                    <button className="btn btn-primary btn-sm"><i className="zmdi zmdi-edit"></i></button>
                                                    <button className="btn btn-danger btn-sm"><i className="zmdi zmdi-delete"></i></button> 
                                                </td>
                                            </React.Fragment>)} 
                                Component = {"tr"}
                                children = {(<StudentDetail student = {student} />)}
                                /*children = {<tr>
                                                <td colSpan = "8" >
                                                   <StudentDetail student = {student} />   
                                                    
                                                </td>
                                            </tr>} */
                                            />
                                          
                );
            })

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Students</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/students/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    
                    
                    <div className="table-responsive" >
                        <table className="table table-hover mb-0 c_list c_table footable footable-1 footable-paging footable-paging-center breakpoint-lg">
                            <thead>
                                <tr className ="footable-header">
                                    
                                    <th className = "footable-sortable"  >ID</th>                                    
                                    <th className = "footable-sortable"  >Name</th>                                    
                                    <th className = "footable-sortable sm-cell" data-breakpoints="xs">Phone</th>
                                    <th className = "footable-sortable sm-cell" data-breakpoints="xs sm md">Father Name</th>
                                    <th className = "footable-sortable sm-cell" data-breakpoints="xs sm md">Father Phone</th>
                                    <th className = "footable-sortable md-cell" data-breakpoints="xs sm md">Mother Name</th>
                                    <th className = "footable-sortable md-cell" data-breakpoints="xs sm md">Mother Phone</th>
                                    <th className = "footable-sortable footable-last-visible" data-breakpoints="xs" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}