/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import './footer.css';



import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';


const quick__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
];


const quick__links2 = [
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register'
  },
];
const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} />
              <p class="single-line-paragraph">Lorem ipsum dolor sit amet consectetur<br />
                adipisicing elit. Itaque mollitia officiis.</p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'>
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to='#'>
                    <i className="ri-github-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link to='#'>
                    <i className="ri-facebook-circle-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link to='#'>
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>

              </div>
            </div>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>

                  </ListGroupItem>
                ))
              }

            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Quick Link</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>

                  </ListGroupItem>
                ))
              }

            </ListGroup>
          </Col>

          <Col lg='3'>

            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">

              <table>
                <tr>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className="mb-0 d-flex align-items-center gap-2">
                      <span>
                        <i className="ri-map-pin-line"></i>
                        Address:
                      </span>
                    </h6>

                    <p className="mb-0">
                      Rajkot,Gujarat, India
                    </p>

                  </ListGroupItem>

                </tr>
                <tr>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className="mb-0 d-flex align-items-center gap-2">
                      <span>
                        <i className="ri-mail-line"></i>
                        Email:
                      </span>
                    </h6>

                    <p className="mb-0">
                      abhishekzatakiya25102004@gmail.com<br/>
                      dhruvipatel2945@gmail.com
                    </p>

                  </ListGroupItem>

                </tr>
                <tr>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className="mb-0 d-flex align-items-center gap-2">
                      <span >
                        <i className="ri-phone-fill"></i>
                        Phone:
                      </span>
                    </h6>

                    <p className="mb-0">
                      +91 6352342951 <br/>
                      +91 8734897671
                    </p>

                  </ListGroupItem>


                </tr>
              </table>
            </ListGroup>
          </Col>

          <Col lg='12'>
            <p className="copyright">
            <span><i class="ri-copyright-line"></i></span>Copyright {year}, design and devloped by Abhishek Zatakiya and Dhruvi Sapovadiya. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer; 