import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { getUserInfo } from '../shared/AuthService';
import UserContext from '../context/UserContext';
import { Login } from './LoginComponent';
import { Home } from './HomeComponent';
import { AuthenticatedRoute } from './AuthenticatedRouteComponent';
import { Register } from './RegisterComponent';

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
    
    componentDidMount(){
        //console.log("Mounted");
        let user = getUserInfo();
        this.setState(state => ({
            ...state,
            user : user
        }));
        //console.log(user);
    }

    render(){
        //console.log(this.state);
        return(
            <Switch>           
                <UserContext.Provider value = {this.state}>

                    <AuthenticatedRoute path = "/home" Component = {Home} />

                    <Route path = "/login" >
                        <Login />
                    </Route>

                    <Route path = "/register" >
                        <Register />
                    </Route>

                </UserContext.Provider>               
            </Switch>
            
        );
    }

}