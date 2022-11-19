import { BigNumber } from "ethers"

export type TokenParams = {
    addr: `0x${string}`
    percentage: number
}

export type Strategy = {
    id: BigNumber
    name: string
    tokensParams: readonly TokenParams[]
}
