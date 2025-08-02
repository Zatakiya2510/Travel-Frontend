import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import "../styles/admin-review.css"; // Ensure your styles are applied

export default function AdminReview() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://travel-backend-1-fgwb.onrender.com/api/v1/review")
            .then((res) => res.json())
            .then((res) => setReviews(res.data));
    }, []);

    // Function to handle deletion of a review
    const handleDeleteReview = async (reviewId) => {
        try {
            const res = await fetch(`https://travel-backend-1-fgwb.onrender.com/api/v1/review/${reviewId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete review");

            // Update state after deletion
            setReviews(reviews.filter((review) => review._id !== reviewId));
        } catch (error) {
            console.error(error.message);
        }
    };

    if (!reviews || reviews.length === 0) {
        return <div className="text-center">No reviews available</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4" style={{ color: "var(--heading-color)", fontFamily: "var(--subtitle-font-name)" }}>
                Admin Reviews
            </h1>

            <Table bordered hover responsive className="review-table">
                <thead>
                    <tr style={{ backgroundColor: "var(--primary-color)", color: "#fff" }}>
                        <th>#</th>
                        <th>Username</th>
                        <th>Review</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review._id}>
                            <td>{index + 1}</td>
                            <td>{review.username}</td>
                            <td>{review.reviewText}</td>
                            <td className="text-center">
                                <Button color="danger" size="sm" onClick={() => handleDeleteReview(review._id)}>
                                    <i className="ri-delete-bin-6-line"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
