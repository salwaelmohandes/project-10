import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // const url = 'http://localhost:5000/api';
        const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if auth is required
  if (requiresAuth) {    
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

    options.headers['Authorization'] =  `Basic ${encodedCredentials}`;
  }
  // eslint-disable-next-line
    return fetch(url, options);
  }


  async getUser(emailAddress, password) { // add new parameters
    console.log("in getUser");
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then((data) => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    console.log("in createUser");
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      // console.log(response);
      return [];
    }
    else if (response.status === 400) {
      console.log(response);
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // get courses
  async getCourses() {
    const response = await this.api("/courses", "GET");
    if (response.status === 200) {
      const courses = await response.json().then((data) => data);
      return courses;
    }else if (response.status === 401) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }


  async createCourse(emailAddress, password, course){
    const response = await this.api('/courses', 'POST', course, true, {emailAddress,password});
    if (response.status === 201 ||response.status === 200 ) {
      return [];
    }
    else if (response.status === 400) {
      console.log("400 error sent from api call");
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }


  async getCourseDetails(id) {
    console.log("get course details");
    const response = await this.api(`/courses/${id}`, "GET");
    console.log(response);
    if (response.status === 200 ||response.status === 201 ) {
      const course = await response.json().then((data) => data);
      console.log(course);
      return course;
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(id, course, emailAddress, password) {
    console.log("update course details");
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {emailAddress,password});
    console.log(response);
    if (response.status === 200 || response.status === 201 ) {
      // const course = await response.json().then((data) => data);
      // console.log(course);
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id, emailAddress, password) {
    console.log("delete course details");
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {emailAddress,password});
    console.log(response);
    if (response.status === 200  ) {
      // const course = await response.json().then((data) => data);
      // console.log(course);
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}