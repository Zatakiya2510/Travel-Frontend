import React from 'react'
import '../styles/home.css'
import { Col, Container, Row } from 'reactstrap'
import Subtitle from './../shared/Subtitle.js'
import heroImg01 from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import expImg from '../assets/images/experience.png'
import SearchBar from '../shared/SearchBar.js'
import ServiceList from '../services/ServiceList.js'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList.js'
import MesonryImagesGallery from '../components/Image-gallery/MesonryImagesGallery.js'
import Testimonials from '../components/Testimonial/Testimonials.js'
import Newsletter from '../shared/NewsLetter.js'

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='hero__content'>
                <div className='hero__subtitle d-flex align-items-center'>
                  <Subtitle subtitle={"Know Befor You Go"} />
                  <img src={worldImg} alt='World img' />
                </div>
                <h1>Travelling opens the door to creating{" "}
                  <span className='highlight'> memories.</span>
                </h1>
                <p>Aute deserunt deserunt fugiat eu incididunt
                  voluptate deserunt proident labore enim irure
                  consequat adipisicing. Ex reprehenderit id duis
                  pariatur minim nulla consequat. Culpa sit eu
                  incididunt consectetur est aliqua in nulla
                  labore.
                </p>
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box'>
                <img src={heroImg01} alt='' />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box mt-4'>
                <video src={heroVideo} alt='' controls />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box mt-5'>
                <img src={heroImg02} alt='' />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='services__subtitle'>What we serve</h5>
              <h2 className='services__title'>We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={"Explore"} />
              <h2 className='featured__tour-title'>Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
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
              <h2 className='gallery__title'>Vist our customers tour gallery</h2>
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

export default Home
