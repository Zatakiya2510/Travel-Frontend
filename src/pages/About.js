import React from 'react'
import CommonSection from '../shared/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import expImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle'
import MesonryImagesGallery from '../components/Image-gallery/MesonryImagesGallery'
import Newsletter from '../shared/NewsLetter'
import Testimonials from '../components/Testimonial/Testimonials'

const About = () => {
  return (
    <>
      <CommonSection title={'About Us'} />
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='experience__content'>
                <Subtitle subtitle={'Experience'} />
                <h2>With our all experience <br /> we will serve you</h2>
                <p>Do sunt amet irure in deserunt magna occaecat.
                  <br />
                  Ex incididunt nulla in magna minim quis nostrud.
                </p>
              </div>

              <div className='counter__wrapper d-flex align-items-center gap-5'>
                <div className='counter__box'>
                  <span>12k+</span>
                  <h6>Successful Trip's</h6>
                </div>
                <div className='counter__box'>
                  <span>2k+</span>
                  <h6>Regular Client's</h6>
                </div>
                <div className='counter__box'>
                  <span>15</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className='experience__img'>
                <img src={expImg} alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} />
              <h2>Vist our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
              <MesonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default About
