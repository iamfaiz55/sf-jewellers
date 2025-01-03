// import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const AdminProtected = ({ compo }) => {


    const { admin } = useSelector(state => state.adminData)
    // console.log(admin);

    return admin ? compo : <Navigate to="/admin/login" />
}

export default AdminProtected