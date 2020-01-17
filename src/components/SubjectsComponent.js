import React from 'react';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { ContentCard } from './ContentCardComponent';
import { Nestable } from './CollapsibleComponent';
import {Card , CardHeader} from 'reactstrap';   



export class Subjects extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subjects : {
                isLoading : false,
                subjects  : [],
                errMess   : null
            } 
        }
    }

    fetchSubjects(){
        this.setState(state => ({
            subjects : {
                isLoading : true,
                subjects : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'subjects/Read?from=0', {
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
        .then(subjects => {
            console.log(subjects);
            this.setState({
                subjects : {
                    isLoading : false,
                    subjects : subjects,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                subjects : {
                    isLoading : false,
                    subjects : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchSubjects();
    }

    render(){
        if (this.state.subjects.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Subjects</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/subjects/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.subjects.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.subjects.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            
            let subjectArr = [];
            if (this.state.subjects.subjects.length !== 0) {   
                subjectArr = this.state.subjects.subjects.map((subject, index, arr) => {    
                    let element = subject;
                    element.childs = [];
                    let restArr = arr.slice(index + 1);
                    for (let i in restArr) {
                        if(element.glevel < restArr[i].glevel) {
                            if (element.subjectId === restArr[i].parentSubjectId){
                                element.childs.push(restArr[i]);
                            }
                        } else {
                            break;
                        } 
                    }
                    return element;
                });
            }

            const renderSubject = (subject) => {
                const header = (
                    
                    <Card outline color = "info" style = {{border : "1px solid"}} key = {subject.subjectId} >
                        
                        <CardHeader className = "ml-0">
                            
                            {subject.general ? (<div className = "badge badge-light">
                                                    <i className="zmdi zmdi-hc-fw"></i>
                                                </div>) : null}
                             
                            <div className = "badge badge-info" >
                                ID :
                            </div>
                            <div className = "badge badge-light">
                                {subject.subjectId}
                            </div>
                            <div className = "badge badge-info">
                                Name : 
                            </div>
                            <div className = "badge badge-light">
                                {subject.subjectName1}
                            </div>                         
                        </CardHeader>
                    </Card>     
                    
                ); 

                if (subject.general === 0) {
                    return(
                        <React.Fragment>
                            {header}
                        </React.Fragment>  
                    );
                } else {
                    const childs = subject.childs.map(child => {
                        return renderSubject(child);
                    });
                    return (
                        <Nestable  header   = {header}
                                   children = {childs}
                                   key      = {subject.subjectId} />
                    );
                }
            }

            const subjectsElems = subjectArr.map(subject => {
                if (subject.glevel === 0) {
                    return(
                        <div className = "row" key = {subject.subjectId}>
                            <div className = "col-6" >
                                {renderSubject(subject)}
                            </div>                            
                        </div>
                    );  
                   //return renderSubject(subject);
                } else {
                    return null;
                }
            });

            console.log("sujects Array are :", subjectsElems);

         //   console.log("sujects Array are :", subjectArr);

         /*   const subjectsComps = subjectArr.map(subject => {
                return(
                    <Nestable header = {
                        (<div> 
                            <div> ID </div>
                            <div> {subject.subjectId} </div>
                            <div> Name </div>
                            <div> {subject.subjectName1} </div>
                         </div> )} 

                         children = {subject.childs} />
                );
            }); */

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Subjects</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/subjects/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "container">
                       {subjectsElems} 
                    </div>
                </div>
            );
        }
    }
}