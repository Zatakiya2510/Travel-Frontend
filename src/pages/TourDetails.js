import React, { useEffect, useRef, useState, useContext } from 'react';
import Newsletter from '../shared/NewsLetter';
import { Col, Container, Form, ListGroup, Row } from 'reactstrap';
import avatar from '../assets/images/avatar.jpg';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import '../styles/tour-details.css';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from './../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const [tourRating, setTourRating] = useState(null);
  const reviewMsgRef = useRef('');
  const { user } = useContext(AuthContext);
  const { data: tour, loading, error, refetch } = useFetch(`${BASE_URL}/tours/${id}`);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        alert('Please Login or Register');
        return;
      }

      const reviewObj = {
        username: user.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      // After successful submission, refetch the tour data to get the updated reviews
      await refetch();

      // Clear review input field
      reviewMsgRef.current.value = '';

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const { photo, title, desc, price, reviews, city, distance, maxGroupSize, address } = tour || {};
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt={title} />
                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className={`ri-star-fill${tourRating ? ' primary' : ''}`} onClick={() => setTourRating(null)}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? 'Not Rated' : `(${reviews?.length})`}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill" style={{ color: "var(--secondary-color)" }}></i>{address}
                      </span>
                    </div>
                    <div className="tour__extra-details gap-4">
                      <span><i className="ri-map-pin-2-line" style={{ color: "var(--secondary-color)" }}></i>{city}</span>
                      <span><i className="ri-money-dollar-circle-line" style={{ color: "var(--secondary-color)" }}></i>${price} /person </span>
                      <span><i className="ri-pin-distance-line" style={{ color: "var(--secondary-color)" }}></i>{distance} km</span>
                      <span><i className="ri-group-line" style={{ color: "var(--secondary-color)" }}></i>{maxGroupSize} people </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  <div className='tour__reviews mt-4'>
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span key={rating} onClick={() => setTourRating(rating)}>
                            {rating} <i className={`ri-star-fill star${rating <= tourRating ? ' primary' : ' white'}`}></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input type="text" ref={reviewMsgRef} placeholder="share your thought" required />
                        <button className="btn primary__btn text-white" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div key={index} className="review__item">
                          <img src={avatar} alt="User avatar" />
                          <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review.rating}<i className='ri-star-s-fill'></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
