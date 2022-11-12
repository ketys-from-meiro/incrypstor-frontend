import { getDefaultProvider } from "ethers"
import { createClient, WagmiConfig } from "wagmi"

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

type WagmiWrapperProps = {
    children: React.ReactNode
}

function WagmiWrapper({ children }: WagmiWrapperProps) {
    return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default WagmiWrapper
