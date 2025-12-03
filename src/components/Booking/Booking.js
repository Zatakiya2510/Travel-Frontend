import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL1 } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // ✅ Prevent negative guest size
    if (id === "guestSize") {
      const size = Number(value);
      if (size < 1) return; // block negative/zero values
      setBooking((prev) => ({ ...prev, [id]: size }));
      return;
    }

    // ✅ Only allow digits for phone input
    if (id === "phone") {
      if (!/^\d*$/.test(value)) return; // block non-numeric
      setBooking((prev) => ({ ...prev, [id]: value }));
      return;
    }

    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    // ✅ Validate phone number length
    if (!/^\d{10}$/.test(booking.phone.trim())) {
      return alert("Please enter a valid 10-digit phone number");
    }

    // ✅ Prevent booking if guest size < 1
    if (booking.guestSize < 1) {
      return alert("Guest size must be at least 1");
    }

    try {
      if (!user) {
        return alert("Please sign in");
      }

      const res = await fetch(`${BASE_URL1}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to submit booking");

      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="text"
              placeholder="Phone (10 digits)"
              id="phone"
              value={booking.phone}
              maxLength="10"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              id="guestSize"
              min="1"
              value={booking.guestSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> {booking.guestSize}{" "}
              {booking.guestSize > 1 ? "persons" : "person"}
            </h5>
            <span>${price * booking.guestSize}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={handleClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
