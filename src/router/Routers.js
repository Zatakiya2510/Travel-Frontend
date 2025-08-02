import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom/dist'
import Home from './../pages/Home.js'
import Tours from './../pages/Tours.js'
import TourDetails from './../pages/TourDetails.js'
import Login from './../pages/Login.js'
import Register from './../pages/Register.js'
import SearchResultList from './../pages/SearchResultList.js'
import About from '../pages/About.js'
import ThankYou from '../pages/ThankYou.js'
import Booking from '../pages/Booking.js'
import MesonryImagesGallery from '../components/Image-gallery/MesonryImagesGallery.js'
import AdminPanel from '../pages/AdminPanel.js'
import AdminBookingTour from '../pages/AdminBookingTours.js'
import AdminTours from '../pages/AdminTours.js'
import TourAddForm from '../pages/TourAddForm.js'
import AdminReview from '../pages/AdminReview.js'


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home ' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/addtour' element={<TourAddForm/>}/>
            <Route path='/addtour/:id' element={<TourAddForm/>}/>
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<AdminPanel />} >
            <Route index element={<AdminTours />} />
            <Route path="/admin/adminBooking" element={<AdminBookingTour />} />
            <Route path="/admin/review" element={<AdminReview/>}/>
            </Route>
            <Route path='/gallery' element={<MesonryImagesGallery />} />
            <Route path='/tours/search' element={<SearchResultList />} />
        </Routes>
    )
}

export default Routers
