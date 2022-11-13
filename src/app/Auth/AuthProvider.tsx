import React from "react"
import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import AuthContext from "./AuthContext"

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
    const { address } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    return <AuthContext.Provider value={{ address, connect }}>{children}</AuthContext.Provider>
}

export default AuthProvider
