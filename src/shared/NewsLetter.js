import React, { useState } from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import { BASE_URL1 } from "../utils/config";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL1}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send");

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your visit has been recorded. The admin has been notified.",
      });
      setEmail("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn newsletter__btn"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </div>

              <p>
                Enter your email — and we'll notify our team that you’ve visited Travel World today!
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="tourist" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
