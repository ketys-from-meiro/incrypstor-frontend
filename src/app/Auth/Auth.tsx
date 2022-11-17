import React from "react"
import { configureChains, createClient, chain, WagmiConfig } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import AuthProvider from "./AuthProvider"

const { chains, provider } = configureChains(
    [chain.goerli],
    [
        jsonRpcProvider({
            rpc: () => ({ http: "http://127.0.0.1:8545" }),
        }),
    ],
)

const client = createClient({
    autoConnect: true,
    connectors: [
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    provider,
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
