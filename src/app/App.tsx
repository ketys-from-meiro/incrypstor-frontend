import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import Login from "pages/Login/Login"
import Auth from "./Auth/Auth"
import RequireAuth from "./Auth/RequireAuth"

const Layout = function () {
    return (
        <div>
            <nav>
                <ul>
                    <li>Ahoj</li>
                    <li>Neboj</li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    )
}

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
                <Route path="/login" element={<Login />} />
            </Routes>
        </Auth>
    )
}

export default App
