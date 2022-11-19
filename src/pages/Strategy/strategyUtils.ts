type TokenInfo = { symbol: string; description: string }

const tokenInfo: { [key: string]: TokenInfo } = {
    "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6": {
        symbol: "WETH",
        description: "WETH is the ERC20 wrapped version of Ether.",
    },
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": {
        symbol: "UNI",
        description: "The governance token for Uniswap, a protocol for exchanging ERC20 tokens.",
    },
    "0x326C977E6efc84E512bB9C30f76E30c160eD06FB": {
        symbol: "LINK",
        description: "A token that powers the Chainlink decentralized oracle network.",
    },
}

export const getTokenInfo = (address: string): TokenInfo | undefined => {
    const info = tokenInfo[address as keyof typeof tokenInfo]
    return info
}
