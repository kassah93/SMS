import React from 'react';
import {Link} from 'react-router-dom';

export class Content extends React.Component {
    toggleSideBar() {
        const sidebar = document.querySelector("#leftsidebar");
        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    }
    render(){
        const breadcrumbs = this.props.path.substr(1).split("/").map((path, index, arr) => {
            if (index === arr.length -1) {
                return(
                <li className="breadcrumb-item active" key = {path}>{path.toUpperCase()}</li>    
                );
            }
            else {
                return(
                    <li className="breadcrumb-item" key = {path}><Link to = {"/" + path}> {path.toUpperCase()} </Link></li>
                );
            }          
        });

        return(
            <React.Fragment>
                <section className="content">
                    <div className="body_scroll">
                        <div className="block-header">
                            <div className="row">
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                    
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/home"><i className="zmdi zmdi-home"></i> SMS </Link></li>
                                        {breadcrumbs}
                                    </ul>
                                    <button onClick = {this.toggleSideBar} className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc"></i></button>
                                    
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-12">                
                                    
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row clearfix">
                                {console.log("children is ",this.props.children)}
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}