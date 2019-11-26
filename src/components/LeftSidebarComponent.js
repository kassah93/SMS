import React from 'react';
import {Collapsible} from './CollapsibleComponent';
import {Link} from 'react-router-dom';

export class LeftSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : true
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState(state => ({
            visible : !state.visible
        }));
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
                            <Collapsible header = {(<a className="menu-toggle waves-effect waves-block"><i className="zmdi zmdi-apps"></i><span>App</span></a>)}> 
                                <ul >
                                    <li><a href="mail-inbox.html" className = " waves-effect waves-block"> Email</a></li>
                                    <li><a href="chat.html">Chat Apps</a></li>
                                    <li><a href="events.html">Calendar</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </Collapsible>                                                     
                        </li>
                        <li><a onClick = {() => { this.props.logout(); this.props.authUser();}} style = {{cursor : 'pointer'}} ><i className="zmdi zmdi-power"></i><span>Logout</span></a></li>
                    </ul>
                </div>
            </aside>
        );
    }    
}