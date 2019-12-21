import React from 'react';

export class Content extends React.Component {
    toggleSideBar() {
        const sidebar = document.querySelector("#leftsidebar");
        if (sidebar) {
            sidebar.classList.toggle("open");
        }
    }
    render(){
        return(
            <React.Fragment>
                <section className="content">
                    <div className="body_scroll">
                        <div className="block-header">
                            <div className="row">
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                    <h2>Dashboard</h2>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> Aero</a></li>
                                        <li className="breadcrumb-item active">Dashboard 1</li>
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