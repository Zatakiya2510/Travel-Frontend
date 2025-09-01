import React, { useState, useContext } from "react";
import "../styles/register.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext.js";
import { BASE_URL } from "./../utils/config.js";
import Swal from "sweetalert2";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1); // Step 1: Email → 2: OTP → 3: Register
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // ✅ Step 1: Send OTP
  const sendOTP = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success",
          text: "OTP sent to your email",
          icon: "success",
          timer: 3500, // Auto close after 3.5 sec
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true, // Allow closing by clicking outside
          allowEscapeKey: true     // Allow closing with ESC
        }).then(() => {
          setStep(2); // Runs when alert closes (timer or outside click)
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
          timer: 3500,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: false
        });
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to send OTP. Try again.",
        icon: "error",
        timer: 3500,
        timerProgressBar: false,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: false
      });
    }
  };


  // ✅ Step 2: Verify OTP
  const verifyOTP = async () => {
    const otp = otpDigits.join("");

    if (otp.length < 4) {
      Swal.fire({
        title: "Error",
        text: "Please enter the complete 4-digit OTP",
        icon: "error",
        timer: 3500,
        timerProgressBar: false,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success",
          text: "OTP Verified",
          icon: "success",
          timer: 3500,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        }).then(() => {
          setStep(3); // Proceed only after alert closes (timer or click outside)
        });

      } else {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
          timer: 3500,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        });
      }

    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "OTP verification failed. Try again.",
        icon: "error",
        timer: 3500,
        timerProgressBar: false,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");

    if (!credentials.username || !credentials.password) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
        timer: 3500,
        timerProgressBar: false,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        dispatch({ type: "REGISTER_SUCCESS" });
        Swal.fire({
          title: "Success",
          text: "Account created successfully",
          icon: "success",
          timer: 3500,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        }).then(() => {
          navigate("/login");
        });

      } else {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
          timer: 3500,
          timerProgressBar: false,
          showConfirmButton: false,
          allowOutsideClick: true,
          allowEscapeKey: true
        });
      }

    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Registration failed. Try again.",
        icon: "error",
        timer: 3500,
        timerProgressBar: false,
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true
      });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__contain d-flex justify-content-between">
              <div className="register__img">
                <img src={registerImg} alt="register" />
              </div>

              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Register</h2>

                {step === 1 && (
                  <>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        required
                        value={credentials.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn" onClick={sendOTP}>
                      Send OTP
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormGroup
                      className="otp-input-group"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                      onPaste={(e) => {
                        const pasted = e.clipboardData.getData("text").trim().slice(0, 4);
                        if (/^\d{4}$/.test(pasted)) {
                          setOtpDigits(pasted.split(""));
                        }
                      }}
                    >
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          maxLength="1"
                          id={`otp-${index}`}
                          className="otp-box"
                          value={digit}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/, "").charAt(0) || "";
                            const newOtp = [...otpDigits];
                            newOtp[index] = value;
                            setOtpDigits(newOtp);
                            if (value && index < 5) {
                              const nextInput = document.getElementById(`otp-${index + 1}`);
                              if (nextInput) nextInput.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
                              const prevInput = document.getElementById(`otp-${index - 1}`);
                              if (prevInput) prevInput.focus();
                            }
                          }}
                        />
                      ))}
                    </FormGroup>

                    <div style={{ textAlign: "center" }}>
                      <Button
                        className="btn secondary__btn auth__btn"
                        onClick={verifyOTP}
                        style={{
                          width: "240px",
                          marginTop: "10px",
                        }}
                      >
                        Verify OTP
                      </Button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <Form onSubmit={handleRegister}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Enter Username"
                        id="username"
                        required
                        value={credentials.username}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        id="password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn">
                      Create Account
                    </Button>
                  </Form>
                )}

                <p>
                  Already have an Account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
