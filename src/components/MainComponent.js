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
import { Subjects } from './SubjectsComponent';
import { NewSubject } from './NewSubjectComponent';
import { Enrollments } from './EnrollmentsComponents';
import { NewEnrollment } from './NewEnrollmentComponent';
import { EnrollmentDetail } from './EnrollmentDetailComponent';
 
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

    setData = (newState) => {
        console.log("Main state is" ,this.state);
       this.setState(state => newState);
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
        console.log("Main State is " ,this.state);
        return(
            <div className = "theme-blush" id = "body"> 
                {this.state.user? <LeftSidebar logout = {logout} authUser = {this.authUser} user = {this.state.user} /> : null}
                <Switch>                            
                    <UserContext.Provider value = {this.state}>
                        
                        <AuthenticatedRoute path = "/home" Component = {Home} />
                         
                        <AuthenticatedRoute exact path = "/students" Component = {Students} />
                            
                        <AuthenticatedRoute path = "/students/new" Component = {NewStudent} />
                          
                        <AuthenticatedRoute exact path = "/years" Component = {Years} />
                           
                        <AuthenticatedRoute path = "/years/new" Component = {NewYear} />
                            
                        <AuthenticatedRoute exact path = "/semesters" Component = {Semesters} />

                        <AuthenticatedRoute path = "/semesters/new" Component = {NewSemester} />
                     
                        <AuthenticatedRoute exact path = "/sections" Component = {Sections} />
                       
                        <AuthenticatedRoute path = "/sections/new" Component = {NewSection} />

                        <AuthenticatedRoute exact path = "/grades" Component = {Grades} />
                       
                        <AuthenticatedRoute path = "/grades/new" Component = {NewGrade} />

                        <AuthenticatedRoute exact path = "/subjects" Component = {Subjects} />

                        <AuthenticatedRoute path = "/subjects/new" Component = {NewSubject} />

                        <AuthenticatedRoute exact path = "/enrollments" Component = {Enrollments} setParentData = {this.setData} />

                        <Switch>
                            <AuthenticatedRoute exact path = "/enrollments/new" Component = {NewEnrollment} years = {this.state.years} 
                                        sections = {this.state.sections} semesters = {this.state.semesters} grades = {this.state.grades} />


                            <AuthenticatedRoute exact path = "/enrollments/:id" Component = {EnrollmentDetail} years = {this.state.years} 
                                        sections = {this.state.sections} semesters = {this.state.semesters} grades = {this.state.grades} 
                                        />
                        </Switch>
 
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