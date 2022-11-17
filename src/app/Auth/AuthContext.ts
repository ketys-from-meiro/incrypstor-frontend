import React from "react"
import { ConnectArgs, Connector } from "@wagmi/core"
import { Address } from "wagmi"

type AuthContext = {
    address?: Address
    connector: Connector
    connect: (args?: Partial<ConnectArgs> | undefined) => void
    disconnect: () => void
}

export default React.createContext<AuthContext>(null!)
