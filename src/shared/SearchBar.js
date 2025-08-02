import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from './../utils/config.js'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

    const locationRef = useRef('')
    const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate()

    const searchHandler = () => {
        const location = locationRef.current.value
        const distance = distanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value

        if (location == '' || distance == '' || maxGroupSize == '') {
            return alert("All fields are required");
        }

        async function fetchData() {
            try {
                const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);

                if (!res.ok) {
                    console.error(`HTTP error! Status: ${res.status}`);
                    alert('Something went wrong');
                    return;
                }

                const result = await res.json();

                navigate(
                    `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
                    { state: result.data }
                );
            } catch (error) {
                // Handle general errors (e.g., network issues)
                console.error('Error during fetch:', error);
                alert('Something went wrong');
            }
        }

        // Call the async function
        fetchData();
    }
    return <Col lg='12'>
        <div className='search__bar'>
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 from__group from__group-first'>
                    <span>
                        <i className="ri-map-pin-line"></i>
                    </span>
                    <div >
                        <h6>Location</h6>
                        <input type='text' placeholder='Where are you going?' ref={locationRef} />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 from__group from__group-first'>
                    <span>
                        <i className="ri-pin-distance-line"></i>
                    </span>
                    <div >
                        <h6>Distance</h6>
                        <input type='number' placeholder='Distance to travel' ref={distanceRef} />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 from__group from__group-last'>
                    <span>
                        <i className="ri-group-line"></i>
                    </span>
                    <div >
                        <h6>Max People</h6>
                        <input type='text' placeholder='0' ref={maxGroupSizeRef} />
                    </div>
                </FormGroup>
                <span className='search__icon' type='submit' onClick={searchHandler}>
                    <i className='ri-search-line'></i>
                </span>
            </Form>
        </div>
    </Col>
}

export default SearchBar
