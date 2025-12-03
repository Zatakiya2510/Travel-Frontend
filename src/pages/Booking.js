import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext
import { Table } from "reactstrap";

export default function Booking() {
  const [booking, setBooking] = useState([]);
  const { user } = useContext(AuthContext); // Access user object from context

  useEffect(() => {
    if (user) {
      const userId = user._id; // Get user ID from the user object
      fetch(`https://tour-backend-i1a8.onrender.com/api/v1/booking/user/${userId}`)
        .then((res) => res.json())
        .then((res) => setBooking(res.data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]); // Fetch bookings when the user object changes

  if (!booking || booking.length === 0) {
    return <div className="text-center">No bookings available</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "var(--heading-color)", fontFamily: "var(--subtitle-font-name)" }}>
        My Bookings
      </h2>

      <Table bordered hover responsive className="booking-table">
        <thead>
          <tr style={{ backgroundColor: "var(--primary-color)", color: "#fff" }}>
            <th>#</th>
            <th>Full Name</th>
            <th>Tour Name</th>
            <th>Guest Size</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((boo, index) => (
            <tr key={boo._id}>
              <td>{index + 1}</td>
              <td>{boo.fullName}</td>
              <td>{boo.tourName}</td>
              <td>{boo.guestSize}</td>
              <td>{boo.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
