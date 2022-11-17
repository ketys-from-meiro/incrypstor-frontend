import React from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import AuthContext from "./AuthContext"

type AuthProviderProps = {
    children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
    const { address } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()

    return (
        <AuthContext.Provider value={{ address, connector: connectors[0], connect, disconnect }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
