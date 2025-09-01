import React from 'react'
import Header from './../Header/Header.js'
import Footer from './../Footer/Footer.js'
import Routers from '../../router/Routers.js'
const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  )
}

export default Layout
