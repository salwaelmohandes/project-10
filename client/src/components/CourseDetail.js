import React from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
    .catch((error) => {
      console.log(error);
      this.props.history.push("/notFound");
    });
  }
  
  render() {
    const {
      courseDetails,
      user,
      materialsNeeded,
    } = this.state;

    const {context} = this.props;
    const {authenticatedUser} = context;


    console.log(this.state);
     
    return ( 
      <div>          
        <div className="action--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>{authenticatedUser ? (
                  authenticatedUser.emailAddress === user.emailAddress ? (                                
                    <React.Fragment>
                      <Link className="button" to={`/courses/${courseDetails.id}/update`}>Update Course</Link>
                      <Link className="button" to="#">Delete Course</Link>                            
                    </React.Fragment>
                  ) :  <hr />
                ) : <hr/> }
              </span>
              <Link className="button button-secondary" to="./">Return to List</Link>
            </div>
          </div>             
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--lable">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3> 
              <p>By "{user.firstName} {user.lastName}"</p>
            </div>
            <div className="course--description">
              <ReactMarkdown>{courseDetails.description}</ReactMarkdown>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4> 
                    <h3>{courseDetails.estimatedTime}</h3>
                  </li> 
                  {/* <div className="course--materialsNeeded"> */}
                    <li className="course--stats--list--item">                              
                      <h4>Materials Needed</h4>
                      <ul>{materialsNeeded.map((material) => (<li key={material}>{material}</li>))}</ul> 
                      <ReactMarkdown>{courseDetails.materialsNeeded}</ReactMarkdown>
                    </li>
                  {/* </div> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>    
    );
  }
}