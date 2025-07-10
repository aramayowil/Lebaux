import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Error404 from '../pages/Error404'

function MyRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default MyRouter
