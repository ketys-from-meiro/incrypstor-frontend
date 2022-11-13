import React from "react"
import { getDefaultProvider } from "ethers"
import { createClient, WagmiConfig } from "wagmi"
import AuthProvider from "./AuthProvider"

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

type AuthProps = {
    children: React.ReactNode
}

function Auth({ children }: AuthProps) {
    return (
        <WagmiConfig client={client}>
            <AuthProvider>{children}</AuthProvider>
        </WagmiConfig>
    )
}

export default Auth
