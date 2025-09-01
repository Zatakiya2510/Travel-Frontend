import React, { useState, useContext } from "react"
import '../styles/login.css'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext.js'
import { BASE_URL } from './../utils/config.js'
import Swal from 'sweetalert2';

const Login = () => {

  const [credentials, serCredentials] = useState({
    email: undefined,
    password: undefined
  });
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate();

  const handlechange = e => {
    serCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };




  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      } else {
        localStorage.setItem('role', result.role);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { ...result.data, userId: result.data.userId } });

        // Show success message using SweetAlert
        Swal.fire({
          title: "Success",
          text: "You have successfully logged in!",
          icon: "success",
          timer: 3500,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        }).then(() => {
          // Redirect user to appropriate page
          if (result.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        });

      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };



  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='8' className="m-auto">
              <div className="login__contain d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg}></img>
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userIcon}></img>
                  </div>
                  <h2>Login</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input type="email" placeholder="Enter E-mail" required id="email" onChange={handlechange}></input>
                    </FormGroup>
                    <FormGroup>
                      <input type="password" placeholder="Enter Password" required id="password" onChange={handlechange}></input>
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn">
                      Login
                    </Button>
                  </Form>
                  <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </p>
                  <p>Don't have an Account? <Link to='/register'>Create</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Login
