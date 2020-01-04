import React from 'react';
import {Card, CardBody, CardHeader, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';



export class Grades extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grades : {
                isLoading : false,
                grades  : [],
                errMess   : null
            } 
        }
    }

    fetchGrades(){
        this.setState(state => ({
            grades : {
                isLoading : true,
                grades : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'grades/Read?from=0', {
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
        .then(grades => {
            console.log(grades);
            this.setState({
                grades : {
                    isLoading : false,
                    grades : grades,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                grades : {
                    isLoading : false,
                    grades : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchGrades();
    }

    render(){
        if (this.state.grades.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Grades</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/grades/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.grades.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.grades.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            const grades = this.state.grades.grades.map(grade => (
                <div className = "col-md-4" key = {grade.gradeId}>
                    <Card outline color = "warning" style = {{border : "2px solid" , maxHeight : "150px"}}  >
                        <CardHeader> {grade.gradeId} </CardHeader>
                        <CardBody >
                            <CardTitle> {grade.gradeName1} </CardTitle>
                            <CardText>
                                <small className="text-muted"> {grade.gradeSymbol} </small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                
            ));

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Grades</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/grades/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        {grades}
                    </div>
                </div>
            );
        }
    }
}