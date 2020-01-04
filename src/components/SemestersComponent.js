import React from 'react';
import {Card, CardBody, CardHeader, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';



export class Semesters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            semesters : {
                isLoading : false,
                semesters  : [],
                errMess   : null
            } 
        }
    }

    fetchSemesters(){
        this.setState(state => ({
            semesters : {
                isLoading : true,
                semesters : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'semesters/Read?from=0', {
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
        .then(semesters => {
            console.log(semesters);
            this.setState({
                semesters : {
                    isLoading : false,
                    semesters : semesters,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                semesters : {
                    isLoading : false,
                    semesters : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchSemesters();
    }

    render(){
        if (this.state.semesters.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Semesters</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/semesters/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.semesters.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.semesters.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            const semesters = this.state.semesters.semesters.map(semester => (
                <div className = "col-md-4" key = {semester.semesterId}>
                    <Card outline color = "success" style = {{border : "2px solid" , maxHeight : "100px"}}  >
                        <CardHeader> {semester.semesterId} </CardHeader>
                        <CardBody >
                            <CardTitle> {semester.semesterName1} </CardTitle>
                        </CardBody>
                    </Card>
                </div>
                
            ));

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Semesters</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/semesters/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        {semesters}
                    </div>
                </div>
            );
        }
    }
}