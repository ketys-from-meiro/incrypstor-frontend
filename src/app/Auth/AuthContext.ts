import React from "react"
import { ConnectArgs } from "@wagmi/core"
import { Address } from "wagmi"

type AuthContext = {
    address?: Address
    connect: (args?: Partial<ConnectArgs> | undefined) => void
}

export default React.createContext<AuthContext>(null!)
