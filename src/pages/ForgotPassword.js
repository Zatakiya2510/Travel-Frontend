import React, { useState } from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "./../utils/config.js";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/send-reset-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (!res.ok) {
        Swal.fire("Error", result.message, "error");
      } else {
        Swal.fire("Success", "OTP sent to your email!", "success");
        setStep(2);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");

    if (otp.length !== 4) {
      Swal.fire("Error", "Enter the complete 4-digit OTP", "error");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const result = await res.json();

      if (!res.ok) {
        Swal.fire("Error", result.message, "error");
      } else {
        Swal.fire("Success", "OTP verified successfully!", "success");
        setStep(3);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ✅ Step 3: Set New Password
  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/set-new-password`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const result = await res.json();

      if (!res.ok) {
        Swal.fire("Error", result.message, "error");
      } else {
        Swal.fire("Success", "Password reset successfully!", "success").then(() =>
          navigate("/login")
        );
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__contain d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="login" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Forgot Password</h2>

                {/* STEP 1: Enter Email */}
                {step === 1 && (
                  <Form onSubmit={handleSendOTP}>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn">
                      Send OTP
                    </Button>
                  </Form>
                )}

                {/* STEP 2: Verify OTP */}
                {step === 2 && (
                  <Form onSubmit={handleVerifyOTP}>
                    <FormGroup
                      className="otp-input-group"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "20px",
                      }}
                      onPaste={(e) => {
                        const pasted = e.clipboardData
                          .getData("text")
                          .trim()
                          .slice(0, 4);
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
                            const value =
                              e.target.value.replace(/\D/, "").charAt(0) || "";
                            const newOtp = [...otpDigits];
                            newOtp[index] = value;
                            setOtpDigits(newOtp);

                            if (value && index < otpDigits.length - 1) {
                              document
                                .getElementById(`otp-${index + 1}`)
                                ?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Backspace" &&
                              !otpDigits[index] &&
                              index > 0
                            ) {
                              document
                                .getElementById(`otp-${index - 1}`)
                                ?.focus();
                            }
                          }}
                        />
                      ))}
                    </FormGroup>

                    <Button className="btn secondary__btn auth__btn">
                      Verify OTP
                    </Button>
                  </Form>
                )}

                {/* STEP 3: New + Confirm Password */}
                {step === 3 && (
                  <Form onSubmit={handleSetNewPassword}>
                    {/* New Password */}
                    <FormGroup style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </FormGroup>

                    {/* Confirm Password */}
                    <FormGroup style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </FormGroup>

                    <Button className="btn secondary__btn auth__btn">
                      Set New Password
                    </Button>
                  </Form>
                )}

                <p>
                  Remembered your password? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;
