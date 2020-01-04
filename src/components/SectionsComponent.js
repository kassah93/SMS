import React from 'react';
import {Card, CardBody, CardHeader, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';



export class Sections extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sections : {
                isLoading : false,
                sections  : [],
                errMess   : null
            } 
        }
    }

    fetchSections(){
        this.setState(state => ({
            sections : {
                isLoading : true,
                sections : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'sections/Read?from=0', {
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
        .then(sections => {
            console.log(sections);
            this.setState({
                sections : {
                    isLoading : false,
                    sections : sections,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                sections : {
                    isLoading : false,
                    sections : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchSections();
    }

    render(){
        if (this.state.sections.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Sections</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/sections/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.sections.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.sections.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            const sections = this.state.sections.sections.map(section => (
                <div className = "col-md-4" key = {section.sectionId}>
                    <Card outline color = "primary" style = {{border : "2px solid" , maxHeight : "150px"}}  >
                        <CardHeader> {section.sectionId} </CardHeader>
                        <CardBody >
                            <CardTitle> {section.sectionName1} </CardTitle>
                            <CardText>
                                <small className="text-muted"> {section.sectionSymbol} </small>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                
            ));

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Sections</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/sections/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        {sections}
                    </div>
                </div>
            );
        }
    }
}