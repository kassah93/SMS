import React from 'react';
import {Button} from 'reactstrap';
import UserContext from '../context/UserContext';
import { logout } from '../shared/AuthService';

export const Home = (props) => {
    return(
       <UserContext.Consumer>
           {
                ({user, authUser}) => (
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-12">
                                <div> Logged in </div>
                                <Button color = "primary" size ="sm" onClick = {() => {
                                    logout();
                                    authUser();
                                }} >
                                    Log out
                                </Button>
                            </div>
                        </div>
                    </div>
                )
           }
       </UserContext.Consumer> 
        
    );
}