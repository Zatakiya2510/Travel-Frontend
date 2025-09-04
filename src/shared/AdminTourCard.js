import { React, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "./admin-tour-card.css";
import calculateAvgRating from "../utils/avgRating";

const AdminTourCard = ({ tour, id }) => {
    const [dtour, setdTour] = useState({});

    useEffect(() => {
        fetch(`https://tour-backend-i1a8.onrender.com/api/v1/tours/${id}`)
            .then((res) => res.json())
            .then((res) => setdTour(res));
    }, [id]);

    const { _id, title, city, photo, price, featured, reviews } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <div className="tour__card">
            <Card>
                <div className="tour__img">
                    <img src={photo} alt="tour-img"></img>
                    {featured && <span>Featured</span>}
                </div>
            </Card>

            <CardBody>
                <div className="card__top d-flex align-items-center justify-content-between">
                    <span className="tour__location d-flex align-items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {city}
                    </span>
                    <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-fill"></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? 'Not Rated' : <span>({reviews.length})</span>}
                    </span>
                </div>

                <h5 className="tour__title">
                    <Link to={`/tours/${_id}`}>{title}</Link>
                </h5>


                <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                    {/* Left-aligned Price */}
                    <h5 className="tour__price mb-0">${price}<span> /per person</span></h5>

                    {/* Right-aligned Edit & Delete Buttons */}
                    <div className="admin-actions d-flex gap-3">
                        <Link to={`/addtour/${_id}`} className="action-btn edit-btn">
                            <i className="ri-edit-2-line"></i>
                        </Link>
                        <button
                            className="action-btn delete-btn"
                            onClick={() => {
                                fetch(`https://tour-backend-i1a8.onrender.com/api/v1/tours/${_id}`, { method: "DELETE" })
                                    .then((res) => {
                                        if (res.ok) {
                                            window.location.reload();
                                        } else {
                                            console.error("Failed to delete tour");
                                        }
                                    });
                            }}
                        >
                            <i className="ri-delete-bin-6-line"></i>
                        </button>
                    </div>
                </div>

            </CardBody>
        </div>
    );
};

export default AdminTourCard;
