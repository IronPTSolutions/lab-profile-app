import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    touch: {},
    isAuthenticated: false
  }

  render() {
    const { errors, user, touch } = this.state;


    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <h3>Log in</h3>
            <form id="login-form" className="mt-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.email} />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} />
                <div className="invalid-feedback">{errors.password}</div>
              </div>
            </form>
            <p className="mt-4"><small>If you don't have an account yet, you can create your account <Link to="/register">here</Link></small></p>
          </div>
          <div className="col-6 pt-4">
            <h5>Hello!!</h5>
            <p className="lead mb-5">Awesome to hace at IronProfile again!</p>
            <p className="mb-2"><small>If you signup, you agree with all our terms and conditions where we can do whatever we want with the data!</small></p>
            <button className="btn btn-white" form="login-form" type="submit" > Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
