import React, { Component } from 'react';
import Form from "./Form";

export default class UpdateCourse extends Component {
    
    state = {
        courseId:"",
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        userId:"",
        firstName:"",
        lastName:"",
        errors:[]
    }
    componentDidMount() {
        const { context } = this.props;
        const { authenticatedUser } = context;
        const {id} = this.props.match.params;

        context.data.getCourseDetails(id).then((response) => {
            if (response) {
                const user = response.course.owner;
                
                this.setState(() => {
                return {
                courseId:id,
                userId: response.course.userId,
                title: response.course.title,
                description: response.course.description,
                estimatedTime: response.course.estimatedTime,
                materialsNeeded: response.course.materialsNeeded,
                ownerFirstName: user.firstName,
                ownerLastName: user.lastName, 
                ownerEmailAddress: authenticatedUser.emailAddress,
                }
                });
            }else {
                this.props.history.push("/notfound");
            }
        })
        .catch( (error) => {
            console.log(error);
            this.props.history.push("/error");
        });
    };
    render() {
        const { 
        title,
        ownerFirstName,
        ownerLastName,
        description,
        estimatedTime,
        materialsNeeded,
        // userId,
        errors 
        } = this.state;

        // const {context} = this.props;
        // const {authenticatedUser} = context;

        return (                  
            <div className= "bounds course--details"> 
                <h1>Update Course</h1> 
                <div>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.update}
                        submitButtonText="Update Course"
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className= "course--header">
                                        <h4 className="course--lable">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                value={title}                             
                                                onChange={this.change} 
                                                placeholder="Course title" 
                                            />
                                        </div>
                                        <p >By "{ownerFirstName} {ownerLastName}"</p>    
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                className=""                               
                                                onChange={this.change} 
                                                placeholder="Course description"
                                                value={description}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats" >
                                        <ul className="course--stats--list" >
                                            <li className="course--stats--list--item" >
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input 
                                                        id="estimatedTime" 
                                                        name="estimatedTime" 
                                                        type="text" 
                                                        className="course--time--input"
                                                        placeholder="Hours" 
                                                        value={estimatedTime}
                                                        onChange={this.change} 
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item" >
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea 
                                                    id="materialsNeeded" 
                                                    name="materialsNeeded" 
                                                    className="" 
                                                    onChange={this.change} 
                                                    placeholder="List materials..."
                                                    value={materialsNeeded}>
                                                </textarea>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>                                                               
                            </React.Fragment> 
                        )}
                    />
                </div>                
            </div>        
        )
    }
    change = e => {
        const name = e.target.name
        this.setState({
           [name] : e.target.value  
        })
    }

    update = (e) => {
            const { context } = this.props;
            const { courseId, title, description, estimatedTime, materialsNeeded } = this.state;
            const updatedCourse = { title, description, estimatedTime, materialsNeeded };
            const emailAddress  = context.authenticatedUser.emailAddress;
            const password = context.authenticatedUser.password;

        context.data.updateCourse( courseId, updatedCourse, emailAddress, password ).then((errors) => {
            if (errors.length) {
              this.setState({ errors });
              console.log(this.state);
            } else {
                const id= this.state.courseId;
                this.props.history.push(`/courses/${id}`);
                }
            }).catch( (error) => {
            console.log(error);
            this.props.history.push("/error");
        });
    }

    cancel = (e) => {
        const id= this.state.courseId;
        this.props.history.push(`/courses/${id}`)
    }   
}
    

