import React from 'react';
import { getUserInfo } from '../shared/AuthService';
import UserContext from '../context/UserContext';
import { Login } from './LoginComponent';


export class Main extends React.Component {
    constructor(props){
        super(props);
        this.authUser = () => {
            this.setState({
                ...this.state,
                user : getUserInfo()
            });            
        }
        this.state = {
            user : null,
            authUser : this.authUser,
        };
    }

    render(){
        console.log(this.state);
        return(
            <UserContext.Provider value = {this.state}>
                <Login />
            </UserContext.Provider>
        );
    }

}