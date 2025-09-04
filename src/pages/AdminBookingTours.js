import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import "../styles/admin-booking.css";
import Subtitle from './../shared/Subtitle.js'


export default function AdminBookingTour() {
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        fetch("https://tour-backend-i1a8.onrender.com/api/v1/booking")
            .then((res) => res.json())
            .then((res) => {
                console.warn(res.data);
                setBooking(res.data);
            });
    }, []);

    // Show message if no bookings are available
    if (!booking || booking.length === 0) {
        return <div className="no-bookings">No bookings available</div>;
    }

    return (
        <Container className="booking-container">
            <h1 className="text-center mt-4 mb-4" style={{ color: "var(--heading-color)", fontFamily: "var(--subtitle-font-name)" }}>
                Booked Tours
            </h1>
            <div className="table-responsive">
                <Table bordered hover striped className="booking-table">
                    <thead className="table-header">
                        <tr>
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
        </Container>
    );
}
