import React from 'react';
import {Redirect} from 'react-router-dom';
import UserContext from '../context/UserContext';
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
                                                    
                                    <Content>
                                        
                                        <Component props = {rest} />
                                                                                
                                    </Content>   
                                
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