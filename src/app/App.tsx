import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "pages/Login/Login"
import Auth from "./Auth/Auth"
import RequireAuth from "./Auth/RequireAuth"
import Layout from "./Layout/Layout"

const Home = function () {
    return <h1>Home</h1>
}

const Neda = function () {
    return <h1>Neda</h1>
}

function App() {
    return (
        <Auth>
            <Routes>
                {/* Protected paths */}
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="neda" element={<Neda />} />
                </Route>

                {/* Public paths */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Auth>
    )
}

export default App
