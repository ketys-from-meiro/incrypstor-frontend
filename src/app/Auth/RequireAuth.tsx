import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import useAuth from "./useAuth"

type RequireAuthProps = {
    children: JSX.Element
}

function RequireAuth({ children }: RequireAuthProps) {
    const auth = useAuth()
    const location = useLocation()

    if (!auth.address) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
}

export default RequireAuth
