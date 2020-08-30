import React, {Component } from 'react';
import './styles/global.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
// import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
// import Authenticated from './components/Authenticated';
import NotFound from './components/NotFound';

// New import
import withContext from './Context'; 
import PrivateRoute from './PrivateRoute';

// Connect the Header component to context
const HeaderWithContext = withContext(Header);

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
// const UpdateCourseWithContext = withContext(UpdateCourse);

// const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);

// Connect UserSignIn to context
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends Component {
   
render() {
  return (
    <Router>
    <div>
    <HeaderWithContext /> 
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/courses"/>} />
        <Route exact path="/courses" component={CoursesWithContext} /> 
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        {/* <PrivateRoute path="/courses/:id/update" component={UpdateCourse} /> */}
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        {/* <PrivateRoute path="/settings" component={AuthWithContext} /> */}
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
