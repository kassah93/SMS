import React from 'react';
import {Link} from 'react-router-dom';
import { baseUrl } from '../baseUrl';
import { ContentCard } from './ContentCardComponent';



export class Years extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            years : {
                isLoading : false,
                years  : [],
                errMess   : null
            } 
        }
    }

    fetchYears(){
        this.setState(state => ({
            years : {
                isLoading : true,
                years : [],
                errMess : null
            }
            
        }));
        fetch(baseUrl + 'years/Read?from=0', {
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
        .then(years => {
            console.log(years);
            this.setState({
                years : {
                    isLoading : false,
                    years : years,
                    errMess : null  
                }
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                years : {
                    isLoading : false,
                    years : [],
                    errMess : err.message  
                }
            });
        });
    }

    componentDidMount() {
        this.fetchYears();
    }

    render(){
        if (this.state.years.errMess) {
            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Years</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/years/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "alert alert-danger" style = {{width : "50%" , margin : "auto"}}>
                            {this.state.years.errMess}
                        </div>
                    </div>  
                </div>
            );
        }
        else if (this.state.years.isLoading) {
            return(
                <div className="d-flex justify-content-center" style = {{margin : "auto"}}>
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else {
            
            const years = this.state.years.years.map(year => (
                <ContentCard type = "Year" color = "info" ID = {year.yearId} 
                             name = {year.yearName1} />
            ));

            return(
                <div className = "container" >
                    <div className = "row">
                        <div className = "col-9">
                            <h3 className = "text-center">Years</h3>
                        </div>
                        <div className = "col-3 mb-3">
                            <Link to = "/years/new"> 
                                <button className="btn btn-success btn-icon float-right" type="button"><i className="zmdi zmdi-plus"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className = "row">
                        {years}
                    </div>
                </div>
            );
        }
    }
}