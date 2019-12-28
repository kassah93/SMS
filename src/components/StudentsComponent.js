import React from 'react';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';

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
                <React.Fragment>
                    <div className = "col-12 mb-5">
                        <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                    </div>
                    <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                        {this.state.students.errMess}
                    </div>
                </React.Fragment>
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
                        <tr key = {student.studentId}>          
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
                                <button className="btn btn-info btn-sm">
                                    <Link to = {"/students/" + student.studentId} >
                                        <i className="zmdi zmdi-hc-fw"></i>
                                    </Link>
                                </button>
                                
                            </td>
                        </tr>
                        
                    
                );
            })

            return(
                <React.Fragment >
                    
                    <div className = "col-12 mb-3">
                        <Link to = "/students/new"> 
                            <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                        </Link>
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
                </React.Fragment>
            );
        }
    }
}