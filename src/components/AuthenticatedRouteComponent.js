import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { LeftSidebar } from './LeftSidebarComponent';
import UserContext from '../context/UserContext';
import { logout } from '../shared/AuthService';
import { Content } from './ContentComponent';



function handleMobileViewport(media) {
    //console.log('handleMobileViewport executed');
    let body = document.querySelector("#body");
    if (body) {
        if(media.matches){
            body.classList.add("ls-closed");
        } else {
            body.classList.remove("ls-closed");
        }
    }
    
}

export class AuthenticatedRoute extends React.Component {

    componentDidMount(){
        console.log("Authenticated is mounted");
        this.media = window.matchMedia("(max-width : 768px)");
        if (this.media) {
            handleMobileViewport(this.media);
            this.media.addListener(handleMobileViewport);
        }
        
        
    }

    componentWillUnmount() {
        if (this.media) {
            this.media.removeListener(handleMobileViewport);
        }       
    }

    componentDidUpdate(){
        if (this.media){
            handleMobileViewport(this.media);
            this.media.addListener(handleMobileViewport);
        }   
    }
    render(){     
        let {Component , path, ...rest} = this.props;
        return(      
            <UserContext.Consumer>             
                {
                    ({user, authUser}) => {
                        if (user) {
                            
                            return (
                                <div className = "theme-blush" id = "body">                    
                                    <LeftSidebar logout = {logout} authUser = {authUser} />
                                    <Content>
                                        <Route path = {path} >
                                            <Component props = {rest} />
                                        </Route>
                                    </Content>   
                                </div>
                                );                     
                        } else {
                            if (this.media) {
                                this.media.removeListener(handleMobileViewport);
                            }
                            return (
                                <Redirect to = "/login" />
                            );
                        }
                    }   
                }                 
            </UserContext.Consumer>
        ); 
    }          
}