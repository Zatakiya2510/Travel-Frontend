import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
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
        if (param.id !== "") {
            fetch("http://localhost:4000/api/v1/tours/" + param.id)
                .then(res => res.json())
                .then(res => {
                    setTour(res); // Update state with fetched data directly
                })
                .catch(error => console.error("Error fetching tour data:", error));
        } else {
            // Reset tour state to empty fields when in 'Add Tour' mode
            setTour({
                title: "",
                city: "",
                address: "",
                distance: "",
                price: "",
                maxGroupSize: "",
                desc: "",
                photo: "",
            });
        }
    }, [param.id]);


    const handleInputChange = (field, value) => {
        setTour({ ...tour, [field]: value });
    };

    const handleSubmit = () => {
        const url = param.id ? `http://localhost:4000/api/v1/tours/${param.id}` : "http://localhost:4000/api/v1/tours";
        const method = param.id ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tour)
        })
            .then(res => {
                if (res.ok) {
                    // Show success message using SweetAlert
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
        <Col md={6}>
            <Form className="form__table">
                <FormGroup>
                    <Label for="title">Tour Name:</Label>
                    <Input type="text" id="title" value={tour.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Enter Tour Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="city">Places You Want To Cover:</Label>
                    <Input
                        type="text"
                        id="city"
                        value={tour.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter Cities (separated by comma)"
                        multiple
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Main City You Want To Explore:</Label>
                    <Input type="text" id="address" value={tour.address} onChange={(e) => handleInputChange("address", e.target.value)} placeholder="Main City You Want To Explore" />
                </FormGroup>
                <FormGroup>
                    <Label for="distance">Enter Distance (Km):</Label>
                    <Input type="number" id="distance" value={tour.distance} onChange={(e) => handleInputChange("distance", e.target.value)} placeholder="Enter Distance" />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Enter Price ($):</Label>
                    <Input type="number" id="price" value={tour.price} onChange={(e) => handleInputChange("price", e.target.value)} placeholder="Enter Price" />
                </FormGroup>
                <FormGroup>
                    <Label for="maxGroupSize">Enter People In A Group :</Label>
                    <Input type="number" id="maxGroupSize" value={tour.maxGroupSize} onChange={(e) => handleInputChange("maxGroupSize", e.target.value)} placeholder="Enter Max Group Size" />
                </FormGroup>
                <FormGroup>
                    <Label for="desc">Enter Description:</Label>
                    <Input type="text" id="desc" value={tour.desc} onChange={(e) => handleInputChange("desc", e.target.value)} placeholder="Enter Description" />
                </FormGroup>
                <FormGroup>
                    <Label for="photo">Img Url:</Label>
                    <Input type="text" id="photo" value={tour.photo} onChange={(e) => handleInputChange("photo", e.target.value)} placeholder="Img Url" />
                </FormGroup>
                <Button className="btn primary__btn" onClick={handleSubmit}>{param.id ? 'Update' : 'Add Tour'}</Button>
            </Form>
        </Col>
    );
};

export default TourAddForm;
