import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { getUserInfo, logout } from '../shared/AuthService';
import UserContext from '../context/UserContext';
import { Login } from './LoginComponent';
import { Home } from './HomeComponent';
import { AuthenticatedRoute } from './AuthenticatedRouteComponent';
import { Register } from './RegisterComponent';
import {Students} from './StudentsComponent';
import { LeftSidebar } from './LeftSidebarComponent';
import {NewStudent} from './NewStudentComponent';
import { Years } from './YearsComponent';
import { NewYear } from './NewYearComponent';
import { Semesters } from './SemestersComponent';
import { NewSemester } from './NewSemesterComponent';
import { Sections } from './SectionsComponent';
import { NewSection } from './NewSectionComponent';
import { Grades } from './GradesComponent';
import { NewGrade } from './NewGradeComponent';
 
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
            <div className = "theme-blush" id = "body"> 
                {this.state.user? <LeftSidebar logout = {logout} authUser = {this.authUser} /> : null}
                <Switch>                            
                    <UserContext.Provider value = {this.state}>
                        <Route path = "/home" >
                            <AuthenticatedRoute path = "/home" Component = {Home} />
                        </Route>
                        
                        <Route path = "/students" exact>
                            <AuthenticatedRoute path = "/students" Component = {Students} />
                        </Route>    

                        <Route path = "/students/new" >
                            <AuthenticatedRoute path = "/students/new" Component = {NewStudent} />
                        </Route>    

                        <Route path = "/years" exact>
                            <AuthenticatedRoute path = "/years" Component = {Years} />
                        </Route>  
                        
                        <Route path = "/years/new" >
                            <AuthenticatedRoute path = "/years/new" Component = {NewYear} />
                        </Route>    

                        <Route path = "/semesters" exact>
                            <AuthenticatedRoute path = "/semesters" Component = {Semesters} />
                        </Route>   

                        <Route path = "/semesters/new" >
                            <AuthenticatedRoute path = "/semesters/new" Component = {NewSemester} />
                        </Route> 

                        <Route path = "/sections" exact>
                            <AuthenticatedRoute path = "/sections" Component = {Sections} />
                        </Route>   

                        <Route path = "/sections/new" >
                            <AuthenticatedRoute path = "/sections/new" Component = {NewSection} />
                        </Route>  

                        <Route path = "/grades" exact>
                            <AuthenticatedRoute path = "/grades" Component = {Grades} />
                        </Route>   

                        <Route path = "/grades/new" >
                            <AuthenticatedRoute path = "/grades/new" Component = {NewGrade} />
                        </Route> 

                        <Route path = "/login" >
                            <Login />
                        </Route>

                        <Route path = "/register" >
                            <Register />
                        </Route>

                        <Redirect to = "/login" />

                    </UserContext.Provider>                           
                </Switch>
            </div>           
        );
    }

}