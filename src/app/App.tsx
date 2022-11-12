import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "pages/Login/Login"
import WagmiWrapper from "./WagmiWrapper"

function App() {
    return (
        <WagmiWrapper>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </WagmiWrapper>
    )
}

export default App
