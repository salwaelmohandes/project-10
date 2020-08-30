import React from 'react';
import { Link } from "react-router-dom";

export default class CourseDetail extends React.Component {
  state = {
    courseDetails: {},
    user: {},
    materialsNeeded:[]
  };
  
  componentDidMount() {
    const { context } = this.props; 
    const { id } = this.props.match.params;
    context.data.getCourseDetails(id)
      .then((response) => {
        if (response) {
          let materialsNeeded = response.course.materialsNeeded;
          if (materialsNeeded !== null) {
            materialsNeeded = materialsNeeded.split("\n");
          } else {
            materialsNeeded = [];
          }    
          this.setState({
            courseDetails: response.course,
            materialsNeeded: materialsNeeded,
            user: response.course.owner,
            authenticatedUser: context.authenticatedUser,
          });
        } else {
          this.props.history.push("/error");
        }
      })
    .catch((err) => {
      // console.log(err);
      this.props.history.push("/NotFound");
    });
  }
  
  render() {
    const {
      courseDetails,
      user,
      materialsNeeded,
      authenticatedUser,
    } = this.state;

    console.log(this.state);
     
    return ( 
      <div>          
        <div className="action--bar">
          <div className="bounds">
          {/* <Header /> */}
            <div className="grid-66">
              {/* <h1 className="header--logo">Courses</h1> */}
              {/* <span>Welcome {user.firstName} */}
                {authenticatedUser ? (
                  authenticatedUser.emailAddress === user.emailAddress ? (                                
                    <React.Fragment>
                      {/* <a className="signout" href="./">Sign Out</a>                              */}
                      <Link className="button" to={`/courses/${courseDetails.id}/update`}>Update Course</Link>
                      <Link className="button" to="#">Delete Course</Link>                            
                    </React.Fragment>
                  ) : <hr />
                ) : <hr/> }
              {/* </span> */}
              <Link className="button button-secondary" to="./">Return to List</Link>
            </div>
          </div>             
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <h4 className="course--lable">Course</h4>
            <h3 className="course--title">{courseDetails.title}</h3> 
            <p>By "{user.firstName} {user.lastName}"</p>
            <div className="course--description">{courseDetails.description}</div>
          </div>                
        </div>
      </div> 
    );
  }
}