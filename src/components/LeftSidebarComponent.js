import React from 'react';
//import {Collapsible} from './CollapsibleComponent';
import {Link} from 'react-router-dom';

export class LeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : true
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.toggleElement = this.toggleElement.bind(this);
    }

    toggleSidebar() {
        this.setState(state => ({
            visible : !state.visible
        }));
    }

    toggleElement(event) {
        const app = document.querySelector("a#app");
        console.log(app.nextSibling.style.display);
        if (app) {
            app.classList.toggle("toggled");
            if(app.nextSibling.style.display !== "block") {
                app.nextSibling.style.display = "block"; 
            } else if(app.nextSibling.style.display === "block") {
                app.nextSibling.style.display = "none"; 
            }
            
        }
    }
    minimizeSideBar() {
        let body = document.querySelector("#body");
        body.classList.toggle("ls-toggle-menu");
    }

    render() {
        return(           
            <aside id="leftsidebar" className="sidebar">
                <div className="navbar-brand">
                    <button onClick = {this.minimizeSideBar} className="btn-menu ls-toggle-btn mobile-menu" type="button"><i className="zmdi zmdi-menu"></i></button>
                    <Link to="/home"><span className="m-l-10">SMS</span></Link>
                </div>
                <div className="menu">
                    <ul className="list">
                        <li>
                            <div className="user-info">
                                <a className="image" href="profile.html"><img src="assets/images/profile_av.jpg" alt="User"/></a>
                                <div className="detail">
                                    <h4>Michael</h4>
                                    <small>Super Admin</small>
                                </div>
                            </div>
                        </li>
                        <li><a href="index.html"><i className="zmdi zmdi-home"></i><span>Dashboard</span></a></li>
                        <li>
                            <a onClick = {this.toggleElement} id = "app" className="menu-toggle waves-effect waves-block"><i className="zmdi zmdi-apps"></i><span>App</span></a>
                            <ul className ="ml-menu">
                                <li><Link to = "/students" className = " waves-effect waves-block"> Students</Link></li>
                                <li><Link to = "/years" className = " waves-effect waves-block"> Years</Link></li>
                                <li><Link to = "/semesters" className = " waves-effect waves-block"> Semesters</Link></li>
                                <li><Link to = "/sections" className = " waves-effect waves-block"> Sections</Link></li>
                                <li><Link to = "/grades" className = " waves-effect waves-block"> Grades</Link></li>
                                <li><Link to = "/subjects" className = " waves-effect waves-block"> Subjects</Link></li>
                                
                            </ul>                                                  
                        </li>
                        <li><a onClick = {() => { this.props.logout(); this.props.authUser();}} style = {{cursor : 'pointer'}} ><i className="zmdi zmdi-power"></i><span>Logout</span></a></li>
                    </ul>
                </div>
            </aside>
        );
    }    
}