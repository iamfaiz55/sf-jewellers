/* eslint-disable react/prop-types */
// import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UserProtected = ({ compo }) => {
    const { user } = useSelector(state => state.userData)
    return user ? compo : <Navigate to="/user/login" />
}

export default UserProtected