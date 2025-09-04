import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import '../styles/touraddform.css';
import Swal from 'sweetalert2';

const TourAddForm = () => {
    const param = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState({
        title: "",
        city: "",
        address: "",
        distance: "",
        price: "",
        maxGroupSize: "",
        desc: "",
        photo: "",
    });

    useEffect(() => {
        if (param.id) {
            fetch(`https://tour-backend-i1a8.onrender.com/api/v1/tours/${param.id}`)
                .then(res => res.json())
                .then(res => {
                    setTour(res.data);
                })
                .catch(error => console.error("Error fetching tour data:", error));
        }
    }, [param.id]);

    const handleInputChange = (field, value) => {
        setTour({ ...tour, [field]: value });
    };

    const handleSubmit = () => {
        const url = param.id
            ? `https://tour-backend-i1a8.onrender.com/api/v1/tours/${param.id}`
            : "https://tour-backend-i1a8.onrender.com/api/v1/tours";

        const method = param.id ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tour)
        })
            .then(res => {
                if (res.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: `Tour ${param.id ? 'has been updated' : 'has been added'} Successfully`,
                        text: `The tour ${param.id ? 'has been updated' : 'has been added'} Successfully!`,
                    }).then(() => {
                        navigate("/admin");
                    });
                } else {
                    console.error(`Failed to ${param.id ? "update" : "add"} tour`);
                }
            })
            .catch(error => {
                console.error(`Error ${param.id ? "updating" : "adding"} tour:`, error);
            });
    };

    return (
        <Container fluid className="full-screen-form">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={10} lg={8} xl={6} className="form-container">
                    <h1 className="text-center mb-4" style={{ color: "var(--heading-color)", fontFamily: "var(--subtitle-font-name)" }}>
                        Add Tour
                    </h1>
                    <Form className="form__table">
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="title">Tour Name:</Label>
                                    <Input type="text" id="title" value={tour.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Enter Tour Name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="city">Places You Want To Cover:</Label>
                                    <Input type="text" id="city" value={tour.city} onChange={(e) => handleInputChange("city", e.target.value)} placeholder="Enter Cities (comma-separated)" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">Main City:</Label>
                                    <Input type="text" id="address" value={tour.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder="Main City" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="distance">Distance (Km):</Label>
                                    <Input type="number" id="distance" value={tour.distance} onChange={(e) => handleInputChange("distance", e.target.value)} placeholder="Enter Distance" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="price">Price ($):</Label>
                                    <Input type="number" id="price" value={tour.price} onChange={(e) => handleInputChange("price", e.target.value)} placeholder="Enter Price" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="maxGroupSize">Group Size:</Label>
                                    <Input type="number" id="maxGroupSize" value={tour.maxGroupSize} onChange={(e) => handleInputChange("maxGroupSize", e.target.value)} placeholder="Max Group Size" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="desc">Description:</Label>
                                    <Input type="textarea" id="desc" value={tour.desc} onChange={(e) => handleInputChange("desc", e.target.value)} placeholder="Enter Description" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="photo">Image URL:</Label>
                                    <Input type="text" id="photo" value={tour.photo} onChange={(e) => handleInputChange("photo", e.target.value)} placeholder="Image URL" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Button className="btn primary__btn full-width" onClick={handleSubmit}>Submit</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default TourAddForm;