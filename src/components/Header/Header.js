import React, { useEffect, useRef, useContext, useState } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext.js';
import Swal from 'sweetalert2';
import logo from '../../assets/images/logo.png';
import './header.css';

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/tours', display: 'Tours' },
  { path: '/booking', display: 'Bookings' },
  { path: '/about', display: 'About' }
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
        navigate("/home");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1000,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        });
      }
    });
  };


  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    window.addEventListener('scroll', stickyHeaderFunc);
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper d-flex align-items-center justify-content-between'>

            <div className='logo'>
              <img src={logo} alt='logo' />
            </div>

            <div className='navigation' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-5'>
                {nav__links.map((item, index) => (
                  <li className='nav__item' key={index}>
                    <NavLink to={item.path} className={({ isActive }) => (isActive ? "active__link" : "")}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className='nav__right d-flex align-items-center gap-4 justify-content-end ms-auto me-5'>
              <div className='nav__btns d-flex align-items-center gap-3'>
                {user ? (
                  <>
                    <span className='text-primary'>Hi,</span><span className='username-text subtitle-font'>{user.username}</span>
                    <Button className='btn primary__btn' onClick={logout}>Log-Out</Button>
                  </>
                ) : (
                  <>
                    <Button className='btn secondary__btn'>
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button className='btn primary__btn'>
                      <Link to='/register'>Register</Link>
                    </Button>
                  </>
                )}
              </div>

            </div>

            <span className='mobile__menu' onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </Row>
      </Container>
    </header >
  );
};

export default Header;
