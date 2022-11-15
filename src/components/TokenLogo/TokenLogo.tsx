import React from "react"
import classnames from "classnames"
import styles from "./TokenLogo.module.scss"
import wbtc from "./logos/wbtc.png"
import weth from "./logos/weth.png"

const addressToLogo = {
    "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6": weth,
    "0xc04b0d3107736c32e19f1c62b2af67be61d63a05": wbtc,
}

type TokenLogoProps = {
    address: string
    size?: "sm" | "md" | "lg"
    className?: string
}

function TokenLogo({ address, size = "md", className }: TokenLogoProps) {
    return (
        <img
            className={classnames(styles.tokenLogo, styles[size], className)}
            alt=""
            src={addressToLogo[address.toLowerCase() as keyof typeof addressToLogo]}
        />
    )
}

export default TokenLogo
