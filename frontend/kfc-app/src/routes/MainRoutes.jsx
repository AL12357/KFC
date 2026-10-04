import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Menu from '../pages/Menu'
import Search from '../pages/Search'
import SingleProduct from '../pages/SingleProduct'
import FindKFC from '../main_components/FindKFC/FindKFC'
import Home from "../pages/Home"
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import PageNotFound from '../pages/PageNotFound'
import About from '../pages/About'
import Careers from "../pages/Careers"
import CheckOut from '../checkout_components/CheckOut'

const MainRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/search" element={<Search />} />

        <Route path="/menu/:id" element={<SingleProduct />} />

        <Route path="/find" element={<FindKFC />} />

        <Route path="/about" element={<About />} />

        {/* LOGIN */}
        <Route path="/signin" element={<Login />} />

        {/* SIGN UP */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/careers" element={<Careers />} />

        <Route path="/checkout" element={<CheckOut />} />

        {/* PAGE NOT FOUND */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </div>
  )
}

export default MainRoutes