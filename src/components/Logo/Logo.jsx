import React from 'react'
import logo from './logo.jpg'
import './logo.css'

export default function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} className="logo-img" alt="" />
    </div>
  )
}
