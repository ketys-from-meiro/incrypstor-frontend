import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "pages/Login/Login"
import Auth from "./Auth/Auth"
import RequireAuth from "./Auth/RequireAuth"
import Layout from "./Layout/Layout"
import StrategiesDashboard from "pages/Strategy/StrategiesDashboard/StrategiesDashboard"
import StrategyCreate from "pages/Strategy/StrategyCreate/StrategyCreate"
import StrategyDetail from "pages/Strategy/StrategyDetail/StrategyDetail"
import StrategyEdit from "pages/Strategy/StrategyEdit/StrategyEdit"

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
                    <Route index element={<StrategiesDashboard />} />
                    <Route path="strategies">
                        <Route index element={<StrategiesDashboard />} />
                        <Route path="create" element={<StrategyCreate />} />
                        <Route path=":strategyId">
                            <Route index element={<StrategyDetail />} />
                            <Route path="edit" element={<StrategyEdit />} />
                        </Route>
                    </Route>
                </Route>

                {/* Public paths */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Auth>
    )
}

export default App
